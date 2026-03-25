import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MESH_TEXTURED_MTL, MESH_TEXTURED_OBJ } from "./object-inline.js";

function initHomeViewer() {
  if (document.body.dataset.page !== "home") {
    return;
  }

  const mount = document.getElementById("hero-3d-view");
  if (!mount) {
    return;
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x050816, 10, 32);
  scene.background = new THREE.Color(0x071126);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    38,
    mount.clientWidth / mount.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.2, 7.2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 2.2;
  controls.maxDistance = 14;
  controls.target.set(0, 0.8, 0);

  scene.add(new THREE.AmbientLight(0xf2f6ff, 3.2));

  const hemiLight = new THREE.HemisphereLight(0xbfe6ff, 0x1c2454, 2.8);
  hemiLight.position.set(0, 8, 0);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xc9ecff, 4.8);
  keyLight.position.set(5, 7, 6);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xb398ff, 3.8);
  rimLight.position.set(-5, 4, -4);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0x7ed6ff, 26, 40, 2);
  fillLight.position.set(0, 2.2, 3.6);
  scene.add(fillLight);

  const frontLight = new THREE.SpotLight(0xffffff, 9, 50, Math.PI / 4, 0.45, 1.4);
  frontLight.position.set(0, 4.5, 8.5);
  frontLight.target.position.set(0, 0.8, 0);
  scene.add(frontLight);
  scene.add(frontLight.target);

  const underGlow = new THREE.PointLight(0x8f7cff, 18, 26, 2);
  underGlow.position.set(0, -0.6, 1.5);
  scene.add(underGlow);

  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(2.45, 2.75, 0.24, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0x0d1536,
      metalness: 0.45,
      roughness: 0.42,
      clearcoat: 0.8,
      clearcoatRoughness: 0.3
    })
  );
  pedestal.position.y = -1.75;
  scene.add(pedestal);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(2.72, 0.05, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x6cdfff, transparent: true, opacity: 0.38 })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = -1.58;
  scene.add(halo);

  const modelRoot = new THREE.Group();
  scene.add(modelRoot);

  const loadingManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(loadingManager);

  function fitCameraToObject(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fitHeightDistance = maxDim / (2 * Math.tan((Math.PI * camera.fov) / 360));
    const fitDistance = fitHeightDistance * 1.5;

    controls.target.copy(center);
    controls.target.y += size.y * 0.08;
    camera.position.set(center.x, center.y + size.y * 0.18, center.z + fitDistance);
    camera.near = Math.max(maxDim / 100, 0.1);
    camera.far = Math.max(maxDim * 12, 100);
    camera.updateProjectionMatrix();
    controls.minDistance = maxDim * 0.6;
    controls.maxDistance = maxDim * 4.2;
    controls.update();
  }

  function applyFallbackMaterial(object) {
    const colorMap = textureLoader.load("objects/mesh_textured.jpg");
    colorMap.colorSpace = THREE.SRGBColorSpace;
    const roughnessMap = textureLoader.load("objects/mesh_textured_roughness.jpg");
    const metalnessMap = textureLoader.load("objects/mesh_textured_metallic.jpg");

    object.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      child.material = new THREE.MeshStandardMaterial({
        color: 0xdfe9ff,
        map: colorMap,
        roughnessMap,
        metalnessMap,
        roughness: 0.82,
        metalness: 0.22,
        emissive: 0x24345f,
        emissiveIntensity: 0.28
      });
    });
  }

  function onLoad(object) {
    object.rotation.y = Math.PI / 7;
    object.rotation.x = 0.98;
    object.position.y = -0.18;
    object.position.z = 0.22;
    applyFallbackMaterial(object);
    modelRoot.add(object);
    fitCameraToObject(object);
  }

  function onError() {
    mount.innerHTML =
      '<div class="viewer-overlay"><p class="viewer-label">3D viewer failed to load</p><p class="viewer-hint">Please check the bundled model data and texture files.</p></div>';
  }

  try {
    const mtlLoader = new MTLLoader(loadingManager);
    const materials = mtlLoader.parse(MESH_TEXTURED_MTL, "objects/");
    materials.preload();

    const objLoader = new OBJLoader(loadingManager);
    objLoader.setMaterials(materials);
    const object = objLoader.parse(MESH_TEXTURED_OBJ);
    onLoad(object);
  } catch (error) {
    onError();
  }

  const clock = new THREE.Clock();

  function animate() {
    const elapsed = clock.getElapsedTime();
    halo.material.opacity = 0.24 + Math.sin(elapsed * 1.6) * 0.08;
    modelRoot.rotation.y += 0.0015;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function handleResize() {
    const { clientWidth, clientHeight } = mount;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  }

  window.addEventListener("resize", handleResize);
  animate();
}

initHomeViewer();

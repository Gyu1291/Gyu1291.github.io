const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "data.js");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readDirFiles(dirPath, extension) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name) === extension)
    .map((entry) => path.join(dirPath, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

function normalizePath(filePath) {
  return path.relative(rootDir, filePath).replaceAll("\\", "/");
}

function compareByOrderThenTitle(a, b) {
  const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : Number.MAX_SAFE_INTEGER;
  const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : Number.MAX_SAFE_INTEGER;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return String(a.title || "").localeCompare(String(b.title || ""));
}

function parseFrontMatter(markdown, filePath) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    throw new Error(`Missing front matter in ${normalizePath(filePath)}`);
  }

  const metadata = {};
  match[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) {
        throw new Error(`Invalid front matter line "${line}" in ${normalizePath(filePath)}`);
      }

      const key = line.slice(0, separatorIndex).trim();
      const rawValue = line.slice(separatorIndex + 1).trim();
      metadata[key] = rawValue.replace(/^"(.*)"$/, "$1");
    });

  return metadata;
}

function loadPublicationCategory(category) {
  const dirPath = path.join(rootDir, "publications", category);
  return readDirFiles(dirPath, ".json")
    .map((filePath) => readJson(filePath))
    .sort(compareByOrderThenTitle);
}

function loadProjects() {
  const dirPath = path.join(rootDir, "projects");
  return readDirFiles(dirPath, ".json")
    .map((filePath) => readJson(filePath))
    .sort(compareByOrderThenTitle);
}

function loadPosts() {
  const dirPath = path.join(rootDir, "posts");
  return readDirFiles(dirPath, ".md")
    .map((filePath) => {
      const markdown = fs.readFileSync(filePath, "utf8");
      const metadata = parseFrontMatter(markdown, filePath);
      return {
        id: metadata.id,
        title: metadata.title,
        date: metadata.date,
        category: metadata.category,
        description: metadata.description,
        path: normalizePath(filePath)
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

const siteData = {
  publications: {
    conference: loadPublicationCategory("conference"),
    journal: loadPublicationCategory("journal")
  },
  projects: loadProjects(),
  posts: loadPosts()
};

const output = `window.siteData = ${JSON.stringify(siteData, null, 2)};\n`;
fs.writeFileSync(outputPath, output);
console.log(`Generated ${normalizePath(outputPath)}`);

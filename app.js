function setActiveNav() {
  const page = document.body.dataset.page;
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const active =
      (page === "about" && href === "about.html") ||
      (page === "publications" && href === "publications.html") ||
      (page === "projects" && href === "projects.html") ||
      ((page === "posts" || page === "post-detail") && href === "posts.html");
    if (active) {
      link.classList.add("active");
    }
  });
}

function createCard(item, type) {
  return `
    <article class="content-card glass-panel" data-id="${item.id}" data-type="${type}" tabindex="0">
      <div class="content-card-image">
        <img src="${item.cover}" alt="${item.title} cover" />
      </div>
      <div class="content-card-copy">
        <p class="card-meta">${item.venue}</p>
        <h3>${item.title}</h3>
        <p class="card-subtitle">${item.subtitle}</p>
        <p>${item.summary}</p>
        <span class="button button-tertiary">Open Details</span>
      </div>
    </article>
  `;
}

function renderPublications() {
  if (!window.siteData || document.body.dataset.page !== "publications") {
    return;
  }

  document.getElementById("conference-publications").innerHTML = window.siteData.publications.conference
    .map((item) => createCard(item, "publication"))
    .join("");
  document.getElementById("journal-publications").innerHTML = window.siteData.publications.journal
    .map((item) => createCard(item, "publication"))
    .join("");
}

function renderProjects() {
  if (!window.siteData || document.body.dataset.page !== "projects") {
    return;
  }

  document.getElementById("projects-list").innerHTML = window.siteData.projects
    .map((item) => createCard(item, "project"))
    .join("");
}

function renderPosts() {
  if (!window.siteData || document.body.dataset.page !== "posts") {
    return;
  }

  document.getElementById("posts-list").innerHTML = window.siteData.posts
    .map(
      (post) => `
        <article class="post-card glass-panel">
          <p class="card-meta">${post.category} | ${post.date}</p>
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <a class="button button-primary" href="post.html?id=${post.id}">Open Post</a>
        </article>
      `
    )
    .join("");
}

function getModalData(id, type) {
  if (type === "project") {
    return window.siteData.projects.find((item) => item.id === id);
  }

  const allPublications = [
    ...window.siteData.publications.conference,
    ...window.siteData.publications.journal
  ];
  return allPublications.find((item) => item.id === id);
}

function openModal(item) {
  const modal = document.getElementById("detail-modal");
  const content = document.getElementById("modal-content");
  if (!modal || !content || !item) {
    return;
  }

  content.innerHTML = `
    <div class="modal-layout">
      <div class="modal-image-wrap">
        <img src="${item.cover}" alt="${item.title} cover" />
      </div>
      <div class="modal-copy">
        <p class="card-meta">${item.venue}</p>
        <h2>${item.title}</h2>
        <p class="card-subtitle">${item.subtitle}</p>
        <p>${item.abstract}</p>
        <ul class="tag-list">
          ${item.tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
        <div class="link-buttons">
          ${item.links
            .map(
              (link) =>
                `<a class="button button-secondary" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  const modal = document.getElementById("detail-modal");
  if (!modal) {
    return;
  }
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function bindModalEvents() {
  const modal = document.getElementById("detail-modal");
  if (!modal) {
    return;
  }

  document.addEventListener("click", (event) => {
    const card = event.target.closest(".content-card");
    const closeTrigger = event.target.closest("[data-close-modal='true']");

    if (card) {
      openModal(getModalData(card.dataset.id, card.dataset.type));
      return;
    }

    if (closeTrigger) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      return;
    }

    const card = document.activeElement;
    if (
      (event.key === "Enter" || event.key === " ") &&
      card &&
      card.classList.contains("content-card")
    ) {
      event.preventDefault();
      openModal(getModalData(card.dataset.id, card.dataset.type));
    }
  });
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function parseInlineMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inList = false;
  let inCode = false;

  lines.forEach((rawLine) => {
    const line = escapeHtml(rawLine);

    if (line.startsWith("```")) {
      html.push(inCode ? "</code></pre>" : "<pre><code>");
      inCode = !inCode;
      return;
    }

    if (inCode) {
      html.push(`${line}\n`);
      return;
    }

    if (!line.trim()) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      return;
    }

    if (line.startsWith("# ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h1>${parseInlineMarkdown(line.slice(2))}</h1>`);
      return;
    }

    if (line.startsWith("## ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h2>${parseInlineMarkdown(line.slice(3))}</h2>`);
      return;
    }

    if (line.startsWith("### ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h3>${parseInlineMarkdown(line.slice(4))}</h3>`);
      return;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${parseInlineMarkdown(line.slice(2))}</li>`);
      return;
    }

    if (inList) {
      html.push("</ul>");
      inList = false;
    }

    html.push(`<p>${parseInlineMarkdown(line)}</p>`);
  });

  if (inList) {
    html.push("</ul>");
  }
  if (inCode) {
    html.push("</code></pre>");
  }

  return html.join("");
}

async function renderPostDetail() {
  if (!window.siteData || document.body.dataset.page !== "post-detail") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  const post = window.siteData.posts.find((item) => item.id === postId) || window.siteData.posts[0];

  document.getElementById("post-header").innerHTML = `
    <p class="eyebrow">${post.category}</p>
    <h1>${post.title}</h1>
    <p class="muted">${post.date}</p>
  `;

  try {
    const response = await fetch(post.path);
    const markdown = await response.text();
    document.getElementById("post-content").innerHTML = renderMarkdown(markdown);
  } catch (error) {
    document.getElementById("post-content").innerHTML = "<p>Unable to load the markdown post.</p>";
  }
}

setActiveNav();
renderPublications();
renderProjects();
renderPosts();
bindModalEvents();
renderPostDetail();

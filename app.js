/**
 * ==============================================================================
 * PORTAFOLIO PROFESIONAL - SAMUEL TOVAR MUJICA
 * LOGICA INTERACTIVA, MOTOR DE PROYECTOS Y SISTEMA ESCALABLE
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initProjects();
  initModals();
  initNewProjectGenerator();
  initContactForm();
  initScrollSpy();
});

/* ==============================================================================
   1. GESTIÓN DE NAVBAR Y MENÚ RESPONSIVO
   ============================================================================== */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const backToTopBtn = document.getElementById("back-to-top");

  // Efecto de scroll en navbar y botón volver arriba
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Toggle de menú hamburguesa
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      mobileMenu.classList.toggle("open");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        mobileMenu.classList.remove("open");
      });
    });
  }

  // Scroll to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* ==============================================================================
   2. MOTOR DE PROYECTOS DINÁMICO Y FILTRADO (MZCode01 & MoureDev Standards)
   ============================================================================== */
let currentCategory = "todos";

function initProjects() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  renderProjects(currentCategory);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      renderProjects(currentCategory);
    });
  });
}

function renderProjects(category) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const projects = window.PORTFOLIO_PROJECTS || [];
  const filtered = category === "todos" 
    ? projects 
    : projects.filter((p) => p.category === category);

  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-dim);">
        <p>No se encontraron proyectos en esta categoría por el momento.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("data-id", project.id);

    // Métricas en la tarjeta
    let metricsHtml = "";
    if (project.metrics && project.metrics.length > 0) {
      metricsHtml = `
        <div class="project-metrics-row">
          ${project.metrics.slice(0, 2).map(m => `
            <div class="p-metric-item">
              <span class="p-metric-val font-mono">${m.value}</span>
              <span class="p-metric-lbl">${m.label}</span>
            </div>
          `).join("")}
        </div>
      `;
    }

    // Tags
    const tagsHtml = project.tags.slice(0, 5).map(tag => `
      <span class="p-tag">${tag}</span>
    `).join("");

    // Links directos rápidos
    let quickLinksHtml = "";
    if (project.links && project.links.length > 0) {
      quickLinksHtml = project.links.map(l => `
        <a href="${l.url}" class="p-quick-btn" title="${l.label}" target="_blank" rel="noopener noreferrer">
          ${getIconSvg(l.icon)}
        </a>
      `).join("");
    }

    card.innerHTML = `
      <div class="project-thumb-container">
        <img src="${project.image}" alt="${project.title}" class="project-thumb" loading="lazy">
        <span class="project-badge-overlay">${project.badge || project.categoryLabel}</span>
        <span class="project-year-overlay font-mono">${project.year}</span>
      </div>
      <div class="project-content">
        <div class="project-institution font-mono">${project.institution}</div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        ${metricsHtml}
        <div class="project-tags">
          ${tagsHtml}
        </div>
        <div class="project-actions">
          <button type="button" class="btn-details" onclick="openProjectModal('${project.id}')">
            <span>Ver Arquitectura & Detalles</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <div class="project-quick-links">
            ${quickLinksHtml}
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ==============================================================================
   3. MODAL DE DETALLE COMPLETO DEL PROYECTO
   ============================================================================== */
function initModals() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        modal.classList.remove("open");
      }
    });
  }
}

window.openProjectModal = function(projectId) {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-project-body");

  // Destacados técnicos (highlights)
  const highlightsHtml = project.highlights.map(h => `
    <li style="margin-bottom: 12px; color: var(--text-muted); line-height: 1.6;">
      <span style="color: var(--cyan-accent); font-weight: bold; margin-right: 6px;">▹</span> ${h}
    </li>
  `).join("");

  // Métricas completas
  let metricsGrid = "";
  if (project.metrics && project.metrics.length > 0) {
    metricsGrid = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; background: rgba(0,0,0,0.4); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin: 24px 0;">
        ${project.metrics.map(m => `
          <div>
            <div class="font-mono" style="font-size: 1.25rem; font-weight: 800; color: var(--cyan-accent);">${m.value}</div>
            <div style="font-size: 0.78rem; color: var(--text-dim); text-transform: uppercase;">${m.label}</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Tags completos
  const allTags = project.tags.map(t => `
    <span class="skill-tag">${t}</span>
  `).join("");

  // Links y descargas directas
  let linksHtml = "";
  if (project.links && project.links.length > 0) {
    linksHtml = `
      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--border-color);">
        <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 14px;">Enlaces y Recursos Disponibles</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          ${project.links.map(l => `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 10px 20px; font-size: 0.88rem;">
              ${getIconSvg(l.icon)}
              <span>${l.label}</span>
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }

  modalBody.innerHTML = `
    <div style="margin-bottom: 20px;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--cyan-accent); text-transform: uppercase;">${project.categoryLabel} // ${project.institution}</span>
        <span class="font-mono" style="font-size: 0.85rem; color: var(--emerald-accent); background: rgba(16,185,129,0.1); padding: 4px 10px; border-radius: 4px;">● ${project.status}</span>
      </div>
      <h2 style="font-size: 1.7rem; font-weight: 800; color: #fff; margin-bottom: 12px;">${project.title}</h2>
      <p style="font-size: 1.02rem; color: var(--text-muted); line-height: 1.7;">${project.description}</p>
    </div>

    ${metricsGrid}

    <div style="margin: 24px 0;">
      <h4 style="font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 14px;">Hitos Técnicos y Arquitectura de Ingeniería</h4>
      <ul style="list-style: none; padding-left: 0;">
        ${highlightsHtml}
      </ul>
    </div>

    <div style="margin: 24px 0;">
      <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 12px;">Tecnologías, Protocolos y Herramientas</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${allTags}
      </div>
    </div>

    ${linksHtml}
  `;

  modal.classList.add("open");
};

/* ==============================================================================
   4. GENERADOR Y PREVIEWER DE NUEVOS PROYECTOS (PREPARADO PARA RECIBIR MÁS)
   ============================================================================== */
function initNewProjectGenerator() {
  const triggerBtn = document.getElementById("open-generator-btn");
  const modal = document.getElementById("generator-modal");
  const closeBtn = document.getElementById("generator-close-btn");
  const form = document.getElementById("new-project-form");
  const codeOutput = document.getElementById("generated-code-output");
  const copyBtn = document.getElementById("copy-code-btn");
  const testAddBtn = document.getElementById("test-add-live-btn");

  if (!triggerBtn || !modal) return;

  triggerBtn.addEventListener("click", () => {
    modal.classList.add("open");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  // Generar código al escribir
  function updateGeneratedCode() {
    const title = document.getElementById("np-title").value.trim() || "Nuevo Proyecto de Ingeniería";
    const category = document.getElementById("np-category").value;
    const year = document.getElementById("np-year").value.trim() || "2026";
    const institution = document.getElementById("np-institution").value.trim() || "Proyecto Personal";
    const summary = document.getElementById("np-summary").value.trim() || "Descripción resumida del proyecto.";
    const tagsRaw = document.getElementById("np-tags").value.trim() || "C++, IoT, Python";
    const tags = tagsRaw.split(",").map(t => t.trim()).filter(Boolean);

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newObj = {
      id: slug || "nuevo-proyecto",
      title: title,
      category: category,
      categoryLabel: getCategoryLabel(category),
      year: year,
      institution: institution,
      status: "Activo / En Producción",
      featured: false,
      badge: "NUEVO PROYECTO",
      summary: summary,
      description: summary,
      highlights: [
        "Implementación técnica principal y arquitectura de solución.",
        "Validación experimental y pruebas de rendimiento en condiciones reales."
      ],
      tags: tags,
      metrics: [
        { label: "Estado", value: "Validado" },
        { label: "Versión", value: "v1.0" }
      ],
      image: "assets/images/expendex_banner.png",
      links: [
        { label: "Ver Código", icon: "code", url: "#" }
      ]
    };

    const codeStr = JSON.stringify(newObj, null, 2);
    codeOutput.textContent = codeStr;
    return newObj;
  }

  form.addEventListener("input", updateGeneratedCode);
  updateGeneratedCode();

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const code = codeOutput.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = "✅ ¡Código Copiado al Portapapeles!";
        setTimeout(() => {
          copyBtn.textContent = "📋 Copiar Código para data/projects.js";
        }, 2500);
      });
    });
  }

  if (testAddBtn) {
    testAddBtn.addEventListener("click", () => {
      const newObj = updateGeneratedCode();
      window.PORTFOLIO_PROJECTS.unshift(newObj);
      renderProjects(currentCategory);
      modal.classList.remove("open");
      
      // Scroll hacia la sección de proyectos
      document.getElementById("proyectos").scrollIntoView({ behavior: "smooth" });

      alert(`🎉 ¡Proyecto "${newObj.title}" añadido exitosamente a la vista activa del portafolio!\n\nPara que persista permanentemente, copia el código generado y pégalo dentro de "data/projects.js".`);
    });
  }
}

function getCategoryLabel(cat) {
  switch (cat) {
    case "mecatronica": return "Mecatrónica & Gemelo Digital IoT";
    case "software": return "Desarrollo de Software & Apps";
    case "ia": return "Inteligencia Artificial & Automatización OS";
    case "sistemas": return "Sistemas Embebidos & Bajo Nivel";
    default: return "Ingeniería General";
  }
}

/* ==============================================================================
   5. FORMULARIO DE CONTACTO DIRECTO
   ============================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    const mailtoUrl = `mailto:mujica360@gmail.com?subject=${encodeURIComponent(`[Contacto Portafolio] ${subject}`)}&body=${encodeURIComponent(`Hola Samuel,\n\nMi nombre es: ${name} (${email})\n\nMensaje:\n${message}\n\n---\nEnviado desde el Portafolio Web`)}`;
    
    window.location.href = mailtoUrl;

    const alertBox = document.getElementById("contact-alert");
    if (alertBox) {
      alertBox.style.display = "block";
      alertBox.textContent = "Abriendo tu cliente de correo para enviar el mensaje directo a Samuel (mujica360@gmail.com)...";
      setTimeout(() => {
        alertBox.style.display = "none";
      }, 5000);
    }
  });
}

/* ==============================================================================
   6. SCROLL SPY (ACTUALIZA ENLACE ACTIVO SEGÚN LA SECCIÓN VISIBLE)
   ============================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==============================================================================
   7. HELPER: ICONOS SVG VECTORIALES
   ============================================================================== */
function getIconSvg(type) {
  switch (type) {
    case "globe":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    case "download":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>`;
    case "windows":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5.5L10 4.5V11.5H3V5.5ZM11 4.3L21 3V11.5H11V4.3ZM3 12.5H10V19.5L3 18.5V12.5ZM11 12.5H21V21L11 19.7V12.5Z"/></svg>`;
    case "code":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    case "terminal":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`;
    case "cpu":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>`;
    case "book":
    case "file-text":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
    case "user-check":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>`;
    case "server":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`;
    case "git-pull-request":
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`;
    default:
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  }
}

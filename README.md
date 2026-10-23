# 🚀 Portafolio Web Profesional — Samuel Tovar Mujica

> **Ingeniero en Electrónica y Automatización | Sistemas Embebidos, CAD 3D & IoT**  
> FIME — Universidad Autónoma de Nuevo León (UANL) | Monterrey, N.L., México

Este portafolio web fue diseñado e implementado siguiendo las directrices profesionales y buenas prácticas de los videos de referencia:
1. **MZCode01 (`sR-3QKoKs2k`)**: Arquitectura web responsiva moderna, interfaz *dark modern / cyber-engineering* con acentos de color neón, componentes *glassmorphism*, barra de navegación adaptativa móvil y microinteracciones fluidas con HTML5, CSS3 y JavaScript puro.
2. **MoureDev (`oYBC7r5oSzk` & `MGnK-Gv1av8` - *Crea tu PORTAFOLIO y consigue trabajo como PROGRAMADOR*)**:
   - **Propósito Inmediato:** Claridad en los primeros 5 segundos sobre quién es Samuel, su especialidad técnica real y canales de contacto directos.
   - **Proyectos de Ingeniería Diferenciales:** Sustitución de proyectos de tutoriales repetitivos por proyectos reales y tangibles de ingeniería (ExpendeX con PCB 6x6 MOSFET y gemelo digital en Fusion 360, suite de tarifas eléctricas CFE multiplataforma en APK y EXE, asistente de voz y automatización Win32 JARVIS, etc.).
   - **Facilidad de Contacto y Descarga de CV:** Botones de descarga directa de CV en PDF accesibles desde el primer vistazo.
   - **Arquitectura Escalable:** Base de datos de proyectos desacoplada (`data/projects.js` y `data/projects.json`), preparada para recibir nuevos proyectos sin modificar la estructura del maquetado HTML.

---

## 📂 Estructura del Proyecto

```text
Portafolio_Samuel_Tovar/
├── index.html                   # Maquetado semántico, accesible (A11y) y estructurado
├── styles.css                   # Sistema de diseño responsivo y efectos visuales
├── app.js                       # Renderizado reactivo, filtros, modal técnico y lógica interactiva
├── data/
│   ├── projects.js              # Base de datos modular de proyectos (¡Fácil de editar y ampliar!)
│   └── projects.json            # Representación estándar en JSON
├── assets/
│   ├── images/
│   │   ├── samuel_avatar.png    # Fotografía de perfil de Samuel extraída en alta resolución del CV
│   │   ├── expendex_banner.png  # Banner técnico de ExpendeX
│   │   ├── cfe_banner.png       # Banner de AI Medidor Pro / Calculadora CFE
│   │   ├── jarvis_banner.png    # Banner de J.A.R.V.I.S. HUD
│   │   ├── clinica_coba_banner.png # Banner de Clínica Dental Cobá MTY
│   │   ├── aura_banner.png      # Banner de Aura PC Controller
│   │   └── switch_banner.png    # Banner de Sistemas y Mente Colmena
│   └── docs/
│       └── Samuel_Tovar_Mujica_CV_Ingenieria_2026.pdf # CV Oficial en PDF
└── README.md                    # Documentación del proyecto
```

---

## 🛠️ ¿Cómo Añadir Nuevos Proyectos? (Arquitectura Escalable)

El portafolio está **100% preparado para recibir más proyectos**. Tienes dos métodos sencillos:

### Método 1: Mediante el Asistente Interactivo en la Web
1. Abre `index.html` en tu navegador.
2. Desplázate a la sección **Proyectos**.
3. Haz clic en el botón **"➕ Añadir Nuevo Proyecto (Generador Interactivo)"**.
4. Rellena los campos y haz clic en **"🚀 Añadir y Probar en la Vista Actual"** para ver cómo queda en tiempo real sin recargar.
5. Haz clic en **"📋 Copiar Código"** y pégalo en `data/projects.js`.

### Método 2: Editando Directamente `data/projects.js`
Abre el archivo `data/projects.js` con cualquier editor de texto o IDE. Copia y pega esta plantilla al inicio del arreglo `PORTFOLIO_PROJECTS`:

```javascript
{
  id: "mi-nuevo-proyecto",
  title: "Nombre del Proyecto",
  category: "mecatronica", // 'mecatronica' | 'software' | 'ia' | 'sistemas'
  categoryLabel: "Categoría Descriptiva",
  year: "2026",
  institution: "FIME - UANL",
  status: "Completado / En Producción",
  featured: true,
  badge: "NUEVO RETO RESUELTO",
  summary: "Resumen claro de 2 o 3 líneas sobre qué hace el proyecto y el valor que aporta.",
  description: "Descripción técnica detallada que profundiza en los retos de ingeniería...",
  highlights: [
    "Hito técnico o solución implementada número 1.",
    "Hito técnico o medición empírica número 2.",
    "Resultados de validación y desempeño."
  ],
  tags: ["C++", "ESP32", "EasyEDA", "Python", "Fusion 360"],
  metrics: [
    { label: "Métrica 1", value: "Valor 1" },
    { label: "Métrica 2", value: "Valor 2" }
  ],
  image: "assets/images/nombre_imagen.png",
  links: [
    { label: "Ver Demo", icon: "globe", url: "https://tudemo.com" },
    { label: "Repositorio", icon: "code", url: "https://github.com/tu-usuario/repo" }
  ]
}
```

Al guardar el archivo y refrescar el navegador, el nuevo proyecto aparecerá de inmediato con sus filtros, tags y ventana modal técnica.

---

## 🚀 Cómo Visualizar el Portafolio

No se requiere instalar Node.js ni configurar servidores web externos para probarlo. Puedes abrirlo directamente con doble clic:

- **Apertura Directa:** Haz doble clic sobre `index.html` en tu explorador de archivos de Windows.
- **Servidor Local (Opcional):**
  ```powershell
  cd "C:\Users\SAmue\Desktop\Portafolio_Samuel_Tovar"
  python -m http.server 8080
  ```
  Y navega a `http://localhost:8080`.

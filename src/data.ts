// Todo el texto del CV vive aquí: para cambiar algo, edita este archivo.

export const perfil = {
  nombre: "Fernando Carstens",
  cargo: "Administrador de Sistemas",
  lugar: "Sevilla, España",
  email: "fercarstens7@gmail.com",
  linkedin: "https://linkedin.com/in/fercarstens",
  github: "https://github.com/fercarstens",
  telegram: "https://t.me/FerC1414",
  resumen:
    "Ingeniero de Sistemas. Mantengo en marcha la infraestructura de una empresa: servidores, identidades, dispositivos y seguridad. Fuera del horario, desarrollo herramientas propias que resuelven problemas reales de mi familia, mi iglesia y mi agencia.",
}

export type Area = { titulo: string; texto: string; items: string[]; icono: "nube" | "servidor" | "escudo" | "equipo" }

export const areas: Area[] = [
  {
    titulo: "Microsoft 365 e identidad",
    icono: "nube",
    texto: "Administración del tenant de Microsoft 365: usuarios, licencias, grupos y acceso. Identidades y acceso condicional en Entra ID, y recursos en Azure.",
    items: ["Tenant M365", "Entra ID", "Azure", "Acceso condicional"],
  },
  {
    titulo: "Dispositivos",
    icono: "equipo",
    texto: "Alta, configuración y cumplimiento de equipos con Intune. Inventario, parches y soporte remoto con Panda Systems Management.",
    items: ["Intune", "Panda Systems Management", "Parches", "Soporte remoto"],
  },
  {
    titulo: "Seguridad",
    icono: "escudo",
    texto: "Firewalls WatchGuard: reglas, VPN y segmentación. Protección de endpoints con WatchGuard EPDR y Panda EPDR: políticas, alertas e incidentes.",
    items: ["Firewalls WatchGuard", "WatchGuard EPDR", "Panda EPDR", "VPN"],
  },
  {
    titulo: "Servidores",
    icono: "servidor",
    texto: "Servidores Windows y Linux, copias de seguridad y monitorización. En casa llevo mi propia VPS con Docker, proxy inverso y red privada.",
    items: ["Windows Server", "Linux", "Docker", "Backups"],
  },
]

export type Proyecto = {
  nombre: string
  texto: string
  stack: string[]
  estado: "En producción" | "Uso interno" | "Prototipo" | "En desarrollo" | "Código abierto"
  enlace?: { texto: string; url: string }
  ancho?: boolean
  apps?: { nombre: string; texto: string; url?: string }[]
}

export const proyectos: Proyecto[] = [
  {
    nombre: "UtiliBot",
    estado: "En producción",
    ancho: true,
    texto:
      "Mi navaja suiza en Telegram. Convierte PDF e imágenes, baja contenido de YouTube y vigila la VPS con órdenes de solo lectura (/check, /docker, /backups, /ports). Cada noche cifra la copia de todas mis apps y me la manda por Telegram.",
    stack: ["Python", "python-telegram-bot", "systemd", "Ollama"],
  },
  {
    nombre: "Traductor simultáneo",
    estado: "En producción",
    texto:
      "Pantalla de subtítulos en vivo inglés ↔ español para reuniones familiares bilingües. Detecta el idioma solo y traduce cada frase al momento.",
    stack: ["Node", "Soniox", "Docker"],
  },
  {
    nombre: "Finanzas Rose Level",
    estado: "Uso interno",
    texto:
      "Panel financiero de la agencia: lee los extractos PDF de cinco bancos, los categoriza y concilia. Login con Google y copias cifradas cada noche.",
    stack: ["FastAPI", "React", "SQLite", "PWA"],
  },
  {
    nombre: "Apps para IEB Sevilla",
    estado: "En desarrollo",
    ancho: true,
    texto: "Herramientas para la iglesia, pensadas para gente que no es técnica.",
    stack: ["Flask", "Django", "Streamlit", "SQLite FTS5"],
    apps: [
      { nombre: "Buscador de predicaciones", texto: "Encuentra qué se dijo y en qué minuto, y lleva la cuenta de los momentos usados en reels." },
      { nombre: "SIGI", texto: "Padrón de miembros y actas con acuerdos, PDF del acta y asistencia desde el móvil." },
      { nombre: "Gestión de PGMs", texto: "Grupos en casas con mapa, roles y solicitudes para unirse.", url: "https://github.com/fercarstens/MVP_PGM" },
    ],
  },
  {
    nombre: "Mi VPS",
    estado: "En producción",
    texto:
      "Servidor ARM en Oracle Cloud donde vive todo lo anterior: Docker, Caddy con HTTPS, Cloudflare, Tailscale como VPN y nodo de salida, y copias cifradas fuera del servidor.",
    stack: ["Linux", "Docker", "Caddy", "Tailscale"],
  },
  {
    nombre: "Nido",
    estado: "Uso interno",
    texto: "Tareas de casa con agentes de IA que corren en local, sin pagar ninguna API.",
    stack: ["FastAPI", "React", "Ollama"],
  },
  {
    nombre: "Launcher para la tele",
    estado: "En desarrollo",
    texto: "Pantalla de inicio de Google TV con una foto familiar en capas que se mueve con el mando.",
    stack: ["Kotlin", "Compose for TV"],
  },
]

export const datosIA = [
  { nombre: "Recomendador de libros (RSBooks)", texto: "Sugiere lecturas con embeddings semánticos.", url: "https://github.com/fercarstens/RSBooks" },
  { nombre: "Predicción de victorias en League of Legends", texto: "Random Forest con los 10 primeros minutos de partida: más del 75 % de acierto." },
  { nombre: "Clusterización de jugadores profesionales", texto: "K-Means: cinco estilos de juego." },
  { nombre: "Extractos bancarios a dashboard", texto: "PDF a panel financiero automático. Fue el germen de Finanzas Rose Level." },
  { nombre: "Clasificación de mariposas", texto: "Red convolucional con data augmentation: más del 85 % de acierto." },
  { nombre: "Detección de insectos", texto: "Sensores Arduino de sonido y movimiento + modelo de clasificación." },
]

export const stack: { grupo: string; items: string[] }[] = [
  { grupo: "Sistemas", items: ["Microsoft 365", "Entra ID", "Intune", "Azure", "Windows Server", "Linux", "Docker", "Tailscale", "Cloudflare"] },
  { grupo: "Seguridad", items: ["WatchGuard Firebox", "WatchGuard EPDR", "Panda EPDR", "Panda Systems Management"] },
  { grupo: "Desarrollo", items: ["Python", "SQL", "FastAPI", "Flask", "Django", "React", "Node", "Git"] },
  { grupo: "Datos e IA", items: ["Pandas", "scikit-learn", "TensorFlow", "Power BI", "Embeddings", "Ollama"] },
]

export const formacion = [
  { fecha: "2024 – 2025", titulo: "Máster en Big Data y Business Intelligence", lugar: "CEI Sevilla", texto: "Machine learning, análisis de datos masivos y visualización." },
  { fecha: "2005 – 2010", titulo: "Ingeniería de Sistemas", lugar: "Venezuela", texto: "Programación, bases de datos y análisis de sistemas." },
]

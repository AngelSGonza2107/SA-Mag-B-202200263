export type NewsArticle = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  summary: string;
  content: string[];
  aiTool: string;
  featured?: boolean;
};

export const news: NewsArticle[] = [
  {
    slug: "gta-6-un-mundo-que-reacciona",
    title: "GTA 6 y la promesa de un mundo que reacciona a cada decisión",
    date: "2026-08-08",
    category: "Lanzamientos",
    image: "/images/gta-6.png",
    summary:
      "La próxima gran ciudad abierta pone el foco en las historias emergentes, la vida urbana y una experiencia diseñada para sorprender en cada recorrido.",
    content: [
      "La expectativa alrededor de GTA 6 no nace solamente del tamaño de su mapa. El verdadero atractivo está en la posibilidad de recorrer una ciudad que parezca tener memoria: peatones con rutinas, barrios con personalidades distintas y situaciones que cambian según la hora o las decisiones del jugador.",
      "Un mundo abierto convincente no necesita llenar cada esquina de iconos. Necesita provocar curiosidad. Una conversación escuchada al pasar, un negocio que cambia al caer la noche o una tormenta que transforma el tráfico pueden convertir un trayecto cotidiano en una historia que el jugador sienta como propia.",
      "El reto será equilibrar ese nivel de detalle con una narrativa clara. Si la tecnología, las misiones y los personajes trabajan en conjunto, GTA 6 puede demostrar que la nueva generación no se mide solo en resolución, sino en la capacidad de crear lugares digitales creíbles.",
    ],
    aiTool: "ChatGPT de OpenAI",
    featured: true,
  },
  {
    slug: "reinos-fragmentados-aventura",
    title:
      "Reinos Fragmentados convierte la exploración en su mejor recompensa",
    date: "2026-08-06",
    category: "Aventura",
    image: "/images/reinos.png",
    summary:
      "Ruinas suspendidas, rutas secretas y un sistema de brújula mágica dan forma a una aventura fantástica que confía en la curiosidad del jugador.",
    content: [
      "Reinos Fragmentados imagina un territorio en el que antiguas ciudades flotan sobre valles cubiertos por vegetación. La misión principal guía el viaje, pero son los pequeños desvíos los que explican qué ocurrió con la civilización que habitó sus torres.",
      "La brújula del protagonista no marca objetivos exactos. Reacciona a sonidos, cambios de luz y estructuras cercanas, de modo que cada hallazgo exige observar el entorno. Este enfoque evita que la exploración se convierta en una lista de tareas.",
      "Con una dirección artística luminosa y combates breves, la propuesta busca que descubrir una nueva ruta sea tan satisfactorio como superar a un enemigo.",
    ],
    aiTool: "ChatGPT de OpenAI",
  },
  {
    slug: "arena-nexus-final-esports",
    title:
      "Arena Nexus reúne estrategia y espectáculo en su final internacional",
    date: "2026-08-04",
    category: "Esports",
    image: "/images/esports.png",
    summary:
      "La competencia cerró su temporada con partidas ajustadas y una transmisión pensada para que las nuevas audiencias entiendan cada jugada.",
    content: [
      "La final de Arena Nexus apostó por algo más que luces y un gran escenario. Antes de cada partida, la transmisión explicó las decisiones tácticas de los equipos con repeticiones sencillas y mapas que mostraban el control del terreno.",
      "Ese esfuerzo hizo que las rondas decisivas fueran fáciles de seguir incluso para quienes no conocían todos los personajes. La serie se definió por la coordinación: ningún movimiento espectacular tuvo valor sin la información compartida por el resto del equipo.",
      "El resultado fue una celebración competitiva accesible y emocionante, una buena señal para un circuito que quiere crecer sin perder profundidad.",
    ],
    aiTool: "ChatGPT de OpenAI",
  },
  {
    slug: "brote-estelar-indie",
    title:
      "Brote Estelar demuestra que una historia pequeña puede llegar muy lejos",
    date: "2026-08-01",
    category: "Indie",
    image: "/images/indie.png",
    summary:
      "Un robot jardinero y una semilla luminosa protagonizan una aventura tranquila sobre cuidado, paciencia y segundas oportunidades.",
    content: [
      "En Brote Estelar no hay una cuenta regresiva ni un enemigo que derrotar. El jugador controla a un pequeño robot encargado de recuperar un invernadero abandonado en una luna distante.",
      "Cada planta modifica el espacio: algunas producen luz, otras atraen criaturas y unas pocas revelan mensajes de la antigua tripulación. Las tareas sencillas de regar y ordenar se convierten así en una forma de reconstruir la historia del lugar.",
      "Su ritmo calmado y su expresiva animación recuerdan que los videojuegos también pueden crear emoción mediante gestos mínimos y objetivos cotidianos.",
    ],
    aiTool: "ChatGPT de OpenAI",
  },
  {
    slug: "consola-portatil-modular",
    title: "La consola portátil modular busca adaptarse a cada forma de jugar",
    date: "2026-07-29",
    category: "Tecnología",
    image: "/images/portatil.png",
    summary:
      "Un concepto de hardware combina controles intercambiables, base de escritorio y perfiles de energía para unir movilidad y comodidad.",
    content: [
      "El nuevo concepto de consola portátil modular parte de una pregunta sencilla: ¿por qué usar la misma distribución de botones para todos los géneros? Sus controles laterales pueden intercambiarse para priorizar precisión, accesibilidad o autonomía.",
      "La base no pretende convertirla en una computadora distinta. Funciona como estación de carga, salida de video y punto de conexión para accesorios, manteniendo la misma biblioteca al cambiar de pantalla.",
      "La idea todavía depende de un buen equilibrio entre peso, temperatura y duración de batería, pero muestra una dirección interesante para dispositivos que acompañan al jugador durante todo el día.",
    ],
    aiTool: "ChatGPT de OpenAI",
  },
  {
    slug: "senal-roja-cooperativo",
    title: "Señal Roja hace de la comunicación la herramienta más importante",
    date: "2026-07-26",
    category: "Cooperativo",
    image: "/images/cooperativo.png",
    summary:
      "Tres exploradores deben reparar una estación en plena tormenta marciana, compartiendo recursos e información para sobrevivir.",
    content: [
      "Señal Roja coloca a tres jugadores frente a una estación científica dañada. Cada integrante recibe información diferente: uno interpreta el clima, otro controla la energía y el tercero puede reparar los módulos exteriores.",
      "Nadie posee la solución completa. Para restablecer la antena, el equipo debe describir símbolos, coordinar rutas y decidir cuándo vale la pena arriesgar recursos. La tensión surge de conversar con claridad, no de disparar más rápido.",
      "Las partidas son cortas y los eventos cambian de posición, por lo que aprender a colaborar resulta más importante que memorizar un único procedimiento.",
    ],
    aiTool: "ChatGPT de OpenAI",
  },
];

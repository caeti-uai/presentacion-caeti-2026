'use client';

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Database,
  FileText,
  GraduationCap,
  Maximize2,
  MessageSquareMore,
  Network,
  Play,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Line = 'Automatización y Robótica' | 'Ingeniería de Software' | 'Sociedad y Educación';

type Project = {
  code: string;
  title: string;
  director: string;
  researchers: string[];
  line: Line;
  relation: string;
  image?: string;
};

const projects: Project[] = [
  {
    code: 'TI/22/116',
    title: 'Tecnología Arduino aplicada a requerimientos sociales',
    director: 'Pedro López',
    researchers: ['Carlos Niell', 'Fernando Armas'],
    line: 'Automatización y Robótica',
    relation: 'Conecta dispositivos y necesidades sociales con el entorno experimental.',
    image: '/assets/researchers/pedro-lopez.png',
  },
  {
    code: 'TI/26/140',
    title: 'Arquitectura de Software para la Transformación hacia Sistemas Adaptativos Inteligentes',
    director: 'Alejandro Sartorio',
    researchers: ['Silvia Poncio', 'Soledad Ayala', 'Alejandro Hernández', 'María Andrea Guisen'],
    line: 'Ingeniería de Software',
    relation: 'Proyecto troncal: aporta el método incremental que articula capacidades y sistemas.',
    image: '/assets/researchers/alejandro-sartorio.png',
  },
  {
    code: 'TI/22/113',
    title: 'Blockchain como impulso para la transformación digital de las organizaciones',
    director: 'Alejandro Hernández',
    researchers: ['Pablo Audoglio', 'Leonardo Prósperi', 'Claudia Pons', 'Jorge Kamlofsky'],
    line: 'Ingeniería de Software',
    relation: 'Explora trazabilidad y confianza para procesos distribuidos.',
    image: '/assets/researchers/alejandro-hernandez.png',
  },
  {
    code: 'TI/22/117',
    title: 'Hojas de rutas de aprendizaje aplicadas al desarrollo de software',
    director: 'Alejandro Sartorio',
    researchers: ['Matías Banega', 'Sebastián Velázquez', 'Carlos Neil', 'Marcelo De Vincenzi Zemborain'],
    line: 'Ingeniería de Software',
    relation: 'Organiza actividades formativas y su seguimiento dentro de la plataforma.',
    image: '/assets/researchers/alejandro-sartorio.png',
  },
  {
    code: 'TI/20/114',
    title: 'Ciberseguridad, conceptos y aplicaciones',
    director: 'Santiago Roatta',
    researchers: ['Pedro López', 'María Eugenia Casco'],
    line: 'Ingeniería de Software',
    relation: 'Protege la infraestructura, las identidades y los intercambios del entorno.',
  },
  {
    code: 'TI/26/139',
    title: 'Datawarehouse e IA para indicadores de soft skills',
    director: 'Silvia Poncio',
    researchers: ['Cintia Cuña', 'Alejandro Sartorio'],
    line: 'Sociedad y Educación',
    relation: 'Convierte actividad en indicadores para formación y toma de decisiones.',
    image: '/assets/researchers/silvia-poncio.png',
  },
  {
    code: 'TI/25/128',
    title: 'Taxonomía de Prompting para la Accesibilidad en Sistemas de IA Conversacional',
    director: 'María Andrea Guisen',
    researchers: ['Claudia Pons', 'Christian Parkinson', 'Alejandro Sartorio'],
    line: 'Sociedad y Educación',
    relation: 'Mejora la interacción accesible entre personas y agentes conversacionales.',
    image: '/assets/researchers/andrea-guisen.png',
  },
  {
    code: 'TI/25/129',
    title: 'Punto tecnológico para personas con síndrome de Rett y otras condiciones neurológicas',
    director: 'María Andrea Guisen',
    researchers: ['Claudia Pons', 'Christian Parkinson', 'Mauro Soto', 'Nadia Carolina Ksybala'],
    line: 'Sociedad y Educación',
    relation: 'Lleva capacidades de accesibilidad comunicacional a un dispositivo móvil.',
    image: '/assets/researchers/andrea-guisen.png',
  },
  {
    code: 'TI/22/111',
    title: 'Sitios web educativos e IA: análisis de estándares de usabilidad WCAG',
    director: 'Soledad Ayala',
    researchers: ['Alejandro Hernández', 'Juliana Carpinetti', 'Santiago Roatta'],
    line: 'Sociedad y Educación',
    relation: 'Evalúa las condiciones de uso y accesibilidad de plataformas educativas.',
    image: '/assets/researchers/soledad-ayala.png',
  },
];

const timings = ['0:45', '1:10', '1:35', '1:35', '1:25', '1:25', '1:15', '2:30', '1:20', '1:00'];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function CapturePlaceholder({ kind }: { kind: 'collab' | 'odoo' }) {
  const collab = kind === 'collab';
  return (
    <div className={`capture-frame ${collab ? 'capture-collab' : 'capture-odoo'}`}>
      <div className="capture-topbar">
        <span /><span /><span />
        <p>{collab ? 'Entorno colaborativo' : 'Plataforma de gestión'}</p>
      </div>
      <div className="capture-body">
        <div className="capture-icon">{collab ? <MessageSquareMore /> : <Database />}</div>
        <strong>Espacio reservado para captura</strong>
        <span>{collab ? 'Canales, conversaciones y agentes' : 'Formularios, flujos y trazabilidad'}</span>
      </div>
    </div>
  );
}

const managementShots = [
  { src: '/assets/screenshots/odoo-proyecto.png', label: 'Proyecto y actividad' },
  { src: '/assets/screenshots/odoo-objetivos.png', label: 'Objetivos y seguimiento' },
  { src: '/assets/screenshots/odoo-eventos.png', label: 'Eventos institucionales' },
];

function ScreenshotGallery() {
  const [active, setActive] = useState(0);
  return (
    <div className="screenshot-gallery">
      <div className="screenshot-stage">
        <Image src={managementShots[active].src} alt={`Captura de Odoo: ${managementShots[active].label}`} width={1904} height={518} priority />
      </div>
      <div className="screenshot-tabs" aria-label="Capturas de la plataforma de gestión">
        {managementShots.map((shot, index) => (
          <button key={shot.src} className={index === active ? 'active' : ''} onClick={() => setActive(index)}>
            <span>0{index + 1}</span>{shot.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectMap({ onSelect }: { onSelect: (project: Project) => void }) {
  const [filter, setFilter] = useState<Line | 'Todas'>('Todas');
  const visible = projects.filter((project) => filter === 'Todas' || project.line === filter);
  return (
    <div className="project-explorer">
      <div className="filters" aria-label="Filtrar proyectos por línea">
        {(['Todas', 'Automatización y Robótica', 'Ingeniería de Software', 'Sociedad y Educación'] as const).map((line) => (
          <button key={line} className={filter === line ? 'active' : ''} onClick={() => setFilter(line)}>{line}</button>
        ))}
      </div>
      <div className="project-orbit">
        <div className="orbit-core">
          <BrainCircuit />
          <span>TI/26/140</span>
          <strong>Arquitectura adaptativa</strong>
        </div>
        <div className="project-grid">
          {visible.map((project) => (
            <button
              key={project.code}
              className={`project-node ${project.code === 'TI/26/140' ? 'trunk' : ''}`}
              onClick={() => onSelect(project)}
            >
              <span>{project.code}</span>
              <strong>{project.title}</strong>
              <small>{project.line}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);

  const total = timings.length;
  const go = useCallback((next: number) => {
    setSelected(null);
    setSlide(Math.max(0, Math.min(total - 1, next)));
  }, [total]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') go(slide + 1);
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') go(slide - 1);
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, slide]);

  useEffect(() => {
    if (!startedAt) return;
    const interval = window.setInterval(() => setSeconds(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => window.clearInterval(interval);
  }, [startedAt]);

  const timer = useMemo(() => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`, [seconds]);

  const slides = [
    <section className="slide cover" key="cover">
      <div className="cover-mark"><Network /><span>CAETI · UAI</span></div>
      <div className="cover-copy">
        <Eyebrow>Proyecto de investigación TI/26/140</Eyebrow>
        <h1>Arquitectura de Software para la Transformación hacia Sistemas Adaptativos Inteligentes</h1>
        <p className="lead">Una plataforma experimental donde la arquitectura, las personas y los agentes convierten la investigación en actividad observable.</p>
      </div>
      <div className="cover-footer"><span>Alejandro Sartorio · Director CAETI</span><span>Proyectos de investigación 2026</span></div>
    </section>,

    <section className="slide question" key="question">
      <Eyebrow>El desafío</Eyebrow>
      <h2>¿Cómo incorporamos nuevas capacidades sin reemplazar los sistemas que ya sostienen a la institución?</h2>
      <div className="change-row">
        <div><span>01</span><strong>Nuevos actores</strong><p>Estudiantes, docentes, investigadores y agentes de software.</p></div>
        <div><span>02</span><strong>Nuevas tareas</strong><p>Investigación, gestión, formación y comunicación.</p></div>
        <div><span>03</span><strong>Nuevas condiciones</strong><p>Procesos que cambian mientras la institución continúa operando.</p></div>
      </div>
    </section>,

    <section className="slide trunk-slide" key="trunk">
      <div className="trunk-copy">
        <Eyebrow>El proyecto troncal</Eyebrow>
        <h2>TI/26/140 aporta un método de transformación incremental</h2>
        <p>La investigación trabaja sobre arquitecturas existentes para incorporar propiedades y capacidades adaptativas de manera sistemática, reproducible y verificable.</p>
        <div className="research-team"><span>Dirección</span><strong>Alejandro Sartorio</strong><span>Equipo</span><strong>Silvia Poncio · Soledad Ayala · Alejandro Hernández · María Andrea Guisen</strong></div>
      </div>
      <div className="incremental-visual" aria-label="Transformación incremental en cuatro etapas">
        {['Sistema consolidado', 'Capacidad observable', 'Regla de adaptación', 'Sistema adaptativo'].map((item, i) => (
          <div key={item} style={{ '--i': i } as React.CSSProperties}><span>0{i + 1}</span><strong>{item}</strong>{i < 3 && <ChevronRight />}</div>
        ))}
      </div>
    </section>,

    <section className="slide platform-slide" key="platform">
      <Eyebrow>La plataforma experimental</Eyebrow>
      <h2>Un entorno común para investigar mientras el trabajo sucede</h2>
      <div className="platform-diagram">
        <div className="platform-layer people-layer"><UsersRound /><strong>Personas</strong><span>proponen · deciden · validan</span></div>
        <div className="platform-layer agents-layer"><Bot /><strong>Agentes</strong><span>observan · asisten · actúan</span></div>
        <div className="platform-core"><Sparkles /><strong>Arquitectura adaptativa</strong><span>conecta actividad, contexto y capacidades</span></div>
        <div className="platform-base"><MessageSquareMore /><span>Espacio colaborativo</span><Database /><span>Gestión institucional</span></div>
      </div>
    </section>,

    <section className="slide evidence-slide" key="collab">
      <div className="evidence-copy"><Eyebrow>Capa 1 · Colaboración</Eyebrow><h2>Personas y agentes trabajan en los mismos canales</h2><p>Las conversaciones dejan de ser mensajes aislados. Se convierten en actividad contextualizada: pedidos, respuestas, decisiones, documentos y seguimiento.</p><ul><li><CircleUserRound /> Investigadores, docentes y alumnos</li><li><Bot /> Agentes especializados</li><li><MessageSquareMore /> Canales organizados por proyecto y actividad</li></ul></div>
      <CapturePlaceholder kind="collab" />
    </section>,

    <section className="slide evidence-slide reverse" key="odoo">
      <ScreenshotGallery />
      <div className="evidence-copy"><Eyebrow>Capa 2 · Gestión</Eyebrow><h2>La actividad se conecta con los procesos institucionales</h2><p>Odoo organiza la información y formaliza el trabajo que nace en el entorno colaborativo.</p><ul><li><FileText /> Documentos, avances y proyectos</li><li><UsersRound /> Investigadores internos y externos</li><li><CheckCircle2 /> Trámites, finanzas y procesos</li></ul></div>
    </section>,

    <section className="slide capabilities-slide" key="capabilities">
      <Eyebrow>Capacidades institucionales</Eyebrow>
      <h2>Una misma arquitectura sostiene actividades diferentes</h2>
      <div className="capability-flow">
        {[
          [FileText, 'Gestión documental'],
          [MessageSquareMore, 'Comunicación institucional'],
          [UsersRound, 'Gestión de investigadores'],
          [CheckCircle2, 'Tramitaciones y avances'],
          [Database, 'Procesos y finanzas'],
          [GraduationCap, 'Capacitación y entrenamiento'],
        ].map(([Icon, label], i) => {
          const IconComponent = Icon as typeof FileText;
          return <div key={label as string} style={{ '--i': i } as React.CSSProperties}><IconComponent /><span>{label as string}</span></div>;
        })}
      </div>
      <p className="capability-note">Cada nueva capacidad amplía el sistema sin interrumpir lo que ya funciona.</p>
    </section>,

    <section className="slide projects-slide" key="projects">
      <div className="projects-heading"><div><Eyebrow>El ecosistema CAETI</Eyebrow><h2>Nueve proyectos, tres líneas, un entorno compartido</h2></div><p>Seleccioná una línea y abrí cada proyecto para explorar su equipo y su relación con la plataforma.</p></div>
      <ProjectMap onSelect={setSelected} />
    </section>,

    <section className="slide participation-slide" key="participation">
      <Eyebrow>Investigación como experiencia formativa</Eyebrow>
      <h2>La plataforma también acompaña el ingreso y el crecimiento de nuevos investigadores</h2>
      <div className="journey">
        {[
          ['01', 'Convocatoria', 'Estudiantes y graduados descubren los proyectos.'],
          ['02', 'Capacitación', 'Formación institucional, metodológica y científica.'],
          ['03', 'Participación', 'Trabajo supervisado dentro de un proyecto y su célula tecnológica.'],
          ['04', 'Producción', 'Artículos, congresos y evidencias de competencias en investigación.'],
        ].map(([n, title, copy]) => <div key={n}><span>{n}</span><strong>{title}</strong><p>{copy}</p></div>)}
      </div>
    </section>,

    <section className="slide closing-slide" key="closing">
      <div className="closing-symbol"><BrainCircuit /><span className="pulse-ring" /></div>
      <Eyebrow>La idea central</Eyebrow>
      <h2>La plataforma convierte al Centro en un laboratorio vivo de sistemas adaptativos</h2>
      <p>Gestionamos la investigación y, al mismo tiempo, investigamos nuevas formas de gestionarla.</p>
      <div className="closing-tags"><span>9 proyectos</span><span>3 líneas</span><span>1 arquitectura compartida</span></div>
    </section>,
  ];

  const toggleFullscreen = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();

  return (
    <main className="presentation-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="presenter-header">
        <div className="brand"><Network /><span>CAETI</span><small>UAI</small></div>
        <div className="presenter-tools">
          <span className="slide-time"><Clock3 /> {timings[slide]}</span>
          <button className={`timer ${startedAt ? 'running' : ''}`} onClick={() => startedAt ? setStartedAt(null) : setStartedAt(Date.now() - seconds * 1000)} aria-label="Iniciar o pausar cronómetro"><Play /> {timer}</button>
          <button onClick={toggleFullscreen} aria-label="Pantalla completa"><Maximize2 /></button>
        </div>
      </header>

      <div className="stage" aria-live="polite">{slides[slide]}</div>

      <footer className="presenter-nav">
        <button onClick={() => go(slide - 1)} disabled={slide === 0} aria-label="Escena anterior"><ArrowLeft /></button>
        <div className="progress-dots">
          {slides.map((_, i) => <button key={i} className={i === slide ? 'active' : ''} onClick={() => go(i)} aria-label={`Ir a escena ${i + 1}`}><span>{i + 1}</span></button>)}
        </div>
        <div className="scene-count"><span>{String(slide + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}</div>
        <button onClick={() => go(slide + 1)} disabled={slide === total - 1} aria-label="Escena siguiente"><ArrowRight /></button>
      </footer>

      {selected && (
        <div className="modal-backdrop">
          <dialog open className="project-modal" aria-labelledby="project-title">
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar"><X /></button>
            <p className="eyebrow">{selected.code} · {selected.line}</p>
            {selected.image && <Image className="director-photo" src={selected.image} alt={`Retrato de ${selected.director}`} width={160} height={180} />}
            <h3 id="project-title">{selected.title}</h3>
            <div className="modal-data"><span>Dirección</span><strong>{selected.director}</strong><span>Equipo de investigación</span><strong>{selected.researchers.join(' · ')}</strong></div>
            <div className="relation"><Network /><p>{selected.relation}</p></div>
          </dialog>
        </div>
      )}
    </main>
  );
}

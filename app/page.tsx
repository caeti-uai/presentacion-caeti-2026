'use client';

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BrainCircuit,
  ChevronRight,
  Clock3,
  Database,
  ExternalLink,
  Maximize2,
  Network,
  Play,
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
  objective: string;
  publications: string[];
  image?: string;
  secondaryImage?: { src: string; name: string };
};

const projects: Project[] = [
  {
    code: 'TI/22/116',
    title: 'Tecnología Arduino aplicada a requerimientos sociales',
    director: 'Pedro López',
    researchers: ['Carlos Niell', 'Fernando Armas'],
    line: 'Automatización y Robótica',
    relation: 'Conecta dispositivos y necesidades sociales con el entorno experimental.',
    objective: 'Desarrollar robots orientados a necesidades de personas con capacidades diferentes.',
    publications: ['Passerini, S., Tabelione, F., & López, P. (2026). Desarrollo de un sistema cibernético de asistencia: prótesis robótica basada en visión computacional y arquitectura distribuida. WICC 2026.'],
    image: '/assets/researchers/pedro-lopez.png',
  },
  {
    code: 'TI/26/140',
    title: 'Arquitectura de Software para la Transformación hacia Sistemas Adaptativos Inteligentes',
    director: 'Alejandro Sartorio',
    researchers: ['Silvia Poncio', 'Soledad Ayala', 'Alejandro Hernández', 'María Andrea Guisen'],
    line: 'Ingeniería de Software',
    relation: 'Proyecto troncal: aporta el método incremental que articula capacidades y sistemas.',
    objective: 'Definir y validar un método sistemático, incremental y reproducible para transformar propiedades y capacidades en sistemas de gestión empresarial consolidados.',
    publications: [
      'Sartorio, A., Ayala, S., & Hernández, A. (2025). Diseño de aplicaciones e-learning adaptativas: superando limitaciones mediante arquitecturas modulares y escalables. JAIIO 2025.',
      'Sartorio, A., & Rossi, G. (2026). Transformación de LMS a ALS utilizando una arquitectura de referencia. WICC 2026.',
      'Sánchez, A., Luccini, E., Alderete, A., Musilli, S., & Sartorio, A. (2026). Odo-park: automatización de la gestión de estacionamientos por medio de computer vision y Odoo. WICC 2026.',
      'Sartorio, A., & Rossi, G. (2026). From Learning Management Systems to Adaptive Learning. WICC 2026.',
      'Guisen, M. A., Giorgi, L., Acosta, P., López Serra, L., Sartorio, A., & Pons, C. (2026). El prompt como unidad crítica de accesibilidad en la interacción con IA conversacional en educación superior. WICC 2026.',
      'Castellini, G., Avella, L., Villa, L., & Sartorio, A. (En prensa). Hojas de rutas de aprendizajes basadas en metodología ágil. CONAIISI.',
      'Samela, M., Zaninetti, C., Caliva, G., Figallo, G., Battaglia, N., Antonelli, L., & Sartorio, A. (2026). Enseñanza de Ingeniería de Requerimientos en la era de la IA generativa. WICC 2026.',
    ],
    image: '/assets/researchers/alejandro-sartorio.png',
  },
  {
    code: 'TI/22/113',
    title: 'Blockchain como impulso para la transformación digital de las organizaciones',
    director: 'Alejandro Hernández',
    researchers: ['Pablo Audoglio', 'Leonardo Prósperi', 'Claudia Pons', 'Jorge Kamlofsky'],
    line: 'Ingeniería de Software',
    relation: 'Explora trazabilidad y confianza para procesos distribuidos.',
    objective: 'Estudiar casos de uso de la tecnología blockchain y su aporte a la transformación digital de las organizaciones.',
    publications: [
      'Dángelo, V., López, P., & Hernández, A. (2025). Transferencias de conceptos básicos de programación de la escuela media a la universidad. Revista de Educación en Ingeniería.',
      'Jaime, F., Estelles, J. P., Lodato, M., Torassa Colombero, V., & Hernández, A. (2025). Modelos de micropagos descentralizados: una propuesta basada en blockchain para servicios digitales. CONAIISI 2025.',
      'Ayala, S., Sartorio, A., Hernández, A., Gaseli, J., Dip, M., & Durán, M. (2026). Inteligencia artificial generativa: relevamiento del estado del arte sobre transformaciones pedagógicas y plataformas educativas. WICC 2026.',
    ],
    image: '/assets/researchers/alejandro-hernandez.png',
  },
  {
    code: 'TI/22/117',
    title: 'Hojas de rutas de aprendizaje aplicadas al desarrollo de software',
    director: 'Alejandro Sartorio',
    researchers: ['Matías Banega', 'Sebastián Velázquez', 'Carlos Neil', 'Marcelo De Vincenzi Zemborain'],
    line: 'Ingeniería de Software',
    relation: 'Organiza actividades formativas y su seguimiento dentro de la plataforma.',
    objective: 'Crear un módulo tecnológico, metodológico y funcional para construir y utilizar hojas de rutas de actividades educativas aplicadas al desarrollo de software.',
    publications: ['Castellini, G., Avella, L., Villa, L., & Sartorio, A. (En prensa). Hojas de rutas de aprendizajes basadas en metodología ágil. CONAIISI.'],
    image: '/assets/researchers/alejandro-sartorio.png',
  },
  {
    code: 'TI/20/114',
    title: 'Ciberseguridad, conceptos y aplicaciones',
    director: 'Santiago Roatta',
    researchers: ['Pedro López', 'María Eugenia Casco'],
    line: 'Ingeniería de Software',
    relation: 'Protege la infraestructura, las identidades y los intercambios del entorno.',
    objective: 'Proteger la infraestructura de las redes informáticas y sus componentes mediante conceptos y aplicaciones de ciberseguridad.',
    publications: [
      'Roatta, S., Casco, M. E., & Torassa, V. (2025). Dockerización de servidores SCADA: ciberseguridad industrial. WICC.',
      'Torassa, A., Roatta, S., & Casco, M. E. (2025). Uso ético de los agentes de inteligencia artificial en la investigación académica. CACIC.',
      'Estelles, J., Roatta, S., & Casco, M. E. (2025). Seguridad en APIs: identificación y mitigación de vulnerabilidades críticas. CONAIISI.',
      'Casco, M. E., & Roatta, S. E. (2025). Management of non-custodian digital evidence: an ISO/IEC 27050 standards-based approach. Computer Science – CACIC, 404–416. Springer.',
      'Torassa, V., Casco, M. E., & Roatta, S. (2026). Go como lenguaje de diseño: reducción de complejidad accidental en sistemas concurrentes. WICC 2026.',
      'Casco, M. E., & Roatta, S. (2026). Programa de investigación, desarrollo y enseñanza de ciberseguridad en la UAI. WICC 2026.',
    ],
    image: '/assets/researchers/santiago-roatta.png',
    secondaryImage: { src: '/assets/researchers/maria-eugenia-casco.png', name: 'María Eugenia Casco' },
  },
  {
    code: 'TI/26/139',
    title: 'Datawarehouse e IA para indicadores de soft skills',
    director: 'Silvia Poncio',
    researchers: ['Cintia Cuña', 'Alejandro Sartorio'],
    line: 'Sociedad y Educación',
    relation: 'Convierte actividad en indicadores para formación y toma de decisiones.',
    objective: 'Diseñar, implementar y validar un datawarehouse con IA que permita diagnosticar y visualizar el desarrollo de soft skills mediante indicadores.',
    publications: [
      'Poncio, S., Cuña, C., Cardú, N., & Ruiz, G. (2025). Data Warehouse Soft Skills: modelo diagnóstico para la observación de la actitud empática. TEYET.',
      'Poncio, S., Cuña, C., Cardú, N., Ruiz, G., & Bressan, A. (2025). Inteligencia artificial en el modelo de competencias emprendedoras. AFIDE, Roma.',
      'Poncio, S., Cuña, C., Bressan, A., Cardú, N., & Ruiz, G. (2025). Data Warehouse Soft Skills: diagnóstico de la capacidad de cooperar con otros. IPCTIIC.',
      'Bressan, A., Cardú, N., Ruiz, G., Poncio, S., & Cuña, C. (2026). Modelo diagnóstico integral de competencias mediante Business Intelligence e inteligencia artificial. WICC 2026.',
    ],
    image: '/assets/researchers/silvia-poncio.png',
  },
  {
    code: 'TI/25/128',
    title: 'Taxonomía de Prompting para la Accesibilidad en Sistemas de IA Conversacional',
    director: 'María Andrea Guisen',
    researchers: ['Claudia Pons', 'Christian Parkinson', 'Alejandro Sartorio'],
    line: 'Sociedad y Educación',
    relation: 'Mejora la interacción accesible entre personas y agentes conversacionales.',
    objective: 'Desarrollar una taxonomía de estrategias de prompting para optimizar la accesibilidad en la interacción con IA conversacional en contextos académicos.',
    publications: [
      'Giorgi, L., Acosta, P., López Serra, L., & Guisen, M. A. (2025). Taxonomía de prompting para la optimización de la accesibilidad en sistemas de IA conversacional. CIITI TE.',
      'Giorgi, L., Acosta, P., López Serra, L., & Guisen, M. A. (2025). Hacia una taxonomía de prompting accesible en la educación superior. CIIAE.',
      'Acosta, P., López Serra, L., Giorgi, L., & Guisen, M. A. (2025). Taxonomía de prompts para optimizar la accesibilidad académica en sistemas de IA conversacional. Revista RAIA.',
      'Guisen, M. A., Giorgi, L. N., Acosta, P. E., López Serra, L., Sartorio, A., & Pons, C. (2026). El prompt como unidad crítica de accesibilidad en educación superior. WICC 2026.',
    ],
    image: '/assets/researchers/andrea-guisen.png',
  },
  {
    code: 'TI/25/129',
    title: 'Punto tecnológico para personas con síndrome de Rett y otras condiciones neurológicas',
    director: 'María Andrea Guisen',
    researchers: ['Claudia Pons', 'Christian Parkinson', 'Mauro Soto', 'Nadia Carolina Ksybala'],
    line: 'Sociedad y Educación',
    relation: 'Lleva capacidades de accesibilidad comunicacional a un dispositivo móvil.',
    objective: 'Desarrollar un punto tecnológico móvil con estrategias sustentables de accesibilidad comunicacional para personas con síndrome de Rett y otras condiciones neurológicas.',
    publications: [
      'Guisen, M. A., et al. (2025). Especialistas del CONICET lideran un proyecto para mejorar la accesibilidad comunicacional de personas con afecciones neurológicas. CONICET VocAr.',
      'Guisen, M. A., et al. (2025). Especialistas del CONICET participaron de la Hackaton ArcelorMittal Acindar. CONICET.',
      'Garay Angulo, O., Guisen, M. A., & Gutiérrez Rodríguez, V. (2025). Elaboración de textos y edición de publicaciones digitales accesibles. En Manual de accesibilidad digital. CLACSO.',
      'Guisen, M. A. (2025). The EntteR Project: women-led innovation in assistive technologies. LAWCC, CLEI.',
      'Guisen, M. A., Safir Vasquez Yrigoin, A., Capomasi, I., Banducci, M., López, P., Soto, M. A., & Ksybala, N. C. (2026). Punto tecnológico para estrategias de accesibilidad comunicacional. WICC 2026.',
      'Guisen, M. A., & Lavayen, M. V. (2026). Accesibilidad comunicacional: entre la ciencia y la experiencia. En Fonoaudiología Federal.',
    ],
    image: '/assets/researchers/andrea-guisen.png',
  },
  {
    code: 'TI/22/111',
    title: 'Sitios web educativos e IA: análisis de estándares de usabilidad WCAG',
    director: 'Soledad Ayala',
    researchers: ['Alejandro Hernández', 'Juliana Carpinetti', 'Santiago Roatta'],
    line: 'Sociedad y Educación',
    relation: 'Evalúa las condiciones de uso y accesibilidad de plataformas educativas.',
    objective: 'Analizar condiciones de usabilidad en plataformas educativas e identificar la aplicación de las Web Content Accessibility Guidelines.',
    publications: [
      'Ayala, S., Sartorio, A., Hernández, A., Gaseli, J., & Dip, M. (2025). Educación superior, plataformas e inteligencia artificial. SIDS, 54 JAIIO.',
      'Ayala, S., & Betta, L. (2025). Criterios pedagógicos de los materiales educativos digitales en el campus virtual UNRaf en tiempos híbridos. Jornadas de Investigación en Educación UNRaf–UNINOVE.',
      'Ayala, S., Sartorio, A., Hernández, A., Gaseli, J., Dip, M., & Durán, M. (2026). IA generativa: transformaciones pedagógicas y plataformas educativas. WICC 2026.',
      'Betta, L., & Ayala, S. (2025). Sentidos pedagógicos de los materiales educativos digitales en el campus virtual UNRaf. VI CAESCyT.',
      'Betta, L., Ayala, S., & Perren, G. (2025). Materiales educativos digitales en las aulas del campus virtual UNRaf. 10.º Seminario RUEDA.',
    ],
    image: '/assets/researchers/soledad-ayala.png',
  },
];

const timings = ['0:40', '1:15', '1:00', '1:25', '1:35', '1:35', '1:20', '2:30', '1:20'];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

const evidenceShots = [
  { src: '/assets/screenshots/odoo-objetivos.png', label: 'Objetivos y avance' },
  { src: '/assets/screenshots/odoo-eventos.png', label: 'Eventos institucionales' },
  { src: '/assets/screenshots/odoo-proyecto.png', label: 'Proyecto TI/26/140' },
  { src: '/assets/screenshots/canal-telegram.png', label: 'Interacción con agentes' },
  { src: '/assets/screenshots/gestion-control.png', label: 'Gestión y control' },
  { src: '/assets/screenshots/alineacion-caeti.png', label: 'Alineación estratégica' },
];

function EvidenceMosaic() {
  const [expanded, setExpanded] = useState<(typeof evidenceShots)[number] | null>(null);
  return (
    <>
      <div className="evidence-mosaic">
        {evidenceShots.map((item, index) => (
          <button key={item.src} onClick={() => setExpanded(item)}>
            <Image src={item.src} alt={item.label} width={1904} height={900} />
            <span>0{index + 1}</span><strong>{item.label}</strong>
          </button>
        ))}
      </div>
      {expanded && (
        <div className="image-lightbox">
          <dialog open aria-label={`Vista ampliada: ${expanded.label}`}>
            <button className="lightbox-close" onClick={() => setExpanded(null)} aria-label="Cerrar imagen"><X /></button>
            <Image src={expanded.src} alt={expanded.label} width={1904} height={1000} />
            <strong>{expanded.label}</strong>
          </dialog>
        </div>
      )}
    </>
  );
}

const hyperShots = [
  { src: '/assets/hiperproductividad/agentes-personales.png', label: 'Agentes personales' },
  { src: '/assets/hiperproductividad/agente-configuracion.png', label: 'Configuración' },
  { src: '/assets/hiperproductividad/swarms-equipos.png', label: 'Swarms' },
  { src: '/assets/hiperproductividad/canales-colaborativos.jpg', label: 'Canales colaborativos' },
  { src: '/assets/hiperproductividad/oficina-virtual.png', label: 'Oficina virtual' },
  { src: '/assets/hiperproductividad/cerebro-datos.png', label: 'Cerebro organizacional' },
  { src: '/assets/hiperproductividad/tablero-productividad.png', label: 'Tablero de productividad' },
  { src: '/assets/hiperproductividad/terminal-agentes.png', label: 'Motores de agentes' },
];

function HyperGallery() {
  const [active, setActive] = useState(3);
  const shot = hyperShots[active];
  return (
    <div className="hyper-gallery">
      <div className="hyper-main"><Image src={shot.src} alt={shot.label} width={1920} height={1080} /><strong>{shot.label}</strong></div>
      <div className="hyper-thumbs">
        {hyperShots.map((item, index) => (
          <button key={item.src} className={index === active ? 'active' : ''} onClick={() => setActive(index)}>{item.label}</button>
        ))}
      </div>
    </div>
  );
}

const closingVisions = [
  {
    label: 'El Centro que investigamos',
    detail: 'Nueve proyectos y tres líneas producen conocimiento desde problemas concretos.',
    image: '/assets/hiperproductividad/cerebro-datos.png',
    caption: 'Investigación conectada',
    copy: 'Equipos, proyectos y evidencia forman una memoria común que permite observar relaciones y orientar nuevas preguntas.',
  },
  {
    label: 'La plataforma que construimos',
    detail: 'Agentes, canales y Odoo sostienen colaboración, gestión y trazabilidad.',
    image: '/assets/hiperproductividad/canales-colaborativos.jpg',
    caption: 'Laboratorio en funcionamiento',
    copy: 'La propia gestión del Centro se convierte en un entorno experimental donde las capacidades se integran y validan.',
  },
  {
    label: 'La organización posible',
    detail: 'Cada ciclo aprende del anterior y amplía la capacidad institucional.',
    image: '/assets/hiperproductividad/oficina-virtual.png',
    caption: 'Sistema adaptativo inteligente',
    copy: 'La arquitectura conecta personas, agentes y procesos para alcanzar Hiper(n)productividad con supervisión humana.',
  },
];

function ClosingVision() {
  const [active, setActive] = useState(0);
  const vision = closingVisions[active];
  return (
    <section className="slide final-vision-slide">
      <Eyebrow>09 · El aterrizaje en el CAETI</Eyebrow>
      <h2 className="final-vision-title"><span>Arquitectura adaptativa para la</span><strong><span>HIPER</span><sup>N</sup><span>PRODUCTIVIDAD</span></strong></h2>
      <p className="final-vision-lead">De los proyectos de investigación a una capacidad institucional que aprende y evoluciona.</p>
      <div className="final-vision-stage">
        <div className="final-vision-tabs" role="tablist" aria-label="Perspectivas de cierre">
          {closingVisions.map((item, index) => (
            <button key={item.label} className={index === active ? 'active' : ''} role="tab" aria-selected={index === active} onClick={() => setActive(index)}>
              <b>0{index + 1}</b><span>{item.label}</span><small>{item.detail}</small>
            </button>
          ))}
        </div>
        <article className="final-vision-display" aria-live="polite">
          <Image key={vision.image} src={vision.image} alt={vision.caption} width={1920} height={1080} />
          <div><b>{vision.caption}</b><strong>{vision.copy}</strong></div>
        </article>
      </div>
      <p className="final-vision-feedback">Gestionamos la investigación y, al mismo tiempo, investigamos nuevas formas de gestionarla.</p>
    </section>
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
      <div className="cover-mark"><Network /><span>UAI · CAETI</span></div>
      <div className="cover-copy">
        <Eyebrow>Proyecto de investigación TI/26/140</Eyebrow>
        <h1>Arquitectura de Software para la Transformación hacia Sistemas Adaptativos Inteligentes</h1>
        <p className="lead">Una plataforma experimental donde la arquitectura, las personas y los agentes convierten la investigación en actividad observable.</p>
      </div>
      <div className="cover-footer"><span>Alejandro Sartorio · Director CAETI</span><span>Proyectos de investigación 2026</span></div>
    </section>,

    <section className="slide identity-slide" key="identity">
      <div className="identity-heading"><Eyebrow>Centro de Altos Estudios en Tecnología Informática</Eyebrow><h2>Investigación que conecta ciencia, formación y sociedad</h2></div>
      <div className="identity-grid">
        <article><span>Misión</span><p>Contribuir al desarrollo de las TIC mediante investigación básica y aplicada, formar recursos humanos de excelencia y transferir resultados hacia la industria y la sociedad.</p></article>
        <article><span>Visión</span><p>Abordar necesidades sociales relevantes y buscar soluciones tecnológicas con ciencia, técnica, pensamiento organizador y capacidad de innovación.</p></article>
      </div>
      <div className="research-lines">
        <strong>Líneas de investigación CAETI Rosario</strong>
        <div><span>Automatización y Robótica</span><span>Ingeniería de Software</span><span>Sociedad del Conocimiento y Tecnologías aplicadas a la Educación</span></div>
      </div>
      <a className="source-link" href="https://caeti.uai.edu.ar/" target="_blank" rel="noreferrer">Fuente institucional CAETI <ExternalLink /></a>

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
      <div className="cycle-collage" aria-label="Productividad que escala ciclo tras ciclo">
        <div className="collage-title"><span>Motor recursivo</span><strong>Productividad que escala ciclo tras ciclo</strong></div>
        <figure className="collage-card collage-agent"><Image src="/assets/hiperproductividad/agentes-personales.png" alt="Agentes personales" width={1669} height={1046} /><figcaption>Agente personal</figcaption></figure>
        <figure className="collage-card collage-swarm"><Image src="/assets/hiperproductividad/swarms-equipos.png" alt="Swarms de agentes" width={1153} height={940} /><figcaption>Swarm</figcaption></figure>
        <figure className="collage-card collage-channel"><Image src="/assets/hiperproductividad/canales-colaborativos.jpg" alt="Canales colaborativos" width={1500} height={749} /><figcaption>Canales</figcaption></figure>
        <figure className="collage-card collage-dashboard"><Image src="/assets/hiperproductividad/tablero-productividad.png" alt="Tablero de productividad" width={1910} height={907} /><figcaption>Aprendizaje y métricas</figcaption></figure>
        <div className="cycle-loop"><span>capacidad¹</span><ChevronRight /><span>capacidad²</span><ChevronRight /><span>capacidadⁿ</span></div>
      </div>
    </section>,

    <section className="slide merged-platform-slide" key="platform">
      <div className="merged-copy">
        <Eyebrow>Adaptación como Hiper(n)productividad</Eyebrow>
        <h2>Personas y agentes trabajan en los mismos canales</h2>
        <p>Cada ciclo conecta intención humana, agentes especializados, conversaciones contextualizadas y gestión institucional. El aprendizaje vuelve al sistema y amplía su capacidad.</p>
        <div className="merged-formula"><span>Humanos</span><strong>×</strong><span>Agentes</span><strong>×</strong><span>Canales</span><strong>×</strong><span>Odoo</span></div>
        <a className="concept-link" href="https://hiperprodu.asartorio.online/" target="_blank" rel="noreferrer">Explorar Hiper(n)productividad <ExternalLink /></a>
      </div>
      <div className="merged-visual">
        <Image src="/assets/screenshots/canal-telegram.png" alt="Interacción entre una persona y un agente CAETI" width={753} height={917} />
        <div><UsersRound /><span>intención</span><Bot /><span>amplificación</span><Database /><span>trazabilidad</span></div>
      </div>
    </section>,

    <section className="slide mosaic-slide" key="evidence-mosaic">
      <div className="mosaic-heading"><div><Eyebrow>Escena 6 · Evidencia operativa</Eyebrow><h2>La adaptación se observa en el trabajo real</h2></div><p>Todas las imágenes están visibles. Hacé clic en cualquiera para verla a pantalla ampliada.</p></div>
      <EvidenceMosaic />
    </section>,

    <section className="slide capabilities-slide" key="capabilities">
      <div className="hyper-heading"><div><Eyebrow>Los vectores de Hiper(n)productividad</Eyebrow><h2>La arquitectura toma forma en entornos reales</h2></div><p>Agentes, swarms, canales, oficinas virtuales, datos y motores de ejecución amplían la capacidad disponible.</p></div>
      <HyperGallery />
    </section>,

    <section className="slide projects-slide" key="projects">
      <div className="projects-heading"><div><Eyebrow>El ecosistema CAETI</Eyebrow><h2>Nueve proyectos, tres líneas, un entorno compartido</h2></div><p>Seleccioná una línea y abrí cada proyecto para explorar su equipo y su relación con la plataforma.</p></div>
      <ProjectMap onSelect={setSelected} />
    </section>,

    <ClosingVision key="closing-vision" />,
  ];

  const toggleFullscreen = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();

  return (
    <main className="presentation-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="presenter-header">
        <div className="brand"><Network /><span>UAI</span><small>CAETI</small></div>
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
            {(selected.image || selected.secondaryImage) && (
              <div className="project-portraits">
                {selected.image && <div><Image src={selected.image} alt={`Retrato de ${selected.director}`} width={160} height={180} /><span>{selected.director}</span></div>}
                {selected.secondaryImage && <div><Image src={selected.secondaryImage.src} alt={`Retrato de ${selected.secondaryImage.name}`} width={160} height={180} /><span>{selected.secondaryImage.name}</span></div>}
              </div>
            )}
            <h3 id="project-title">{selected.title}</h3>
            <div className="modal-data"><span>Dirección</span><strong>{selected.director}</strong><span>Equipo de investigación</span><strong>{selected.researchers.join(' · ')}</strong></div>
            <div className="relation"><Network /><p>{selected.relation}</p></div>
            <section className="project-objective"><span>Objetivo</span><p>{selected.objective}</p></section>
            <section className="publications"><span>Publicaciones</span><ol>{selected.publications.map((publication) => <li key={publication}>{publication}</li>)}</ol></section>
          </dialog>
        </div>
      )}
    </main>
  );
}

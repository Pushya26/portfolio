import { ArrowUpRight, BookOpen, Code2, Plane } from 'lucide-react';
import './_group.css';

const projects = [
  {
    number: '01',
    type: 'PAYMENT SYSTEM · IN PROGRESS',
    title: 'Reliable Payment Ledger',
    url: 'https://github.com/Pushya26/idempotent_payment_ledger_service',
    art: 'ledger',
    summary: 'A payment service designed to prevent repeat requests from charging someone twice.',
    highlights: [
      ['0', 'duplicate charges across 50 payment attempts sent at once'],
      ['11 tests', 'checked 3 service endpoints'],
      ['1:1', 'kept every completed payment balanced in the records'],
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    number: '02',
    type: 'RESEARCH TOOLS',
    title: 'Research Paper Search Engine',
    url: 'https://github.com/Pushya26/research_paper_search_engine',
    art: 'search',
    summary: 'A search tool that helps people find relevant research papers across a large library.',
    highlights: [
      ['5,838', 'research papers made searchable in one place'],
      ['292×', 'less work needed to rank search results'],
      ['~50 → 2 ms', 'cut repeat-search time from about 50 ms to 2 ms'],
    ],
    stack: ['Python', 'FastAPI', 'BM25', 'PageRank', 'WordNet', 'Semantic Scholar API'],
  },
  {
    number: '03',
    type: 'LIVE FLIGHT MAP',
    title: 'Real-Time Flight Tracking',
    url: 'https://github.com/Pushya26/flight_tracking_system',
    art: 'flight',
    summary: 'A live map of simulated flights that keeps aircraft locations current and checks for nearby planes.',
    highlights: [
      ['200', 'simulated flights shown on a live 3D map'],
      ['2 seconds', 'between map updates; nearby flights checked every 15 seconds'],
      ['17 tests', 'used to check the system; 10 tracked issues resolved'],
    ],
    stack: ['Python', 'FastAPI', 'WebSocket', 'PostgreSQL', 'Docker', 'React', 'CesiumJS'],
  },
];

export function PixelFriendly() {
  return (
    <main className="pixel-stage">
      <section className="section-wrap">
        <div className="pixel-section-heading">
          <div>
            <span className="pixel-kicker">PROJECT JOURNAL · 03 BUILDS</span>
            <h2>Projects that solve<br/>real problems.</h2>
          </div>
          <p>Clear outcomes first. The tools and technologies are here for the deeper technical read.</p>
        </div>
        <div className="pixel-card-list">
          {projects.map((project) => (
            <article className="pixel-project-card" key={project.number}>
              <div className="pixel-card-top">
                <div className="pixel-card-meta"><span>QUEST {project.number}</span><span className="pixel-card-type">{project.type}</span></div>
                <a href={project.url} target="_blank" rel="noopener noreferrer">VIEW CODE <ArrowUpRight size={13}/></a>
              </div>
              <div className="pixel-card-main">
                <div className={`pixel-project-emblem ${project.art}`} aria-hidden="true">
                  {project.art === 'ledger' ? <Code2 size={30} strokeWidth={2.5}/> : null}
                  {project.art === 'search' ? <BookOpen size={32} strokeWidth={2.2}/> : null}
                  {project.art === 'flight' ? <Plane size={31} strokeWidth={2.2}/> : null}
                </div>
                <div className="pixel-project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <ul className="pixel-highlights">
                  {project.highlights.map(([metric, sentence]) => (
                    <li key={metric}>
                      <span className="pixel-metric">{metric}</span>
                      <span>{sentence}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pixel-tools">
                <span className="pixel-tools-label">TOOLS USED</span>
                {project.stack.map((tool) => <span className="pixel-tag" key={tool}>{tool}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

import { ArrowUpRight, BookOpen, Code2, Plane } from 'lucide-react';
import './_group.css';

const projects = [
  {
    number: '01',
    type: 'PAYMENT SYSTEM · IN PROGRESS',
    title: 'Reliable Payment Records',
    url: 'https://github.com/Pushya26/idempotent_payment_ledger_service',
    art: 'ledger',
    summary: 'A payment service designed to prevent repeat requests from charging someone twice.',
    highlights: [
      ['0', 'No duplicate charges occurred across 50 payment requests sent at once.'],
      ['11 tests', 'Automated tests checked all 3 service endpoints.'],
      ['1:1', 'Every completed payment stayed balanced in the records.'],
    ],
    techDetails: 'JUnit tests · REST API · Redis idempotency keys · payment state machine · double-entry ledger · Flyway schema · Docker Compose',
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
      ['5,838', 'The tool made 5,838 research papers searchable, and 65 tests checked its key features.'],
      ['292×', 'The search engine needed 292× less work to sort results by relevance.'],
      ['~50 → 2 ms', 'Repeat-search time fell from about 50 milliseconds to 2 milliseconds.'],
    ],
    techDetails: 'arXiv collection · BM25 and PageRank ranking · about 99% fewer graph edges · incoming-link traversal · AND / OR / NOT parser · LRU cache',
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
      ['200', 'The live 3D map displayed 200 simulated flights.'],
      ['2 seconds', 'The map refreshed every 2 seconds, and nearby aircraft were checked every 15 seconds.'],
      ['17 tests', 'The project included 17 tests, and 10 tracked issues were resolved.'],
    ],
    techDetails: 'Producer–consumer pipeline · pairwise distance and altitude checks · WebSocket updates · documented full-stack issue resolution',
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
              <details className="pixel-tech-details">
                <summary>Technical details</summary>
                <p>{project.techDetails}</p>
              </details>
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

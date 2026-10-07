import { ArrowRight, ArrowUpRight, BookOpen, Code2 } from 'lucide-react';
import './_group.css';

const projects = [
  {
    number: '01', type: 'PAYMENTS · IN PROGRESS', title: 'Idempotent Payment\nLedger Service',
    url: 'https://github.com/Pushya26/idempotent_payment_ledger_service',
    description: 'A payment path designed to stay correct when the world gets noisy: retries, concurrency, and state transitions all accounted for.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
    proof: [
      ['0', 'duplicate payments across 50 simultaneous retries'],
      ['11', 'JUnit tests · 3-endpoint REST API'],
      ['1:1', 'debits and credits on every settled payment'],
    ],
    note: 'Redis idempotency keys · payment state machine · double-entry ledger · Flyway schema · Docker Compose',
    art: 'ledger',
  },
  {
    number: '02', type: 'SEARCH · INFORMATION RETRIEVAL', title: 'Research Paper\nSearch Engine',
    url: 'https://github.com/Pushya26/research_paper_search_engine',
    description: 'A from-scratch search engine that makes a sprawling paper collection easier to explore—and makes ranking cheaper to compute.',
    stack: ['Python', 'FastAPI', 'BM25', 'PageRank', 'WordNet', 'Semantic Scholar API'],
    proof: [
      ['5,838', 'arXiv papers indexed · 65 automated tests'],
      ['292×', 'fewer PageRank operations'],
      ['~50 → 2ms', 'repeat query time with an LRU cache'],
    ],
    note: '~99% fewer graph edges · incoming-link traversal · AND / OR / NOT recursive-descent parser',
    art: 'search',
  },
  {
    number: '03', type: 'REAL-TIME · FULL STACK', title: 'Real-Time Flight\nTracking System',
    url: 'https://github.com/Pushya26/flight_tracking_system',
    description: 'A live flight picture, from a multi-threaded data pipeline to aircraft rendered on a 3D globe.',
    stack: ['Python', 'FastAPI', 'WebSocket', 'PostgreSQL', 'Docker', 'React', 'CesiumJS'],
    proof: [
      ['200', 'simulated flights · 17 tests'],
      ['15s', 'proximity checks across the fleet'],
      ['2s', '3D globe updates · 10 issues resolved'],
    ],
    note: 'Producer–consumer pipeline · pairwise distance and altitude checks · documented full-stack issue resolution',
    art: 'flight',
  },
];

export function Current() {
  return (
    <main className="current-stage">
      <section className="projects-section section-wrap">
        <div className="section-heading">
          <div><span className="section-kicker">A FEW THINGS I’VE BUILT</span><h2>Work with<br/><em>real-world edges.</em></h2></div>
          <p>Three projects focused on making systems dependable—and proving it with measurable results.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.art}`} key={project.number}>
              <div className="project-top">
                <span className="project-number">{project.number} / 03</span>
                <span className="project-type">{project.type}</span>
                <a className="project-repo" href={project.url} target="_blank" rel="noopener noreferrer">OPEN REPOSITORY <ArrowUpRight size={12}/></a>
              </div>
              <div className="project-layout">
                <div className="project-main">
                  <div className={`project-illustration ${project.art}`} aria-hidden="true">
                    {project.art === 'ledger' ? <><span className="orbit orbit-a"/><span className="orbit orbit-b"/><span className="ledger-core"><Code2 size={24}/></span><i className="spark"/><i className="spark spark-b"/></> : null}
                    {project.art === 'search' ? <><BookOpen className="book-art" size={68} strokeWidth={1}/><span className="search-orbit"/><i className="search-dot"/><i className="search-dot dot-b"/></> : null}
                    {project.art === 'flight' ? <><span className="globe-grid"/><span className="flight-path"/><ArrowRight className="plane-mark" size={25}/><i className="flight-node"/></> : null}
                  </div>
                  <h3>{project.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br/>}{line}</span>)}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-detail">
                  <div className="metrics">
                    {project.proof.map(([figure, label]) => <div key={figure}><strong>{figure}</strong><span>{label}</span></div>)}
                  </div>
                  <p className="project-note">{project.note}</p>
                </div>
              </div>
              <div className="tag-row">{project.stack.map(item => <span className="tag" key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

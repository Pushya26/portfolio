import { useState, type FormEvent } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Code2, Compass, Github, GraduationCap, Mail, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import { sendContactMessage } from '@workspace/api-client-react';

const projects = [
  {
    number: '01', type: 'PAYMENT SYSTEM · IN PROGRESS', title: 'Reliable Payment\nRecords',
    url: 'https://github.com/Pushya26/idempotent_payment_ledger_service',
    description: 'A payment service designed to prevent repeat requests from charging someone twice and to keep each completed payment balanced.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
    highlights: [
      { metric: '0', text: 'No duplicate charges occurred across 50 payment requests sent at once.' },
      { metric: '11 tests', text: 'Automated tests checked all 3 service endpoints.' },
      { metric: '1:1', text: 'Every completed payment stayed balanced in the records.' },
    ],
    techDetails: 'JUnit tests · REST API · Redis idempotency keys · payment state machine · double-entry ledger · Flyway schema · Docker Compose',
    art: 'ledger',
  },
  {
    number: '02', type: 'RESEARCH TOOLS', title: 'Research Paper\nSearch Engine',
    url: 'https://github.com/Pushya26/research_paper_search_engine',
    description: 'A search tool that helps people find relevant research papers across a large library.',
    stack: ['Python', 'FastAPI', 'BM25', 'PageRank', 'WordNet', 'Semantic Scholar API'],
    highlights: [
      { metric: '5,838', text: 'The tool made 5,838 research papers searchable, and 65 tests checked its key features.' },
      { metric: '292×', text: 'The search engine needed 292× less work to sort results by relevance.' },
      { metric: '~50 → 2 ms', text: 'Repeat-search time fell from about 50 milliseconds to 2 milliseconds.' },
    ],
    techDetails: 'arXiv collection · BM25 and PageRank ranking · about 99% fewer graph edges · incoming-link traversal · AND / OR / NOT recursive-descent parser · LRU cache',
    art: 'search',
  },
  {
    number: '03', type: 'LIVE FLIGHT MAP', title: 'Live Flight\nTracking System',
    url: 'https://github.com/Pushya26/flight_tracking_system',
    description: 'A live map of simulated flights that keeps aircraft locations current and checks for nearby planes.',
    stack: ['Python', 'FastAPI', 'WebSocket', 'PostgreSQL', 'Docker', 'React', 'CesiumJS'],
    highlights: [
      { metric: '200', text: 'The live 3D map displayed 200 simulated flights.' },
      { metric: '2 sec', text: 'The map refreshed every 2 seconds, and nearby aircraft were checked every 15 seconds.' },
      { metric: '17 tests', text: 'The project included 17 tests, and 10 tracked issues were resolved.' },
    ],
    techDetails: 'Producer–consumer pipeline · pairwise distance and altitude checks · WebSocket updates · documented full-stack issue resolution',
    art: 'flight',
  },
];

const work = [
  {
    company: 'Crestaerospace Pvt. Ltd.', role: 'Full-Stack Developer Intern', dates: 'Jul 2025 — Nov 2025',
    points: ['Reduced peer-review cycle time ~40% across 8 REST API endpoints by authoring interface contracts and documentation standards.', 'Cut incident-resolution time 15% across 5+ production incidents by diagnosing root causes and authoring adopted debugging protocols.'],
    mark: 'CA',
  },
  {
    company: 'Rooman Technologies', role: 'AI & ML Intern', dates: 'Sep 2024 — Feb 2025',
    points: ['Automated behavioural insight delivery across 100% of client data with an end-to-end AI pipeline (Watson NLP, Autoencoders, K-Means) as sole contributor.', 'Improved model accuracy 16% over baseline via k-fold cross-validation and independent hyperparameter tuning.'],
    mark: 'RT',
  },
  {
    company: 'LRDE, DRDO', role: 'Software Developer Intern', dates: 'Nov 2023 — Dec 2023',
    points: ['Eliminated 40% of manual ETL processing time across all assigned modules by automating batch pipelines in Python.', 'Enabled full pipeline ownership with zero escalations by resolving 3 critical ETL bottlenecks and authoring runbooks for all modules.'],
    mark: 'DR',
  },
];

const groups = [
  ['Languages', 'Python', 'Java', 'SQL'],
  ['Frameworks & APIs', 'Spring Boot', 'FastAPI', 'REST APIs', 'Django'],
  ['Database engines', 'PostgreSQL', 'Redis'],
  ['Tools', 'Git / GitHub', 'Docker', 'pytest', 'JUnit'],
  ['Concepts', 'Concurrency & multi-threading', 'Data structures & algorithms'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [contactNotice, setContactNotice] = useState<'idle' | 'sent' | 'error'>('idle');
  const closeMenu = () => setMenuOpen(false);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setIsSending(true);
    setContactNotice('idle');

    try {
      await sendContactMessage({
        name: String(values.get('name') ?? '').trim(),
        email: String(values.get('email') ?? '').trim(),
        message: String(values.get('message') ?? '').trim(),
        website: String(values.get('website') ?? '').trim(),
      });
      form.reset();
      setContactNotice('sent');
    } catch {
      setContactNotice('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grain min-h-[100dvh] overflow-hidden">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="B. C. Pushya, home">
          <span className="wordmark-icon"><Compass size={19} strokeWidth={1.6}/></span>
          <span>B. C. Pushya<small>Software developer · Bengaluru</small></span>
        </a>
        <button className="mobile-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>About</a><a href="#education" onClick={closeMenu}>Education</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#work" onClick={closeMenu}>Projects</a><a href="#experience" onClick={closeMenu}>Experience</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Say hello <ArrowUpRight size={14}/></a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-image" role="img" aria-label="A bright pixel-art countryside with green fields, a local train and a wide summer sky">
            <div className="hero-vignette"/>
            <div className="hero-copy">
              <p className="eyebrow reveal"><span className="eyebrow-dot"/> ENGINEERING, WITH A SENSE OF WONDER</p>
              <h1 id="hero-title" className="reveal delay-1">Make the<br/>complex <em>hold.</em></h1>
              <p className="hero-intro reveal delay-2">I’m Pushya—a software developer in Bengaluru turning reliability problems into measurable backend and full-stack systems.</p>
              <div className="hero-actions reveal delay-3">
                <a className="button button-light" href="#work">Explore my work <ArrowDownRight size={16}/></a>
                <a className="text-link hero-resume" href="https://drive.google.com/file/d/1p53kfcbYR64Zopu6lKrrMcUP02mLCbi9/view?usp=sharing" target="_blank" rel="noopener noreferrer">View résumé <ArrowDown size={15}/></a>
              </div>
            </div>
            <div className="scene-caption"><span>FIELD NOTES · 01</span><span>PIXEL COUNTRYSIDE</span></div>
            <div className="floating-stamp float"><span>BUILD<br/>WITH<br/>CARE</span><span className="stamp-star">✳</span></div>
          </div>
          <div className="hero-foot">
            <span>BACKENDS THAT KEEP THEIR PROMISES</span><span className="foot-rule"/><a href="#work">SCROLL TO EXPLORE <ArrowDown size={13}/></a>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="about-layout">
            <div className="about-copy">
              <span className="section-kicker">A LITTLE CONTEXT</span>
              <h2>Curious by nature.<br/><em>Reliable by design.</em></h2>
              <p>I build backend and full-stack software, with a focus on dependable systems—from payment ledgers and paper search to real-time flight tracking.</p>
              <p>The National Cadet Corps strengthened my sense of discipline, teamwork, and responsibility.</p>
              <div className="ncc-badge"><ShieldCheck size={23}/><span><strong>NCC B & C Certificates</strong><small>Completed 2 years in the National Cadet Corps, demonstrating leadership, discipline, and teamwork through structured national-level military training.</small></span></div>
            </div>
            <figure className="about-character">
              <div className="character-stage" role="img" aria-label="Animated pixel-art portrait of Pushya in a sunny countryside">
                <img className="character-pose character-pose--rest" src="/pushya-pixel-character.webp" alt="" aria-hidden="true" />
                <img className="character-pose character-pose--wave" src="/pushya-pixel-character-wave.webp" alt="" aria-hidden="true" />
                <img className="character-pose character-pose--notebook" src="/pushya-pixel-character-notebook.webp" alt="" aria-hidden="true" />
              </div>
              <figcaption><span className="character-status" aria-hidden="true"/> PIXEL PROFILE · BENGALURU</figcaption>
            </figure>
          </div>
        </section>

        <section className="education-section" id="education">
          <div className="section-wrap">
            <div className="education-head"><div><span className="section-kicker">THE LEARNING THAT GOT ME HERE</span><h2>Built on good<br/><em>foundations.</em></h2></div><GraduationCap size={33} strokeWidth={1.2}/></div>
            <div className="education-grid">
              <article className="degree"><div className="degree-symbol">01</div><div><span className="degree-date">SEPT 2025 — MAY 2027 · ANTICIPATED</span><h3>Master of Technology</h3><p>Computer Science and Engineering</p><span className="school">New Horizon College of Engineering, Bengaluru</span></div><div className="gpa"><strong>9.0</strong><span>CGPA / 10</span></div></article>
              <article className="degree"><div className="degree-symbol">02</div><div><span className="degree-date">OCT 2021 — MAY 2025</span><h3>Bachelor of Engineering</h3><p>Computer Science and Engineering</p><span className="school">MVJ College of Engineering, Bengaluru</span></div><div className="gpa"><strong>7.73</strong><span>CGPA / 10</span></div></article>
            </div>
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-wrap">
            <div className="skills-heading"><span className="section-kicker">TOOLS & TECHNIQUES</span><h2>Skills for the work.</h2></div>
            <div className="skills-panel">
              <div className="skills-head"><Code2 size={17}/><span>TOOLS IN MY FIELD KIT</span></div>
              {groups.map(([title, ...skills]) => <div className="skill-group" key={title}><h3>{title}</h3><div>{skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}
            </div>
          </div>
        </section>

        <section className="projects-section section-wrap" id="work">
          <div className="section-heading">
            <div><span className="section-kicker">A FEW THINGS I’VE BUILT</span><h2>Work with<br/><em>real-world edges.</em></h2></div>
            <p>Three projects, clear problems, and results explained in plain language.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={`project-card ${project.art}`} key={project.number}>
                <div className="project-top"><span className="project-number">PROJECT {project.number} / 03</span><span className="project-type">{project.type}</span><a className="project-repo" href={project.url} target="_blank" rel="noopener noreferrer">VIEW CODE <ArrowUpRight size={12}/></a></div>
                <div className="project-layout">
                  <div className="project-main">
                    <div className={`project-illustration ${project.art}`} aria-hidden="true">
                      {project.art === 'ledger' ? <><span className="orbit orbit-a"/><span className="orbit orbit-b"/><span className="ledger-core"><Code2 size={26}/></span><i className="spark spark-a"/><i className="spark spark-b"/></> : null}
                      {project.art === 'search' ? <><BookOpen className="book-art" size={72} strokeWidth={1}/><span className="search-orbit"/><i className="search-dot dot-a"/><i className="search-dot dot-b"/></> : null}
                      {project.art === 'flight' ? <><span className="globe-grid"/><span className="flight-path"/><ArrowRight className="plane-mark" size={27}/><i className="flight-node"/></> : null}
                    </div>
                    <h3>{project.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br/>}{line}</span>)}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                  <div className="project-detail">
                    <ul className="project-highlights">
                      {project.highlights.map(({ metric, text }) => <li key={metric}><strong>{metric}</strong><span>{text}</span></li>)}
                    </ul>
                    <details className="project-tech-details">
                      <summary>Technical details</summary>
                      <p>{project.techDetails}</p>
                    </details>
                  </div>
                </div>
                <div className="tag-row"><span className="stack-label">TOOLS USED</span>{project.stack.map(item => <span className="tag" key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-wrap">
            <div className="section-heading experience-heading">
              <div><span className="section-kicker">WHERE I’VE LEARNED BY DOING</span><h2>Small fixes.<br/><em>Lasting impact.</em></h2></div>
              <BriefcaseBusiness size={32} strokeWidth={1.2} className="heading-icon"/>
            </div>
            <div className="timeline">
              {work.map((job, i) => <article className="job" key={job.company}>
                <div className="job-mark">{job.mark}</div>
                <div className="job-content"><div className="job-title-line"><div><h3>{job.company}</h3><p>{job.role}</p></div><time>{job.dates}</time></div>
                  <ul>{job.points.map(point => <li key={point}>{point}</li>)}</ul>
                </div>
                <span className="job-index">0{i + 1}</span>
              </article>)}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-landscape" aria-hidden="true"><span className="contact-moon"/><span className="hill hill-back"/><span className="hill hill-front"/><span className="contact-path"/></div>
          <div className="contact-content">
            <span className="section-kicker">THE NEXT CHAPTER</span>
            <h2>Have a hard<br/>problem? <em>Good.</em></h2>
            <p>Let’s talk about systems that need to work when it matters. Send a note straight to my inbox.</p>
            <form className="contact-form" onSubmit={handleContactSubmit} onChange={() => contactNotice !== 'idle' && setContactNotice('idle')}>
              <div className="contact-form-fields">
                <label htmlFor="contact-name">YOUR NAME<input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} required/></label>
                <label htmlFor="contact-email">YOUR EMAIL<input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required/></label>
              </div>
              <label className="contact-message-field" htmlFor="contact-message">YOUR NOTE<textarea id="contact-message" name="message" rows={4} maxLength={5000} required/></label>
              <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off"/></div>
              <div className="contact-form-actions">
                <button className="button button-light contact-cta" type="submit" disabled={isSending}>{isSending ? 'Sending…' : 'Send me a note'} <ArrowUpRight size={16}/></button>
                <span className="contact-form-note">Your email is only used if I reply.</span>
              </div>
              <p className="contact-form-status" aria-live="polite" role={contactNotice === 'error' ? 'alert' : 'status'}>{contactNotice === 'sent' ? 'Your note is on its way. Thanks for reaching out.' : contactNotice === 'error' ? 'Your note could not be sent right now. Please try again or email me directly.' : ''}</p>
            </form>
          </div>
          <div className="contact-links">
            <a href="tel:+917259167376"><Phone size={15}/> +91 7259167376</a>
            <a href="mailto:chandrupushya@gmail.com"><Mail size={15}/> chandrupushya@gmail.com</a>
            <a href="https://www.linkedin.com/in/pushya-bc-27b40a24b/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a>
            <a href="https://github.com/Pushya26" target="_blank" rel="noreferrer"><Github size={15}/> GitHub <ArrowUpRight size={14}/></a>
          </div>
        </section>
      </main>
      <footer className="footer"><a className="wordmark footer-brand" href="#top"><span className="wordmark-icon"><Compass size={16}/></span><span>B. C. Pushya</span></a><span>BUILT THOUGHTFULLY · BENGALURU, INDIA</span><a href="https://drive.google.com/file/d/1p53kfcbYR64Zopu6lKrrMcUP02mLCbi9/view?usp=sharing" target="_blank" rel="noopener noreferrer">RÉSUMÉ <ArrowUpRight size={13}/></a></footer>
    </div>
  );
}

export default App;

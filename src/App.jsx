import './App.css';
import TypeYourWords from './TypeYourWords';
import ThemeToggle from './ThemeToggle';

function App() {
  return (
    <div className="portfolio">
      <header className="header">
        <ThemeToggle />
        <div className="header-content">
          <div className="avatar">
            {/* Use public folder path for image */}
            <img src="/sri.jpg" alt="SRIRAM" onError={e => {e.currentTarget.style.display='none';}} />
          </div>
          <div className="title">
            <h1>SRIRAM</h1>
            <p className="headline">React | Python | Solutions Engineer</p>
          </div>
        </div>
        <TypeYourWords />
      </header>

      <section className="about">
        <h2>About Me</h2>
        <p>Building seamless user experiences with modern JavaScript and React. I'm a full-stack developer with expertise in React and Python, passionate about creating efficient and user-friendly applications. I enjoy translating complex problems into clean, scalable code, and I thrive in environments where collaboration and continuous learning are valued</p>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          <div className="skill-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <img src="/icons8-java-64.png" alt="JavaScript Logo" className="skill-logo" style={{width: '22px', height: '22px', marginRight: '2px', verticalAlign: 'middle', display: 'inline-block'}} />
            <span>JavaScript</span>
          </div>
          <div className="skill-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <img src="/icons8-react-40.png" alt="React Logo" className="skill-logo" style={{width: '22px', height: '22px', marginRight: '2px', verticalAlign: 'middle', display: 'inline-block'}} />
            <span>React</span>
          </div>
          <div className="skill-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <img src="/pythonlogo.png" alt="Python Logo" className="skill-logo" style={{width: '22px', height: '22px', marginRight: '2px', verticalAlign: 'middle', display: 'inline-block'}} />
            <span>Python</span>
          </div>
          <div className="skill-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <img src="/icons8-full-stack-64.png" alt="Full-Stack Development Logo" className="skill-logo" style={{width: '22px', height: '22px', marginRight: '2px', verticalAlign: 'middle', display: 'inline-block'}} />
            <span>Full-Stack Development</span>
          </div>
        </div>
      </section>

      <section className="projects">
        <h2>Featured Project</h2>
        <div className="project-card">
          <h3>Task Management Platform</h3>
          <p>A full-stack task management solution showcasing my expertise in both front-end and back-end development.</p>
          <div className="project-tech">
            <span>React</span>
            <span>Python</span>
            <span>Full-Stack</span>
          </div>
        </div>
      </section>

      <footer className="contact">
        <h2>Get In Touch</h2>
        <p>
          If you'd like to reach out, call or message me at 
          <a href="tel:+918428203688">+91 84282 03688</a> or email me at 
          <a href="mailto:sriramramesh8904@gmail.com">sriramramesh8904@gmail.com</a>.
            <a
              className="resume-link"
              href="/myresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={e => {
                const popup = document.createElement('div');
                popup.className = 'resume-popup';
                popup.innerText = 'Download my resume as PDF';
                popup.style.position = 'absolute';
                popup.style.top = '120%';
                popup.style.left = '0';
                popup.style.background = '#222';
                popup.style.color = '#64ffda';
                popup.style.padding = '0.5em 1em';
                popup.style.borderRadius = '8px';
                popup.style.boxShadow = '0 2px 8px rgba(100,255,218,0.12)';
                popup.style.whiteSpace = 'nowrap';
                popup.style.zIndex = '10';
                e.currentTarget.parentNode.appendChild(popup);
                e.currentTarget._popup = popup;
              }}
              onMouseLeave={e => {
                if (e.currentTarget._popup) {
                  e.currentTarget._popup.remove();
                  e.currentTarget._popup = null;
                }
              }}
              onTouchStart={e => {
                if (!e.currentTarget._popup) {
                  const popup = document.createElement('div');
                  popup.className = 'resume-popup';
                  popup.innerText = 'Download my resume as PDF';
                  popup.style.position = 'absolute';
                  popup.style.top = '120%';
                  popup.style.left = '0';
                  popup.style.background = '#222';
                  popup.style.color = '#64ffda';
                  popup.style.padding = '0.5em 1em';
                  popup.style.borderRadius = '8px';
                  popup.style.boxShadow = '0 2px 8px rgba(100,255,218,0.12)';
                  popup.style.whiteSpace = 'nowrap';
                  popup.style.zIndex = '10';
                  e.currentTarget.parentNode.appendChild(popup);
                  e.currentTarget._popup = popup;
                }
              }}
              onTouchEnd={e => {
                setTimeout(() => {
                  if (e.currentTarget._popup) {
                    e.currentTarget._popup.remove();
                    e.currentTarget._popup = null;
                  }
                }, 1200);
              }}
            >Resume</a>
        </p>
        <div className="social-links">
          {/* Add your social links here */}
        </div>
      </footer>
    </div>
  );
}

export default App;

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
          <div className="skill-item">
            <img src="/icons8-java-64.png" alt="JavaScript Logo" className="skill-logo" />
            <span>JavaScript</span>
          </div>
          <div className="skill-item">
            <img src="/icons8-react-40.png" alt="React Logo" className="skill-logo" />
            <span>React</span>
          </div>
          <div className="skill-item">
            <img src="/pythonlogo.png" alt="Python Logo" className="skill-logo" />
            <span>Python</span>
          </div>
          <div className="skill-item">
            <img src="/icons8-full-stack-64.png" alt="Full-Stack Development Logo" className="skill-logo" />
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
              title="Download my resume as PDF"
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

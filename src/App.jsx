import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import ThemeToggle from './ThemeToggle';
import Skills from './Skills';

const ProjectSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleImageChange = useCallback((direction) => {
    setSlideDirection(direction);
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + (direction === 'next' ? 1 : -1) + images.length) % images.length);
      setIsFading(false);
    }, 500);
  }, [images.length]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Only run the timer if not paused and there are multiple images
    if (!isPaused && images && images.length > 1) {
      const timer = setInterval(() => {
        handleImageChange('next');
      }, 3000);
      return () => clearInterval(timer);
    }
  // Add isPaused to the dependency array
  }, [images, handleImageChange, isPaused]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div 
      className="project-slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <img
        src={images[currentIndex]}
        alt={`Project Screenshot ${currentIndex + 1}`}
        className={`project-image clickable ${isFading ? 'fading' : ''} ${slideDirection}`}
        onClick={openModal}
      />
      <button onClick={() => handleImageChange('prev')} className="slideshow-btn prev-btn" aria-label="Previous image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <button onClick={() => handleImageChange('next')} className="slideshow-btn next-btn" aria-label="Next image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={images[currentIndex]} alt={`Full size project screenshot ${currentIndex + 1}`} className="modal-image" />
            <button onClick={closeModal} className="modal-close-btn" aria-label="Close image view">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ title, description, tech, websiteLink, repoLink, slideshowImages }) => {
  return (
    <div className="project-card">
      {slideshowImages && <ProjectSlideshow images={slideshowImages} />}
      <h3>{title}</h3>
      <p>{description}</p>

      {/* Show explicit links when present (keeps previous UI) */}
      {websiteLink && (
        <p>
          Live Demo : <a href={websiteLink} target="_blank" rel="noopener noreferrer" className="project-link">View Demo</a>
        </p>
      )}

      {repoLink && (
        <p className="project-repo-container">
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-repo-link"
            aria-label={`Open ${title} GitHub repository`}
            title="View on GitHub"
          >
            GitHub Repo
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="project-repo-icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </p>
      )}

      <div className="project-tech">
        {tech.map(t => <span key={t}>{t}</span>)}
      </div>
    </div>
  );
};

const AnimateOnScroll = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is intersecting and we haven't already made it visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing the element once it's visible
          observer.unobserve(ref.current);
        }
      },
      {
        // Animate when 15% of the element is in view
        threshold: 0.15,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return <div ref={ref} className={`${className} scroll-animation ${isVisible ? 'is-visible' : ''}`}>{children}</div>;
};

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isFading, setIsFading] = useState(false); // New state for fading
  const [slideDirection, setSlideDirection] = useState('next');
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: false });

  // --- Project Data and Filtering Logic ---

  const projectImages = [
    '/vb 1.png',
    '/vb 2.png',
    '/vb 3.png'
  ];

  const chatbotImages = [
    '/chatbot 1.png',
    '/chat 2.png',
    '/chat 3.png',
    '/chat 4.png',
    '/chat 5.png'
  ];

  const ALL_PROJECTS = [
    { id: 'vbams', title: "Vehicle Breakdown Assistance Management System", description: "A web/mobile-based platform that connects drivers with nearby roadside assistance services in real-time. It features GPS-based location tracking, service request management, and an admin dashboard to monitor operations. Designed to ensure quick, efficient, and reliable support during vehicle breakdowns.", tech: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'], websiteLink: "https://sriram8904.pythonanywhere.com/", repoLink: "https://github.com/sriramramesh8904-dot/VBAMS-Django-Project", slideshowImages: projectImages },
    { id: 'chatbot', title: "🤖 Elena Chatbot – Your Friendly AI Assistant", description: "Chatbot is an intelligent and friendly conversational assistant built using React and Python. It offers a human-like chat experience with personalized greetings, natural conversation flow, and a customizable personality. The chatbot is affectionately named “Elena”, designed to interact in a warm, approachable, and human-like manner.", tech: ['React', 'Python', 'Flask', 'AI APIs'], slideshowImages: chatbotImages, repoLink: "https://github.com/sriramramesh8904-dot/chatbot", websiteLink: "https://chatbot-ptl2mw6lt-srirams-projects-86fd0106.vercel.app/" },
    { id: 'task-manager', title: "Task Management Platform", description: "A full-stack task management solution showcasing my expertise in both front-end and back-end development. Built with a React frontend and a robust Python backend.", tech: ['React', 'Python', 'Full-Stack'] }
  ];

  // State to manage the current filter
  const [selectedTech, setSelectedTech] = useState('All');

  // Get a unique list of all technologies from the projects
  const allTech = ['All', ...new Set(ALL_PROJECTS.flatMap(p => p.tech))];

  // Filter projects based on the selected technology
  const filteredProjects = selectedTech === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.tech.includes(selectedTech));

  // --- End of Project Logic ---

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Back-to-top button visibility
      if (currentScrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Navbar hide/show logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsNavVisible(false);
      } else {
        // Scrolling up
        setIsNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const toggleNav = () => {
    const newNavState = !isNavOpen;
    setIsNavOpen(newNavState);
    if (newNavState) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
  };

  const toggleContactForm = () => {
    setIsContactFormVisible(prevState => !prevState);
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false });
    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus({ submitting: false, success: true, error: false });
        form.reset();
        // Optionally hide form again after a delay
        setTimeout(() => setIsContactFormVisible(false), 4000);
      } else {
        setFormStatus({ submitting: false, success: false, error: true });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({ submitting: false, success: false, error: true });
    }
  };

  return (
    <div className="portfolio">
      <header className="header">
        <button className="mobile-nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
          <span className="hamburger-icon"></span>
        </button>
        <nav className={`main-nav ${isNavOpen ? 'open' : ''} ${!isNavVisible ? 'hidden' : ''}`}>
          <ul onClick={() => setIsNavOpen(false)}>
            <li><a href="#about" onClick={handleNavClick}>About Me</a></li>
            <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
            <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
            <li><a href="#internship" onClick={handleNavClick}>Internship</a></li>
            <li><a href="#growth-journey" onClick={handleNavClick}>My Journey</a></li>
            <li><a href="#hobbies" onClick={handleNavClick}>Hobbies</a></li>
            <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
          </ul>
        </nav>
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
      </header>

      <AnimateOnScroll>
        <section id="about" className="about">
          <h2>About Me</h2>
          <p>Building seamless user experiences with modern JavaScript and React. I'm a full-stack developer with expertise in React and Python, passionate about creating efficient and user-friendly applications. I enjoy translating complex problems into clean, scalable code, and I thrive in environments where collaboration and continuous learning are valued.</p>
          <p>I'm currently an engineering student, continuously expanding my knowledge in both academic and real-world software development.</p>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section id="skills" className="skills">
          <h2>Skills</h2>
          <Skills />
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section id="projects" className="projects">
          <h2>Featured Project</h2>
          <p className="performance-note">🕒 Project Startup Notice: Please allow 1-2 minutes for the Full-Stack Projects to fully wake and load on the first visit.</p>
          
          {/* Filter Buttons */}
          <div className="project-filters">
            {allTech.map(tech => (
              <button 
                key={tech} 
                onClick={() => setSelectedTech(tech)}
                className={`filter-btn ${selectedTech === tech ? 'active' : ''}`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Render Filtered Projects */}
          {filteredProjects.map(project => <ProjectCard key={project.id} {...project} />)}
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section id="internship" className="internship">
          <h2>Internship</h2>
          <div className="internship-item">
            <h3>Pemchip Infotech R&D Unit – Python & Web Development Intern (Remote)</h3>
            <p>Completed a 2-month remote internship focused on Python and web development. During this period, I gained hands-on experience in building dynamic web applications, working with backend logic using Python, and integrating frontend technologies. I also collaborated on real-world projects, enhancing my understanding of full-stack development workflows and best practices in a professional environment.</p>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section id="growth-journey" className="growth-journey">
          <h2>My Growth Journey</h2>
          <p>There was a time in my life when I was completely distracted and heading in the wrong direction. I lost focus, and it led to more criticism, setbacks, and self-doubt. People questioned my worth and honestly, so did I. In those difficult moments, I stopped and asked myself a simple but powerful question: "Who am I, and who do I want to become?"</p>
          <p>That was the turning point. I chose to shift my focus back to what truly mattered learning, growing, and rebuilding myself. I poured my energy into my studies, worked on improving my skills, and challenged myself to prove my capabilities through consistent effort and small wins. The journey wasn't easy, but it was real.</p>
          <p>Today, I don’t claim to be the best — but I’m proud to say I’m better than I was yesterday. And maybe, better than many who never dared to restart. My story is a reminder that it’s never too late to change direction. Growth starts the moment you decide to stop running from who you are and start building who you want to be.</p>
          <p className="author-signature">- Sriram</p>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section id="hobbies" className="hobbies">
          <h2>Hobbies & Interests</h2>
          <ul className="hobbies-list">
            <li>Passionate about bike riding and exploring new places through travel and trekking.</li>
            <li>Enjoy watching web series and exploring different storytelling styles.</li>
            <li>Love playing cricket and staying active through outdoor sports.</li>
            <li>Enthusiastic gamer with a strong interest in strategy and team-based games.</li>
          </ul>
        </section>
      </AnimateOnScroll>

      <footer id="contact" className="contact">
        <h2>Get In Touch</h2>
        <p>Have a question, a project proposal, or just want to say hello? Go ahead.</p>

        {!isContactFormVisible ? (
          <button onClick={toggleContactForm} className="contact-toggle-btn">
            Drop me a line
          </button>
        ) : (
          <form
            action="https://api.staticforms.xyz/submit"
            method="POST"
            className="contact-form"
            onSubmit={handleContactSubmit}
          >
            {formStatus.success && <p className="form-success-message">Thanks for your message! I'll get back to you soon.</p>}
            {formStatus.error && <p className="form-error-message">Oops! Something went wrong. Please try again.</p>}
            <input type="hidden" name="accessKey" value="sf_n371bgm9k4iebgf886002b60" />
            {!formStatus.success && (
              <>
                <div className="form-group">
                  <input type="text" name="name" placeholder="Your Name" required className="form-input" disabled={formStatus.submitting} />
                  <input type="email" name="email" placeholder="Your Email" required className="form-input" disabled={formStatus.submitting} />
                </div>
                <textarea name="message" placeholder="Your Message" required className="form-textarea" disabled={formStatus.submitting}></textarea>
                <button type="submit" className="submit-btn" disabled={formStatus.submitting}>
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        )}

        <p>
          <a
            className="resume-link"
            href="/sriram.resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download my resume as PDF"
          >Resume</a>
        </p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/sri-ram-9879901b7?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://www.instagram.com/srirxm_r?igsh=dmxxOGR0bm9vOWJ2" target="_blank" rel="noopener noreferrer" title="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://github.com/sriramramesh8904-dot" target="_blank" rel="noopener noreferrer" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
        <p className="footer-quote">"Growth begins the moment you stop asking 'Why me?' and start saying 'Watch me.'"</p>
        <p className="footer-credit">© Created by Sriram. All rights reserved.</p>
      </footer>
      {showBackToTop && (
        <button onClick={scrollToTop} className="back-to-top-btn" title="Go to top">
          ↑
        </button>
      )}
    </div>
  );
}

export default App;

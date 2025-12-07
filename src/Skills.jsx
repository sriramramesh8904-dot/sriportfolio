import React from 'react';
import './Skills.css';

const SKILL_DATA = [
  {
    category: 'Frontend',
    skills: [
      { name: 'JavaScript', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
      { name: 'React (Hooks)', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
      { name: 'HTML5', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg' },
      { name: 'CSS3', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Python', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
      { name: 'Flask', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg' },
      { name: 'MySQL', logo: 'https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg' },
      { name: 'REST API Design', logo: '/assets/logos/swagger.svg' },
      { name: 'Authentication', logo: '/assets/logos/lock.svg' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', logo: '/git_4494740.png' },
      { name: 'Docker', logo: '/docker_919853.png' },
    ],
  },
];

/**
 * A reusable component to display a group of skills.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the skill group.
 * @param {Array<object>} props.skills - The array of skills to display.
 */
const SkillGroup = ({ title, skills }) => (
  <div className="skills-group">
    <h3 className="group-heading">{title}</h3>
    <div className="skills-grid">
      {skills.map((skill) => (
        <article key={skill.name} className="skill-card" aria-label={skill.name}>
          <div className="logo-wrap">
            <img src={skill.logo} alt={`${skill.name} logo`} className="skill-logo" />
          </div>
          <div className="skill-label">{skill.name}</div>
        </article>
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <div className="skills-section">
      <div className="skills-inner">
        {SKILL_DATA.map((group) => (
          <SkillGroup key={group.category} title={group.category} skills={group.skills} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X } from 'lucide-react';

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Find the active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Check if the section is in the viewport
        // Consider a section active if its top is above the middle of viewport
        // and its bottom is below the middle of viewport
        const viewportMiddle = scrollTop + windowHeight / 2;
        
        if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };
    
    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          } else {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: [0.1, 0.3, 0.5] }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const projects = [
    {
      title: "BattleCats Save Editor",
      description: "CLI tool serving a community of 200,000+ users, handling complex save-file manipulation for dynamic game data",
      detailedDescription: "At 15, I developed a CLI tool serving 200,000+ users by manipulating player save-file data stored in game servers with Python. I spent a year reverse-engineering the binary save-file format through meticulous analysis and community collaboration. The tool featured a user-friendly interface, robust error handling, and regular updates to adapt to game changes.",
      tech: ["Python", "HTTP/Proxy", "Binary Manipulation"],
      features: [
        "Save-file fetch and upload via REST API",
        "Binary data parsing and manipulation",
        "MD5 hash patching for data integrity",
        "User-friendly CLI interface",
        "Backup manager for save files",

      ],
      challenges: "Accessing save data on server and manipulating files while bypassing authentication mechanisms on reupload. Solved by implementing a MITM proxy to intercept and replicate authorized requests, followed by decoding tables and reverse-engineering the binary format to understand the data structure and hashing.",
      //github: "https://github.com/yourusername/project1",
      //live: "https://demo.com"
    },
    {
      title: "GradSight",
      description: "A web application for displaying and managing graduation composites, featuring OCR, user authentication, and role-based access control",
      detailedDescription: "GradSight is a web application designed to modernize the way graduation composites are displayed and managed. It provides a user-friendly interface for browsing and searching composites, enhanced with OCR technology for data extraction and role-based access control for secure administration.",
      tech: ["Python", "OpenCV", "AWS", "React"],
      features: [
        "OCR integration for text and student extraction",
        "User authentication with role-based access control",
        "Responsive web interface for browsing composites",
        "Admin dashboard for managing composites and users",
        "Search and filter functionality for easy navigation"
      ],
      challenges: "Implementing OCR to accurately extract text and students from diverse composite images. Overcame this by leveraging OpenCV for image preprocessing and EasyOCR, fine-tuning parameters to enhance text and student recognition accuracy across various image qualities.",
      //github: "https://github.com/yourusername/project2",
      //live: "https://demo.com"
    },
    {
      title: "Share-A-Ride",
      description: "Mobile app connecting drivers and riders for carpooling with user profiles, reviews, QR code scanning and tracking with Discord integration",
      // write a detailed description of this app
      detailedDescription: "Share-A-Ride is a mobile application that facilitates carpooling by connecting drivers with riders heading in the same direction. The app allows users to create profiles, schedule rides and join rides with QR codes. It also includes a review system to ensure trust and safety within the community.",
      tech: ["JavaScript", "Node.js", "Express", "Firebase"],
      features: [
        // write key features
        "User profiles with ride history and reviews",
        "Ride scheduling and matching system",
        "QR code generation and scanning for ride access",
        "Discord bot integration for ride updates and communication"
      ],
      challenges: "Handling real-time ride matching and updates while ensuring data consistency. Addressed this by utilizing Firebase's real-time database capabilities, allowing instantaneous synchronization of ride data between drivers and riders.",
      //github: "https://github.com/yourusername/project3",
      //live: "https://demo.com"
    }
  ];

  const experiences = [
    /*
    {
      title: "Backend Software Engineer",
      company: "Carfide",
      location: "Hamilton, ON",
      period: "June 2025 - Present",
      description: "Developed and maintained backend system using Node.js, Express, and Supabase",
      achievements: [
        "Built scalable RESTful APIs to support mobile and web applications",
        "Architected database schemas and optimized queries in Supabase",
        "Implemented user authentication and authorization using JWT",
        "Implemented automated testing, increasing code coverage to 85%"
      ]
    },**/
    {
      title: "Software Engineering Intern",
      company: "Ontario Ministry of Education",
      location: "Toronto, ON",
      period: "May 2024 - Aug 2024",
      description: "Contributed to full-stack development of a SaaS platform",
      achievements: [
        "Architected and maintained CI/CD pipelines supporting automated testing, validation, and deployment of business-critical applications, reducing operational risk and manual errors.",
        "Refactored Selenium automation libraries (C#), creating modular utilities that reduced script maintenance time by roughly 40%.",
        "Owned the end-to-end QA pipeline, supporting system integration testing and user acceptance testing for business-critical releases.",
      ]
    },
    {
      title: "Software Engineering Intern",
      company: "Ontario Ministry of Education",
      location: "Toronto, ON",
      period: "May 2023 - Dec 2023",
      description: "Contributed to large-scale database migration and optimization",
      achievements: [
        "Developed a migration tool in Python to convert 100+ Oracle SQL queries into MS SQL Server syntax, aiding the team in a large scale system transition",
        "Optimized DAX queries within Power BI through refactoring, enhancing report performance and simplifying data modeling for 15 stakeholder dashboards",
        "Created 10 custom BI visualizations to support education data insights, contributing to a more data driven process for stakeholders",
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Engineering in Software Engineering",
      institution: "McMaster University",
      location: "Hamilton, ON",
      period: "Sept 2020 - June 2025",
      details: [
        "Dean's Honour List",
        "Relevant Coursework: Data Structures & Algorithms, Databases, Object Oriented Design, Software Design",
        "GPA: 3.9/4.0"
      ]
    }
  ];

  const skills = [
    "Python", "TypeScript", "JavaScript", "C#", "Node.js", "Express", "PostgreSQL", "NoSQL", "Git",
    "Azure", "REST APIs", "AWS", "Docker"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800/50 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`} style={{ marginTop: '4px' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              HP
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <a href="#about" className={`hover:text-purple-400 transition-colors ${activeSection === 'about' ? 'text-purple-400 font-semibold' : ''}`}>About</a>
              <a href="#projects" className={`hover:text-purple-400 transition-colors ${activeSection === 'projects' ? 'text-purple-400 font-semibold' : ''}`}>Projects</a>
              <a href="#experience" className={`hover:text-purple-400 transition-colors ${activeSection === 'experience' ? 'text-purple-400 font-semibold' : ''}`}>Experience</a>
              <a href="#education" className={`hover:text-purple-400 transition-colors ${activeSection === 'education' ? 'text-purple-400 font-semibold' : ''}`}>Education</a>
              <a href="#skills" className={`hover:text-purple-400 transition-colors ${activeSection === 'skills' ? 'text-purple-400 font-semibold' : ''}`}>Skills</a>
              <a href="#contact" className={`hover:text-purple-400 transition-colors ${activeSection === 'contact' ? 'text-purple-400 font-semibold' : ''}`}>Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-purple-400 transition-colors ${activeSection === 'about' ? 'text-purple-400 font-semibold' : ''}`}>About</a>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-purple-400 transition-colors ${activeSection === 'projects' ? 'text-purple-400 font-semibold' : ''}`}>Projects</a>
              <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-purple-400 transition-colors ${activeSection === 'experience' ? 'text-purple-400 font-semibold' : ''}`}>Experience</a>
              <a href="#education" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-purple-400 transition-colors ${activeSection === 'education' ? 'text-purple-400 font-semibold' : ''}`}>Education</a>
              <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-purple-400 transition-colors ${activeSection === 'skills' ? 'text-purple-400 font-semibold' : ''}`}>Skills</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-purple-400 transition-colors ${activeSection === 'contact' ? 'text-purple-400 font-semibold' : ''}`}>Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down">
            Hi, I'm <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Hammad Pathan</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            New Grad Software Engineer | Back-End Developer
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            Passionate about building elegant solutions to complex problems. I create scalable, reliable, user-friendly applications with modern technologies.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <a href="#contact" className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              Get In Touch
            </a>
            <a href="#resume" className="border border-purple-400 px-8 py-3 rounded-full font-semibold hover:bg-purple-400/10 transition-all">
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              I'm a recent Software Engineering graduate with a passion for creating impactful software solutions. I've been coding since I was 15 and my journey in tech has equipped me with strong problem-solving skills and a deep understanding of full-stack development.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I thrive in collaborative environments and am always eager to learn new technologies. When I'm not coding, you can find me trying to hack a game, contributing to open-source projects or exploring AI and machine learning.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-900/50">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 cursor-pointer"
                style={{
                  animation: visibleSections.has('projects') ? 'fadeInUp 0.6s ease-out' : 'none',
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                  >
                    Learn More →
                  </button>
                  {/*<a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <Github size={20} />
                    Code
                  </a>*/}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-slate-900/50">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${visibleSections.has('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-12 text-center">Work Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                style={{
                  animation: visibleSections.has('experience') ? 'fadeInUp 0.6s ease-out' : 'none',
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-300 mb-2">{exp.title}</h3>
                    <p className="text-xl text-gray-300 mb-1">{exp.company}</p>
                    <p className="text-gray-400">{exp.location}</p>
                  </div>
                  <span className="inline-block mt-2 md:mt-0 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${visibleSections.has('education') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-12 text-center">Education</h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                style={{
                  animation: visibleSections.has('education') ? 'fadeInUp 0.6s ease-out' : 'none',
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-300 mb-2">{edu.degree}</h3>
                    <p className="text-xl text-gray-300 mb-1">{edu.institution}</p>
                    <p className="text-gray-400">{edu.location}</p>
                  </div>
                  <span className="inline-block mt-2 md:mt-0 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">
                    {edu.period}
                  </span>
                </div>
                <ul className="space-y-2 mt-4">
                  {edu.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 px-6 bg-slate-900/50">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${visibleSections.has('resume') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-8 text-center">Resume</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="text-center mb-8">
              <p className="text-gray-300 text-lg mb-6">
                Check out my resume :D
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  <ExternalLink size={20} />
                  View Resume
                </a>
                <a
                  href="/resume.pdf"
                  download="Hammad_Pathan_Resume.pdf"
                  className="flex items-center justify-center gap-2 border border-purple-400 px-8 py-3 rounded-full font-semibold hover:bg-purple-400/10 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
            <div className="border-t border-purple-500/20 pt-6">
              <h3 className="text-xl font-bold text-purple-300 mb-4 text-center">Quick Overview</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Education</h4>
                  <p>Bachelor of Engineering in Software Engineering</p>
                  <p className="text-gray-400 text-sm">McMaster University | GPA: 3.9/4.0</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Experience</h4>
                  <p>SWE New Grad</p>
                  <p className="text-gray-400 text-sm">1 year of internship experience</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Technical Skills</h4>
                  <p className="text-sm">Python, TypeScript, Node.js, SQL, Azure</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Interests</h4>
                  <p className="text-sm">Backend Development, System Design, DevOps, Automation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-slate-900/50">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500/30 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                style={{
                  animation: visibleSections.has('skills') ? 'scaleIn 0.5s ease-out' : 'none',
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'both'
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900/50">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-gray-400 text-lg mb-12">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <div className="flex gap-6 justify-center mb-8">
            <a href="https://github.com/hammadpathan" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-4 rounded-full hover:bg-purple-500/20 hover:scale-110 transition-all">
              <Github size={28} />
            </a>
            <a href="https://linkedin.com/in/hammad-pathan" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-4 rounded-full hover:bg-purple-500/20 hover:scale-110 transition-all">
              <Linkedin size={28} />
            </a>
            <a href="mailto:hammadpat@gmail.com" className="bg-slate-800 p-4 rounded-full hover:bg-purple-500/20 hover:scale-110 transition-all">
              <Mail size={28} />
            </a>
          </div>
          <a href="mailto:hammadpat@gmail.com" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Say Hello
          </a>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-purple-500/20 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-gray-400">{selectedProject.description}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-3 text-purple-300">Overview</h4>
                <p className="text-gray-300 leading-relaxed">{selectedProject.detailedDescription}</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-3 text-purple-300">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-3 text-purple-300">Key Features</h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-3 text-purple-300">Challenges & Solutions</h4>
                <p className="text-gray-300 leading-relaxed">{selectedProject.challenges}</p>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  <Github size={20} />
                  View Code
                </a>
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-purple-400 px-6 py-3 rounded-full font-semibold hover:bg-purple-400/10 transition-all"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-slate-800">
        <p>© 2025 Hammad Pathan. Vibecoded with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}
import '../App.css';
import Header from '../Header';
import SideBar from '../SideBar';
import React, { useState } from 'react';

function About() {
  const [sideBar, setSideBar] = useState(false);

  const openSideBar = () => {
    setSideBar(!sideBar);
  };

  const skills = ["Java", "Python", "C#", "C++", "JavaScript", "React", "Node.js", "SQL", "ASP.NET", "Firebase"];

  const workExperience = [
    {
      company: "EBS Mechdata",
      role: "Programmer | C#, .NET, React, Node.js, SQL",
      period: "Aug 2025 - Nov 2025",
      desc: [
        "Developed and optimized a large-scale inventory management system for construction enterprises using C# and .NET, streamlining material tracking and purchase workflows.",
        "Engineered full-stack web applications with Node.js (backend) and React (frontend), delivering responsive client portals for order management and reporting.",
        "Implemented robust API integrations between internal systems and external vendor platforms, ensuring seamless data synchronization and improving operational visibility."
      ]
    },
    {
      company: "Gunvor Group",
      role: "Software Engineering Intern | C#, Java, JavaScript, ASP.NET, SQL",
      period: "June 2024 - Aug 2024",
      desc: [
        "Built a C# Web API to orchestrate test server deployments and lifecycle management, enabling real-time diagnostics.",
        "Developed dynamic Razor Pages to manage server farms, allowing non-technical stakeholders to monitor server status and initiate tasks through an intuitive interface."
      ]
    },
    {
      company: "Layer3 Communications",
      role: "Installation Technician",
      period: "May 2023 – Aug 2023",
      desc: [
        "Installed and configured networking hardware, including routers, switches, and firewalls.",
        "Supported scalable and secure network infrastructure, improving reliability and performance across multiple environments."
      ]
    }
  ];

  const projects = [
    {
      name: "Social Networking App",
      tech: "Java, Android Studio, Firebase",
      desc: [
        "Developed an Android app for connecting with friends, sharing personal goals, and joining challenges to foster motivation.",
        "Implemented user profiles, real-time goal tracking, and challenge participation features.",
        "Built a Firebase backend for authentication, cloud storage, and real-time database management using Google OAuth and email login."
      ]
    },
    {
      name: "Wireless Coverage Application",
      tech: "Python, Tkinter, Matplotlib",
      desc: [
        "Created a network coverage visualization tool using Tkinter for UI and Matplotlib for graphical representation of signal distribution.",
        "Interactive input allows users to place routers/access points and adjust signal parameters.",
        "Implemented signal strength algorithms to map coverage zones and identify weak spots, aiding in optimal network planning and deployment strategies."
      ]
    }
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div className={`App ${sideBar ? "shrink" : ""}`}>
        <Header sideBar={sideBar} setSideBar={openSideBar} />
        <div style={{ marginTop: -10 }}>
          {sideBar ? <SideBar /> : null}
        </div>

        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
          <h1 style={{ fontSize: "32px",  marginBottom: "15px" }}>Hi, I'm Dominic!</h1>
          <p style={{ fontSize: "18px", lineHeight: "1.6", marginBottom: "20px" }}>
            Computer Science graduate passionate about full-stack development, backend engineering, and cybersecurity.
            I enjoy building efficient, scalable applications and solving real-world problems with code.
          </p>

          {/* Skills */}
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Key Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {skills.map(skill => (
              <span
                key={skill}
                style={{
                  padding: "5px 10px",
                  borderRadius: "8px",
                  fontWeight: "bold"
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Work Experience */}
          <h2 style={{ fontSize: "24px",  marginBottom: "10px" }}>Work Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "25px" }}>
            {workExperience.map(job => (
              <div
                key={job.company}
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}>{job.company}</h3>
                <p style={{ fontStyle: "italic", marginBottom: "5px" }}>{job.role}</p>
                <p style={{ fontSize: "14px", marginBottom: "10px" }}>{job.period}</p>
                <ul style={{ paddingLeft: "20px" }}>
                  {job.desc.map((item, index) => <li key={index} style={{ lineHeight: "1.6" }}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Projects</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {projects.map(project => (
              <div
                key={project.name}
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}>{project.name}</h3>
                <p style={{ fontStyle: "italic", marginBottom: "5px" }}>{project.tech}</p>
                <ul style={{ paddingLeft: "20px" }}>
                  {project.desc.map((item, index) => <li key={index} style={{ lineHeight: "1.5" }}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

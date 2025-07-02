import React from 'react';
import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const searchFields = [
    { title: "Job Title", icon: IconSearch, options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] },
    { title: "Location", icon: IconMapPin, options: ['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'] },
    { title: "Skills", icon: IconRecharging, options: ["HTML", "CSS", "JavaScript", "React", "Angular", "Node.js", "Python", "Java", "Ruby", "PHP", "SQL", "MongoDB", "PostgreSQL", "Git", "API Development", "Testing and Debugging", "Agile Methodologies", "DevOps", "AWS", "Azure", "Google Cloud"] },
];

const talents = [
    {
        name: "Jarrod Wood",
        role: "Software Engineer",
        company: "Google",
        topSkills: ["React", "SpringBoot", "MongoDB"],
        about: "As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.",
        expectedCtc: "₹48 - 60LPA",
        location: "New York, United States",
        image: "avatar"
    },
    {
        name: "Alice Johnson",
        role: "Frontend Developer",
        company: "Facebook",
        topSkills: ["HTML", "CSS", "JavaScript"],
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        expectedCtc: "₹40 - 55LPA",
        location: "San Francisco, United States",
        image: "avatar1"
    },
    // Add the rest of the talents here (they remain unchanged)
];

const profile = {
    name: "Jarrod Wood",
    role: "Software Engineer",
    company: "Google",
    location: "New York, United States",
    about: "As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.",
    skills: ["React", "SpringBoot", "MongoDB", "HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL", "Python", "Django", "Figma", "Sketch", "Docker", "AWS"],
    experience: [
        {
            title: "Software Engineer III",
            company: "Google",
            location: "New York, United States",
            startDate: "Apr 2022",
            endDate: "Present",
            description: "As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process."
        },
        {
            title: "Software Engineer",
            company: "Microsoft",
            location: "Seattle, United States",
            startDate: "Jun 2018",
            endDate: "Mar 2022",
            description: "At Microsoft, I worked on developing and optimizing cloud-based applications, focusing on enhancing performance and scalability. I collaborated with product managers and designers to create innovative features that improved user engagement. My responsibilities included writing clean, maintainable code, performing code reviews, and mentoring junior developers. I played a key role in migrating legacy applications to modern cloud infrastructure, resulting in significant cost savings and improved efficiency."
        }
    ],
    certifications: [
        {
            name: "Google Professional Cloud Architect",
            issuer: "Google",
            issueDate: "Aug 2023",
            certificateId: "CB72982GG"
        },
        {
            name: "Microsoft Certified: Azure Solutions Architect Expert",
            issuer: "Microsoft",
            issueDate: "May 2022",
            certificateId: "MS12345AZ"
        }
    ]
};

export { searchFields, talents, profile };

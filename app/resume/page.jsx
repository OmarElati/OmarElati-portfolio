"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
} from "react-icons/si";

// about data
const about = {
  title: "About Me",
  description: "I am a software developer based in Tunisia. I have a passion for web development and love to create websites and applications that are fast, responsive, and user-friendly. I am proficient in various programming languages and technologies, including JavaScript, React, Node.js, and more.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Omar Elati",
    },
    {
      fieldName: "Phone",
      fieldValue: "+216 93 156 234",
    },
    {
      fieldName: "Experience",
      fieldValue: "5 years",
    },
    {
      fieldName: "Email",
      fieldValue: "5796@holbertonstudents.com",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Tunisian",
    },
    {
      fieldName: "Address",
      fieldValue: "Monestir, Tunisia",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, French, Arabic",
    },
  ]
};

// experience data
const experience = {
  icon: '/assets/resume/badge.svg',
  title: ' My Experience',
  description: 'I have 5 years of experience in web development. I have worked with startups, agencies, and established companies to build responsive websites and user-friendly applications.',
  items: [
    {
      campany: "TopManager",
      position: "PFE Fullstack Project (MERN)",
      duration: "Jul 2024 - Oct 2024",
    },
    {
      campany: "AirBnB Clone",
      position: "Associated with Holberton School",
      duration: "May 2024 - May 2024",
    },
    {
      campany: "Files Manager",
      position: "Associated with Holberton School",
      duration: "Apr 2024 - Apr 2024",
    },
    {
      campany: "Sivarus - E-commerce website",
      position: "Freelance Web Developer",
      duration: "Nov 2023 - Jan 2024",
    },
    {
      campany: "AYPA",
      position: "Full Stack Developer Intren",
      duration: "Jul 2023 - September 2023",
    },
    {
      campany: "TeamTracker",
      position: "Associated with Holberton School",
      duration: "May 2023 - Jul 2023",
    },
    {
      campany: "E-commerce Startup",
      position: "Freelance Web Developer",
      duration: "February 2024 - April 2024",
    },
    {
      campany: "Simple Shell",
      position: "Associated with Holberton School",
      duration: "Dec 2022 - Dec 2022",
    },
    {
      campany: "Printf C programming function",
      position: "Associated with Holberton School",
      duration: "Nov 2022 - Nov 2022",
    },
  ]
};

// education data
const education = {
  icon: '/assets/resume/cap.svg',
  title: ' My Education',
  description: 'I have 5 years of experience in web development. I have worked with startups, agencies, and established companies to build responsive websites and user-friendly applications.',
  items: [
    {
      institution: "Holberton School",
      degree: "Full Stack Development",
      duration: "2023 - 2024",
    },
    {
      institution: "Holberton School",
      degree: "Foundations",
      duration: "2022 - 2023",
    },
    {
      institution: "Faculty of Sciences of Monastir",
      degree: "license in physics and energy",
      duration: "En progress",
    },
  ]
};

// skills data
const skills = {
  title: ' My Skills',
  description: 'I am proficient in various programming languages and technologies. I have experience working with modern web development tools and frameworks.',
  skillList: [
    {
      icon: <FaHtml5 />,
      name: 'HTML5',
    },
    {
      icon: <FaCss3 />,
      name: 'CSS3',
    },
    {
      icon: <FaJs />,
      name: 'JavaScript',
    },
    {
      icon: <FaReact />,
      name: 'React',
    },
    {
      icon: <FaNodeJs />,
      name: 'Node.js',
    },
    {
      icon: <SiTailwindcss />,
      name: 'Tailwind CSS',
    },
    {
      icon: <SiNextdotjs />,
      name: 'Next.js',
    },
    {
      icon: <FaFigma />,
      name: 'Figma',
    },
  ]
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}

      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience" >Experience</TabsTrigger>
            <TabsTrigger value="eduction">Eduction</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70px] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experience.description}</p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li key={index} className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.campany}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* eduction */}
            <TabsContent value="eduction" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{education.description}</p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li key={index} className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {skills.skillList.map((skill, index) => {
                    return <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                            <div className="text-6xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>;
                  })}
                </ul>
              </div>
            </TabsContent>
            {/* about */}
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl">{item.fieldValue}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
};

export default Resume;

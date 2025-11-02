"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import { fetchRepos } from "@/lib/fetchRepos";

const Work = () => {
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      const formattedProjects = await fetchRepos();
      console.log(formattedProjects);
      setProjects(formattedProjects);
      setProject(formattedProjects[0]);
    };
  
    fetchProjectData();
  }, []);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity:1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" }, }} className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0" >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-center order-2 xl:order-none">
          {project && (
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* project category */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category}
              </h2>
              {/* project description */}
              <p className="text-white/60 text-xs">
                {project.description}
              </p>
              {/* stack */}
              <ul className="flex gap-4">
                {/* {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })} */}
                <li className="text-xs text-accent">{project.title}</li>
                {project.stack.map((item, index) => (
                  <li key={index} className="text-xs text-white/60">
                    {item.name}
                    {index !== project.stack.length - 1 && ','}
                  </li>
                ))}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* github project button */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          )}
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper spaceBetween={30} slidesPerView={1} className="xl:h-[520px] mb-12" onSlideChange={handleSlideChange} >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[300px] sm:h-[460px] xl:h-[520px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="realtive w-full h-full">
                        <Image src={project.image} fill className="object-cover w-full h-auto sm:h-[300px] md:h-[400px] lg:h-[460px]" alt="Project Image" />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider buttons */}
              <WorkSliderBtns 
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all" />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Work

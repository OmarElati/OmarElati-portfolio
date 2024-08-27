"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";

const services = [
    {
        num: '01',
        title: 'Web Development',
        description: 'I build fast, responsive, and SEO-friendly websites using modern technologies like React, Next.js, and Tailwind CSS.',
        href: "",
    },
    {
        num: '02',
        title: 'Mobile Development',
        description: 'I build mobile applications using React Native, a cross-platform framework that allows me to build for both iOS and Android.',
        href: "",
    },
    {
        num: '03',
        title: 'UI/UX Design',
        description: 'I design beautiful and user-friendly interfaces using Figma, a collaborative design tool that allows me to create designs from start to finish.',
        href: "",
    },
    {
        num: '04',
        title: 'SEO Optimization',
        description: 'I optimize websites for search engines like Google, Bing, and Yahoo to increase visibility and drive organic traffic.',
        href: "",
    },
];

import { motion } from "framer-motion";

const Services = () => {
    return (
        <section className="min-h-[80px] flex flex-col justify-center py-12 xl:py-0">
            <div className="container mx-auto">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1,transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' }, }} className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
                    {services.map((service, index) => {
                        return (
                            <div key={index} className="flex flex-1 flex-col justify-center gap-6 group">
                                {/* top */}
                                <div className="w-full flex justify-between items-center">
                                    <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">{service.num}</div>
                                    <Link href={service.href} className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                                        <BsArrowDownRight className="text-primary text-3xl" />
                                    </Link>
                                </div>
                                {/* title */}
                                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{service.title}</h2>
                                {/* description */}
                                <p className="text-white/60">{service.description}</p>
                                {/* border */}
                                <div className="border-b border-white/20 w-full"></div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;

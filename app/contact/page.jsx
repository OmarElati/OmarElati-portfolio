"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import emailjs from "emailjs-com";


const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+216) 93 156 234",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "5796@golbertonstudents.com",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Adress",
    description: "Skanes, Monastir, Tunisia",
  },
];

import { motion } from "framer-motion";
import { SelectValue } from "@radix-ui/react-select";

const Contact = () => {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };  

  const handleServiceChange = (value) => {
    setFormData({ ...formData, service: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Email sent successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setStatus(data.message || "Failed to send email.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
    }
  };


  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1, transition: {delay: 2.4, duration: 0.4, ease: "easeIn" }, }} className="py-6" >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]" >
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none" >
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl" onSubmit={handleSubmit}>
              <h3 className="text-4xl text-accent">Let's Work together</h3>
              <p className="text-white/60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero adipisci culpa quo, dicta ratione similique. Deleniti illo magnam, neque necessitatibus optio aperiam aliquid earum et rerum qui, voluptate ullam sit.</p>
              {/* input */}
              <div className="grid grid-cols md:grid-cols-2 gap-6" >
                <Input name="firstname" type="text"  placeholder="Firstname" value={formData.firstname} onChange={handleChange} ></Input>
                <Input name="lastname" type="text" placeholder="Lastname" value={formData.lastname} onChange={handleChange} ></Input>
                <Input name="email" type="email" placeholder="Email adress" value={formData.email} onChange={handleChange} ></Input>
                <Input name="phone" type="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} ></Input>
              </div>
              {/* select */}
              <Select onValueChange={handleServiceChange}>
                <SelectTrigger className="w-full" >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Salect a service</SelectLabel>
                    <SelectItem value="web">Web Developement</SelectItem>
                    <SelectItem value="uiux">UI/UX Design</SelectItem>
                    <SelectItem value="logo">Logo Desgin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea */}
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type Your Message Here..."
                value={formData.message}
                onChange={handleChange}
              />
              {/* btn */}
              <Button size="md" className="max-w-40" type="submit" >
                Send Message
              </Button>
              {status && <p className="text-white mt-4">{status}</p>}
            </form>
          </div>
          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0" >
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
};

export default Contact;

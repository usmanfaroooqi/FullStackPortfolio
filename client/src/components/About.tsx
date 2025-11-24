import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  const skills = [
    "Image Design", "Computer Graphics", "Product Design", 
    "Branding", "Social Media Content", "Visual Design"
  ];

  const experience = [
    { year: "March 2024 - Present", role: "Graphic Designer", company: "Self Employed" },
  ];

  return (
    <section id="about" className="py-24 bg-muted/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block font-ui"
            >
              About Me
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8 font-heading leading-tight"
            >
              Designs That <br/><span className="text-primary">Communicate</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 font-body text-lg leading-relaxed space-y-6"
            >
              <p>
                I am Ali Farooqi, a passionate graphic designer specializing in modern, clean, and impactful visual design. I create branding, social media content, and digital assets that help businesses stand out with clarity and style.
              </p>
              <p>
                My work focuses on premium aesthetics, attention to detail, and designs that not only look good but communicate effectively. I’m dedicated to delivering creative solutions that elevate brands and leave a lasting impression.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 grid grid-cols-2 gap-4"
              id="services"
            >
              {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2 text-white font-ui text-sm">
                  <CheckCircle2 size={16} className="text-secondary" />
                  {skill}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="bg-card p-8 md:p-12 border border-white/5 rounded-sm relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h3 className="text-2xl font-bold text-white mb-8 font-heading flex items-center gap-3">
              <span className="w-2 h-8 bg-accent block" />
              Experience
            </h3>

            <div className="space-y-8 relative z-10">
              {experience.map((job, index) => (
                <div key={index} className="relative pl-8 border-l border-white/10 pb-2 last:pb-0">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="text-xs text-gray-500 font-ui uppercase tracking-wider mb-1 block">{job.year}</span>
                  <h4 className="text-xl font-bold text-white font-heading">{job.role}</h4>
                  <p className="text-primary text-sm font-medium mt-1">{job.company}</p>
                </div>
              ))}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-8 mt-12 font-heading flex items-center gap-3">
              <span className="w-2 h-8 bg-secondary block" />
              Education
            </h3>

            <div className="space-y-8 relative z-10">
               <div className="relative pl-8 border-l border-white/10 pb-2 last:pb-0">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="text-xs text-gray-500 font-ui uppercase tracking-wider mb-1 block">Education</span>
                  <h4 className="text-xl font-bold text-white font-heading">Matriculation, Computer Science</h4>
                  <p className="text-primary text-sm font-medium mt-1">Span Public School</p>
                </div>
            </div>

            <a 
  href="/resume.pdf" 
  download 
  className="mt-10 w-full py-3 border border-white/20 text-white font-bold uppercase tracking-wider font-ui hover:bg-white hover:text-black transition-all duration-300 text-center block"
>
  Download Full Resume
</a>
          </div>
        </div>
      </div>
    </section>
  );
}

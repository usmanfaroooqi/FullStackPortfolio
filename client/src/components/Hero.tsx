import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_dark_neon_3d_shapes_for_hero_background.png";
import profileImg from "@assets/profile-photo.png";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Darken for text readability */}
        <img
          src={heroBg}
          alt="Abstract Neon Background"
          className="w-full h-full object-cover opacity-80"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12">
        
        {/* Text Content */}
        <div className="text-center md:text-left max-w-2xl flex flex-col md:block order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 md:order-none"
          >
            <span className="inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 font-ui">
              GRAPHIC DESIGNER
            </span>
          </motion.div>
          
           <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-300 mb-12 font-body italic order-3 md:order-none"
          >
            I am Ali Farooqi, a passionate graphic designer specializing in modern, clean, and impactful visual design. I create branding, social media content, and digital assets that help businesses stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4 order-4 md:order-none"
          >
            <button 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-primary text-black font-bold font-ui uppercase tracking-wider hover:bg-white transition-colors duration-300 flex items-center gap-2 rounded-sm w-full sm:w-auto justify-center"
            >
              View Projects <ArrowRight size={18} />
            </button>
            <a href="/attached_assets/Profile (11)_1763924607756.pdf" download className="px-8 py-4 border border-white/20 text-white font-bold font-ui uppercase tracking-wider hover:bg-white/10 transition-colors duration-300 rounded-sm w-full sm:w-auto text-center block">
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Hero Image */}
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative shrink-0 order-1 md:order-2 mb-8 md:mb-0 mt-20 md:mt-0"
          >
             <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-[0_0_40px_rgba(0,255,136,0.3)] relative z-10">
               <img 
                 src={profileImg} 
                 alt="Ali Farooqi" 
                 className="w-full h-full object-cover"
                 fetchPriority="high"
                 loading="eager"
               />
             </div>
             {/* Decorative elements around the photo */}
             <div className="absolute -inset-4 border border-secondary/30 rounded-full z-0 animate-pulse"></div>
             <div className="absolute -inset-8 border border-accent/20 rounded-full z-0 opacity-50"></div>
          </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
}

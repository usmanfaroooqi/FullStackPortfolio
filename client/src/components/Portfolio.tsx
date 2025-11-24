import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { db } from "@/lib/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import img1 from "@assets/stock_images/modern_minimalist_br_9d4fdd06.jpg";
import img2 from "@assets/stock_images/futuristic_mobile_ap_be3cc9dc.jpg";

const categories = ["All", "Branding", "UI/UX", "Print", "Web Design"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    let unsubscribe: any = null;

    const initializeProjects = async () => {
      try {
        // First, fetch initial data
        const querySnapshot = await getDocs(collection(db, "projects"));
        const firebaseProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          color: "border-primary",
          text: "text-primary"
        })) as any[];
        
        setProjects(firebaseProjects);

        // Now set up real-time listener
        unsubscribe = onSnapshot(
          collection(db, "projects"),
          (querySnapshot) => {
            const updatedProjects = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              color: "border-primary",
              text: "text-primary"
            })) as any[];
            setProjects(updatedProjects);
          },
          (error) => {
            console.log("Real-time listener error:", error);
          }
        );
      } catch (error) {
        console.log("Initial fetch error:", error);
        setProjects([]);
      }
    };

    initializeProjects();

    // Cleanup subscription on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="work" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-heading">SELECTED <br/> WORK</h2>
            <div className="h-1 w-20 bg-primary mb-4"></div>
            <Link href="/admin">
               <a className="text-xs text-gray-500 hover:text-primary font-ui uppercase tracking-widest flex items-center gap-1">
                 Admin Login
               </a>
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border transition-all duration-300 font-ui ${
                  filter === cat
                    ? "border-primary text-primary bg-primary/10"
                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative cursor-pointer"
              >
                <Link href={`/project/${project.id}`}>
                  <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
                    <div className={`absolute inset-0 border-2 ${project.color} opacity-0 group-hover:opacity-100 z-30 transition-opacity duration-300 pointer-events-none`} />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 z-20 transition-all duration-500 flex flex-col items-center justify-center text-center p-6">
                      <span className={`text-xs font-bold tracking-widest uppercase mb-2 ${project.text} font-ui transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2 font-heading transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 font-body italic transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        {project.description}
                      </p>
                      <div className="mt-6 p-3 rounded-full border border-white/20 text-white transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-150">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="mt-4 flex justify-between items-center md:hidden">
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">{project.title}</h3>
                    <p className="text-sm text-gray-400 font-ui">{project.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

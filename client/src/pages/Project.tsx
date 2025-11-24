import { useRoute, Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Project() {
  const [match, params] = useRoute("/project/:id");
  const id = params?.id;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  if (!match || error || !project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl text-white mb-4">Project not found</h1>
        <Link href="/">
          <a className="text-primary hover:underline">Return Home</a>
        </Link>
      </div>
    );
  }

  // Ensure arrays exist even if data is partial
  const services = Array.isArray(project.services) ? project.services : (project.services ? [project.services] : []);
  const additionalImages = Array.isArray(project.images) ? project.images : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-24 container mx-auto px-6">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 font-ui text-sm uppercase tracking-wider">
            <ArrowLeft size={16} /> Back to Projects
          </a>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block font-ui">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-heading leading-none">
              {project.title}
            </h1>
            
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10 mb-8">
              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-ui">Client</h4>
                <p className="text-white font-body text-lg">{project.client}</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-ui">Year</h4>
                <p className="text-white font-body text-lg">{project.year}</p>
              </div>
              <div className="col-span-2">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-ui">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {services.map((s: string) => (
                    <span key={s} className="px-3 py-1 bg-white/5 text-sm text-gray-300 rounded-full font-ui">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-300 font-body text-lg leading-relaxed mb-8">
              {project.description}
            </p>
            
            <a href="#" className="inline-flex items-center gap-2 text-white border-b border-white hover:text-primary hover:border-primary transition-colors pb-1 font-ui font-bold uppercase tracking-wide text-sm">
              Visit Live Project <ExternalLink size={14} />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
             <div className="aspect-[4/5] rounded-sm overflow-hidden bg-card">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
             </div>
          </motion.div>
        </div>

        {additionalImages.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
             {additionalImages.map((img: string, idx: number) => (
               <div key={idx} className="aspect-video bg-card rounded-sm overflow-hidden">
                 <img src={img} alt="Project detail" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

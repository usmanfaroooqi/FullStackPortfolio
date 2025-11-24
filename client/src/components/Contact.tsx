import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();

  return (
    <section id="contact" className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 font-heading leading-none">
                LET'S <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">CREATE</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-md font-body">
                Got a project in mind? Let's collaborate and build something extraordinary together.
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 rounded-sm text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold font-heading mb-1">Email</h4>
                  <p className="text-gray-400 font-ui">alifarwqui@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 rounded-sm text-secondary group-hover:bg-secondary group-hover:text-black transition-colors duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold font-heading mb-1">Phone</h4>
                  <p className="text-gray-400 font-ui">+92 (300) 2435864</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 rounded-sm text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold font-heading mb-1">Location</h4>
                  <p className="text-gray-400 font-ui">Available to work remotely</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-8 border border-white/5 rounded-sm"
          >
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                try {
                  const response = await fetch("https://formspree.io/f/xnnrkqby", {
                    method: "POST",
                    body: formData,
                    headers: {
                      'Accept': 'application/json'
                    }
                  });
                  if (response.ok) {
                    toast({
                      title: "Message Sent",
                      description: "Thank you! I will get back to you soon.",
                      className: "bg-primary text-black border-none"
                    });
                    (e.target as HTMLFormElement).reset();
                  } else {
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "Something went wrong. Please try again.",
                    });
                  }
                } catch (error) {
                  toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to send message.",
                  });
                }
              }}
              className="space-y-6"
            >
                <div>
                  <label className="text-white font-ui uppercase tracking-wider text-xs block mb-2">Name</label>
                  <Input name="name" placeholder="John Doe" className="bg-white/5 border-white/10 text-white focus:border-primary h-12 font-body" required />
                </div>
                
                <div>
                  <label className="text-white font-ui uppercase tracking-wider text-xs block mb-2">Email</label>
                  <Input name="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white focus:border-primary h-12 font-body" required />
                </div>

                <div>
                  <label className="text-white font-ui uppercase tracking-wider text-xs block mb-2">Message</label>
                  <Textarea name="message" placeholder="Tell me about your project..." className="bg-white/5 border-white/10 text-white focus:border-primary min-h-[150px] font-body resize-none" required />
                </div>
                
                <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-primary hover:text-black font-bold font-ui uppercase tracking-wider transition-colors duration-300 rounded-sm">
                  Send Message
                </Button>
              </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-2xl font-bold font-heading tracking-tighter text-white">
          PORTFOLIO<span className="text-primary">.</span>
        </div>
        
        <div className="flex gap-6">
          <a href="https://www.instagram.com/alifarooqi_24?igsh=MXE0Nzl3MGloaWNmYQ==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ali-faroooqi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
           <a href="https://www.behance.net/alitayyib1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" style={{display:'none'}} /> 
              {/* Behance Icon Path */}
              <path d="M22 7H17" />
              <path d="M15.5 14H18.5C19.3284 14 20 13.3284 20 12.5C20 11.6716 19.3284 11 18.5 11H15.5V14Z" />
              <path d="M15.5 17H18.5C19.3284 17 20 16.3284 20 15.5C20 14.6716 19.3284 14 18.5 14H15.5V17Z" />
              <path d="M2 17V7H7.5C9.433 7 11 8.567 11 10.5C11 11.7319 10.3576 12.8147 9.38925 13.418C10.6851 13.8578 11.5 15.1215 11.5 16.5C11.5 18.567 9.433 20 7.5 20H2V17Z" />
              <path d="M5.5 10.5H7.5C8.32843 10.5 9 9.82843 9 9C9 8.17157 8.32843 7.5 7.5 7.5H5.5V10.5Z" />
              <path d="M5.5 16.5H7.5C8.32843 16.5 9 15.8284 9 15C9 14.1716 8.32843 13.5 7.5 13.5H5.5V16.5Z" />
            </svg>
          </a>
        </div>

        <div className="text-gray-500 text-sm font-ui">
          &copy; 2025 Ali Farooqi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

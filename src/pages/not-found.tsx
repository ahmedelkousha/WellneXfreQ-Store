import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 pt-24 pb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-lg mx-auto"
      >
        <h1 className="text-9xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-white/20 mb-6 tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequency Not Found</h2>
        <p className="text-white/60 mb-8 leading-relaxed text-lg">
          The page you are searching for has drifted out of resonance. Let's tune back to the main spectrum.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/5 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>
          <Button 
            onClick={() => navigate("/")} 
            className="bg-primary hover:bg-primary/90 text-black w-full sm:w-auto"
          >
            <Home className="w-4 h-4 mr-2" /> Return to Base
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

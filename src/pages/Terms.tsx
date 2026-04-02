import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using the wellneXfreQ website, purchasing our frequency wellness technology, or submitting inquiries, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or services.`
  },
  {
    title: "Use of Our Technology",
    body: `wellneXfreQ provides advanced frequency wellness equipment. Our products are designed for wellness, relaxation, and physical performance optimization. They are not medical devices. Any information provided by wellneXfreQ regarding our technology is for educational purposes only and should not replace professional medical advice, diagnosis, or treatment.`
  },
  {
    title: "Purchases and Inquiries",
    body: `Product pricing, availability, and specifications are subject to change without notice. All formal purchases are handled via direct consultation. wellneXfreQ reserves the right to refuse service or cancel inquiries at our sole discretion.`
  },
  {
    title: "Intellectual Property",
    body: `All content, images, graphics, and text on this website are the property of wellneXfreQ or its content suppliers and are protected by international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.`
  },
  {
    title: "Limitation of Liability",
    body: `In no event shall wellneXfreQ, its directors, employees, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of our website or products. This includes, but is not limited to, damages for loss of profits, goodwill, use, or data.`
  },
  {
    title: "Governing Law",
    body: `These Terms of Service are governed by and construed in accordance with the laws of Australia and Poland, without regard to conflict of law principles. Any legal action or proceeding arising out of these terms shall be brought exclusively in the applicable courts of these jurisdictions.`
  },
  {
    title: "Updates to Terms",
    body: `We reserve the right to update or modify these Terms of Service at any time without prior notice. Your continued use of the website after any such changes constitutes your acceptance of the new Terms.`
  },
  {
    title: "Contact Information",
    body: `Questions about the Terms of Service should be sent to us at your@wellnexfreq.com.`
  }
];

export default function Terms() {
  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <div className="pt-32 pb-16 relative border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-white/50 text-sm">
              Effective date: <span className="text-white/70">April 1, 2026</span>
            </p>
            <p className="text-white/60 mt-6 leading-relaxed">
              Welcome to wellneXfreQ. These Terms of Service outline the rules and regulations for the use of our website and the acquisition of our frequency wellness technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-12"
        >
          {sections.map((section, i) => (
            <motion.div key={i} variants={fadeIn} className="space-y-3">
              <h2 className="text-xl font-heading font-bold text-white">
                {i + 1}. {section.title}
              </h2>
              <p className="text-white/65 leading-relaxed text-base">
                {section.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-white/40"
        >
          <p>wellneXfreQ &copy; {new Date().getFullYear()}. All rights reserved.</p>
          <Link to="/contact" className="text-primary hover:text-primary/80 transition-colors">
            Contact us with questions
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

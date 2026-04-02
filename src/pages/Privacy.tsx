import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const sections = [
  {
    title: "Information We Collect",
    body: `When you submit an inquiry through our contact form, we collect the following information: your full name, email address, phone number (if provided), the product or service you are interested in, your message, and how you heard about us. We may also collect basic analytics data such as pages visited and time spent on the site through standard web analytics tools. We do not collect payment information — all purchases are handled through direct inquiry, not an online checkout.`
  },
  {
    title: "How We Use Your Information",
    body: `The information you provide is used solely to respond to your inquiry, provide product information, and follow up on your interest in our frequency wellness technology. We do not use your data for automated marketing campaigns without your consent. If you have expressed interest in receiving educational content or updates from wellneXfreQ, we may send occasional communications about new products, blog articles, or relevant wellness information. You may unsubscribe at any time.`
  },
  {
    title: "Information Sharing",
    body: `We do not sell, trade, or rent your personal information to third parties. We may share necessary information with trusted service providers who assist us in operating our website or conducting our business — for example, email service providers — provided that those parties agree to keep your information confidential. We may disclose information when required by law or to protect the rights, property, or safety of wellneXfreQ, our clients, or others.`
  },
  {
    title: "Data Retention",
    body: `We retain your personal information for as long as is necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Inquiry data is retained for a period of up to 3 years to support ongoing client relationships and service history. You may request deletion of your data at any time by contacting us directly at your@wellnexfreq.com.`
  },
  {
    title: "Cookies and Tracking",
    body: `Our website uses cookies and similar tracking technologies to enhance your browsing experience. Essential cookies are required for the site to function. Analytics cookies help us understand how visitors interact with our content — this data is aggregated and anonymised. You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of some parts of the site.`
  },
  {
    title: "Your Rights",
    body: `Depending on your location, you may have rights under applicable data protection laws including: the right to access personal information we hold about you, the right to correct inaccurate information, the right to request deletion of your data, the right to withdraw consent for communications at any time, and the right to lodge a complaint with a relevant supervisory authority. To exercise any of these rights, please contact us at your@wellnexfreq.com.`
  },
  {
    title: "Security",
    body: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. While we take the security of your data seriously, no method of transmission over the internet or electronic storage is 100% secure. We encourage you to exercise caution when sharing personal information online.`
  },
  {
    title: "Third-Party Links",
    body: `Our website may contain links to third-party websites, including social media platforms and external resources. This Privacy Policy applies only to information collected on the wellneXfreQ website. We are not responsible for the privacy practices of external sites and encourage you to review their privacy policies independently.`
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make material changes, we will update the effective date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after any changes constitutes your acceptance of the updated policy.`
  },
  {
    title: "Contact Us",
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact us at: your@wellnexfreq.com. We aim to respond to all privacy-related inquiries within 10 business days.`
  }
];

export default function Privacy() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-white/50 text-sm">
              Effective date: <span className="text-white/70">April 1, 2026</span>
            </p>
            <p className="text-white/60 mt-6 leading-relaxed">
              wellneXfreQ ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or submit an inquiry through our contact form.
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

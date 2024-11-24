import NewsletterInstagramSection from "@/components/About/NewsletterInstagramSection/NewsletterInstagramSection";
import ContactForm from "@/components/Contact/ContactForm/ContactForm";
import ContactSection from "@/components/Contact/ContactSection/ContactSection";
import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div>
      <ContactSection />
      <ContactForm />
      <NewsletterInstagramSection />
    </div>
  );
};

export default ContactPage;

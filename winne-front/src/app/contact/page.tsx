import ContactForm from "@/components/Contact/ContactForm/ContactForm";
import ContactSection from "@/components/Contact/ContactSection/ContactSection";
import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div>
          <ContactSection />
          <ContactForm/>
    </div>
  );
};

export default ContactPage;

import AboutContent from "@/components/About/AboutContent/AboutContent";
import AboutFeatureSection from "@/components/About/AboutFeatureSection/AboutFeatureSection";
import NewsletterInstagramSection from "@/components/About/NewsletterInstagramSection/NewsletterInstagramSection";
import TeamSection from "@/components/About/TeamSection/TeamSection";
import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div>
      <AboutContent />
      <AboutFeatureSection />
      <TeamSection />
      <NewsletterInstagramSection />
    </div>
  );
};

export default AboutUsPage;

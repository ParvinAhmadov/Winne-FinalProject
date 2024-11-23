import AboutContent from "@/components/About/AboutContent/AboutContent";
import AboutFeatureSection from "@/components/About/AboutFeatureSection/AboutFeatureSection";
import TeamSection from "@/components/About/CustomSwiper/TeamSection";
import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div>
          <AboutContent />
          <AboutFeatureSection />
          <TeamSection/>
    </div>
  );
};

export default AboutUsPage;

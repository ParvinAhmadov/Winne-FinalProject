import BestSellersSection from "@/components/BestSellersSection/BestSellersSection";
import EmailSignupModal from "@/components/EmailSignupModal/EmailSignupModal";
import HomeImageSwiper from "@/components/HomeImageSwiper/HomeImageSwiper";
import HotDealSection from "@/components/HotDealSection/HotDealSection";
import IconSection from "@/components/IconSection/IconSection";
import OurBlogSection from "@/components/OurBlogSection/OurBlogSection";
import RedGrapeWine from "@/components/RedGrapeWine/RedGrapeWine";
import WineShowcase from "@/components/WineShowcase/WineShowcase";

export default function Home() {
  return (
    <div>
      <HomeImageSwiper />
      <EmailSignupModal />
      <RedGrapeWine />
      <BestSellersSection />
      <WineShowcase />
      <HotDealSection />
      <IconSection />
      <OurBlogSection/>
    </div>
  );
}

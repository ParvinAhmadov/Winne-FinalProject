import BestSellersSection from "@/components/BestSellersSection/BestSellersSection";
import EmailSignupModal from "@/components/EmailSignupModal/EmailSignupModal";
import HomeImageSwiper from "@/components/HomeImageSwiper/HomeImageSwiper";
import RedGrapeWine from "@/components/RedGrapeWine/RedGrapeWine";

export default function Home() {
  return (
    <div>
      <HomeImageSwiper />
      <EmailSignupModal />
      <RedGrapeWine />
      <BestSellersSection />
    </div>
  );
}

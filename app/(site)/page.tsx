import AuthSection from "./components/AuthSection";
import FeatureSection from "./components/FeatureSection";
import HeroSection from "./components/HeroSection";
import LandingNav from "@/components/navigation/LandingNav";

const Home: React.FC = () => {
  return (
    <>
      <LandingNav />
      <HeroSection />
      <FeatureSection />
      <AuthSection />
    </>
  );
};

export default Home;
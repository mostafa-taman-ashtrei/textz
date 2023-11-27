import AuthSection from "./components/AuthSection";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LandingNav from "@/components/navigation/LandingNav";

const Home: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black h-screen">
      <LandingNav />
      <HeroSection />
      <FeatureSection />
      <AuthSection />
      <Footer />
    </div>
  );
};

export default Home;
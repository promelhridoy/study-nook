import HeroPage from "@/components/homepage/Banner";
import HowItWorks from "@/components/homepage/HowItWorks";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import StudyRules from "@/components/homepage/StudyRules";
import PlatformStats from "@/components/homepage/PlatformStats";


export default function Home() {
  return (
    <div>
      <HeroPage/>
      <HowItWorks/>
      <WhyChooseUs/>
      <StudyRules/>
      <PlatformStats/>
    </div>
  );
}

// import logo from "@/assets/logo.png";
// import resumePreview from "@/assets/resume-preview.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "./frontend/herosection";
import { Navbar } from "./frontend/Navbar";
import { FeaturesSection } from "./frontend/Feature";
import { HowItWorksSection } from "./frontend/working";
import  {Footer} from "./frontend/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main>
        <HeroSection/>
        <FeaturesSection />
        <HowItWorksSection />
        
      </main>
      <Footer />
    </div>
  );
}
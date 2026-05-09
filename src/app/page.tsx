import { Navbar }      from "@/components/sections/navbar";
import { Hero }        from "@/components/sections/hero";
import { Features }    from "@/components/sections/features";
import { SocialProof } from "@/components/sections/social-proof";
import { Pricing }     from "@/components/sections/pricing";
import { FAQ }         from "@/components/sections/faq";
import { Footer }      from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import OurStory from '@/components/sections/OurStory'
import TheCraft from '@/components/sections/TheCraft'
import TheMenu from '@/components/sections/TheMenu'
import Atmosphere from '@/components/sections/Atmosphere'
import VisitUs from '@/components/sections/VisitUs'
import Footer from '@/components/sections/Footer'
import SectionDivider from '@/components/ui/SectionDivider'
import JsonLd from '@/components/JsonLd'
import IntroOverlayWrapper from '@/components/IntroOverlayWrapper'

export default function Home() {
  return (
    <>
      <JsonLd />
      <IntroOverlayWrapper />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider fromColor="#1A1A1A" toColor="#F5F0E8" />
        <OurStory />
        <SectionDivider fromColor="#F5F0E8" toColor="#2C3E35" />
        <TheCraft />
        <SectionDivider fromColor="#2C3E35" toColor="#F5F0E8" />
        <TheMenu />
        <SectionDivider fromColor="#F5F0E8" toColor="#1A1A1A" />
        <Atmosphere />
        <SectionDivider fromColor="#1A1A1A" toColor="#2C3E35" />
        <VisitUs />
        <SectionDivider fromColor="#2C3E35" toColor="#1A1A1A" />
        <Footer />
      </main>
    </>
  )
}

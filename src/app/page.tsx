import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import YouTube from "@/components/YouTube";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Gallery />
        <Motion />
        <YouTube />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import NavBar from "@/components/NavBar";
import TerminalHero from "@/components/TerminalHero";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#0A0A0B] min-h-screen">
      <NavBar />
      <TerminalHero />
      <Projects />
      <Stack />
      <Contact />
    </main>
  );
}

import ButtonWA from "./_components/ButtonWA";
import Credibilities from "./_components/Credibilities";
import Features from "./_components/Features";
import Heroes from "./_components/Heroes";
import OurClient from "./_components/OurClient";
import Solutions from "./_components/Solutions";
import Testimonies from "./_components/Testimonies";

export default async function Home() {
  return (
    <div className="overflow-hidden">
      <Heroes />
      <Solutions />
      <Credibilities />
      <Features />
      <OurClient />
      <Testimonies />
      <ButtonWA />
    </div>
  );
}

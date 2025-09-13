import { Typography } from "@mui/material";
import Hero from "./components/Hero";
import OurCollection from "./components/OurCollection";
import CommunityCollection from "./components/CommunityCollection";

export default function Home() {
  return (
    <>
      <Hero />
      <OurCollection />
      <CommunityCollection />
    </>
  );
}
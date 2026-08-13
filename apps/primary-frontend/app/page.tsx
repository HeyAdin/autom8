import {redirect} from 'next/navigation'
import { Container } from "../components/container";
import { NavBar } from "../components/navbar";
import { getServerSession } from "next-auth";
import { Hero } from '../components/hero';
import { LandingImages } from '../components/landingImages';

export default async function Home() {
  const session = await getServerSession();
  return (
    <Container>
      <NavBar className="" unProtected={true}/>
      <Hero/>
      <LandingImages/>
    </Container>
  );
}

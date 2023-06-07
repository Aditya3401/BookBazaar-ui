import React from "react";
import Navbar from "../Components/Navbar";
import Crousal from "../Components/Crousal";
import CategorySection from "../Components/CategorySection";
import InfoSection from "../Components/InfoSection";
import FooterMain from "../Components/FooterMain";
import TrendingSection from "../Components/TrendingSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <Crousal />
      <InfoSection />
      <TrendingSection />
      <CategorySection />
      <FooterMain />
    </>
  );
};

export default Home;

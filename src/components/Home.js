import React from "react";
import Navbar from "./navbar/Navbar";
import Banner from "./banner/Banner";
import Skill from "./coinList/CoinList";

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Skill></Skill>
    </>
  );
}

export default Home;
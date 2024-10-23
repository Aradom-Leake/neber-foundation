// InfrastructurePage.js

import React from "react";
import "./styles.css"; // Import CSS for styling
import NavBar from "../NavBar";
import Footer from "../Footer";
import image1 from "./imgs/image1.jpg";
import man1 from "./imgs/man1.png";
import man2 from "./imgs/man2.png";
import man3 from "./imgs/man3.png";
import man4 from "./imgs/man4.png";
import man5 from "./imgs/man5.png";
import man6 from "./imgs/man6.png";
import man7 from "./imgs/man7.png";
import man8 from "./imgs/man8.png";
import man9 from "./imgs/man9.png";
//import image2 from "./img/image2.jpg";
//import image3 from "./img/image3.jpg";
import MultiImageSlider from "./multiImageSlider";

const images = [
  { image: man1, title: "Job Creation in Manufacturing" },

  { image: man2, title: " Processing & Retail" },

  { image: man3, title: "Low-Cost Housing Construction" },
  { image: man4, title: "Smart apartment" },
  {
    image: man5,
    title:
      "E BIKE, E motorcycle, E Bus, Fuel Cel, E Farming Machineries assembl",
  },
  { image: man6, title: "Green Transportation" },
  { image: man7, title: "Microfinance Institute" },
  { image: man8, title: "Community Retail  Stores" },
  { image: man9, title: "Fiberglass factory" },

  // Add more image URLs as needed
];

const InfrastructurePage = () => {
  return (
    <>
      <NavBar />
      <div className="page-container">
        <div className="sec1container">
          <div className="title">
            <h1>Infrastructure</h1>
          </div>
          <div className="content">
            <p>
              <b>Infrastructure improvement:</b> refers to initiatives focused
              on enhancing the physical and organizational structures essential
              for the functioning of a society or community. This encompasses
              various sectors such as transportation, energy, water supply,
              sanitation, communication, and public facilities.
            </p>
          </div>
        </div>

        <div className="sec2container">
          <div className="goalco">
            <div className="title">
              <h1>Our Goal</h1>
            </div>
            <div className="gcontent">
              <p className="gcontentp">
                "Facilitating infrastructure improvement to enhance
                connectivity, foster economic development, and improve quality
                of life for all members of the community."
              </p>
            </div>
          </div>
        </div>
        <div className="cursel">
          <h2 className="curselh">Coming Projects in Tigray</h2>
          <MultiImageSlider images={images} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InfrastructurePage;

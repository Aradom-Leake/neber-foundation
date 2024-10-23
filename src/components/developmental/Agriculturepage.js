// AgriculturePage.js

import React from "react";
import "./styles.css"; // Import CSS for styling
import NavBar from "../NavBar";
import Footer from "../Footer";
import image1 from "./imgs/image1.jpg";
import agr11 from "./imgs/agr11.png";
import agr12 from "./imgs/agr12.png";
import agr8 from "./imgs/agr8.png";
import agr9 from "./imgs/agr9.png";
import agr10 from "./imgs/agr10.png";
import agr5 from "./imgs/agr5.png";
import agr6 from "./imgs/agr6.png";

import MultiImageSlider from "./multiImageSlider";

const images = [
  { image: agr11, title: " Processing & Retail" },
  { image: agr12, title: "Record Keeping and Planning" },

  { image: agr9, title: "Irrigation" },

  { image: agr10, title: "Post-Harvest Handling" },
  { image: agr8, title: "Farm Maintenance" },
  { image: agr5, title: "improving farming methods" },
  { image: agr6, title: "Harvesting" },

  // Add more image URLs as needed
];

const AgriculturePage = () => {
  return (
    <>
      <NavBar />
      <div className="page-container">
        <div className="sec1container">
          <div className="title">
            <h1>Agricultural Development</h1>
          </div>
          <div className="content">
            <p>
              <b>Agricultural development:</b> refers to initiatives and
              strategies aimed at improving agricultural productivity,
              sustainability, and livelihoods within a given region or
              community. It encompasses efforts to enhance various aspects of
              agriculture, including crop production, livestock management,
              agribusiness development, and natural resource management.
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
                "Fostering sustainable agricultural development to enhance food
                security, promote economic growth, and improve livelihoods in
                rural communities."
              </p>
            </div>
          </div>
        </div>

        <div className="cursel">
          <h1 className="curselh">Agricultural programs</h1>
          <MultiImageSlider images={images} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgriculturePage;

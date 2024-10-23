// HealthPage.js

import React from "react";
import "./styles.css"; // Import CSS for styling
import Footer from "../Footer";
import NavBar from "../NavBar";
import image1 from "./imgs/image1.jpg";
import helth1 from "./imgs/helth1.png";
import helth2 from "./imgs/helth2.png";
import helth3 from "./imgs/helth3.png";
import helth4 from "./imgs/helth4.png";
import helth5 from "./imgs/helth5.png";

import MultiImageSlider from "./multiImageSlider";

const images = [
  { image: helth1, title: "provide basic healthcare services." },

  { image: helth2, title: "Conducting health awareness" },

  { image: helth3, title: "Distributing medical supplies " },
  { image: helth4, title: "Setting up health clinics" },
  { image: helth5, title: "improving destructed materials due to war" },

  // Add more image URLs as needed
];

const HealthPage = () => {
  return (
    <>
      <NavBar />
      <div className="page-container">
        <div className="sec1container">
          <div className="title">
            <h1>Healthcare Access</h1>

            {/* Add more detailed content here */}
          </div>
          <div className="content">
            <p>
              <b>Healthcare access:</b> refers to the ability of individuals and
              communities to obtain healthcare services when needed. It
              encompasses factors such as the availability, affordability, and
              quality of healthcare services, as well as the physical and
              geographical accessibility of healthcare facilities. In summary,
              healthcare access ensures that people can receive timely and
              appropriate medical care to maintain or improve their health and
              well-being.
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
                "Ensuring equitable access to quality healthcare services for
                all, thereby improving health outcomes and enhancing overall
                well-being within our community."
              </p>
            </div>
          </div>
        </div>
        <div className="cursel">
          <h1 className="curselh">Healthcare Access</h1>
          <MultiImageSlider images={images} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HealthPage;

// HealthPage.js

import React from "react";
import "./styles.css"; // Import CSS for styling
import Footer from "../Footer";
import NavBar from "../NavBar";
import image1 from "./imgs/image1.jpg";
import edu1 from "./imgs/edu1.png";
import edu2 from "./imgs/edu2.png";
import edu3 from "./imgs/edu3.png";
import edu4 from "./imgs/edu4.png";
import edu5 from "./imgs/edu5.png";
import edu6 from "./imgs/edu6.png";
import edu55 from "./imgs/edu55.png";

import MultiImageSlider from "./multiImageSlider";

const images = [
  { image: edu1, title: "building schools" },

  { image: edu55, title: "improving learning materials" },

  { image: edu2, title: "updating educational resources" },
  { image: edu3, title: "improve class room materials" },
  { image: edu6, title: "Fostering Lifelong Learning" },
  { image: edu4, title: "improving libraries and lab areas" },
  { image: edu5, title: "technology-enabled learning" },

  // Add more image URLs as needed
];

const EducationPage = () => {
  return (
    <>
      <NavBar />
      <div className="page-container">
        <div className="sec1container">
          <div className="title">
            <h1>Education enhancement</h1>

            {/* Add more detailed content here */}
          </div>
          <div className="content">
            <p>
              <b>Education enhancement:</b> is a term that encapsulates efforts
              aimed at improving and enriching the educational experience and
              outcomes for individuals and communities. It involves implementing
              initiatives and strategies to enhance various aspects of
              education, including access, quality, relevance, and equity.
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
                "Inspiring lifelong learning and academic excellence, our goal
                is to provide equitable access to quality education for all.
                Through innovative teaching methods and personalized support, we
                aim to empower individuals to reach their full potential and
                contribute positively to society."
              </p>
            </div>
          </div>
        </div>
        <div className="cursel">
          <h1 className="curselh">Education Enhancement</h1>
          <MultiImageSlider images={images} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EducationPage;

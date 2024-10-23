/* eslint-disable no-console */
import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Img1 from "./img1.png";
import Img2 from "./img2.jpg";
// import Img3 from "./img5.png";
import Img4 from "./food1.png";
import Img6 from "./child1.png";
// import Img5 from "./med2.png";
import "../App.css";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthProvider";

import Fade from "react-reveal/Fade";
//import Zoom from "react-reveal/Zoom";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { auth } = useAuth();
  useEffect(() => {
    console.log(auth);
  }, [auth]);
  return (
    <div>
      <nav>
        <NavBar />
      </nav>

      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        // data-bs-ride="false"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={Img1} class="img-1 d-block w-100 hd-image" alt="..." />
            <div class="carousel-caption  d-md-block">
              <h1 className="welcome-image-heading">
                <Trans i18nKey="slogan" components={{ 1: <br /> }} />
              </h1>
              <div className="curbutten">
                <a href="/donator/don" className="">
                  <input
                    type="submit"
                    className="donationbtn"
                    style={{ maxWidth: "120px" }}
                    value={t("donate")}
                  />
                </a>

                <a href="/careers/all" className="">
                  <input
                    type="submit"
                    className="donationbtn"
                    style={{ maxWidth: "120px" }}
                    value={t("careers")}
                  />
                </a>
              </div>
              <h4 className="text-muted d-none">{t("slogan2")}</h4>
            </div>
          </div>
          <div class="carousel-item">
            <img src={Img6} class="d-block w-100 hd-image" alt="..." />
            <div class="carousel-caption  d-md-block">
              <h1 className="welcome-image-heading">
                {" "}
                <Trans i18nKey="slogan2" components={{ 1: <br /> }} />
              </h1>

              <div className="curbutten">
                <a href="/donator/don" className="">
                  <input
                    type="submit"
                    className="donationbtn"
                    style={{ maxWidth: "120px" }}
                    value={t("donate")}
                  />
                </a>

                <a href="/careers/all" className="">
                  <input
                    type="submit"
                    className="donationbtn"
                    style={{ maxWidth: "120px" }}
                    value={t("careers")}
                  />
                </a>
              </div>

              <h4 className="text-muted d-none">{t("slogan4")}</h4>
            </div>
          </div>

          <div class="carousel-item">
            <img src={Img2} class="d-block w-100 hd-image" alt="..." />
            <div class="carousel-caption  d-md-block">
              <h1 className="welcome-image-heading">{t("slogan4")}</h1>

              <div className="curbutten">
                <a href="/donator/don" className="">
                  <input
                    type="submit"
                    className="donationbtn"
                    style={{ maxWidth: "120px" }}
                    value={t("donate")}
                  />
                </a>

                <a href="/careers/all" className="">
                  <input
                    type="submit"
                    className="donationbtn"
                    style={{ maxWidth: "120px" }}
                    value={t("careers")}
                  />
                </a>
              </div>

              <h4 className="text-muted d-none">{t("slogan5")}</h4>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      {/* <div
        className="continer"
        style={{
          width: "97% ",
          margin: "50px auto",
          backgroundColor: "white",
          padding: "10px",
        }}
      > */}
      {/* <div
          className="continer1"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
            width: "92%",
            backgroundColor: "white",
            margin: "15px auto",
          }}
        > */}
      {/* <div className="">
            <img className="img-about" src={Img5} />
          </div> */}
      <Fade top duration={1000} distance="10%">
        <div className="introduction">
          <p className="introh6">{t("aboutNiber")}</p>
        </div>

        <div
          className=" flex-column-reverse flex-lg-row"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "35px",
            width: "98%",
            backgroundColor: "whitesmoke",
            margin: "60px auto",
            padding: "50px",
          }}
        >
          <div className="volunteerco">
            <h4 className="volunteerh4">{t("about volunteers")}</h4>
            <h6 className="volunteerh6">
              <Trans i18nKey="volunteer paragraph" components={{ 1: <br /> }} />
            </h6>
          </div>
          <div
            style={{
              flex: "1",
            }}
          >
            <img className="img-about" src={Img4} />
          </div>
        </div>
        {/* </div> */}

        {/* home vacancy section   */}
        <div className="job-vacancies-container">
          {/* Background image */}
          <div className="background-image">
            {/* Highlighted text overlay */}
            <div className="highlighted-text">
              <h1>{t("hiring")}</h1>
              <p>{t("hiringh1")}</p>
              <Link to="/careers/all">
                <button className="apply-button">{t("hiringbutton")}</button>
              </Link>
            </div>
          </div>
        </div>
        {/* ways we help section */}

        <div className="aid-section-container">
          <h2>{t("ways we help")}</h2>
          <div className="aid-categories">
            <div className="aid-category">
              <h3>{t("health")}</h3>
              <p>{t("health-disc")}</p>
            </div>
            <div className="aid-category">
              <h3>{t("donation")}</h3>
              <p>{t("donation-disc")}</p>
            </div>

            <div className="aid-category">
              <h3>{t("education")}</h3>
              {/* <p>Empowering through learning and knowledge.</p> */}

              <p>{t("education-disc")}</p>
            </div>
          </div>
          {/* <div className="see-more">
          <a href="#main-section">See More</a>
        </div> */}
        </div>
      </Fade>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

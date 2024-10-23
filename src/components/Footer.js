import React from "react";
import Logo2 from "../assets/images/niberlogo.png";
import "./requester/footer.css";
import { useTranslation } from "react-i18next";
function Footer() {
  const { t, i18n } = useTranslation();
  return (
    <div
      style={{
        marginTop: 30,
      }}
    >
      <footer className="text-center text-lg-start text-white bg-gradient-secondary">
        <section className="d-flex justify-content-around p-4 border-bottom">
          <div className="me-5 d-none d-lg-block ">
            <span>{t('get connected with us')}</span>
          </div>

          <div>
            <a
              href="https://www.facebook.com/Niber.Foundation"
              className="me-4 text-reset"
              target="_blank"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://twitter.com/NiberFoundation?t=EVaHrxbBUpKrEKte3DSfEQ&s=09"
              className="me-4 text-reset"
              target="_blank"
            >
              <i className="bi bi-twitter"></i>
            </a>
            <a
              href="https://www.youtube.com/@NiberFoundation"
              className="me-4 text-reset"
              target="_blank"
            >
              <i className="bi bi-youtube"></i>
            </a>
            <a
              href="https://www.instagram.com/niber_foundation/"
              className="me-4 text-reset"
              target="_blank"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a href="" className="me-4 text-reset" target="_blank">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="" className="me-4 text-reset" target="_blank">
              <i className="bi bi-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <div className="">
                  <img className="img-footer" src={Logo2} />
                </div>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-reset text-uppercase fw-bold mb-4">
                  {t('learn more')}
                </h6>
                <p>
                  <a href="#!" className="text-reset">
                    {t('how we work')}
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    {t('common questions')}
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-reset text-uppercase fw-bold mb-4">
                  {t('resources')}
                </h6>
                <p>
                  <a href="#!" className="text-reset">
                    {t('careers')}
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    {t('about')}
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-reset text-uppercase fw-bold mb-4">
                  {t('contact')}
                </h6>
                <p>
                  <i className="bi bi-geo-alt-fill pe-3"></i>{t('address')}
                </p>
                <p>
                  <i className="bi bi-envelope-fill pe-3"></i>{" "}
                  niberf14@gmail.com
                </p>
                <p>
                  <i className="bi bi-phone-fill pe-3"></i>{" "}
                  +251932041494
                </p>
                <p>
                  <i className="bi bi-telephone-fill pe-3"></i>{" "}
                  +251937125613
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4">
          © 2024 :
          <a className="text-reset fw-bold" href="#">
            {" "}
           {t('Niber-Foundation')}
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

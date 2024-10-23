import React, { useEffect, useState } from "react";
import Logo from "../assets/images/niberlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "./common/getCookie";
import { getUserDonations } from "../api/donator.api";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import "../App.css";

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [showDonations, setShowDonations] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleCollapse = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    userId
      ? getUserDonations(userId)
          .then((donations) => {
            setShowDonations(donations.length > 0);
          })
          .catch((e) => console.log(e))
      : setShowDonations(false);
  }, [userId]);

  useEffect(() => {
    setUserId(getCookie("uId"));
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    // Clear cookies and navigate to sign-in page
    document.cookie = "uId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "roles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/user/signin");
  };

  return (
    <div style={{ marginBottom: "70px" }}>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/">
            <img className="img-navbar" src={Logo} alt="Niber Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon">
              {expanded ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-bars"></i>
              )}
            </span>
          </button>
          <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item ms-3">
                <a className="nav-link active" aria-current="page" href="/">
                  {t("home")}
                </a>
              </li>

              {/* developmental*/}
              <li className="nav-item dropdown ms-3">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("developmental")}
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      href="/development/agriculture"
                    >
                      {t("agriculture")}
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/development/infrastracture"
                    >
                      {t("Infrastructure")}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/development/health">
                      {t("health")}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/development/education">
                      {t("education")}
                    </a>
                  </li>
                </ul>
              </li>

              {/* humanitarian*/}
              <li className="nav-item dropdown ms-3">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("humanitarian")}
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="/donator/home">
                      {t("inkindDonations")}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/donator/don">
                      {t("donate")}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/fund/all">
                      {t("fundraise")}
                    </a>
                  </li>
                </ul>
              </li>

              {/* update home */}

              <li className="nav-item ms-3">
                <a className="nav-link" href="/requester/all/requests">
                  {t("findRequest")}
                </a>
              </li>

              <li className="nav-item ms-3">
                <a className="nav-link" href="/careers/all">
                  {t("careers")}
                </a>
              </li>

              <li className="nav-item ms-3">
                <a href="/donator/don" className="">
                  <input
                    type="submit"
                    className="mdonationbtn"
                    value={t("donate")}
                  />
                </a>
              </li>
              <li className="nav-item ms-3">
                <a href="">
                  <LanguageSwitcher />
                </a>
              </li>

              {userId ? (
                <li className="nav-item dropdown ms-3">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {t("profile")}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href={`/requester/my/requests/${userId}`}
                        key={userId}
                      >
                        {t("yourfundrequests")}
                      </a>
                    </li>

                    {setShowDonations ? (
                      <li>
                        <a className="dropdown-item" href="/donator/dashboard">
                          {t("your donations")}
                        </a>
                      </li>
                    ) : (
                      <li>
                        <a
                          className="dropdown-item"
                          href="donator/createDonation"
                        >
                          Create a donation
                        </a>
                      </li>
                    )}

                    <li>
                      <a
                        className="dropdown-item"
                        href={`/user/profile/${userId}`}
                      >
                        {t("account setting")}
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/requester/new?">
                        {t("create request")}
                      </a>
                    </li>
                    <Link to="/user/signin">
                      <li>
                        <a className="dropdown-item" onClick={logOut} href="#">
                          {t("sign out")}
                        </a>
                      </li>
                    </Link>
                  </ul>
                </li>
              ) : (
                <li className="nav-item ms-3">
                  <a className="nav-link" href="/user/signin">
                    {t("login")}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

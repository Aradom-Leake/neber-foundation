import { useState, useEffect } from "react";
import { getAllVacancies } from "../api/vacancy.api";
import "./jobs.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      getAllVacancies().then((res) => {
        setTimeout(() => {
          setJobs(res.data);
        }, 2000);
      }).catch((err) => {
        console.log(`messgage ${err}`)
      })
    }
      )();
  }, []);
  return (
    <>
      <NavBar />
      <div
        className="jobContainer"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {!jobs.length ? (
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress sx={{ color: "orange" }} />
            <CircularProgress sx={{ color: "red" }} />
          </Stack>
        ) : (
          jobs.map((vacancy, index) => (
            <div className="jobCard" key={index}>
              <div className="jobLabel jobTitle">{vacancy.jobTitle}</div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Company</span>
                </div>
                <div>{vacancy.companyName}</div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>Location</span>
                </div>
                <div>{vacancy.location ? vacancy.location : vacancy.city}</div>
              </div>
              <div style={{ marginTop: "8px" }}>
                <div>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {" "}
                    Description{" "}
                  </span>
                </div>
                <div>
                  <span>
                    {vacancy.jobDescription.length > 200
                      ? `${vacancy.jobDescription.slice(0, 200)}...`
                      : vacancy.jobDescription}
                  </span>
                </div>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <button
                  style={{ backgroundColor: "white" }}
                  onClick={() =>
                    navigate(`/careers/${vacancy._id}`, { state: vacancy })
                  }
                >
                  <span style={{ color: "#FF7F00" }}>view details...</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Jobs;

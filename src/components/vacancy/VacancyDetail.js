import "./vacancyDetail.css";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import ApplyForJob from "./ApplyForJob";
const VacancyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState("");
  
  const dateFormatter = () => {
    const dateString = location.state.applicationDeadLine;
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setDate(formattedDate);
  };
  useEffect(() => {
    dateFormatter();
  }, []);

  return (
    <>
      <NavBar />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "28px" }}
      >
        <div
          style={{
            padding: "24px",
            width: "75%",
            backgroundColor: "whitesmoke",
            borderRadius: "4px",
            borderLeft: "2px solid orange",
            paddingTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <div>
            <div>
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                {location.state.jobTitle}
              </span>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Job by</span>
              <span>{location.state.companyName}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="sideView">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Catagory
                </span>
              </div>
              <div>{location.state.catagory} </div>
            </div>
            <div className="sideView">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Career Level
                </span>
              </div>
              <div>{location.state.careerLevel} </div>
            </div>
            <div className="sideView">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Employment Type
                </span>
              </div>
              <div>{location.state.employeementType} </div>
            </div>
            <div className="sideView">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Quantity Required
                </span>
              </div>
              <div>{location.state.quantityRequired}</div>
            </div>
            <div className="sideView">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Location
                </span>
              </div>
              <div>{location.state.city}</div>
            </div>
            <div className="sideView">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Salary
                </span>
              </div>
              <div>
                <span>{location.state.salary}</span>
              </div>
            </div>
            <div className="sideView">
              <div>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Application Deadline
                </span>
              </div>
              <div>
                <span>{date}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
              <span style={{ fontWeight: "bold" }}>
                {location.state.companyName}
              </span>
            </div>
            <div>
              <span>{location.state.companyDescription}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
              <span style={{ fontWeight: "bold" }}> Job Description </span>
            </div>
            <div>
              <span>{location.state.jobDescription}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
              <span style={{ fontWeight: "bold" }}>Job Requirement</span>
            </div>
            <div>{location.state.jobRequirement}</div>
          </div>

          <div>
            <div>
              <span style={{ fontWeight: "bold" }}> How to Apply </span>
            </div>
           <div>
              <span>
                Interested applicants who fulfill the stated requirements can
                submit their CV and relevant information through the form by
                clicking the below button. <br />
                <span style={{ fontWeight: "bold", color: "red" }}>
                  Note:
                </span>{" "}
                Only PDF file is Acceptable.
              </span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
              >
                <a href="https://forms.gle/Cqwveje8KWFEyFHe9">
                Apply Now
                </a>
              </button>
            </div>
                     </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VacancyDetail;

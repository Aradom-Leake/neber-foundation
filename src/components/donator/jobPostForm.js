import React, { useState } from "react";
import "./jobVacancyForm.css";
import swal from "sweetalert";
import { newVacancy } from "../../api/vacancy.api";
const JobPostForm = ({closeModal}) => {

  const [jobTitle, setJobTitle] = useState("");
  const [catagory, setCatagory] = useState("");
  const [careerLevel, setCareerLevel] = useState("");
  const [employeementType, setEmployeementType] = useState("");
  const [quantityRequired, setQuantityRequired] = useState("");
  const [salary, setSalary] = useState("");
  const [applicationDeadLine, setApplicationDeadLine] = useState("");

  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirement, setJobRequirement] = useState("");

  const [cv, setCv] = useState("")

  const [howToApply, setHowToApply] = useState("");

  const createVacancy = async (e) => {
    e.preventDefault();
    const vacancy = {
      jobTitle,
      catagory,
      careerLevel,
      employeementType,
      quantityRequired,
      salary,
      city,
      region,
      country,
      companyName,
      companyDescription,
      jobDescription,
      jobRequirement,
      howToApply,
      applicationDeadLine,
    };
    console.log(vacancy);
   await newVacancy(vacancy)
      .then((res) => {
        // setLoading(false);
        swal("vacancy Succesfully Created", "", "success").then((value) => {
          if (value) {
            // navigate("../dashboard");
            console.log("hii");
          }
          closeModal()
        });
      })
      .catch((err) => {
        console.log(err);
        swal("vacancy creation failed", "Please try again", "error").then(
          (value) => {
            if (value) {
              console.log("get");
              // navigate("../dashboard");
            }
          }
        );
      });

      
  };

  return (
    <>
      <div className="job-vacancy-form-container">
        <div style={{display:'flex', justifyContent:'center'}}>
        <h2 style={{ marginBottom: "12px" }}>Create New Vacancy</h2>
        </div>
        <form onSubmit={createVacancy}>
          <div>
            <div
              style={{
                display: "flex",
                backgroundColor: "whitesmoke",
                padding: "12px",
                marginBottom: "12px",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="catagory">Catagory</label>
                <input
                  type="text"
                  id="catagory"
                  value={catagory}
                  onChange={(e) => setCatagory(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="careerLevel">Career Level</label>
                <input
                  type="text"
                  id="careerLevel"
                  value={careerLevel}
                  onChange={(e) => setCareerLevel(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantityRequired">Quantity Required</label>
                <input
                  id="quantityRequired"
                  type="number"
                  value={quantityRequired}
                  onChange={(e) => setQuantityRequired(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="employeementType">Employeement Type</label>
                <input
                  type="text"
                  id="employeementType"
                  value={employeementType}
                  onChange={(e) => setEmployeementType(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  id="salary"
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="applicationDeadLine">Application Dead Line</label>
                <input
                  type="date"
                  id="applicationDeadLine"
                  value={applicationDeadLine}
                  onChange={(e) => setApplicationDeadLine(e.target.value)}
                />
              </div>
            </div>
            <div
              className="form-group"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                backgroundColor: " whitesmoke",
                padding: "12px",
                borderRadius: "2px",
              }}
            >
              <div>
                <label htmlFor="city">City</label>
                <input
                id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="region">Region</label>
                <input
                id="region"
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: " whitesmoke",
                marginTop: "10px",
                padding: "12px",
                borderRadius: "4px",
              }}
            >
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="companyDescription">Company Description</label>
                <textarea
                  type="text"
                  id="companyDescription"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: " whitesmoke",
                marginTop: "12px",
                marginBottom: "12px",
                borderRadius: "4px",
                padding: "12px",
              }}
            >
              <div className="form-group">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="jobRequirement">Job Requirement</label>
                <textarea
                  id="jobRequirement"
                  value={jobRequirement}
                  onChange={(e) => setJobRequirement(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="howToApply">How To Apply</label>
                  <textarea
                    type="text"
                    id="howToApply"
                    value={howToApply}
                    onChange={(e) => setHowToApply(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit">Create Vacancy</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default JobPostForm;

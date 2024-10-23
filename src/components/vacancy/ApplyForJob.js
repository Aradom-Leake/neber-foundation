import React, { useEffect, useRef, useState } from "react";
import "./applyForJob.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import pdfToBase64 from "../../helpers/pdfToBase64";
import { applyToVacancy } from "../../api/vacancy.api";
import swal from "sweetalert";
import {
  CircularProgress,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const validatorSetUp = {
  firstName: {
    isValid: true,
    pattern: /^[a-zA-Z]{3,50}$/,
    errorMessage: "Enter Valid Name",
  },
  lastName: {
    isValid: true,
    pattern: /^[a-zA-Z]{3,50}$/,
    errorMessage: "Enter Valid Email",
  },
  email: {
    isValid: true,
    pattern:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    errorMessage: "Email Should Be Valid Email",
  },
  phoneNumber: {
    isValid: true,
    pattern: /^\d{10}$/,
    errorMessage: "Enter Valid Phone Number?",
  },
  nameOfInstitute: {
    isValid: true,
    pattern: /^.{3,50}$/,
    errorMessage: "Enter Valid Institute You Graduated From?",
  },
  fieldOfStudy: {
    isValid: true,
    pattern: /^.{3,50}$/,
    errorMessage: "What Did You Study?",
  },

  cummulativeGrade: {
    isValid: true,
    pattern: /^(?:[2-3](?:\.\d+)?|4(?:\.0)?)$/,
    errorMessage: "Your Cummilative Score?",
  },
  isCVValid: false,
  isFormValid: function () {
    return (
      this.firstName.isValid &&
      this.lastName.isValid &&
      this.email.isValid &&
      this.phoneNumber.isValid &&
      this.nameOfInstitute.isValid &&
      this.fieldOfStudy.isValid &&
      this.cummulativeGrade.isValid
    );
  },
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const applicant = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  nameOfInstitute: "",
  fieldOfStudy: "",
  cummulativeGrade: null,
};

const ApplyForJob = () => {
  const [validator, setValidator] = useState(validatorSetUp);
  const location = useLocation();
  const [experience, setExperience] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [applicantData, setApplicantData] = useState(applicant);
  const [applicantCv, setApplicantCv] = useState("");
  const [applicantCvName, setApplicantCvName] = useState(null);
  const [cvTemporaryUrl, setCvTemporaryUrl] = useState("");
  const [applying, setApplying] = useState(false);
  const [newApplicant, setNewApplicant] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disableButton, seDisableButton] = useState(false);

  const iframeRef = useRef();

  useEffect(() => {
    seDisableButton(
      validator.isFormValid() && validator.isCVValid && checkValues()
    );
  }, [validator]);
  const checkValues = () => {
    return (
      applicantData.firstName &&
      applicantData.lastName &&
      applicantData.email &&
      applicantData.phoneNumber &&
      applicantData.nameOfInstitute &&
      applicantData.cummulativeGrade &&
      applicantData.fieldOfStudy
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const validate = validator[name];
    const newvalidation = {
      ...validate,
      isValid: validate.pattern.test(value),
    };
    setValidator({ ...validator, [name]: newvalidation });
    setApplicantData({ ...applicantData, [name]: value });
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    const size = file.size / (1024 * 1024);
    const type = file.type;
    if (type === "application/pdf") {
      if (size > 3) {
        setValidator({ ...validator, isCVValid: false });
        setApplicantCvName(undefined);
        setApplicantCv(undefined);
        setCvTemporaryUrl(undefined);
      } else {
        setValidator({ ...validator, isCVValid: true });
        const data = await pdfToBase64(file);
        setApplicantCv(data);
        setApplicantCvName(file.name);
        const temporaryUrl = URL.createObjectURL(file);
        setCvTemporaryUrl(temporaryUrl);
      }
    } else {
      setValidator({ ...validator, isCVValid: false });
      setApplicantCvName(undefined);
      setApplicantCv(undefined);
      setCvTemporaryUrl(undefined);
    }
  };

  const applyToJob = async (e) => {
    e.preventDefault();
    setApplying(true);
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      cummulativeGrade,
      nameOfInstitute,
      fieldOfStudy,
    } = applicantData;
    const workExperience =
      experienceLevel === "Junior"
        ? experienceLevel
        : `${experienceLevel}(${experience} Years)`;
    const data = {
      jobId: location.state.jobId,
      firstName,
      lastName,
      email,
      phoneNumber,
      cummulativeGrade,
      nameOfInstitute,
      fieldOfStudy,
      applicantCv,
      applicantCvName,
      workExperience,
    };
    try {
      const response = await applyToVacancy(data);
      setNewApplicant(response.data);
      setSuccess(true);
      setApplying(false);
      setApplicantData(applicant);
    } catch (error) {
      swal("Error happen while trying to apply. try again.", "", "error");
      setApplying(false);
    }
  };
  return (
    <>
      {!success ? (
        <Stack sx={{ margin: "24px" }}>
          <Stack sx={{ alignSelf: "center" }}>
            <Typography variant="h4">
              Applying to {location.state.jobTitle}
            </Typography>
          </Stack>
          <form onSubmit={applyToJob}>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                justifyContent: "center",
                flexGrow: "initial",
                flexWrap: "wrap",
              }}
            >
              <Stack sx={{ minWidth: "400px", paddingLeft: "12px" }}>
                <Stack spacing={1}>
                  <TextField
                    id="first-name"
                    name="firstName"
                    type="text"
                    label="First Name"
                    value={applicantData.firstName}
                    required
                    onChange={handleInputChange}
                    variant="standard"
                    error={!validator.firstName.isValid}
                    helperText={
                      validator.firstName.isValid
                        ? ""
                        : validator?.firstName?.errorMessage
                    }
                  ></TextField>
                  <TextField
                    id="last-name"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={applicantData.lastName}
                    required
                    onChange={handleInputChange}
                    variant="standard"
                    error={!validator?.lastName?.isValid}
                    helperText={
                      validator?.lastName?.isValid
                        ? ""
                        : validator?.firstName?.errorMessage
                    }
                  ></TextField>
                </Stack>

                <Stack spacing={1}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={applicantData.email}
                    required
                    variant="standard"
                    onChange={handleInputChange}
                    error={!validator?.email?.isValid}
                    helperText={
                      validator?.email?.isValid
                        ? ""
                        : validator?.email?.errorMessage
                    }
                  ></TextField>
                  <TextField
                    id="phone-number"
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    value={applicantData.phoneNumber}
                    required
                    variant="standard"
                    onChange={handleInputChange}
                    error={!validator?.phoneNumber?.isValid}
                    helperText={
                      validator?.phoneNumber?.isValid
                        ? ""
                        : validator?.phoneNumber?.errorMessage
                    }
                  ></TextField>
                </Stack>

                <Stack spacing={1}>
                  <TextField
                    id="field-of-study"
                    name="fieldOfStudy"
                    label="Field Of Study"
                    variant="standard"
                    required
                    value={applicantData.fieldOfStudy}
                    onChange={handleInputChange}
                    error={!validator?.fieldOfStudy?.isValid}
                    helperText={
                      validator?.fieldOfStudy?.isValid
                        ? ""
                        : validator?.fieldOfStudy?.errorMessage
                    }
                  />
                  <TextField
                    id="name-of-institute"
                    name="nameOfInstitute"
                    label="Name Of Institute"
                    variant="standard"
                    required
                    value={applicantData.nameOfInstitute}
                    onChange={handleInputChange}
                    error={!validator?.nameOfInstitute?.isValid}
                    helperText={
                      validator?.nameOfInstitute?.isValid
                        ? ""
                        : validator?.nameOfInstitute?.errorMessage
                    }
                  />
                  <TextField
                    id="cummulative-grade"
                    name="cummulativeGrade"
                    label="Cummulative Grade"
                    variant="standard"
                    type="number"
                    required
                    value={applicantData.cummulativeGrade}
                    onChange={handleInputChange}
                    error={!validator?.cummulativeGrade?.isValid}
                    helperText={
                      validator?.cummulativeGrade?.isValid
                        ? ""
                        : validator?.cummulativeGrade?.errorMessage
                    }
                  />
                </Stack>
                <Stack>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Experience Level
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Junior"
                      name="radio-buttons-group"
                      value={experienceLevel}
                      onChange={(ev) => setExperienceLevel(ev.target.value)}
                    >
                      <FormControlLabel
                        value="Junior"
                        control={<Radio />}
                        label="Entry Level"
                      />
                      <FormControlLabel
                        value="Senior"
                        control={<Radio />}
                        label="Senior Level"
                      />
                    </RadioGroup>
                    <Stack sx={{ marginBottom: "12px" }}>
                      {experienceLevel === "Senior" ? (
                        <TextField
                          id="experience-level"
                          label="How Many Years Of Work Experience do you Have?"
                          name="experience"
                          type="number"
                          value={experience}
                          required
                          variant="standard"
                          onChange={(event) =>
                            setExperience(event.target.value)
                          }
                        ></TextField>
                      ) : (
                        ""
                      )}
                    </Stack>
                  </FormControl>
                </Stack>
              </Stack>
              <Stack sx={{ alignSelf: "center", marginTop: "20px" }}>
                {cvTemporaryUrl ? (
                  <Stack>
                    <iframe
                      title="cv"
                      id="CViewer"
                      src={cvTemporaryUrl}
                    ></iframe>
                    <span>
                      <a href={cvTemporaryUrl} download={applicantCvName}>
                        {applicantCvName}
                      </a>
                    </span>
                  </Stack>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
            {!validator.isCVValid ? (
              <Stack sx={{ alignItems: "center" }}>
                <Typography color="error">
                  Application CV Should Be In PDF Format and less Than 3MB
                </Typography>
              </Stack>
            ) : (
              <></>
            )}
            <Stack
              direction="row"
              spacing={3}
              sx={{ justifyContent: "center", marginTop: "18px" }}
            >
              <Button
                component="label"
                variant="contained"
                style={{ backgroundColor: "#FF77F00" }}
              >
                Upload Your CV
                <VisuallyHiddenInput
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                />
              </Button>
              {!applying ? (
                <Button
                  style={{ color: "white" }}
                  variant="contained"
                  disabled={!disableButton}
                  onClick={applyToJob}
                >
                  Apply Now
                </Button>
              ) : (
                <CircularProgress />
              )}
            </Stack>
          </form>
        </Stack>
      ) : (
        <Box>
          <div>
            <Stack direction="row" spacing={2}>
              <Typography variant="h4" size="large" sx={{ fontWeight: "bold" }}>
                Hello{" "}
              </Typography>{" "}
              <Typography
                variant="h5"
                sx={{ alignSelf: "center", fontWeight: "bold" }}
              >
                {newApplicant.firstName} {newApplicant.lastName}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: "18px" }}>
              Thank you for your interest in{" "}
              <span>{location.state.jobTitle}!</span> We've received your
              application and our HR team will be reviewing it carefully. We'll
              reach out if your qualifications align with the requirements.
            </Typography>
            <Link to="/" style={{ fontSize: "18px" }}>
              Go Back To Home
            </Link>
          </div>
        </Box>
      )}
    </>
  );
};

export default ApplyForJob;

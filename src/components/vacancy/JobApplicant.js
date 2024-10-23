import React, { useState, useEffect } from "react";
import base64ToPDF from "../../helpers/base64ToPdf";
import downloadPdf from "../../helpers/downloadPdf";
import CircularProgress from "@mui/material/CircularProgress";
import dateFormatter from "../../helpers/dateFormatter";
import swal from "sweetalert";
import {Dialog,DialogActions,DialogContent,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button,TablePagination,Stack,TextField } from "@mui/material"
import { useLocation } from "react-router-dom";
import { getApplicantById, deleteApplicantById } from "../../api/vacancy.api";

const JobApplicant = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const [deleteApplicantId, setDeleteApplicantId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const location = useLocation();
  const [vacancy, setVacancy] = useState();
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [numberOfApplicants, setNumberOfApplicants] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(null);
  const [queryText, setQueryText] = useState("");

  const handleQueryText = (event) => {
    const value = event.target.value;
    setQueryText(value);
    const filtered = applicants.filter((applicant) => {
      let check = false;
      for (const val of Object.values(applicant)) {
        check =
          check ||
          JSON.stringify(val).toLowerCase().includes(value.toLowerCase());
      }
      return check && applicant.cummulativeGrade >= gradeQuery;
    });
    setFilteredApplicants(filtered);
    setPage(0);
  };

  const [gradeQuery, setGradeQuery] = useState("");

  const gradeFilter = (event) => {
    const value = event.target.value;
    setGradeQuery(value);
    const filtered = applicants.filter((applicant) => {
      let check = false;
      for (const val of Object.values(applicant)) {
        check =  check || JSON.stringify(val).toLowerCase().includes(queryText.toLowerCase());
      }
      return check && applicant.cummulativeGrade >= value;
    });
    setFilteredApplicants(filtered);
    setPage(0);
  };

  useEffect(() => {
    setNumberOfApplicants(applicants.length);
  }, [applicants]);
  useEffect(() => {
    setVacancy(location.state.vacancy);
    setApplicants(location.state.applicants);
    setFilteredApplicants(location.state.applicants);
  }, []);

  const downloadCV = async (applicantId) => {
    setDownloadProgress(applicantId);
    if (applicantId) {
      const response = await getApplicantById(applicantId);
      const applicantCv = base64ToPDF(response.data.applicantCv);
      const applicantCvName = response.data.applicantCvName;
      applicantCv && downloadPdf(applicantCv, applicantCvName);
      setDownloadProgress(false);
    } else {
      setDownloadProgress(null);
    }
  };

  const deleteApplicant = async () => {
    handleDeleteClick();
    if (deleteApplicantId) {
      deleteApplicantById(deleteApplicantId).then((response) => {
        setFilteredApplicants(filteredApplicants => filteredApplicants.filter(applicant => applicant._id !== deleteApplicantId))
        swal(response.data,"", "success")
      }).catch(err => {
        swal("Error while deleting Applicant. Try Again", "", "error")
      }).finally(() => {
        setShowDeleteDialog(false);
        setDeleteApplicantId(null);
      });
    }
  };

  const handleDeleteClick = (applicantId) => {
    setShowDeleteDialog(true);
    setDeleteApplicantId(applicantId);
  };

  const closeDeleteDialog = () => {
    setDeleteApplicantId(null);
    setShowDeleteDialog(false);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredApplicants.length)
      : 0;

  return (
    <div
      style={{
        margin: "0 20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {numberOfApplicants ? (
        <>
          <h1 style={{ alignSelf: "center", marginBottom: "10px" }}>
            {" "}
            All Applicants Of {vacancy.jobTitle}
          </h1>
          <Paper>
            <Stack
              flexDirection="row"
              sx={{ padding: "12px", justifyContent: "flex-end", gap: "6px" }}
            >
              <TextField
                value={gradeQuery}
                onChange={gradeFilter}
                placeholder=" >= grade"
                variant="filled"
                color="primary"
              />
              <TextField
                value={queryText}
                onChange={handleQueryText}
                placeholder="Search Applicant"
                variant="filled"
                color="primary"
              />
            </Stack>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Job Title</TableCell>
                    <TableCell align="center">Full Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Phone Number</TableCell>
                    <TableCell align="center">Field Of Study</TableCell>
                    <TableCell align="center">Name Of Institute</TableCell>
                    <TableCell align="center">Cummulative Grade</TableCell>
                    <TableCell align="center">Work Experience</TableCell>
                    <TableCell align="center">Applied At</TableCell>
                    <TableCell align="center">CV</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredApplicants.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredApplicants
                  ).map((applicant) => (
                    <TableRow key={applicant._id}>
                      <TableCell align="center">
                        {location.state.vacancy.jobTitle}
                      </TableCell>
                      <TableCell align="center">
                        {applicant?.firstName} {applicant?.lastName}
                      </TableCell>
                      <TableCell align="center">{applicant?.email}</TableCell>
                      <TableCell align="center">
                        {applicant?.phoneNumber}
                      </TableCell>
                      <TableCell align="center">
                        {applicant?.fieldOfStudy}
                      </TableCell>
                      <TableCell align="center">
                        {applicant?.nameOfInstitute}
                      </TableCell>
                      <TableCell align="center">
                        {applicant?.cummulativeGrade}
                      </TableCell>
                      <TableCell align="center">
                        {applicant?.workExperience}
                      </TableCell>
                      <TableCell align="center">
                        {dateFormatter(applicant?.appliedAt)}
                      </TableCell>
                      <TableCell align="center">
                        {!downloadProgress ? (
                          <Button
                            onClick={(event) =>
                              downloadCV(event, applicant?._id)
                            }
                          >
                            download cv
                          </Button>
                        ) : downloadProgress === applicant?._id ? (
                          <Box sx={{ display: "flex" }}>
                            <CircularProgress sx={{ color: "orange" }} />
                          </Box>
                        ) : (
                          <Button onClick={() => downloadCV(applicant?._id)}>
                            download cv
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                      <button
                        onClick={() => handleDeleteClick(applicant._id)}
                        style={{ backgroundColor: "red" }}
                      >
                        Delete
                      </button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={filteredApplicants.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Paper>
          <Dialog open={showDeleteDialog} onClose={closeDeleteDialog}>
        <DialogContent>
          <div class="modal-content">
            <h2 class="modal-header">Confirm Deletion</h2>
            <p style={{ fontSize: "24px" }}>
              Are you sure you want to delete this Applicant? This action cannot
              be undone.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <button onClick={deleteApplicant} style={{ backgroundColor: "red" }}  >
              Delete
             
            </button>
            <button
              onClick={closeDeleteDialog}
              style={{ backgroundColor: "green" }}
              disabled={false}
            >
              Cancel
            </button>
          </div>
        </DialogActions>
      </Dialog>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "32px" }}>
            There Are No Applicants For{" "}
            <q style={{ fontWeight: "bold" }}>{`${
              vacancy && vacancy?.jobTitle
            }`}</q>
            Yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobApplicant;

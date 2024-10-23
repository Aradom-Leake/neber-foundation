import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dateFormatter from "../../helpers/dateFormatter";
import TablePagination from "@mui/material/TablePagination";
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useNavigate } from "react-router-dom";
import {
  getAllVacancies,
  deleteVacancyByID,
  getAllApplicants,
} from "../../api/vacancy.api";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import JobPostForm from "../donator/jobPostForm";
import swal from "sweetalert";
const VacancyDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [vacancies, setVacancies] = useState([]);
  const [filtered, setFiltered] = useState([])

  const [allApplicants, setAllApplicants] = useState([]);
  const [deleteVacancyId, setDeleteVacancyId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const [queryText, setQueryText] = useState("");
  const handleQueryText = (event) => {
    const value = event.target.value;
    setQueryText(value);
    const filt = filtered.filter((vacancy) => {
      return (vacancy.jobTitle).toLowerCase().includes(value.toLowerCase());
    });
    setPage(0);
    setVacancies(filt);
  };

  const handleDeleteClick = (vacancyId) => {
    setShowDeleteDialog(true);
    setDeleteVacancyId(vacancyId);
  };

  const closeDeleteDialog = () => {
    setDeleteVacancyId(null);
    setShowDeleteDialog(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  // Replace with your API call or data source

  useEffect(() => {
    fetchVacancies();
    jobApplicants();
  }, []);

  const fetchVacancies = async () => {
    const response = await getAllVacancies();
    setVacancies(response.data);
    setFiltered(response.data)
  };

  const jobApplicants = async () => {
    const response = await getAllApplicants();
    setAllApplicants(response.data);
  };

  const vacancyApplicants = (vacancyId) => {
    const vapplicants = allApplicants.filter(
      (applicant) => applicant.vacancyId === vacancyId
    );
    return vapplicants;
  };

  const deleteVacancy = async () => {
    handleDeleteClick();
    if (deleteVacancyId) {
      await deleteVacancyByID(deleteVacancyId).then((response) => {
        swal("vacancy deleted Succesfully", "", "success").then((value) => {
          setShowDeleteDialog(false);
          setDeleteVacancyId(null);
        });
      });
    }
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vacancies.length) : 0;
  return (
    <div
      style={{
        margin: "0 20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ alignSelf: "center" }}>All Vacancies</h1>
      <div style={{ alignSelf: "flex-end", marginBottom: "10px" }}>
        <button onClick={handleClickOpen}>create new Vacancy</button>
      </div>
      <Paper>
      <Stack
            flexDirection="row"
            sx={{ padding: "12px", justifyContent: "flex-end", gap: "6px" }}
          >
            <TextField
              value={queryText}
              onChange={handleQueryText}
              placeholder="Search Vacancy"
              variant="filled"
              color="primary"
            />
          </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Job Title</TableCell>
                <TableCell align="center">Catagory</TableCell>
                <TableCell align="center">Career Level</TableCell>
                <TableCell align="center">Employeement Type</TableCell>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Created</TableCell>
                <TableCell align="center">Dead Line</TableCell>
                <TableCell align="center">Quantity Required</TableCell>
                <TableCell align="center">Applicants</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? vacancies.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : vacancies
              ).map((vacancy) => (
                <TableRow key={vacancy._id}>
                  <TableCell align="center">{vacancy.jobTitle}</TableCell>
                  <TableCell align="center">{vacancy.catagory}</TableCell>
                  <TableCell align="center">{vacancy.careerLevel}</TableCell>
                  <TableCell align="center">
                    {vacancy.employeementType}
                  </TableCell>
                  <TableCell align="center">{vacancy.city}</TableCell>
                  <TableCell align="center">
                    {dateFormatter(vacancy.creationDate)}
                  </TableCell>
                  <TableCell align="center">
                    {dateFormatter(vacancy.applicationDeadLine)}
                  </TableCell>
                  <TableCell align="center">
                    {vacancy.quantityRequired}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      onClick={() =>
                        navigate(`/careers/dashboard/${vacancy._id}`, {
                          state: {
                            vacancy,
                            applicants: vacancyApplicants(vacancy._id),
                          },
                        })
                      }
                    >
                      {vacancyApplicants(vacancy._id).length}
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() =>
                          navigate(`/careers/${vacancy._id}`, {
                            state: { ...vacancy },
                          })
                        }
                        style={{ backgroundColor: "green" }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteClick(vacancy._id)}
                        style={{ backgroundColor: "red" }}
                      >
                        Delete
                      </button>
                    </div>
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
            rowsPerPageOptions={[5, 10, 25]}
            count={vacancies.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        {/* <TablePagination/> */}
      </Paper>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogActions align="center">
          <button onClick={handleClose}>Close</button>
        </DialogActions>
        <DialogContent>
          <JobPostForm closeModal={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog open={showDeleteDialog} onClose={closeDeleteDialog}>
        <DialogContent>
          <div class="modal-content">
            <h2 class="modal-header">Confirm Deletion</h2>
            <p style={{ fontSize: "24px" }}>
              Are you sure you want to delete this Vacancy? This action cannot
              be undone.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <button onClick={deleteVacancy} style={{ backgroundColor: "red" }}>
              Delete
            </button>
            <button
              onClick={closeDeleteDialog}
              style={{ backgroundColor: "green" }}
            >
              Cancel
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VacancyDashboard;

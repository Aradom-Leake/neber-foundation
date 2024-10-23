import React, { useState, useEffect } from "react";
import NavButton from "../orgrequestlist/NavButton";
import {
  getAllUsers,
  deleteUserById,
  updateUserById,
} from "../../../api/users";
import swal from "sweetalert";
import {
  Table,
  TableContainer,
  Dialog,
  DialogContent,
  DialogActions,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  TablePagination,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
export default function GetUserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [queryText, setQueryText] = useState("");

  const [changeRole, setChangeRole] = useState(false);
  const [users, setUsers] = useState([]);
  const [datatable, setDatatable] = useState([]);
  useEffect(() => {
    getRegisteredUsers();
  }, []);

  const getRegisteredUsers = async () => {
    try {
      const data = await getAllUsers();
      setDatatable(data.data);
      setUsers(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async () => {
    if (userId) {
      await deleteUserById(userId).then((response) => {
        swal("user deleted Succesfully", "", "success").then((value) => {
          const updatedUsers = users.filter((user) => user._id !== userId);
          setUsers(updatedUsers);
          setShowDeleteDialog(false);
          setUserId(null);
        });
      });
    }
  };

  const [roleInput, setRoleInput] = useState("hello");
  const handleRoleInputChange = (event) => {
    setRoleInput(event.target.value);
  };

  const handleQueryText = (event) => {
    const value = event.target.value;
    setQueryText(value);
    const filtered = datatable.filter((user) => {
      let check = false;
      for (const val of Object.values(user)) {
        check = check || JSON.stringify(val).includes(value);
      }
      return check;
    });

    setPage(0);
    setUsers(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRoleEdit = (id, role) => {
    setChangeRole(true);
    setUserId(id);
    setRoleInput(role);
  };

  const updateRole = async () => {
    const user = users.find((user) => user._id === userId);
    if (user.roles === roleInput) {
    } else {
      try {
        const response = await updateUserById(userId, { role: roleInput });
        console.log(response)
        if(response.status === 200 ){
          const updatedUsers = users.map((user) => {
            if (user._id === userId) {
              const updatedUser = { ...user, roles: roleInput };
              return updatedUser;
            }
            return user;
          });
          setUsers(updatedUsers);
        }
      } catch (error) {
        console.log(error);
      }
      
    }

    setChangeRole(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const toggleSidenav = (e) => {
    e.preventDefault();
    document.body.classList.remove("g-sidenav-pinned");
  };

  const [userId, setUserId] = useState(null);

  const handleDeleteClick = (vacancyId) => {
    setShowDeleteDialog(true);
    setUserId(vacancyId);
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const closeDeleteDialog = () => {
    setUserId(null);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <NavButton />
        <div className="container-fluid py-4" onClick={toggleSidenav}>
          <div className="row">
            <h2>User List</h2>
          </div>
        </div>

        <Paper sx={{ margin: "0 12px" }}>
          <Stack
            flexDirection="row"
            sx={{ padding: "12px", justifyContent: "flex-end", gap: "6px" }}
          >
            <TextField
              value={queryText}
              onChange={handleQueryText}
              placeholder="Search User"
              variant="filled"
              color="primary"
            />
          </Stack>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">User Id</TableCell>
                  <TableCell align="center">Full Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone Number</TableCell>
                  <TableCell align="center">Roles</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? users.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                ).map((user) => (
                  <TableRow key={user._id}>
                    <TableCell align="center">{user?._id}</TableCell>
                    <TableCell align="center">
                      {user?.firstName} {user?.lastName}
                    </TableCell>
                    <TableCell align="center">{user?.email}</TableCell>
                    <TableCell align="center">{user?.contactNumber}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row">
                        {changeRole && userId === user._id ? (
                          <>
                            <TextField
                              variant="standard"
                              placeholder="hello"
                              value={roleInput}
                              onChange={handleRoleInputChange}
                            />
                            <Button variant="standard" onClick={updateRole}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button type="text">{user?.roles}</Button>
                            <Button
                              onClick={() =>
                                handleRoleEdit(user?._id, user?.roles)
                              }
                            >
                             change
                            </Button>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleDeleteClick(user._id)}>
                        Delete
                      </Button>
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
              count={users.length}
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
            <div className="modal-content">
              <h2 className="modal-header">Confirm Deletion</h2>
              <p style={{ fontSize: "24px" }}>
                Are you sure you want to delete this User? This action cannot be
                undone.
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <button onClick={deleteUser} style={{ backgroundColor: "red" }}>
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
      </main>
    </>
  );
}

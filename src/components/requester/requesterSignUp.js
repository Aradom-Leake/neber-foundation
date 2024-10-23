import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { createUser } from "../../api/auth";

export default function RequesterSignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault();
    const signup = {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
    };

    createUser(signup).then((res) => {
        swal("Succesfully Signed up", "", "success").then((value) => {
          if (value) {
            navigate("../signin");
          }
        });
      })
      .catch((err) => {
        swal("failed", `${err?.response?.data?.message}`, "error")
      });
  };

  return (
    <div>
      <nav>
        <NavBar />
      </nav>

      <div className="container d-flex justify-content-center pt-5 pb-5">
        <div className="card z-index-0 fadeIn3 fadeInBottom ">
          <div className="card-body">
            <form className="form-control" onSubmit={registerUser}>
              <p className="h3 fw-bold text-center">
                Sign Up To Start Supporting
              </p>
              <p className="text-center mb-5">
                Sing Up As An Organization?
                <Link to="/organization/new"> Sign Up here</Link>
              </p>
              <div className="row input-group input-group-outline m-0 px-4">
                <div className="col-md-6 mb-4 ps-0">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-md-6 mb-4 pe-0">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="input-group input-group-outline mb-4 px-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="form-control"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="input-group input-group-outline mb-4 px-4">
                <input
                  type="text"
                  placeholder="Telephone number"
                  className="form-control"
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="input-group input-group-outline mb-4 px-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              

              <div  style={{display:'flex', justifyItems:'center', marginLeft:'20px'}}>
                  <input style={{height:'30px', maxWidth:'50px'}} type="checkbox" id="check" required />{" "}
                  <span className="ms-1 textmuted">
                    I agree with the Terms and Conditions and the privacy policy
                  </span>
              </div>
              <div className="row">
                <div className="mb-3 d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary d-block">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

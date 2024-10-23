import axios from "../../api/axios";
import React from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import "./footer.css";
import { Link } from "react-router-dom";
import { useRef, useState} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Alert from "@mui/material/Alert";
const LOGIN_URL = "/main/login";
export default function RequesterSignIn() {
  const { setAuth } = useAuth();
  const Navigate = useNavigate();

  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const userRef = useRef();

  const [cookies, setCookie] = useCookies(["access_token", "roles", "_id"]);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
            const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response);

      if (response?.data) {
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        const _id = response?.data?._id;
        setAuth({ accessToken, roles, _id });
        let expires = new Date();
        expires.setTime(expires.getTime() + response.data.expires_in * 1000);
        setCookie("access_token", accessToken, { path: "/", expires });
        setCookie("roles", roles, { path: "/", expires });
        setCookie("uId", _id, { path: "/", expires });
        if (roles === "5150") {
          Navigate("/organization/dashboard");
        } else if (roles === "1984") {
          Navigate(`/`);
        } else {
          Navigate("/");
        }
        setUser("");
        setPwd("");
        setSuccess(true);
      } else {
        Navigate("/unauthorized");
      }
    } catch (err) {
      setShowErrorMessage(true);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid Username or Password");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <div>
      <nav>
        <NavBar />
      </nav>

      <div className="container d-flex justify-content-center pt-5 pb-5">
        <div className="card card-signin z-index-0 fadeIn3 fadeInBottom ">
          <form className="form-control p-5" onSubmit={handleSubmit}>
            <p className="h3 fw-bold text-center mb-2 pb-4 border-bottom">
              Sign in{" "}
            </p>
            {errMsg && showErrorMessage ? (
              <Alert variant="filled" severity="error">
                {errMsg}
              </Alert>
            ) : (
              <></>
            )}

            <p></p>
            <div className="input-group input-group-outline mb-4 pt-4">
              <input
                type="email"
                placeholder="Email Address"
                className="form-control"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => {
                  setShowErrorMessage(false);
                  setUser(e.target.value);
                }}
                value={username}
                required
              />
            </div>
            <div className="input-group input-group-outline mb-4 pt-2">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="password"
                onChange={(e) => {
                  setShowErrorMessage(false);
                  setPwd(e.target.value);
                }}
                value={password}
                required
              />
            </div>

            <div className="row border-bottom">
              <div className="mb-4 d-flex justify-content-center">
                <input
                  type="submit"
                  className="btn btn-primary d-block "
                  value="SIGN IN"
                />
              </div>
            </div>

            <p className="text-center mb-3 pt-2">
              {" "}
              Don't you have an account? <Link to="/user/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

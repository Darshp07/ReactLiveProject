import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
// @ts-ignore: side-effect CSS import without type declarations
import "bootstrap-icons/font/bootstrap-icons.css";
import { SignUpRequest, GeneralResponse } from '../components/InterFace/Models';
import { BASE_URL } from '../services/ApiResponse';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function SignUp() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [userError, setUserError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [mobileError, setMobileError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const request: SignUpRequest = {
        username: username,
        password: password,
        email: email,
        mobile: mobile,
        created_date: new Date()
    };
    const allusers = async () => {
        
        const response = await axios.get<GeneralResponse>(
            `${BASE_URL}users/getUsers`
        );
    
        if (response.data.code === 1) {
            navigate("/users", {
                state: response.data.data
            });
        } else {
            toast.error(response.data.message);
        }
    }
    const saveUser = async () => {
        

        if (username.trim() === "") {
            setUserError("Username is required");
            return;
        }

        if (password.length < 8) {
            setPasswordError(
                "Password must be at least 8 characters"
            );
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setPasswordError(
                "Password must contain an uppercase letter"
            );
            return;
        }

        if (!/[0-9]/.test(password)) {
            setPasswordError(
                "Password must contain a number"
            );
            return;
        }

        if (!/[!@#$%^&*]/.test(password)) {
            setPasswordError(
                "Password must contain a special character"
            );
            return;
        }
        if (email.trim() === "") {
            setEmailError("Email is required");
            return;
        }
        if (mobile.trim() === "") {
            setMobileError("Mobile number is required");
            return;
        }
        try {
            const response = await axios.post<GeneralResponse>(
                `${BASE_URL}users/saveUser`,
                request
            );
            
            if (response.data.code === 1) {
                toast.success(response.data.message);
                setUsername("");
                setPassword("");
                setEmail("");
                setMobile("");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while signing up");
        }
    }
    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">
                    <h2 style={{ textAlign: "center" }}>Create User Account</h2>
                    <form>
                        <div className="container mt-3" style={{ backgroundColor: "#faf9fa", borderRadius: "20px", padding: "30px", border: "1px solid black" }}>
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label htmlFor="username">User Name:</label>
                                <input type="text"
                                    placeholder="Enter Username"
                                    style={{ width: "90%", padding: "5px" }}
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }} />
                                {
                                    userError &&
                                    <small className="text-danger">
                                        {userError}
                                    </small>
                                }
                            </div>
                            <div
                                className="form-group"
                                style={{
                                    marginBottom: "15px",
                                    position: "relative"
                                }}
                            >
                                <label>Password:</label>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    style={{ width: "90%", padding: "5px" }}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError("");
                                    }}
                                />

                                <span
                                    style={{
                                        position: "absolute",
                                        right: "40px",
                                        top: "35px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    <i
                                        className={
                                            showPassword
                                                ? "bi bi-eye-slash"
                                                : "bi bi-eye"
                                        }
                                    ></i>
                                </span>
                            </div>

                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label htmlFor="email">Email:</label>
                                <input type="email"
                                    placeholder="Enter Email"
                                    style={{ width: "90%", padding: "5px" }}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError("");
                                    }} />
                                {
                                    emailError &&
                                    <small className="text-danger">
                                        {emailError}
                                    </small>
                                }
                            </div>
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label htmlFor="mobile">Mobile number:</label>
                                <input type="text"
                                    placeholder="Enter Mobile Number"
                                    style={{ width: "90%", padding: "5px" }}
                                    value={mobile}
                                    onChange={(e) => {
                                        setMobile(e.target.value);
                                        setMobileError("");
                                    }} />
                                {
                                    mobileError &&
                                    <small className="text-danger">
                                        {mobileError}
                                    </small>
                                }
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <button type="button" onClick={saveUser} className="btn btn-success mt-3">
                                    Save
                                </button>
                            </div>

                        </div>
                    </form>
                    <button className="btn btn-secondary mt-3" onClick={() => window.history.back()}>Back</button>

                    <Button type="button" className="btn btn-info mt-3" onClick={allusers} style={{ marginLeft: "10px" }}>
                        All Users
                    </Button>

                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
            />
        </div>
    );
}

export default SignUp;
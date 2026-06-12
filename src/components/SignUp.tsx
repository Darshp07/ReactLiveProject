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
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                paddingTop: "40px",
                paddingBottom: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >


            <div
                style={{
                    width: "500px",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(15px)",
                    borderRadius: "25px",
                    padding: "35px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    color: "white"
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        fontWeight: "bold"
                    }}
                >
                    Create User Account 🚀
                </h2>

                <div className="mb-3">
                    <label>User Name</label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setUserError("");
                        }}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "12px",
                            border: "none",
                            outline: "none",
                            marginTop: "5px"
                        }}
                    />
                    {userError && (
                        <small className="text-warning">
                            {userError}
                        </small>
                    )}
                </div>

                <div
                    className="mb-3"
                    style={{ position: "relative" }}
                >
                    <label>Password</label>

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                        }}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "12px",
                            border: "none",
                            outline: "none",
                            marginTop: "5px"
                        }}
                    />

                    <span
                        style={{
                            position: "absolute",
                            right: "15px",
                            top: "45px",
                            cursor: "pointer",
                            color: "#333"
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

                    {passwordError && (
                        <small className="text-warning">
                            {passwordError}
                        </small>
                    )}
                </div>

                <div className="mb-3">
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                        }}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "12px",
                            border: "none",
                            outline: "none",
                            marginTop: "5px"
                        }}
                    />

                    {emailError && (
                        <small className="text-warning">
                            {emailError}
                        </small>
                    )}
                </div>

                <div className="mb-4">
                    <label>Mobile Number</label>

                    <input
                        type="text"
                        placeholder="Enter Mobile Number"
                        value={mobile}
                        onChange={(e) => {
                            setMobile(e.target.value);
                            setMobileError("");
                        }}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "12px",
                            border: "none",
                            outline: "none",
                            marginTop: "5px"
                        }}
                    />

                    {mobileError && (
                        <small className="text-warning">
                            {mobileError}
                        </small>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px"
                    }}
                >
                    <button
                        type="button"
                        onClick={saveUser}
                        className="btn btn-success"
                        style={{
                            borderRadius: "12px",
                            width: "120px"
                        }}
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        className="btn btn-info"
                        style={{
                            borderRadius: "12px",
                            width: "120px"
                        }}
                        onClick={allusers}
                    >
                        All Users
                    </button>
                </div>

                <div className="text-center mt-4">
                    <button
                        className="btn btn-light"
                        style={{
                            borderRadius: "12px",
                            width: "120px"
                        }}
                        onClick={() =>
                            window.history.back()
                        }
                    >
                        ← Back
                    </button>
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

import { Button } from 'reactstrap';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LogInResponse } from '../components/InterFace/Models';
import { BASE_URL } from '../services/ApiResponse';
import { GeneralResponse } from '../components/InterFace/Models';
// Response type for login API

function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userError, setUserError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const navigate = useNavigate();
    const request: LogInResponse = {
        userName: username,
        passWord: password
    };
    const login = async () => {
        if (username.trim() === "") {
            setUserError("Username is required");
            return;
        }

        if (password === "") {
            setPasswordError(
                "Password is required"
            );
            return;
        }
        try {
            const response = await axios.post<GeneralResponse>(
                `${BASE_URL}users/LogInUser`,
                request
            );

            if (response.data.code === 1) {
                navigate("/users", {
                    state: response.data.data
                });
            } else {
                toast.error(response.data.message);
            }


        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form className="max-w-sm mx-auto">
                        <div
                            style={{
                                width: "400px",
                                backgroundColor: "#faf9fa",
                                borderRadius: "40px",
                                padding: "20px",
                                margin: "1px auto"
                            }}
                        >
                            <h4 style={{ textAlign: "center" }}>Login Form</h4>

                            <div style={{ marginBottom: "25px" }}>
                                <label>Username</label>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    style={{ width: "80%", padding: "5px" }}
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setUserError("");
                                    }}
                                /><br />
                                {
                                    userError &&
                                    <small className="text-danger">
                                        {userError}
                                    </small>
                                }

                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label>Password</label>
                                <br />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    style={{ width: "80%", padding: "5px" }}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError("");
                                    }}
                                /><br />
                                {passwordError && <small className="text-danger">{passwordError}</small>}
                            </div>
                            <div className="form-redio mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={() => setShowPassword(!showPassword)}
                                />

                                <label className="form-check-label">
                                    Show Password
                                </label>
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                />
                                <label className="form-check-label">
                                    Remember Me
                                </label>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <Button type="button" onClick={login} color="success">
                                    Login
                                </Button>
                                <Button type="button" color="primary" onClick={() => navigate("/signUp")} style={{ marginLeft: "10px" }}>
                                    Sign Up
                                </Button>
                            </div>

                            <div className="text-center mt-3">
                                <a href="#">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                    </form>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
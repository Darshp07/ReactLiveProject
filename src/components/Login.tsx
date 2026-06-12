
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
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                style={{
                    width: "420px",
                    background: "rgba(255, 255, 255, 0.15)",
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
                    Welcome Back 👋
                </h2>

                <div style={{ marginBottom: "20px" }}>
                    <label>Username</label>
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

                <div style={{ marginBottom: "20px" }}>
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
                    {passwordError && (
                        <small className="text-warning">
                            {passwordError}
                        </small>
                    )}
                </div>

                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={showPassword}
                        onChange={() =>
                            setShowPassword(!showPassword)
                        }
                    />
                    <label className="form-check-label">
                        Show Password
                    </label>
                </div>

                <div className="form-check mb-4">
                    <input
                        className="form-check-input"
                        type="checkbox"
                    />
                    <label className="form-check-label">
                        Remember Me
                    </label>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px"
                    }}
                >
                    <Button
                        type="button"
                        onClick={login}
                        style={{
                            background: "#00c853",
                            border: "none",
                            borderRadius: "12px",
                            width: "120px",
                            fontWeight: "bold"
                        }}
                    >
                        Login
                    </Button>

                    <Button
                        type="button"
                        onClick={() => navigate("/signUp")}
                        style={{
                            background: "#2979ff",
                            border: "none",
                            borderRadius: "12px",
                            width: "120px",
                            fontWeight: "bold"
                        }}
                    >
                        Sign Up
                    </Button>
                </div>

                <div className="text-center mt-4">
                    <a
                        href="#"
                        style={{
                            color: "white",
                            textDecoration: "none"
                        }}
                    >
                        Forgot Password?
                    </a>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
            />
        </div>
    );
}

export default Login;
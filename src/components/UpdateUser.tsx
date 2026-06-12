
import { useState } from 'react';
import { BASE_URL } from '../services/ApiResponse';
import { updateUserRequest, GeneralResponse } from '../components/InterFace/Models';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

function UpdateUser() {
    const location = useLocation();

    const user = location.state;

    const [id] = useState(user.id);
    const [username, setUsername] = useState<string>(user.username || "");
    const [password, setPassword] = useState<string>(user.password || "");
    const [email, setEmail] = useState<string>(user.email || "");
    const [mobile, setMobile] = useState<string>(user.mobile || "");
    const [userError, setUserError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [mobileError, setMobileError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const request: updateUserRequest = {
        id: id,
        username: username,
        password: password,
        email: email,
        mobile: mobile
    };

    const UpdateUsers = async () => {
        debugger;
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

        if (email.trim() === "") {
            setEmailError("Email is required");
            return;
        }
        if (mobile.trim() === "") {
            setMobileError("Mobile number is required");
            return;
        }
        if (mobile.trim().startsWith("9") && mobile.trim().startsWith("8") && mobile.trim().startsWith("7") && mobile.trim().startsWith("6") && mobile.trim().length < 10) {
            setMobileError("Mobile number is not valid");
            return;
        }
        const response = await axios.post<GeneralResponse>(
            `${BASE_URL}users/UpdateUser`,
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
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px"
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">

                        <div
                            style={{
                                background: "rgba(255,255,255,0.15)",
                                backdropFilter: "blur(15px)",
                                borderRadius: "25px",
                                padding: "35px",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.25)"
                            }}
                        >
                            <h2
                                style={{
                                    textAlign: "center",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    marginBottom: "30px"
                                }}
                            >
                                Update User Details
                            </h2>

                            <form>

                                <div className="mb-3">
                                    <label
                                        style={{
                                            color: "#fff",
                                            fontWeight: "500"
                                        }}
                                    >
                                        User Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setUserError("");
                                        }}
                                        style={{
                                            borderRadius: "10px",
                                            padding: "12px"
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
                                    <label
                                        style={{
                                            color: "#fff",
                                            fontWeight: "500"
                                        }}
                                    >
                                        Password
                                    </label>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError("");
                                        }}
                                        style={{
                                            borderRadius: "10px",
                                            padding: "12px"
                                        }}
                                    />

                                    <span
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "45px",
                                            cursor: "pointer"
                                        }}
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <i
                                            className={
                                                showPassword
                                                    ? "bi bi-eye-slash-fill"
                                                    : "bi bi-eye-fill"
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
                                    <label
                                        style={{
                                            color: "#fff",
                                            fontWeight: "500"
                                        }}
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError("");
                                        }}
                                        style={{
                                            borderRadius: "10px",
                                            padding: "12px"
                                        }}
                                    />

                                    {emailError && (
                                        <small className="text-warning">
                                            {emailError}
                                        </small>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        style={{
                                            color: "#fff",
                                            fontWeight: "500"
                                        }}
                                    >
                                        Mobile Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Mobile Number"
                                        value={mobile}
                                        onChange={(e) => {
                                            setMobile(e.target.value);
                                            setMobileError("");
                                        }}
                                        style={{
                                            borderRadius: "10px",
                                            padding: "12px"
                                        }}
                                    />

                                    {mobileError && (
                                        <small className="text-warning">
                                            {mobileError}
                                        </small>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={UpdateUsers}
                                    className="btn btn-success"
                                    style={{
                                        width: "100%",
                                        borderRadius: "10px",
                                        padding: "12px",
                                        fontWeight: "bold",
                                        marginBottom: "10px"
                                    }}
                                >
                                    Update User
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={() => window.history.back()}
                                    style={{
                                        width: "100%",
                                        borderRadius: "10px",
                                        padding: "12px"
                                    }}
                                >
                                    Back
                                </button>

                            </form>
                        </div>

                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateUser;
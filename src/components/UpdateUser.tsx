
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-7">
                    <div className="card shadow" style={{ borderRadius: "30px" }}>
                        <div className="card-header bg-success text-white text-center" style={{ borderRadius: "20px 30px 0 0" }}>
                            <h4>Update User Details</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group" style={{ marginBottom: "15px",borderRadius:"30px" }}>
                                    <div className="container mt-3" style={{ backgroundColor: "#faf9fa", borderRadius: "30px", padding: "30px", border: "1px solid black" }}>
                                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                            <label htmlFor="username">User Name:</label>
                                            <input type="text"
                                                placeholder="Enter Username"
                                                style={{ width: "93%", padding: "5px" }}
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
                                            }}>
                                            <label>Password:</label>

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter Password"
                                                style={{ width: "93%", padding: "5px" }}
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
                                            {passwordError && <small className="text-danger">{passwordError}</small>}
                                        </div>

                                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                            <label htmlFor="email">Email:</label><br />
                                            <input type="email"
                                                placeholder="Enter Email"
                                                style={{ width: "93%", padding: "5px" }}
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
                                                style={{ width: "93%", padding: "5px" }}
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
                                            <button type="button" onClick={UpdateUsers} className="btn btn-success mt-3">
                                                Update
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                         <button className="btn btn-secondary mt-3" onClick={() => window.history.back()}>Back</button>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                />
            </div>
        </div>
    );
}
export default UpdateUser;
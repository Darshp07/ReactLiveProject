import axios from 'axios';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { deleteUserRequest, GeneralResponse, UserResponse } from '../components/InterFace/Models';
import { BASE_URL } from '../services/ApiResponse';
function Users() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const [users, setUsers] = useState<any[]>(
        Array.isArray(location.state)
            ? location.state
            : [location.state]
    );

    function editUser(user: UserResponse) {
        // Implement edit user functionality here
        toast.info(`Edit user with ID: ${user.id}`);
    }
    async function deleteUser(id: number) {
        try {
            const request: deleteUserRequest = { id };

            const response = await axios.post<GeneralResponse>(
                `${BASE_URL}users/deleteUser`,
                request
            );

            if (response.data.code === 1) {
                toast.success(response.data.message);
                // remove deleted user from local state
                setUsers(prev => prev.filter(u => u.id !== id));
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            toast.error(error?.message || 'An error occurred while deleting the user.');
        }
    };

    //debugger;
    //console.log(user.getUserName());
    // if (!user) {
    //     return (
    //         <h3 className="text-center mt-5">
    //             No Data Found
    //         </h3>
    //     );
    // }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "40px"
            }}
        >
            <div className="container">

                <div
                    style={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(15px)",
                        borderRadius: "25px",
                        padding: "30px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            color: "white",
                            marginBottom: "25px",
                            fontWeight: "bold"
                        }}
                    >
                        User Details 👨‍💻
                    </h2>

                    <div className="table-responsive">
                        <table
                            className="table text-center"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.9)",
                                borderRadius: "15px",
                                overflow: "hidden"
                            }}
                        >
                            <thead
                                style={{
                                    background: "#1f2937",
                                    color: "white"
                                }}
                            >
                                <tr>
                                    <th>Id</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Created Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user: any) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>
                                            {new Date(
                                                user.created_date
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-warning me-2"
                                                style={{
                                                    borderRadius: "10px",
                                                    fontWeight: "bold"
                                                }}
                                                onClick={() =>
                                                    navigate("/updateUser", {
                                                        state: user
                                                    })
                                                }
                                            >
                                                ✏️ Edit
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                style={{
                                                    borderRadius: "10px",
                                                    fontWeight: "bold"
                                                }}
                                                onClick={() =>
                                                    deleteUser(user.id)
                                                }
                                            >
                                                🗑 Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <button
                        className="btn btn-light"
                        style={{
                            borderRadius: "12px",
                            fontWeight: "bold",
                            padding: "10px 25px"
                        }}
                        onClick={() => window.history.back()}
                    >
                        ← Back
                    </button>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                />
            </div>
        </div>
    );
}

export default Users;



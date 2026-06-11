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
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-10">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white text-center">
                            <h4>User Details</h4>
                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-hover text-center">

                                <thead className="table-dark">
                                    <tr>
                                        <th>Id</th>
                                        <th>User Name</th>
                                        <th>email</th>
                                        <th>mobile</th>
                                        <th>created_date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        users.map((user: any) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.mobile}</td>
                                                <td>{user.created_date}</td>
                                                <td>

                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() =>
                                                            navigate("/updateUser", {
                                                                state: user
                                                            })
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>

                        </div>

                    </div>
                    <button className="btn btn-secondary mt-3" onClick={() => window.history.back()}>Back</button>
                </div>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
            />
        </div>
    );
}

export default Users;



export interface LogInResponse {
    userName: string;
    passWord: string;
}

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    mobile: string;
    created_date: string;
}

export interface GeneralResponse {
    code: number;
    message: string;
    data: UserResponse;
}

export interface SignUpRequest {
    username: string;
    password: string;
    email: string;
    mobile: string;
    created_date: Date;
}

export interface deleteUserRequest {
    id: number;
}

export interface updateUserRequest {
    id: number;
    username: string;
    password: string;
    email: string;
    mobile: string;
}
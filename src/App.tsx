import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import UpdateUser from './components/UpdateUser';
// @ts-ignore: allow side-effect CSS import without type declarations
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
   return ( 
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/SignUp" element={<SignUp />} />
          { <Route path="/updateUser" element={<UpdateUser />} /> }
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App

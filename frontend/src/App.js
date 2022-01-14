import './App.css';
import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from './components/FrontPage';
import MainPage from './components/MainPage';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  const [userId, setUserId] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/home" element={<MainPage userId={userId} setUserId={setUserId} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

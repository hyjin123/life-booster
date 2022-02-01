import './App.css';
import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from './components/FrontPage';
import MainPage from './components/MainPage';
import Register from './components/Register';
import Login from './components/Login';
import List from './components/List';
import UncompletedTasks from './components/UncompletedTasks';
import InProgressTasks from './components/InProgressTasks';
import CompletedTasks from './components/CompletedTasks';

function App() {

  const [userId, setUserId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  console.log(firstName)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/home" element={<MainPage userId={userId} setUserId={setUserId} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} />} />
        <Route path="/register" element={<Register userId={userId} />} />
        <Route path="/login" element={<Login userId={userId} />} />
        <Route path="/uncompleted" element={<UncompletedTasks userId={userId} setFirstName={setFirstName} setLastName={setLastName} setUserId={setUserId} firstName={firstName} lastName={lastName} />} />
        <Route path="/in-progress" element={<InProgressTasks userId={userId} />} />
        <Route path="/completed" element={<CompletedTasks userId={userId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

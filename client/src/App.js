import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./Page";
import HeaderNav from "./HeaderNav";
import Register from "./Register";
import AlertToast from "./common/AlertToast";
import Login from "./Login";

const App = () => {
  return (
    <div>
      <Router>
        <HeaderNav />
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <AlertToast />
    </div>
  );
};

export default App;

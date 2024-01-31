import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap stylesheet
import "./styles.css"; // SImport your custom stylesheet


function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Login />}></Route>
        <Route path="/home/*" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

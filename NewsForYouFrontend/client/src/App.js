import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewsFeed from "./components/NewsFeed";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/NewsFeed" element={<NewsFeed />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

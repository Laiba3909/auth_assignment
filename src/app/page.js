'use client'
import './style.css'
import Image from 'next/image';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp/page";
import Login from './login/page';
import Dashboard from "./dashboard/page";

function App() {
  return (
    <div>

      <div className='box1'>
     
        <div className="box2">
          <Router>
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketScreen from "./Components/TicketScreen/TicketScreen";
import GettingStarted from "./Components/NavBar/Pages/GettingStarted";
import AssistBrandSettings from "./Components/NavBar/Pages/AssistBrandSettings";
import PolicyEngine from "./Components/NavBar/Pages/PolicyEngine";
import LandingPage from "./Components/LandingPage";
import NavBar from './Components/NavBar/Pages/Navbar'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/navbar" element={<NavBar/>} />
        <Route path="/navbar/getting-started" element={<GettingStarted />} />
        <Route
          path="/navbar/assist-brand-settings"
          element={<AssistBrandSettings />}
        />
        <Route path="/ticket/123" element={<TicketScreen/>} />
        <Route path="/navbar/policy-engine" element={<PolicyEngine />} />
      </Routes>
    </Router>
  );
}

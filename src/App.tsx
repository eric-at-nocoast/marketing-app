import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketScreen from "./components/ticketScreen/TicketScreen";
import GettingStarted from "./components/navBar/Pages/GettingStarted";
import AssistBrandSettings from "./components/navBar/Pages/AssistBrandSettings";
import PolicyEngine from "./components/navBar/Pages/PolicyEngine";
import LandingPage from "./components/landingPage";
import NavBar from './components/navBar/Pages/Navbar'


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

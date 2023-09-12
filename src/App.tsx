import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketScreen from "./Components/TicketScreen/TicketScreen";
import NavLayout from "./Components/NavBar/NavLayout";
import GettingStarted from "./Components/NavBar/Pages/GettingStarted";
import AssistBrandSettings from "./Components/NavBar/Pages/AssistBrandSettings";
import PolicyEngine from "./Components/NavBar/Pages/PolicyEngine";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketScreen />} />
        <Route path="/navbar" element={<NavLayout />} />
        <Route path="/navbar/getting-started" element={<GettingStarted />} />
        <Route
          path="/navbar/assist-brand-settings"
          element={<AssistBrandSettings />}
        />
        <Route path="/navbar/policy-engine" element={<PolicyEngine />} />
      </Routes>
    </Router>
  );
}

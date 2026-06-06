import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { LandingPage } from "./pages/LandingPage";
import { InvitationPage } from "./pages/InvitationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/invite/:invite_slug" element={<LandingPage />} />
        <Route path="/invite/:invite_slug/invitation" element={<InvitationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

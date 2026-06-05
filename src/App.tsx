import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { InvitationPage } from "./pages/InvitationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/invite/:token" element={<InvitationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

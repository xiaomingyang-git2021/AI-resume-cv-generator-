import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ResumeForm from "./components/ResumeForm";
import PreviewResume from "./components/PreviewResume";
import PreviewCoverLetter from "./components/PreviewCoverLetter";
import CoverLetterForm from "./components/CoverLetterForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-resume" element={<ResumeForm />} />
          <Route path="/preview-resume" element={<PreviewResume />} />
          <Route path="/create-cover-letter" element={<CoverLetterForm />} />
          <Route
            path="/preview-cover-letter"
            element={<PreviewCoverLetter />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

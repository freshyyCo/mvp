import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SampleSurvey from "./pages/SampleSurvey";
import CreateSurvey from "./pages/CreateSurvey";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateSurvey />} />
      <Route path="/sample" element={<SampleSurvey />} />
    </Routes>
  );
}

export default App;

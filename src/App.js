import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SampleSurvey from "./pages/SampleSurvey";
import CreateSurvey from "./pages/CreateSurvey";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateSurvey />} />
        <Route path="/sample" element={<SampleSurvey />} />
      </Route>
    </Routes>
  );
}

export default App;

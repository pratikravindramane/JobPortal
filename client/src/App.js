import "./App.css";
import { AuthContenxtProvider } from "./context/AuthContenxt";
import CreateJob from "./pages/Admin.js/CreateJob";
import Login from "./pages/Login";
import OneApplication from "./pages/OneApplication";
import User from "./pages/User";
import AllJobs from "./pages/AllJobs";
import CreateJobCat from "./pages/Admin.js/CreateJobCat";
import CreateJobType from "./pages/Admin.js/CreateJobType";
import OneJob from "./pages/OneJob";
import Register from "./pages/Register";

import Layout from "./utils/Layout";
import { Routes, Route } from "react-router-dom";
import AllApplications from "./pages/Admin.js/AllApplication";
import ResetPassword from "./pages/ResetPassword";
// import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/app/:id" element={<OneApplication />} />
          <Route path="/all/app" element={<AllApplications />} />
          <Route path="/job/:id" element={<OneJob />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/create-job-categorie" element={<CreateJobCat />} />
          <Route path="/create-job-type" element={<CreateJobType />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

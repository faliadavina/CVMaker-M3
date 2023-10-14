import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ManageUser from "./components/ManageUser";
import Portfolio from "./components/Portofolio";
import EditPorto from "./components/EditPorto";
import AddPorto from "./components/AddPorto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/manage_user" element={<ManageUser />}></Route>
        <Route path="/portofolio" element={<Portfolio />}></Route>
        <Route path="/portofolio/edit_portofolio/:id_porto" element={<EditPorto />}></Route>
        <Route path="/portofolio/add_portofolio" element={<AddPorto />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

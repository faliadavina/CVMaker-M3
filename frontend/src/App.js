import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ManageUser from "./components/ManageUser";
import Portfolio from "./pages/PortofolioPage";
import EditPorto from "./pages/EditPortoPage";
import AddPorto from "./pages/AddPortoPage";
import Login from "./components/Login";
import AddSkill from "./pages/AddSkillPage";
import SkillList from "./pages/SkillPage";
import EditSkill from "./pages/EditSkillPage";
import AddOrganisasi from "./pages/AddOrganisasiPage";
import EditOrganisasi from "./pages/EditOrganisasiPage";
import DataDiri from "./pages/DataDiriPage";
import EditDataDiri from "./pages/EditDataDiriPage";
import AddDataDiri from "./pages/AddDataDiriPage";
import Contact from "./pages/Contact";
import Register from "./components/Register";
import My from "./pages/MyCvPage";
import AddPendidikan from "./pages/AddPendidikanPage";
import EditPendidikan from "./pages/EditPendidikanPage";
import PendidikanList from "./pages/PendidikanPage";
import PageView from "./pages/PageView";
import GenerateCV from "./pages/GenerateCVPage";
import Template1 from "./pages/CVTemplate1Page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/manage_user" element={<ManageUser />}></Route>
        <Route path="/portofolio" element={<Portfolio />}></Route>
        <Route path="/portofolio/edit_portofolio/:id_porto" element={<EditPorto />}></Route>
        <Route path="/add_portofolio" element={<AddPorto />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/skills" element={<SkillList />} />
        <Route path="/manage_user" element={<ManageUser />}></Route>
        <Route path="/data_diri" element={<DataDiri />}></Route>
        <Route path="/add_data_diri" element={<AddDataDiri />}></Route>
        <Route path="/edit_data_diri" element={<EditDataDiri />}></Route>
        <Route path="/skills" element={<SkillList />} />
        <Route path="/edit_skill" element={<EditSkill />} />
        <Route path="/add_skill" element={<AddSkill />} />
        <Route path="/add_organisasi" element={<AddOrganisasi />} />
        <Route path="/edit_organisasi" element={<EditOrganisasi />} />
        <Route path="/My" element={<My />} />
        <Route path="/add_skill" element={<AddSkill />}/>
        <Route path="/add_pendidikan" element={<AddPendidikan />}/>
        <Route path="/edit_pendidikan/:id_pend" element={<EditPendidikan />}/>
        <Route path="/pendidikan" element={<PendidikanList />}/>
        <Route path="/generate-cv" element={<GenerateCV />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/page-view" element={<PageView />} />
        <Route path="/cv-template-1" element={<Template1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

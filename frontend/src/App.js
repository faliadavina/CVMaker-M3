import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ManageUser from "./components/ManageUser";
import Login from "./components/Login";
import AddSkill from "./components/AddSkill.js";
import SkillList from "./components/SkillList";
import EditSkill from "./components/EditSkill";
import DataDiri from "./components/DataDiri";
import EditDataDiri from "./components/EditDataDiri";
import AddDataDiri from "./components/AddDataDiri";
import Contact from "./pages/Contact";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/manage_user" element={<ManageUser/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/skills" element={<SkillList />} />
        <Route path="/manage_user" element={<ManageUser/>}></Route>
        <Route path="/data_diri" element={<DataDiri/>}></Route>
        <Route path="/add_data_diri" element={<AddDataDiri/>}></Route>
        <Route path="/edit_data_diri" element={<EditDataDiri/>}></Route>
        <Route path="/skills" element={<SkillList />} />
        <Route path="/edit_skill" element={<EditSkill />} />
        <Route path="/add_skill" element={<AddSkill />}/>
        <Route path="/contact" element={<Contact />}/>
         <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage2";
import ManageUser from "./components/ManageUser";
import Login from "./components/Login";
import AddSkill from "./components/AddSkill.js";
import SkillList from "./components/SkillList.js";
import EditSkill from "./components/EditSkill";
import EmptySkill from "./pages/EmptySkilll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/manage_user" element={<ManageUser/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/add_skill" element={<AddSkill />}/>
        <Route path="/skills" element={<SkillList />} />
        <Route path="/edit-skill" element={<EditSkill />} />
        <Route path="/empty-skill" element={<EmptySkill />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

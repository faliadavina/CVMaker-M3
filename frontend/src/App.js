import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ManageUser from "./components/ManageUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/manage_user" element={<ManageUser/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

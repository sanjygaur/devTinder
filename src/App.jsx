import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./src/NavBar";
import Body from "./src/Body";
import Login from "./src/Login";
import Profile from "./src/Profile";


function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
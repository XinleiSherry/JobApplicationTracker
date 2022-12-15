import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./page/Login";
import NotFont from "./page/NotFont";
import Registered  from './page/Registered';
import Home from "./page/Home";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <Login />} ></Route>
        <Route path="/registered" element={<Registered/>} ></Route>
        <Route path="/home" element={<Home/>} ></Route>
        <Route path='*' element={ <NotFont/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;

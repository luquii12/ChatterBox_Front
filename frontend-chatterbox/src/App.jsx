import { Route, Routes } from "react-router";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import LoginSignup from "./layout/LoginSignup";
import Sidebar from "./components/Sidebar";
import Layout from "./layout/Layout";
import Card from "./components/Card";
import Home from "./layout/Home";
import Creategroup from "./layout/CreateGroup";
import { AuthProvider } from "./auth/AuthProvider";
import RutaProtegida from "./auth/RutasProtegidas";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/" element={
          <RutaProtegida>
          <Layout />
          </RutaProtegida>
        }>
          <Route index element={<Home />} />
          <Route path="/create" element={<Creategroup />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

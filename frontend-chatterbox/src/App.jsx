import { Route, Routes } from "react-router";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import LoginSignup from "./layout/LoginSignup";
import Sidebar from "./components/Sidebar";
import Layout from "./layout/Layout";
import Card from "./components/Card";
import Home from "./layout/Home";
import CreateGroup from "./layout/CreateGroup";
import { AuthProvider } from "./auth/AuthProvider";
import RutaProtegida from "./auth/RutasProtegidas";
import Group from "./layout/Group";
import Welcome from "./layout/Welcome";
import HelpCenter from "./layout/HelpCenter";
import AccountSettings from "./layout/AccountSettings";
import PrivacyPolicy from "./layout/PrivacyPolicy";
import JoinGroup from "./layout/JoinGroup";
import PublicGroups from "./components/PublicGroups";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />

        <Route
          path="/"
          element={
            <RutaProtegida>
              <Layout />
            </RutaProtegida>
          }
        >
          <Route index element={<Home />} />
          <Route path="/group/:id" element={<Group />} />
          <Route path="/create" element={<CreateGroup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/accountSettings" element={<AccountSettings />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/joinGroup" element={<JoinGroup />} />
          <Route path="/publicGroups" element={<PublicGroups />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

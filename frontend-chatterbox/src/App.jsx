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
import HelpCenter from "./pages/HelpCenter";
import AccountSettings from "./layout/AccountSettings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import JoinGroup from "./layout/JoinGroup";
import PublicGroups from "./components/PublicGroups";
import NotFound from "./pages/NotFound";
import Questions from "./pages/Questions";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Terms from "./pages/Terms";
import ChatWithAI from "./components/ChatWithAI";
import GroupSettings from "./layout/GroupSettings";
import UserListAdmin from "./layout/UserListAdmin";

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
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
          <Route path="/create" element={<CreateGroup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/accountSettings" element={<AccountSettings />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/joinGroup" element={<JoinGroup />} />
          <Route path="/publicGroups" element={<PublicGroups />} />
          <Route path="/group/:id" element={<Group />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/settings" element={<AccountSettings/>}/>
        <Route path="/group/:id/settings" element={<GroupSettings/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/chatIA" element={<ChatWithAI/>}/>
        <Route path="/admin" element={<UserListAdmin/>}/>
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

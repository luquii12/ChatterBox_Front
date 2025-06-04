// HelpCenter.jsx
import { ShieldCheck, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router";

const HelpCenter = () => {
  return (
    <div className="min-h-screen background-primary text-white flex flex-col items-center px-6 py-20 space-y-20">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-yellow-200">Help Center</h1>
        <p className="text-4xl font-semibold text-white">Need help? Count on us.</p>
        <p className="max-w-3xl mx-auto text-lg text-gray-300">
          Welcome to the Chatterbox Help Center! Below you'll find our sections for account
          settings, our privacy and security policy, and frequently asked questions from our users.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-38">
        <Link to={"/settings"}>
          <Card icon={<Settings className="w-20 h-20" />} title="Count Settings" />
        </Link>
        <Link to={"/privacy"}>
          <Card icon={<ShieldCheck className="w-20 h-20" />} title="Privacy Policy" />
        </Link>
        <Link to={"/questions"}>
          <Card icon={<HelpCircle className="w-20 h-20" />} title="Questions" />
        </Link>
      </div>
    </div>
  );
};

const Card = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center justify-center background-terciary rounded-2xl p-2 text-center primary-color hover:scale-105 transition transform duration-300 w-72 h-70 shadow-[0_3px_35px_rgba(0,0,0,0.2)] shadow-yellow-100">
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
  );
};

export default HelpCenter;

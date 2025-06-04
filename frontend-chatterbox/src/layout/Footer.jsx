import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-background-secondary text-gray-400 text-sm py-8 px-6">
    <div className="max-w-6xl mx-auto flex flex-col items-center text-center border-b border-primary pb-6">
      <div className="w-full flex flex-col md:flex-row justify-center gap-16">
        <div className="flex flex-col items-center">
          <h3 className="text-primary font-semibold mb-2">HELP</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/questions" className="hover:underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:underline">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center mx-70">
          <h3 className="text-primary font-semibold mb-2">LEGAL</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/terms" className="hover:underline">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-primary font-semibold mb-2">ABOUT</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="hover:underline">
                About Chatterbox
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom copyright */}
    <div className="text-center text-xs text-white-500 mt-4">
      © 2025 Chatterbox. All rights reserved.
    </div>
  </footer>
);

export default Footer;

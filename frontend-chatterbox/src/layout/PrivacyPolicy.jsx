export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen background-primary text-white flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-yellow-100 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-300 mb-10">Updated July 22, 2024</p>

        <div className="background-secondary rounded-xl p-8 shadow-lg text-left border border-gray-700 max-h-[900px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Sección 1 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">1. Information We Collect</h2>
            <p className="text-gray-300">
              We may collect various types of information, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Personal identification information (name, email address, phone number, etc.)</li>
              <li>Technical data (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent on pages, clicks)</li>
              <li>Cookies and tracking data</li>
            </ul>
          </div>

          {/* Sección 2 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>To operate and maintain our services</li>
              <li>To improve user experience and analyze site performance</li>
              <li>To communicate with you (support, newsletters, updates)</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and abuse</li>
            </ul>
          </div>

          {/* Sección 3 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">3. Legal Basis for Processing (GDPR)</h2>
            <p className="text-gray-300">
              If you are from the European Economic Area (EEA), our legal basis for collecting and using personal data depends on the information collected and the specific context in which we collect it. We may process your data because:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>We need to perform a contract with you</li>
              <li>You have given us permission to do so</li>
              <li>The processing is in our legitimate interests</li>
              <li>We need to comply with the law</li>
            </ul>
          </div>

          {/* Sección 4 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-300">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </div>

          {/* Sección 5 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">5. Data Retention</h2>
            <p className="text-gray-300">
              We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your data to the extent necessary to comply with legal obligations, resolve disputes, and enforce our policies.
            </p>
          </div>

          {/* Sección 6 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">6. Data Sharing and Disclosure</h2>
            <p className="text-gray-300">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Service providers who help us run our operations</li>
              <li>Compliance with legal obligations</li>
              <li>Business transfers (e.g., in case of a merger or acquisition)</li>
            </ul>
          </div>

          {/* Sección 7 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">7. International Transfers</h2>
            <p className="text-gray-300">
              Your information, including personal data, may be transferred to — and maintained on — computers located outside of your country or other governmental jurisdiction where data protection laws may differ.
            </p>
          </div>

          {/* Sección 8 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">8. Data Security</h2>
            <p className="text-gray-300">
              We use administrative, technical, and physical safeguards to protect your personal data. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          {/* Sección 9 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">9. Your Rights</h2>
            <p className="text-gray-300">
              Depending on your location, you may have the right to access, correct, update, or delete the information we collect about you. To make a request, contact us directly.
            </p>
          </div>

          {/* Sección 10 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">10. Children's Privacy</h2>
            <p className="text-gray-300">
              Our service is not directed to children under 13, and we do not knowingly collect personal data from children. If we become aware that we have collected personal data from a child, we will take steps to delete it.
            </p>
          </div>

          {/* Sección 11 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold highlight-text mb-2">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-300">
              We may update this policy periodically. Any changes will be posted on this page and, if significant, we will notify users via email or notification on our platform.
            </p>
          </div>

          {/* Sección 12 */}
          <div>
            <h2 className="text-xl font-semibold highlight-text mb-2">12. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions or concerns about this Privacy Policy, please contact us at: <br />
              <span className="underline">privacy@example.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

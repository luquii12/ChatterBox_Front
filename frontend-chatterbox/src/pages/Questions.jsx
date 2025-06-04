import { use, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

const faqs = [
  {
    q: "I didn’t receive a confirmation email. What should I do?",
    a: "Check your spam/junk folder first. If it’s not there, try resending the confirmation or contact support.",
  },
  {
    q: "Can I change the email address linked to my account?",
    a: "Yes, you can update it in your account settings.",
  },
  {
    q: "Why am I not receiving notification emails?",
    a: "Make sure notifications are enabled in settings, and check your spam folder or email filters.",
  },
  {
    q: "I forgot my password. How can I reset it?",
    a: "Click “Forgot password?” on the login page to reset it via email.",
  },
  {
    q: "I can’t log into my account. What should I do?",
    a: "Double-check your login info, reset your password, or contact support if needed.",
  },
  {
    q: "Can I log in with my Google or Apple account?",
    a: "Yes, you can log in using your Google or Apple account if it’s linked.",
  },
  {
    q: "How do you protect my personal information?",
    a: "Your info is encrypted and stored securely, following industry best practices.",
  },
  {
    q: "Is two-factor authentication (2FA) available?",
    a: "Yes, two-factor authentication is available and recommended for added security.",
  },
  {
    q: "What should I do if I suspect unauthorized access to my account?",
    a: "Immediately change your password and contact support to secure your account.",
  },
];

const Questions = () => {
  const {user}=useAuth();
  
  const [form, setForm] = useState({ name: `${user.usuario.nombre_usuario}`, email: `${user.usuario.email}`, comment: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario a tu backend o servicio de soporte
    setSent(true);
    setForm({ name: "", email: "", comment: "" });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold primary-color mb-2">Do You Have Questions?</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        We have answers (well, most of the times!)<br />
        If you have questions about plans, login, email support, or account security, you’ll find helpful answers right here.
        And if you still need help, our technical support team is ready to assist you anytime. Just reach out — we’ve got your back.
      </p>
      <div className="flex flex-wrap gap-4 mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded font-semibold text-sm">📧 Email Support</span>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded font-semibold text-sm">🔐 Login Help</span>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded font-semibold text-sm">🔒 Security</span>
      </div>
      <div className="mb-10">
        {faqs.map((faq, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-semibold text-gray-800 dark:text-gray-100">{faq.q}</p>
            <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Tell us what you need!</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          value={form.name}
          onChange={handleChange}
          required
          disabled
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          value={form.email}
          onChange={handleChange}
          required
          disabled
        />
        <textarea
          name="comment"
          placeholder="Comment..."
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          rows={4}
          value={form.comment}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="cursor-pointer self-end px-6 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition"
        >
          SEND QUESTION
        </button>
        {sent && (
          <p className="text-green-600 font-semibold mt-2">Your question has been sent! We'll get back to you soon.</p>
        )}
      </form>
    </div>
  );
};

export default Questions;
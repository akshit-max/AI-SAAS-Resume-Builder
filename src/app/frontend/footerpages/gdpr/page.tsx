export default function GDPRPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        GDPR Compliance
      </h1>

      <p className="leading-relaxed">
        ResumeAI complies with the General Data Protection Regulation (GDPR).
      </p>

      <h2 className="pt-6 text-lg font-semibold text-gray-900 dark:text-white">
        Your Rights
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access your personal data</li>
        <li>Request correction or deletion</li>
        <li>Withdraw consent at any time</li>
        <li>Request data portability</li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-gray-900 dark:text-white">
        Contact
      </h2>
      <p>Email: support@resumeai.com</p>
    </>
  );
}

export default function TermsOfServicePage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Terms of Service
      </h1>

      <p className="text-sm text-gray-500">
        Last updated: January 2026
      </p>

      <p className="leading-relaxed">
        By using ResumeAI, you agree to these Terms of Service.
      </p>

      <h2 className="pt-6 text-lg font-semibold text-gray-900 dark:text-white">
        Use of Service
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>AI-assisted tools to help create resumes</li>
        <li>You are responsible for reviewing generated content</li>
        <li>No guarantee of hiring outcomes</li>
      </ul>

      <h2 className="pt-6 text-lg font-semibold text-gray-900 dark:text-white">
        Limitation of Liability
      </h2>
      <p className="leading-relaxed">
        ResumeAI is not responsible for employment decisions based on resumes
        created using the platform.
      </p>
    </>
  );
}

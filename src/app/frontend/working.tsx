import { Edit, Sparkles, Download } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Edit,
      title: "Enter Your Details",
      description:
        "Fill in your work experience, education, and skills using a simple, guided form.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Generates Content",
      description:
        "AI helps summarize and refine your input into clear, professional resume bullet points.",
    },
    {
      number: "03",
      icon: Download,
      title: "Review & Download",
      description:
        "Make final edits, preview your resume, and download a clean, ATS-optimized PDF.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your Resume in 3 Simple Steps
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From blank page to a professional resume in minutes. No design skills
            required.
          </p>
        </div>

        {/* Steps */}
        <div className="  grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-8 h-px bg-gray-300 dark:bg-gray-700 translate-x-full" />
              )}

              <div className=" relative h-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                {/* Step number */}
                <div className=" absolute -top-4 -left-4 mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                  <step.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>

                {/* Text */}
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

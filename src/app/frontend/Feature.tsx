import { Sparkles, Target, FileText, Download, Lightbulb, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Resume Writing',
      description: 'Generate professional resume content with AI-powered suggestions for each section.',
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Target,
      title: 'ATS-Optimized Formatting',
      description: 'Uses clean, ATS-optimized formatting and standard sections so your resume is readable by applicant tracking systems.',
    },
    {
      icon: FileText,
      title: 'Professional Templates',
      description: 'Clean, professional resume templates designed for clarity and readability. More templates coming soon.',
      color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Download,
      title: 'One-Click Export',
      description: 'Download your resume as a clean, professionally formatted PDF.',
      color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    },
    {
      icon: Lightbulb,
      title: 'AI Suggestions',
      description: 'Receive AI-generated suggestions to improve clarity and impact.',
      color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    },
    {
      icon: Zap,
      title: 'Resume Content Summarization',
      description: 'Summarize and refine your resume content into concise, professional bullet points with improved wording and structure.',
      color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Build a Strong Resume
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our AI-powered platform provides all the tools you need to create a resume that stands out and gets results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

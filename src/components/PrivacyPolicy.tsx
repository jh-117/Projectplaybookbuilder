import { ArrowLeft, Shield, Layers } from 'lucide-react';
import React from 'react';

function PrivacyPolicy({ onBack, onHomeClick }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onHomeClick}
          >
            <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Playbook Builder</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-10 h-10 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            </div>

            <div className="prose prose-sm max-w-none space-y-6">
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                <p className="text-gray-700">
                  Project Playbook Builder ("the Service") is an AI-powered lessons learned library 
                  that helps teams capture, standardize, and search project insights. This privacy 
                  policy explains how we collect, use, and protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">User Input Data:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Project Information:</strong> Project names, incident details, lessons learned</li>
                  <li><strong>Lesson Details:</strong> Category, impact severity, root cause analysis, recommendations</li>
                  <li><strong>Playbook Content:</strong> AI-generated playbook cards with summaries, fixes, do/don't lists</li>
                  <li><strong>Attachments:</strong> Optional documents you provide for context</li>
                  <li><strong>Status Information:</strong> Draft, needs edit, approved status for your entries</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Usage Information:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Anonymous Usage Data:</strong> General statistics about feature usage and performance</li>
                  <li><strong>Session Information:</strong> Temporary data during your active session</li>
                  <li><strong>Library Metadata:</strong> Category usage, department filters, search patterns (anonymized)</li>
                </ul>

                <p className="text-gray-700 mt-4 p-4 bg-blue-50 rounded-lg">
                  <strong>Important:</strong> We do <strong>not</strong> collect:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Personal identification information (name, email, company details)</li>
                    <li>Payment information (our service is free)</li>
                    <li>User accounts or login credentials</li>
                    <li>Contact information or demographic data</li>
                    <li>Sensitive project data beyond what you choose to share</li>
                  </ul>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Playbook Generation:</strong> To create standardized playbook cards from your lesson inputs</li>
                  <li><strong>AI Processing:</strong> To analyze incidents and generate actionable recommendations</li>
                  <li><strong>Library Management:</strong> To organize and categorize playbook cards for search and retrieval</li>
                  <li><strong>Tag Generation:</strong> To auto-create relevant tags for easier searching</li>
                  <li><strong>Checklist Creation:</strong> To generate prevention checklists for future projects</li>
                  <li><strong>Improvement:</strong> To enhance our AI models and service quality</li>
                  <li><strong>Temporary Storage:</strong> To maintain your session while creating and editing playbooks</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Processing & AI Services</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Kadosh AI/OpenAI:</strong> Your lesson details are processed by AI models to generate standardized playbook cards</li>
                  <li><strong>Content Standardization:</strong> Inputs are reformatted into consistent "What happened", "Root cause", "Recommended fix" formats</li>
                  <li><strong>No Training Data:</strong> Your specific project information is not used to train AI models beyond your immediate session</li>
                  <li><strong>Temporary Processing:</strong> Data is processed in real-time and not stored for future model training</li>
                  <li><strong>Auto-tagging:</strong> AI analyzes content to suggest relevant categories and tags</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Storage & Retention</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Lesson Inputs:</strong> Stored as part of your playbook creation process</li>
                  <li><strong>Generated Playbooks:</strong> Stored in your private library for access and editing</li>
                  <li><strong>Status History:</strong> Draft, needs edit, and approved statuses are saved</li>
                  <li><strong>Attachments:</strong> Processed and stored only during active session; deleted after processing</li>
                  <li><strong>Export Data:</strong> Generated PDFs and checklists are available for export; not stored after download</li>
                  <li><strong>Session Data:</strong> Cleared when you close your browser or end your session</li>
                  <li><strong>Anonymous Analytics:</strong> Aggregated usage statistics retained for service improvement</li>
                  <li><strong>User Ownership:</strong> All your playbooks are private by default; only you can access them</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Secure transmission using HTTPS/SSL encryption</li>
                  <li>No permanent storage of personal or sensitive information</li>
                  <li>Regular security monitoring and updates</li>
                  <li>Automatic data cleanup of temporary files</li>
                  <li>Private workspace isolation (users cannot access others' playbooks)</li>
                  <li>Secure handling of uploaded attachments</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Third-Party Services</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>AI Providers:</strong> Content generation powered by Kadosh AI/OpenAI (subject to their privacy policies)</li>
                  <li><strong>Hosting Services:</strong> Secure cloud infrastructure for application hosting</li>
                  <li><strong>No Data Sharing:</strong> We do not sell, rent, or share your project data with third parties for marketing or advertising</li>
                  <li><strong>No Collaboration Tools:</strong> MVP does not include sharing features; all playbooks remain private</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Content & Intellectual Property</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Your Lessons:</strong> You retain all rights to the project information and lessons you provide</li>
                  <li><strong>Generated Playbooks:</strong> You own all playbook cards generated from your inputs</li>
                  <li><strong>Library Content:</strong> You own all entries in your personal library</li>
                  <li><strong>AI-Generated Content:</strong> Standardized formats and recommendations created by AI are provided for your use without restrictions</li>
                  <li><strong>Export Rights:</strong> You can export PDF playbooks and checklists for use in project documentation</li>
                  <li><strong>Responsibility:</strong> You are responsible for ensuring your inputs and use of generated materials comply with applicable laws and organizational policies</li>
                  <li><strong>No Sensitive Data:</strong> We recommend not including confidential, proprietary, or sensitive information in your inputs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Single-User Privacy Model</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Private by Default:</strong> All playbook entries are automatically private; only you can see them</li>
                  <li><strong>No Sharing:</strong> MVP does not include sharing or collaboration features across users</li>
                  <li><strong>No Cross-Access:</strong> PMO, project team members, and other users cannot view each other's libraries</li>
                  <li><strong>No Admin Oversight:</strong> No organizational or administrative access to user content</li>
                  <li><strong>Personal Library:</strong> Each user has a completely isolated, private lessons learned library</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Children's Privacy</h2>
                <p className="text-gray-700">
                  Our service is intended for professional project management use and is not designed for 
                  or directed at children under 18 years of age. We do not knowingly collect any 
                  information from children.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to This Policy</h2>
                <p className="text-gray-700">
                  We may update this privacy policy to reflect changes in our practices or legal requirements. 
                  The updated version will be posted here with a revised "Last Updated" date. 
                  We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Information</h2>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy or our data practices, please contact:<br />
                  <strong>Email:</strong> privacy@playbookbuilder.ai<br />
                  <strong>Website:</strong> playbookbuilder.ai
                </p>
              </section>

              <section className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Summary</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ <strong>No accounts required</strong> - use instantly without registration</li>
                  <li>✓ <strong>No personal data collected</strong> - we don't ask for names or emails</li>
                  <li>✓ <strong>Private by default</strong> - all your lessons and playbooks are visible only to you</li>
                  <li>✓ <strong>You own everything</strong> - your project lessons, AI-generated playbooks, and library are yours</li>
                  <li>✓ <strong>Secure processing</strong> - AI analyzes your lessons to create standardized formats</li>
                  <li>✓ <strong>100% anonymous</strong> - no tracking or user profiling</li>
                  <li>✓ <strong>Easy export</strong> - download PDF playbooks and checklists for project documentation</li>
                  <li>✓ <strong>Project-focused</strong> - designed for PMO, project teams, and operations professionals</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
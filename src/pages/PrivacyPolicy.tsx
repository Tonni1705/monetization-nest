
import React from 'react';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <PageTransition>
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
              
              <div className="prose prose-blue max-w-none">
                <p className="text-lg mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                <p>We collect information to provide better services to all our users. The information Telegram Private collects includes basic user data needed for communication, payment processing, and service improvement.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Information</h2>
                <p>We use the information we collect to provide, maintain, protect, and improve our services, to develop new ones, and to protect Telegram Private and our users. We also use this information to offer you tailored content and services.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Security</h2>
                <p>We work hard to protect Telegram Private and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. All data is encrypted in transit and at rest.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Content</h2>
                <p>All content shared between creators and their audience is private and encrypted. We do not monitor, access, or store the content of your communications unless required by law.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Information Sharing</h2>
                <p>We do not share personal information with companies, organizations, or individuals outside of Telegram Private except in the following cases:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>With your consent</li>
                  <li>For external processing by our trusted service providers</li>
                  <li>For legal reasons</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2>
                <p>We retain data for as long as necessary to provide our services. If you delete your account, we will delete your data within 30 days, except where we need to retain information for legal obligations.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
                <p>We may change this privacy policy from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
                <p>If you have questions about this privacy policy, please contact us through our Telegram bot or support channels.</p>
              </div>
            </div>
          </Container>
        </section>
      </PageTransition>
    </MainLayout>
  );
};

export default PrivacyPolicy;

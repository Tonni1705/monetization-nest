
import React from 'react';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';

const TermsOfService = () => {
  return (
    <MainLayout>
      <PageTransition>
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-display font-bold mb-8">Terms of Service</h1>
              
              <div className="prose prose-blue max-w-none">
                <p className="text-lg mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
                <p>Welcome to Telegram Private. These Terms of Service govern your use of our platform and provide information about our services. By using Telegram Private, you agree to these terms.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Using Our Services</h2>
                <p>You must follow any policies made available to you within the Services. Don't misuse our Services. You may use our Services only as permitted by law. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Privacy and Copyright Protection</h2>
                <p>Our privacy policies explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that Telegram Private can use such data in accordance with our privacy policies.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Your Content in Our Services</h2>
                <p>Our Services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Modifying and Terminating Our Services</h2>
                <p>We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Our Warranties and Disclaimers</h2>
                <p>We provide our Services using a commercially reasonable level of skill and care. But there are certain things that we don't promise about our Services.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Liability for Our Services</h2>
                <p>When permitted by law, Telegram Private will not be responsible for lost profits, revenues, or data, financial losses or indirect, special, consequential, exemplary, or punitive damages.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Business Uses of Our Services</h2>
                <p>If you are using our Services on behalf of a business, that business accepts these terms.</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">9. About These Terms</h2>
                <p>We may modify these terms or any additional terms that apply to a Service. You should look at the terms regularly. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted.</p>
              </div>
            </div>
          </Container>
        </section>
      </PageTransition>
    </MainLayout>
  );
};

export default TermsOfService;

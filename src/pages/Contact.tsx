import React from 'react';
import { Mail, Github, Linkedin,Twitter } from 'lucide-react';
import ContactForm from '../components/ContactForm';

interface ContactProps {
  theme: string;
}

const Contact: React.FC<ContactProps> = ({ theme }) => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Mail className="mr-3 h-6 w-6 text-red-500" />
          <h2 className="text-3xl font-bold font-mono">Contact</h2>
        </div>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-mono">Get In Touch</h3>
              <p className="mb-4 font-mono">
                Have a project in mind or want to discuss a potential collaboration? 
                Feel free to reach out using the contact form or through my social media profiles.
              </p>
              <div className="space-y-4 mt-6">
                <div className="flex items-center">
                  <Twitter className="h-5 w-5 mr-3 text-blue-500" />
                  <span className="font-mono">twitter.com/Yasumasascience</span>
                </div>
                <div className="flex items-center">
                  <Github className="h-5 w-5 mr-3 text-blue-500" />
                  <span className="font-mono">github.com/KTaisei</span>
                </div>
              </div>
            </div>
            <ContactForm theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React from "react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-8 rounded-lg mt-10">
      <div className="max-w-7xl mx-auto  flex items-center justify-evenly gap-8">
        {/* Logo & Description Section */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">BrightMind</h2>
          <p className="text-sm text-gray-400">
            Empowering you to learn and build skills with quality courses.
          </p>
        </div>

        {/* Quick Links Section */}
        

        {/* Contact Section */}
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-sm text-gray-400">Email: support@brightmind.com</p>
          <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-400 mt-8">
        <p>&copy; {new Date().getFullYear()} BrightMind. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

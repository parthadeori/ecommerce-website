import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p>© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        <p className="mt-2 text-sm">Built with ❤️ using React & Next.js</p>
      </div>
    </footer>
  );
};

export default Footer;

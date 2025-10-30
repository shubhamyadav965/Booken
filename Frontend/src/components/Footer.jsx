import React from "react";

function Footer() {
  return (
    <footer className="bg-base-200 dark:bg-slate-900 dark:text-white py-8 mt-12">
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Booken</h3>
            <p className="text-sm mt-2">Your digital bookstore</p>
          </div>
          <div className="text-sm">
            <p>&copy; 2024 Booken. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

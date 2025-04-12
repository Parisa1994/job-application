import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";

const Header = () => {
  return (
    <div>
      <div>
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center mb-4">
          Expense Tracker
        </h1>
      </div>

      <div className="mt-6">
        <p className="text-center text-gray-500">
          Track your daily expenses easily!
        </p>
      </div>
    </div>
  );
};

export default Header;

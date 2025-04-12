import React from "react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  fullScreen = false,
}) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 z-50"
    : "flex flex-col items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300 text-lg">{message}</p>
    </div>
  );
};

export default Loading;

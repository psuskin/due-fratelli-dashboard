import { useEffect, useState } from 'react';

interface StatusMessageProps {
  status: 'idle' | 'success' | 'error' | 'warning';
  message?: string;
  className?: string;
  version?: number;
}

export default function StatusMessage({ status, message, className = '', version = 0 }: StatusMessageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (status !== 'idle') {
      // Start rendering the component
      setShouldRender(true);

      // Trigger the slide-up animation after a brief delay
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 50);

      // Hide the component after 3 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      // Remove from DOM after animation completes
      const removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 3500);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
    } else {
      setIsVisible(false);
      setShouldRender(false);
    }
  }, [status, message, version]);

  if (!shouldRender || status === 'idle') return null;

  return (
    <div
      className={`mt-4 transition-all duration-500 ease-out ${className} ${
        isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
      }`}
    >
      {status === 'success' && (
        <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-2xl">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-800 font-medium text-sm sm:text-base">
              {message || 'Menu uploaded successfully!'}
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="text-red-800 font-medium text-sm sm:text-base">
              {message || 'Upload failed. Please try again.'}
            </p>
          </div>
        </div>
      )}

      {status === 'warning' && (
        <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M5.93 19h12.14a2 2 0 001.73-3l-6.07-10.5a2 2 0 00-3.46 0L4.2 16a2 2 0 001.73 3z"
              />
            </svg>
            <p className="text-amber-800 font-medium text-sm sm:text-base">
              {message || 'Please check the file requirements.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

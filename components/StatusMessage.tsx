interface StatusMessageProps {
  status: 'idle' | 'success' | 'error';
  className?: string;
}

export default function StatusMessage({ status, className = '' }: StatusMessageProps) {
  if (status === 'idle') return null;

  return (
    <div className={`mt-4 ${className}`}>
      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
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
            <p className="text-green-800 font-medium  ">Menu uploaded successfully!</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
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
            <p className="text-red-800 font-medium  ">Upload failed. Please try again.</p>
          </div>
        </div>
      )}
    </div>
  );
}

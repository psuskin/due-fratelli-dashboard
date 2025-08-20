interface UploadButtonProps {
  onUpload: () => void;
  disabled: boolean;
  isUploading: boolean;
  className?: string;
}

export default function UploadButton({
  onUpload,
  disabled,
  isUploading,
  className = '',
}: UploadButtonProps) {
  return (
    <button
      onClick={onUpload}
      disabled={disabled}
      className={`w-full bg-[var(--primary)] hover:bg-[#dcb34c] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform cursor-pointer hover:transform-y-[1.02] disabled:hover:scale-100 ${className}`}
    >
      {isUploading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Uploading...</span>
        </div>
      ) : (
        'Upload Menu'
      )}
    </button>
  );
}

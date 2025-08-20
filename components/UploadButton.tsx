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
      className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base ${className}`}
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

import { useRef } from 'react';

interface FileUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  dragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  className?: string;
}

export default function FileUpload({
  selectedFile,
  onFileSelect,
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  className = ''
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type === 'application/pdf') {
      onFileSelect(files[0]);
    }
  };

  // Clear file input when selectedFile becomes null
  if (!selectedFile && fileInputRef.current && fileInputRef.current.value) {
    fileInputRef.current.value = '';
  }

  return (
    <div className={`mb-8 ${className}`}>
      <label className="block text-sm font-semibold text-[var(--foreground)] mb-3 font-[var(--font-fjalla-one)]">
        Select PDF File
      </label>
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-[var(--primary)] bg-[var(--accent)]/20'
            : 'border-[var(--border)] hover:border-[var(--primary)]/50'
        }`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-[var(--accent)] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-medium text-[var(--foreground)] font-[var(--font-fjalla-one)]">
              {selectedFile ? selectedFile.name : 'Drop your PDF here'}
            </p>
            <p className="text-sm text-[var(--foreground)]/60 mt-1">
              or click to browse files
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
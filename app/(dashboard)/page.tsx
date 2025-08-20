'use client';

import { useState, useRef } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MENU_OPTIONS = [
  { value: 'desserkarte-due.pdf', label: 'Desserkarte' },
  { value: 'hauptspeisekarte-due.pdf', label: 'Hauptspeisekarte' },
  { value: 'mittagskarte-due.pdf', label: 'Mittagskarte' },
  { value: 'tagesempfehlung-due.pdf', label: 'Tagesempfehlung' }
];

const WEBHOOK_URL = 'https://susko.app.n8n.cloud/webhook/1a96c281-cea5-49b0-b144-6c185409dc6d';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type === 'application/pdf') {
      setSelectedFile(files[0]);
      setUploadStatus('idle');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type === 'application/pdf') {
      setSelectedFile(files[0]);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedMenu) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      const url = `${WEBHOOK_URL}?filename=${encodeURIComponent(selectedMenu)}`;
      
      const response = await fetch(url, {
        method: 'POST',
        body: selectedFile,
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (response.ok) {
        setUploadStatus('success');
        setSelectedFile(null);
        setSelectedMenu('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-due">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gradient-due mb-4">
              Due Fratelli
            </h1>
            <p className="text-lg text-[var(--secondary)] font-medium">
              Menu Upload Portal
            </p>
            <p className="text-sm text-[var(--foreground)] mt-2 opacity-80">
              Upload new menu PDFs to update the restaurant website
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[var(--border)] overflow-hidden">
            <div className="p-8">
              {/* File Upload Area */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[var(--foreground)] mb-3">
                  Select PDF File
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    dragActive
                      ? 'border-[var(--primary)] bg-[var(--accent)]/20'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
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
                      <p className="text-lg font-medium text-[var(--foreground)]">
                        {selectedFile ? selectedFile.name : 'Drop your PDF here'}
                      </p>
                      <p className="text-sm text-[var(--foreground)]/60 mt-1">
                        or click to browse files
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[var(--foreground)] mb-3">
                  Select Menu Type
                </label>
                <Select value={selectedMenu} onValueChange={setSelectedMenu}>
                  <SelectTrigger className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200 bg-white text-[var(--foreground)] h-auto">
                    <SelectValue placeholder="Choose a menu type..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-[var(--border)] rounded-xl shadow-lg">
                    {MENU_OPTIONS.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="px-4 py-2 hover:bg-[var(--accent)] focus:bg-[var(--accent)] cursor-pointer"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || !selectedMenu || isUploading}
                className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
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

              {/* Status Messages */}
              {uploadStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-800 font-medium">Menu uploaded successfully!</p>
                  </div>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-red-800 font-medium">Upload failed. Please try again.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-[var(--foreground)]/60">
              Powered by Due Fratelli Restaurant Management
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

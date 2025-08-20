'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import MenuSelector from '@/components/MenuSelector';
import UploadButton from '@/components/UploadButton';
import StatusMessage from '@/components/StatusMessage';
import Footer from '@/components/Footer';

const WEBHOOK_URL = 'https://susko.app.n8n.cloud/webhook/1a96c281-cea5-49b0-b144-6c185409dc6d';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [dragActive, setDragActive] = useState(false);


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
          <Header />
          
          <div className="bg-white rounded-2xl shadow-xl border border-[var(--border)] overflow-hidden">
            <div className="p-8">
              <FileUpload
                selectedFile={selectedFile}
                onFileSelect={setSelectedFile}
                dragActive={dragActive}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              />
              
              <MenuSelector
                selectedMenu={selectedMenu}
                onMenuChange={setSelectedMenu}
              />
              
              <UploadButton
                onUpload={handleUpload}
                disabled={!selectedFile || !selectedMenu || isUploading}
                isUploading={isUploading}
              />
              
              <StatusMessage status={uploadStatus} />
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </main>
  );
}

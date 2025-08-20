'use client';

import BackgroundText from '@/components/BackgroundText';
import FileUpload from '@/components/FileUpload';
import MenuSelector from '@/components/MenuSelector';
import StatusMessage from '@/components/StatusMessage';
import UploadButton from '@/components/UploadButton';
import { useState } from 'react';

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
    <main className="min-h-screen bg-gradient-due flex items-center justify-center relative">
      <BackgroundText text="Unser Menü " />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="block md:hidden pb-6">
          <div className="">
            <h3 className=" lg:-top-8 text-lg lg:text-2xl text-black/70 tracking-[0.2em] uppercase">
              Ristorante
            </h3>
            <h1 className="uppercase text-2xl sm:text-3xl md:text-[3.8rem] font-bold text-black mb-2 -mt-1.5">
              Due Fratelli
            </h1>
          </div>
          <div className="">
            <p className="text-sm font-medium">Menu Upload Portal</p>
            <p className="text-xs sm:text-sm opacity-80">
              Upload new menu PDFs to update the restaurant website
            </p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden relative z-10">
            <div className="p-4 sm:p-6 lg:p-7">
              <FileUpload
                selectedFile={selectedFile}
                onFileSelect={setSelectedFile}
                dragActive={dragActive}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              />

              <MenuSelector selectedMenu={selectedMenu} onMenuChange={setSelectedMenu} />

              <UploadButton
                onUpload={handleUpload}
                disabled={!selectedFile || !selectedMenu || isUploading}
                isUploading={isUploading}
              />
            </div>
          </div>
          <StatusMessage status={uploadStatus} />

          {/* <Footer /> */}
        </div>
      </div>
    </main>
  );
}

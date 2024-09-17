'use client'
import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

const Downloads = () => {
  const [copySuccess, setCopySuccess] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const apkFiles = [
    { 
      name: 'SHAMBA v7a', 
      filename: 'app-armeabi-v7a-release.apk', 
      fileUrl: 'https://utfs.io/f/DNXMybj6qSRCPlWqi4ZM6oc7YKUipR2ul94kzX1gm0xsQABd'
    },
    { 
      name: 'SHAMBA v8a', 
      filename: 'app-armeabi-v8a-release.apk', 
      fileUrl: 'https://utfs.io/f/DNXMybj6qSRCpbhxFTNAKvtXYw4LkBhD7mzNdSFpTE1IQrCl'
    },
  ];

  const handleDownload = (filename: string, fileUrl: string) => {
    setDownloading(filename);
    window.location.href = fileUrl;
    setNotification(`${filename} download started!`);
    setDownloading(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Link copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Failed to copy');
    });
  };

  const shareUrl = (platform: string, fileUrl: string) => {
    const text = `Download Shamba Assistant APK: ${fileUrl}`;
    
    switch(platform) {
      case 'whatsapp':
        return `https://wa.me/?text=${encodeURIComponent(text)}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fileUrl)}`;
      case 'x':
        return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
      default:
        return '#';
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-green-800 text-center">Download Shamba Assistant</h1>
        <p className="mb-6 sm:mb-8 text-center text-green-700 max-w-2xl mx-auto">
          Shamba Assistant leverages AI for soil testing and other agricultural tasks. 
          Download the APK suitable for your device and start optimizing your farm today!
        </p>
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {apkFiles.map((apk) => (
            <div key={apk.filename} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-2 sm:mb-3">{apk.name}</h2>
              <p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">Filename: {apk.filename}</p>
              <button 
                onClick={() => handleDownload(apk.filename, apk.fileUrl)}
                disabled={downloading === apk.filename}
                className="w-full bg-green-600 text-white text-center px-4 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 mb-4 relative overflow-hidden"
              >
                {downloading === apk.filename ? 'Downloading...' : 'Download APK'}
              </button>
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm text-gray-500">Share:</p>
                <div className="flex space-x-2 sm:space-x-3">
                  <a href={shareUrl('whatsapp', apk.fileUrl)} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                    <FaWhatsapp size={20} />
                  </a>
                  <a href={shareUrl('facebook', apk.fileUrl)} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                    <FaFacebookF size={20} />
                  </a>
                  <a href={shareUrl('x', apk.fileUrl)} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                    <FaXTwitter size={20} />
                  </a>
                  <button onClick={() => copyToClipboard(apk.fileUrl)} className="text-green-600 hover:text-green-800">
                    📋
                  </button>
                </div>
              </div>
              {copySuccess && <p className="text-xs sm:text-sm text-green-600 mt-2">{copySuccess}</p>}
            </div>
          ))}
        </div>
      </div>
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Downloads;
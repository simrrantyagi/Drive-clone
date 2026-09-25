'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function DrivePage() {
  const { data: session } = useSession();
  const [files, setFiles] = useState([
    { name: "Resume.pdf", type: "file" },
    { name: "Projects", type: "folder" }
  ]);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-6">Google Drive Clone</h1>
        <button 
          onClick={() => signIn('google')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Login with Google
        </button>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      type: "file"
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4 flex flex-col">
        <h2 className="font-bold text-xl mb-6">Drive</h2>
        <div className="flex items-center space-x-2 mb-6">
          {session.user?.image && <img src={session.user.image} className="w-10 h-10 rounded-full" />}
          <span className="font-medium">{session.user?.name}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">My Drive</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {files.map((file, idx) => (
            <div key={idx} className="border bg-white p-4 rounded-lg flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
              <span className="text-5xl">
                {file.type === "file" ? "📄" : "📁"}
              </span>
              <span className="mt-2 text-center break-words">{file.name}</span>
            </div>
          ))}
        </div>

        {/* Upload */}
        <div className="mt-6">
          <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Upload File
            <input type="file" className="hidden" multiple onChange={handleFileUpload} />
          </label>
        </div>
      </div>
    </div>
  );
}

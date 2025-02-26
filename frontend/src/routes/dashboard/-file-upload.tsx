import { useUploadDatabase } from "@/lib/hooks/data";
import { useState, useCallback, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DatabaseUploader() {
  const {
    mutate: uploadDatabase,
    isPending,
    isError,
    error,
    data,
  } = useUploadDatabase();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = useCallback(() => {
    if (selectedFile) {
      uploadDatabase(selectedFile);
    }
  }, [selectedFile, uploadDatabase]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file || null);
  };

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`p-6 border-2 border-dashed border-gray-400 rounded-md ${
        isDragging ? "bg-gray-100 border-4 border-blue-500" : ""
      } min-h-[200px] flex flex-col justify-center items-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="mb-3 text-center text-gray-700">
        Drag and drop your database file here or
      </p>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleSelectFileClick}
        disabled={isPending}
      >
        Select from computer
      </Button>
      <Input
        type="file"
        accept=".db,.sqlite,.sqlite3"
        onChange={handleFileChange}
        disabled={isPending}
        className="hidden"
        ref={fileInputRef}
      />
      {selectedFile && (
        <p className="mt-3 text-sm font-mono text-gray-600">
          Selected file: <span className="font-bold">{selectedFile.name}</span>
        </p>
      )}
      <Button
        className="mt-4"
        onClick={handleUpload}
        disabled={!selectedFile || isPending}
      >
        {isPending ? "uploading..." : "upload database"}
      </Button>

      {isError && (
        <div className="text-sm text-red-900 font-mono mt-2">
          Error: {error?.message}
        </div>
      )}
      {showSuccess && data && (
        <div className="mt-4">
          <p className="text-sm font-mono text-green-600">Upload successful!</p>
          <p className="text-sm font-mono text-black">
            Metadata: <span className="font-bold">{data.description}</span>
          </p>
        </div>
      )}
    </div>
  );
}

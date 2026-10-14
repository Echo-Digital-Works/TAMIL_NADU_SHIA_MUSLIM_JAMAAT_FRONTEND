import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import adminApi from '../services/adminApi';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  label?: string;
  helperText?: string;
  compact?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  currentImageUrl,
  label = 'Upload Image',
  helperText = 'Supports PNG, JPG, WEBP, SVG up to 10MB',
  compact = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB.');
      return;
    }

    // Validate type
    if (!file.type.startsWith('image/')) {
      setError('Only image files allowed.');
      return;
    }

    setError(null);
    setIsUploading(true);
    setSuccess(false);

    try {
      // Local preview
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      // Upload to backend
      const response = await adminApi.uploadImage(file);
      if (response.data?.url) {
        onImageUploaded(response.data.url);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed.');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  if (compact) {
    return (
      <div className="relative inline-flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-3 py-1.5 rounded-lg border border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          title="Upload replacement photo"
        >
          {isUploading ? (
            <Loader2 size={13} className="animate-spin text-gold" />
          ) : success ? (
            <CheckCircle2 size={13} className="text-emerald-400" />
          ) : (
            <Upload size={13} />
          )}
          <span>{isUploading ? 'Uploading...' : success ? 'Uploaded!' : 'Replace Photo'}</span>
        </button>
        {error && (
          <span className="text-[10px] text-red-400 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }

  const activeUrl = previewUrl || (currentImageUrl ? adminApi.resolveImageUrl(currentImageUrl) : null);

  return (
    <div className="space-y-3">
      {label && <label className="block text-sm font-medium text-ivory/90">{label}</label>}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="group relative cursor-pointer border-2 border-dashed border-gold/30 hover:border-gold/60 rounded-2xl p-6 text-center transition-all duration-200 bg-midnight/60 hover:bg-gold/5 flex flex-col items-center justify-center min-h-[160px]"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {activeUrl ? (
          <div className="relative w-full max-w-sm h-36 rounded-xl overflow-hidden border border-gold/20 shadow-lg group-hover:scale-[1.02] transition-transform">
            <img src={activeUrl} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-ivory">
              Click to replace image
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center group-hover:scale-110 transition-transform">
              {isUploading ? <Loader2 className="animate-spin" size={24} /> : <Upload size={22} />}
            </div>
            <p className="text-sm font-medium text-ivory/80">Click or drag image to upload</p>
            <p className="text-xs text-ivory/50">{helperText}</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/70 rounded-2xl flex flex-col items-center justify-center gap-2 backdrop-blur-sm z-10">
            <Loader2 className="animate-spin text-gold" size={28} />
            <span className="text-xs font-medium text-ivory">Uploading & processing image...</span>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-xs mt-1">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-emerald-400 text-xs mt-1">
          <CheckCircle2 size={14} />
          <span>Image uploaded and saved to backend successfully!</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

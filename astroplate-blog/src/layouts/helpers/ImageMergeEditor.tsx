import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/useLanguage';

export default function ImageMergeEditor() {
  const [mounted, setMounted] = useState(false);
  const { translate } = useLanguage();
  const [images, setImages] = useState<string[]>([]);
  const [mergeFormat, setMergeFormat] = useState<string>('horizontal');
  const [spacing, setSpacing] = useState<number>(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImages((prev) => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-primary');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('border-primary');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary');
    
    const files = e.dataTransfer.files;
    const fileEvent = {
      target: { files }
    } as React.ChangeEvent<HTMLInputElement>;
    handleFileSelect(fileEvent);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const mergeImages = async () => {
    if (images.length < 2) {
      alert(translate('tools.imageMerge.selectAtLeast2'));
      return;
    }

    setLoading(true);
    try {
      // Call backend API or use Canvas API
      const formData = new FormData();
      images.forEach((img, idx) => {
        // Convert data URL to blob
        const arr = img.split(',');
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }
        const blob = new Blob([u8arr], { type: 'image/png' });
        formData.append(`image_${idx}`, blob);
      });

      formData.append('format', mergeFormat);
      formData.append('spacing', spacing.toString());

      // For now, create a simple client-side merge using Canvas
      const canvas = createMergedImage();
      setPreview(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Error merging images:', error);
      alert(translate('tools.imageMerge.errorMerging'));
    } finally {
      setLoading(false);
    }
  };

  const createMergedImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Simple horizontal merge implementation
    const imgElements: HTMLImageElement[] = [];
    images.forEach((dataUrl) => {
      const img = new Image();
      img.src = dataUrl;
      imgElements.push(img);
    });

    // This is a placeholder - actual implementation would handle all formats
    canvas.width = 800;
    canvas.height = 600;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#999999';
    ctx.fillText('Image merge preview would render here', 50, 300);

    return canvas;
  };

  const downloadImage = () => {
    if (!preview) return;
    
    const link = document.createElement('a');
    link.href = preview;
    link.download = `merged-image-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-light dark:bg-darkmode-light rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">{translate('tools.imageMerge.upload')}</h3>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border dark:border-darkmode-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
            >
              <div className="text-4xl mb-2">📁</div>
              <p className="text-sm text-text dark:text-darkmode-text">
                {translate('tools.imageMerge.dragDropHint')}
              </p>
              <p className="text-xs text-text/60 dark:text-darkmode-text/60 mt-1">
                {translate('tools.imageMerge.supportedFormats')}
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Image List */}
            {images.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">{translate('tools.imageMerge.uploadedImages')} ({images.length})</label>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {images.map((_, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white dark:bg-darkmode-bg p-2 rounded text-sm">
                      <span>Image {idx + 1}</span>
                      <button
                        onClick={() => removeImage(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div className="lg:col-span-1">
          <div className="bg-light dark:bg-darkmode-light rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">{translate('tools.imageMerge.settings')}</h3>

            <div>
              <label className="block text-sm font-medium mb-2">{translate('tools.imageMerge.mergeFormat')}</label>
              <select
                value={mergeFormat}
                onChange={(e) => setMergeFormat(e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-darkmode-border rounded bg-white dark:bg-darkmode-bg text-text dark:text-darkmode-text"
              >
                <option value="horizontal">{translate('tools.imageMerge.horizontal')}</option>
                <option value="vertical">{translate('tools.imageMerge.vertical')}</option>
                <option value="grid-2x2">{translate('tools.imageMerge.grid2x2')}</option>
                <option value="grid-3x3">{translate('tools.imageMerge.grid3x3')}</option>
                <option value="long-image">{translate('tools.imageMerge.longImage')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {translate('tools.imageMerge.imageSpacing')}: {spacing}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={spacing}
                onChange={(e) => setSpacing(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-text/60 dark:text-darkmode-text/60 mt-1">
                <span>{translate('tools.imageMerge.noGap')}</span>
                <span>{translate('tools.imageMerge.largeGap')}</span>
              </div>
            </div>

            <button
              onClick={mergeImages}
              disabled={loading || images.length < 2}
              className="w-full btn btn-primary disabled:opacity-50"
            >
              {loading ? translate('tools.imageMerge.processing') : translate('tools.imageMerge.merge')}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="bg-light dark:bg-darkmode-light rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">{translate('tools.imageMerge.preview')}</h3>

            {preview ? (
              <div className="space-y-3">
                <img
                  src={preview}
                  alt="Merged preview"
                  className="w-full rounded border border-border dark:border-darkmode-border"
                />
                <button
                  onClick={downloadImage}
                  className="w-full btn btn-primary"
                >
                  ⬇️ {translate('tools.imageMerge.downloadImage')}
                </button>
              </div>
            ) : (
              <div className="w-full h-48 bg-white dark:bg-darkmode-bg rounded border border-dashed border-border dark:border-darkmode-border flex items-center justify-center text-text/50 dark:text-darkmode-text/50">
                {translate('tools.imageMerge.preview')} will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

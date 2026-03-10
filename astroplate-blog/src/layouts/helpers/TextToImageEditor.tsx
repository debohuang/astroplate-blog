import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/useLanguage';

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: string;
  textAlign: 'left' | 'center' | 'right';
}

const FONTS = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Verdana',
  'Impact',
  'Comic Sans MS',
  'Trebuchet MS',
  'Palatino',
  'Garamond',
  'Bookman',
];

export default function TextToImageEditor() {
  const [mounted, setMounted] = useState(false);
  const { translate } = useLanguage();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setBackgroundImage(result);
    };
    reader.readAsDataURL(file);
  };

  const addTextElement = () => {
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      text: translate('tools.textToImage.textField'),
      x: 50,
      y: 50,
      fontSize: 32,
      fontFamily: 'Arial',
      color: '#000000',
      fontWeight: 'normal',
      textAlign: 'left',
    };
    setTextElements((prev) => [...prev, newText]);
    setSelectedTextId(newText.id);
  };

  const updateTextElement = (id: string, updates: Partial<TextElement>) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const removeTextElement = (id: string) => {
    setTextElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedTextId === id) setSelectedTextId(null);
  };

  const selectedElement = textElements.find((el) => el.id === selectedTextId);

  const generatePreview = () => {
    if (!backgroundImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw background image
      ctx.drawImage(img, 0, 0);

      // Draw text elements
      textElements.forEach((textEl) => {
        ctx.font = `${textEl.fontWeight} ${textEl.fontSize}px ${textEl.fontFamily}`;
        ctx.fillStyle = textEl.color;
        ctx.textAlign = textEl.textAlign;
        ctx.fillText(textEl.text, textEl.x, textEl.y);
      });

      const dataUrl = canvas.toDataURL('image/png');
      setPreview(dataUrl);
    };
    img.src = backgroundImage;
  };

  const downloadImage = () => {
    if (!preview) return;

    const link = document.createElement('a');
    link.href = preview;
    link.download = `text-to-image-${Date.now()}.png`;
    link.click();
  };

  useEffect(() => {
    if (backgroundImage) {
      generatePreview();
    }
  }, [backgroundImage, textElements]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-light dark:bg-darkmode-light rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">{translate('tools.textToImage.uploadImageTitle')}</h3>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border dark:border-darkmode-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition"
            >
              <div className="text-3xl mb-2">🖼️</div>
              <p className="text-sm text-text dark:text-darkmode-text">
                {translate('tools.textToImage.clickUpload')}
              </p>
              <p className="text-xs text-text/60 dark:text-darkmode-text/60 mt-1">
                {translate('tools.textToImage.supportedImageFormats')}
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {backgroundImage && (
              <button
                onClick={() => setBackgroundImage(null)}
                className="w-full text-sm py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {translate('tools.textToImage.removeImage')}
              </button>
            )}
          </div>
        </div>

        {/* Text Management Section */}
        <div className="lg:col-span-1">
          <div className="bg-light dark:bg-darkmode-light rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{translate('tools.textToImage.textElements')}</h3>
              <button
                onClick={addTextElement}
                className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/80"
              >
                + {translate('tools.textToImage.addButton')}
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {textElements.length === 0 ? (
                <p className="text-sm text-text/50 dark:text-darkmode-text/50 text-center py-4">
                  {translate('tools.textToImage.noTextElements')}
                </p>
              ) : (
                textElements.map((el) => (
                  <div
                    key={el.id}
                    onClick={() => setSelectedTextId(el.id)}
                    className={`p-3 rounded cursor-pointer transition text-sm ${
                      selectedTextId === el.id
                        ? 'bg-primary/20 border border-primary'
                        : 'bg-white dark:bg-darkmode-bg border border-border dark:border-darkmode-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium truncate flex-1">{el.text}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTextElement(el.id);
                        }}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                    <span className="text-xs text-text/60 dark:text-darkmode-text/60">
                      {el.fontSize}px • {el.fontFamily}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Text Styling Section */}
        <div className="lg:col-span-1">
          <div className="bg-light dark:bg-darkmode-light rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">{translate('tools.textToImage.textProperties')}</h3>

            {selectedElement ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">{translate('tools.textToImage.textField')}</label>
                  <textarea
                    value={selectedElement.text}
                    onChange={(e) =>
                      updateTextElement(selectedElement.id, {
                        text: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border dark:border-darkmode-border rounded bg-white dark:bg-darkmode-bg text-text dark:text-darkmode-text text-sm h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{translate('tools.textToImage.fontField')}</label>
                  <select
                    value={selectedElement.fontFamily}
                    onChange={(e) =>
                      updateTextElement(selectedElement.id, {
                        fontFamily: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border dark:border-darkmode-border rounded bg-white dark:bg-darkmode-bg text-sm"
                  >
                    {FONTS.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {translate('tools.textToImage.fontSize')}: {selectedElement.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={selectedElement.fontSize}
                    onChange={(e) =>
                      updateTextElement(selectedElement.id, {
                        fontSize: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{translate('tools.textToImage.color')}</label>
                  <input
                    type="color"
                    value={selectedElement.color}
                    onChange={(e) =>
                      updateTextElement(selectedElement.id, {
                        color: e.target.value,
                      })
                    }
                    className="w-full h-10 border border-border dark:border-darkmode-border rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{translate('tools.textToImage.weight')}</label>
                  <select
                    value={selectedElement.fontWeight}
                    onChange={(e) =>
                      updateTextElement(selectedElement.id, {
                        fontWeight: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border dark:border-darkmode-border rounded bg-white dark:bg-darkmode-bg text-sm"
                  >
                    <option value="normal">{translate('tools.textToImage.normal')}</option>
                    <option value="bold">{translate('tools.textToImage.bold')}</option>
                    <option value="900">{translate('tools.textToImage.extraBold')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{translate('tools.textToImage.align')}</label>
                  <div className="flex gap-2">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() =>
                          updateTextElement(selectedElement.id, {
                            textAlign: align,
                          })
                        }
                        className={`flex-1 py-1 px-2 rounded text-sm transition ${
                          selectedElement.textAlign === align
                            ? 'bg-primary text-white'
                            : 'bg-white dark:bg-darkmode-bg border border-border dark:border-darkmode-border hover:border-primary'
                        }`}
                      >
                        {align === 'left' && translate('tools.textToImage.textAlignLeft')}
                        {align === 'center' && translate('tools.textToImage.textAlignCenter')}
                        {align === 'right' && translate('tools.textToImage.textAlignRight')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">{translate('tools.textToImage.xPosition')}</label>
                    <input
                      type="number"
                      value={selectedElement.x}
                      onChange={(e) =>
                        updateTextElement(selectedElement.id, {
                          x: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-2 py-1 border border-border dark:border-darkmode-border rounded bg-white dark:bg-darkmode-bg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{translate('tools.textToImage.yPosition')}</label>
                    <input
                      type="number"
                      value={selectedElement.y}
                      onChange={(e) =>
                        updateTextElement(selectedElement.id, {
                          y: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-2 py-1 border border-border dark:border-darkmode-border rounded bg-white dark:bg-darkmode-bg text-sm"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text/50 dark:text-darkmode-text/50 text-center py-6">
                {translate('tools.textToImage.selectToEdit')}
              </p>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="bg-light dark:bg-darkmode-light rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">{translate('tools.textToImage.preview')}</h3>

            {preview ? (
              <div className="space-y-3">
                <img
                  src={preview}
                  alt="Preview with text"
                  className="w-full rounded border border-border dark:border-darkmode-border max-h-64 object-contain"
                />
                <button
                  onClick={downloadImage}
                  className="w-full btn btn-primary"
                >
                  ⬇️ {translate('tools.textToImage.download')}
                </button>
              </div>
            ) : (
              <div className="w-full h-48 bg-white dark:bg-darkmode-bg rounded border border-dashed border-border dark:border-darkmode-border flex items-center justify-center text-text/50 dark:text-darkmode-text/50">
                {translate('tools.textToImage.uploadToStart')}
              </div>
            )}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

import { useCallback, useRef, useState } from "react";

interface TranscriptionResult {
  text: string;
  language?: string;
  duration?: number;
}

const ACCEPTED_TYPES =
  "audio/mpeg,audio/mp3,audio/mp4,audio/wav,audio/webm,audio/ogg,audio/flac,audio/x-m4a,video/mp4,video/webm,video/ogg,video/mpeg";

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AudioTranscriber() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    setError(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) handleFile(selected);
    },
    [handleFile],
  );

  const handleTranscribe = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Transcription failed");
      }

      setResult({
        text: data.text,
        language: data.language,
        duration: data.duration,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.text) return;
    await navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
          dragging
            ? "border-primary bg-primary/5 dark:border-darkmode-primary dark:bg-darkmode-primary/10"
            : "border-border hover:border-primary dark:border-darkmode-border dark:hover:border-darkmode-primary"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          onChange={handleInputChange}
          className="hidden"
        />
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-text/40 dark:text-darkmode-text/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="mb-2 text-lg font-semibold text-text-dark dark:text-darkmode-text-dark">
          Drop your audio or video file here
        </p>
        <p className="text-sm text-text/60 dark:text-darkmode-text/60">
          or click to browse &mdash; MP3, WAV, MP4, WebM, OGG, FLAC (max 20MB)
        </p>
      </div>

      {/* File Info */}
      {file && (
        <div className="mt-6 flex items-center justify-between rounded-lg bg-light p-4 dark:bg-darkmode-light">
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-text-dark dark:text-darkmode-text-dark">
              {file.name}
            </p>
            <p className="text-sm text-text/60 dark:text-darkmode-text/60">
              {formatFileSize(file.size)}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="ml-4 rounded-md p-1.5 text-text/40 transition-colors hover:bg-border hover:text-text-dark dark:text-darkmode-text/40 dark:hover:bg-darkmode-border dark:hover:text-darkmode-text-dark"
            title="Remove file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Transcribe Button */}
      {file && !result && (
        <div className="mt-6 text-center">
          <button
            onClick={handleTranscribe}
            disabled={loading}
            className="btn btn-primary min-w-[200px] disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Transcribing...
              </span>
            ) : (
              "Convert to Text"
            )}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-700/50 dark:bg-red-900/20 dark:text-red-400">
          <p className="font-medium">Transcription failed</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6">
          {/* Meta info */}
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-text/60 dark:text-darkmode-text/60">
            {result.language && (
              <span className="rounded-md bg-light px-2.5 py-1 dark:bg-darkmode-light">
                Language: {result.language.toUpperCase()}
              </span>
            )}
            {result.duration && (
              <span className="rounded-md bg-light px-2.5 py-1 dark:bg-darkmode-light">
                Duration: {formatDuration(result.duration)}
              </span>
            )}
          </div>

          {/* Text Output */}
          <div className="relative rounded-lg border border-border bg-light p-5 dark:border-darkmode-border dark:bg-darkmode-light">
            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 rounded-md bg-body px-3 py-1.5 text-xs font-medium text-text-dark transition-colors hover:bg-border dark:bg-darkmode-body dark:text-darkmode-text-dark dark:hover:bg-darkmode-border"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <p className="whitespace-pre-wrap pr-16 leading-relaxed text-text-dark dark:text-darkmode-text-dark">
              {result.text}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-center gap-3">
            <button onClick={handleReset} className="btn btn-outline-primary">
              Convert Another File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

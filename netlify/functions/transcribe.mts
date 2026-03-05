import type { Context } from "@netlify/functions";
import OpenAI from "openai";

const openai = new OpenAI();

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const SUPPORTED_TYPES = new Set([
  "audio/mpeg",
  "audio/mp3",
  "audio/mp4",
  "audio/wav",
  "audio/webm",
  "audio/ogg",
  "audio/flac",
  "audio/x-m4a",
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/mpeg",
]);

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "File too large. Maximum size is 20MB." },
        { status: 400 },
      );
    }

    const fileType = file.type || "application/octet-stream";
    if (!SUPPORTED_TYPES.has(fileType)) {
      return Response.json(
        {
          error: `Unsupported file type: ${fileType}. Please upload an audio or video file.`,
        },
        { status: 400 },
      );
    }

    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      response_format: "verbose_json",
    });

    return Response.json({
      text: transcription.text,
      language: transcription.language,
      duration: transcription.duration,
      segments: transcription.segments,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Transcription failed";
    console.error("Transcription error:", err);
    return Response.json({ error: message }, { status: 500 });
  }
};

export const config = {
  path: "/api/transcribe",
};

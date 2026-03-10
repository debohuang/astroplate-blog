import React, { Suspense } from 'react';
import { LanguageProvider } from '@/lib/useLanguage';
import TextToImageEditor from './TextToImageEditor';

function TextToImageEditorSuspense() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <TextToImageEditor />
    </Suspense>
  );
}

export default function TextToImageEditorWrapper() {
  return (
    <LanguageProvider>
      <TextToImageEditorSuspense />
    </LanguageProvider>
  );
}

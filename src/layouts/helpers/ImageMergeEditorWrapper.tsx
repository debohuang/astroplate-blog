import React, { Suspense } from 'react';
import { LanguageProvider } from '@/lib/useLanguage';
import ImageMergeEditor from './ImageMergeEditor';

function ImageMergeEditorSuspense() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <ImageMergeEditor />
    </Suspense>
  );
}

export default function ImageMergeEditorWrapper() {
  return (
    <LanguageProvider>
      <ImageMergeEditorSuspense />
    </LanguageProvider>
  );
}

// Language translations for the site
export const translations = {
  en: {
    nav: {
      home: 'Home',
      imageMerge: 'Image Merge',
      textToImage: 'Text to Image',
      about: 'About',
    },
    tools: {
      imageMerge: {
        title: 'Image Merge Tool',
        description: 'Combine multiple images into one',
        formats: 'Multiple merge formats available',
        upload: 'Upload Images',
        settings: 'Settings',
        preview: 'Preview',
        merge: 'Merge Images',
      },
      textToImage: {
        title: 'Text to Image Tool',
        description: 'Add text overlays to your photos',
        features: 'Powerful text overlay features',
        upload: 'Upload Image',
        text: 'Add Text',
        preview: 'Preview',
      },
    },
    footer: {
      privacyPolicy: 'Privacy Policy',
      aboutUs: 'About Us',
      copyright: '© 2024 Image Merge Tools. All Rights Reserved.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      imageMerge: 'Fusionar Imágenes',
      textToImage: 'Texto en Imagen',
      about: 'Acerca de',
    },
    tools: {
      imageMerge: {
        title: 'Herramienta de Fusión de Imágenes',
        description: 'Combine múltiples imágenes en una',
        formats: 'Múltiples opciones de formato de fusión disponibles',
        upload: 'Subir Imágenes',
        settings: 'Configuración',
        preview: 'Vista Previa',
        merge: 'Fusionar Imágenes',
      },
      textToImage: {
        title: 'Herramienta de Texto a Imagen',
        description: 'Agregue superposiciones de texto a sus fotos',
        features: 'Potentes características de superposición de texto',
        upload: 'Subir Imagen',
        text: 'Agregar Texto',
        preview: 'Vista Previa',
      },
    },
    footer: {
      privacyPolicy: 'Política de Privacidad',
      aboutUs: 'Acerca de Nosotros',
      copyright: '© 2024 Image Merge Tools. Todos los Derechos Reservados.',
    },
  },
  zh: {
    nav: {
      home: '首页',
      imageMerge: '图片合并',
      textToImage: '文字合并图片',
      about: '关于',
    },
    tools: {
      imageMerge: {
        title: '图片合并工具',
        description: '将多个图像合并为一个',
        formats: '多种合并格式可供选择',
        upload: '上传图片',
        settings: '设置',
        preview: '预览',
        merge: '合并图片',
      },
      textToImage: {
        title: '文字合并到图片',
        description: '为您的照片添加文字覆盖层',
        features: '强大的文字覆盖功能',
        upload: '上传图片',
        text: '添加文字',
        preview: '预览',
      },
    },
    footer: {
      privacyPolicy: '隐私政策',
      aboutUs: '关于我们',
      copyright: '© 2024 Image Merge Tools. 版权所有。',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      imageMerge: 'Fusionner des Images',
      textToImage: 'Texte en Image',
      about: 'À propos',
    },
    tools: {
      imageMerge: {
        title: 'Outil de Fusion d\'Images',
        description: 'Combinez plusieurs images en une seule',
        formats: 'Plusieurs options de format de fusion disponibles',
        upload: 'Télécharger des Images',
        settings: 'Paramètres',
        preview: 'Aperçu',
        merge: 'Fusionner les Images',
      },
      textToImage: {
        title: 'Outil Texte en Image',
        description: 'Ajoutez du texte superposé à vos photos',
        features: 'Puissantes fonctionnalités de superposition de texte',
        upload: 'Télécharger une Image',
        text: 'Ajouter du Texte',
        preview: 'Aperçu',
      },
    },
    footer: {
      privacyPolicy: 'Politique de Confidentialité',
      aboutUs: 'À Propos de Nous',
      copyright: '© 2024 Image Merge Tools. Tous Droits Réservés.',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      imageMerge: 'Bilder Zusammenführen',
      textToImage: 'Text zu Bild',
      about: 'Über Uns',
    },
    tools: {
      imageMerge: {
        title: 'Bilder Zusammenführungstool',
        description: 'Kombinieren Sie mehrere Bilder zu einem',
        formats: 'Mehrere Zusammenführungsformate verfügbar',
        upload: 'Bilder Hochladen',
        settings: 'Einstellungen',
        preview: 'Vorschau',
        merge: 'Bilder Zusammenführen',
      },
      textToImage: {
        title: 'Text zu Bild Tool',
        description: 'Fügen Sie Ihre Fotos Textüberlagerungen hinzu',
        features: 'Leistungsstarke Textüberlagerungsfunktionen',
        upload: 'Bild Hochladen',
        text: 'Text Hinzufügen',
        preview: 'Vorschau',
      },
    },
    footer: {
      privacyPolicy: 'Datenschutzrichtlinie',
      aboutUs: 'Über Uns',
      copyright: '© 2024 Image Merge Tools. Alle Rechte Vorbehalten.',
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      imageMerge: '画像マージ',
      textToImage: 'テキストを画像に',
      about: 'について',
    },
    tools: {
      imageMerge: {
        title: '画像マージツール',
        description: '複数の画像を1つに結合',
        formats: '複数のマージ形式を利用可能',
        upload: '画像をアップロード',
        settings: '設定',
        preview: 'プレビュー',
        merge: '画像をマージ',
      },
      textToImage: {
        title: 'テキストを画像にツール',
        description: '写真にテキストオーバーレイを追加',
        features: '強力なテキストオーバーレイ機能',
        upload: '画像をアップロード',
        text: 'テキストを追加',
        preview: 'プレビュー',
      },
    },
    footer: {
      privacyPolicy: 'プライバシーポリシー',
      aboutUs: 'について',
      copyright: '© 2024 Image Merge Tools. すべての権利は予約されています。',
    },
  },
} as const;

export type Language = keyof typeof translations;

export function getLanguage(locale?: string): Language {
  if (!locale) return 'en';
  const lang = locale.split('-')[0].toLowerCase() as Language;
  return lang in translations ? lang : 'en';
}

export function translate(
  path: string,
  language: Language = 'en'
): string {
  const keys = path.split('.');
  let value: any = translations[language];

  for (const key of keys) {
    value = value?.[key];
  }

  if (!value && language !== 'en') {
    // Fallback to English
    value = translations.en;
    for (const key of keys) {
      value = value?.[key];
    }
  }

  return value || path;
}

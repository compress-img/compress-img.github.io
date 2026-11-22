import type { LocaleCode } from './locales';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  title: string;
  description: string;
}

export interface SpecialtyItem {
  title: string;
  description: string;
}

export interface TranslationBundle {
  nav: {
    brandName: string;
    home: string;
    howToUse: string;
    hireMe: string;
    languageAriaLabel: string;
    themeToggleAriaLabel: string;
    themeDarkLabel: string;
    themeLightLabel: string;
    installApp: string;
    installAppAriaLabel: string;
    installedLabel: string;
    supportDeveloper: string;
    supportDeveloperAriaLabel: string;
    githubAriaLabel: string;
    menuAriaLabel: string;
    iosModalTitle: string;
    iosModalBody: string;
    iosModalStep1: string;
    iosModalStep2: string;
    iosModalStep3: string;
    browserModalBody: string;
    closeModal: string;
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    howToUseTitle: string;
    howToUseDescription: string;
    hireMeTitle: string;
    hireMeDescription: string;
    ogImageAlt: string;
  };
  home: {
    h1: string;
    subtitle: string;
    privacyNote: string;
    faqHeading: string;
    faqs: [FaqItem, FaqItem, FaqItem, FaqItem];
  };
  compressor: {
    dropTitle: string;
    dropSubtitle: string;
    dropAriaLabel: string;
    selectImages: string;
    addMoreImages: string;
    trySample: string;
    clearAll: string;
    modeQuality: string;
    modeTargetKb: string;
    qualityLabel: string;
    outputFormatLabel: string;
    formatOriginal: string;
    targetSizeLabel: string;
    customKbLabel: string;
    customKbPlaceholder: string;
    applyCustomKb: string;
    kbUnit: string;
    beforeLabel: string;
    afterLabel: string;
    sliderAriaLabel: string;
    originalSizeLabel: string;
    compressedSizeLabel: string;
    savedLabel: string;
    smallerLabel: string;
    largerWarning: string;
    processingStatus: string;
    readyStatus: string;
    downloadBtn: string;
    inspectBtn: string;
    removeBtn: string;
    downloadAllZip: string;
    creatingZip: string;
    totalSummary: string;
    liveProcessedSingle: string;
    liveProcessedBatch: string;
    liveZipReady: string;
    liveError: string;
    unsupportedFile: string;
  };
  howToUse: {
    breadcrumbCurrent: string;
    h1: string;
    intro: string;
    stepsHeading: string;
    steps: [HowToStep, HowToStep, HowToStep, HowToStep];
    tipsHeading: string;
    tips: Array<{ title: string; body: string }>;
    ctaButton: string;
  };
  hireMe: {
    breadcrumbCurrent: string;
    badge: string;
    heading: string;
    intro: string;
    subcopy: string;
    specialties: [SpecialtyItem, SpecialtyItem, SpecialtyItem];
    ctaHeading: string;
    email: string;
    emailLabel: string;
    copyButton: string;
    copiedButton: string;
    copiedAnnouncement: string;
  };
  footer: {
    tagline: string;
    privacyStatement: string;
    builtBy: string;
    supportLink: string;
    openSourceLink: string;
  };
}

export const TRANSLATIONS: Record<LocaleCode, TranslationBundle> = {
  en: {
    nav: {
      brandName: 'CompressImg',
      home: 'Home',
      howToUse: 'How to Use',
      hireMe: 'Hire Me',
      languageAriaLabel: 'Select language',
      themeToggleAriaLabel: 'Toggle light and dark theme',
      themeDarkLabel: 'Dark',
      themeLightLabel: 'Light',
      installApp: 'Add to Home Screen',
      installAppAriaLabel: 'Add CompressImg to Home Screen for offline use',
      installedLabel: 'Offline Ready',
      supportDeveloper: 'Support the Developer',
      supportDeveloperAriaLabel: 'Support the developer on Gumroad',
      githubAriaLabel: 'View source code on GitHub',
      menuAriaLabel: 'Toggle navigation menu',
      iosModalTitle: 'Add CompressImg to Home Screen',
      iosModalBody: 'Install CompressImg on your device to compress and export images 100% offline anytime.',
      iosModalStep1: 'Tap the Share icon in Safari (or your browser menu).',
      iosModalStep2: 'Scroll down and choose "Add to Home Screen".',
      iosModalStep3: 'Tap "Add" to launch CompressImg like a native offline app.',
      browserModalBody: 'Open your browser menu and select "Install app" or "Add to Home Screen" to use CompressImg completely offline.',
      closeModal: 'Got it',
    },
    seo: {
      homeTitle: 'Image Compressor Online - Compress JPG, PNG & WebP Free',
      homeDescription: 'Compress JPG, PNG, and WebP images to an exact KB size right in your browser. 100% free batch image compressor with zero uploads or watermarks.',
      howToUseTitle: 'How to Compress Images to 50KB or 100KB - CompressImg',
      howToUseDescription: 'Learn how to shrink JPG, PNG, and WebP photos to an exact KB size or batch compress images privately in your browser without losing quality.',
      hireMeTitle: 'Hire Kishara Dilshan - Web & WASM Developer | CompressImg',
      hireMeDescription: 'Need an ultra-fast Astro, React, or Next.js web app or client-side WebAssembly tool? Hire Kishara Dilshan for custom SEO-ready IT solutions.',
      ogImageAlt: 'CompressImg — Free Private Browser Image Compressor',
    },
    home: {
      h1: 'Image Compressor — Reduce JPG, PNG & WebP Size Online',
      subtitle: 'Compress photos to an exact KB size or batch-optimize JPG, PNG, and WebP files right in your browser. 100% free, zero uploads, and no watermarks.',
      privacyNote: '100% Private: Processed locally on your device. Files never leave your browser.',
      faqHeading: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How do I compress an image to 50KB or 100KB without losing quality?',
          answer: 'Switch to Target Size (KB) mode above, click the 50KB or 100KB preset (or enter any custom KB value), and let CompressImg automatically find the sharpest compression ratio right inside your browser. For oversized photos, switching the output format to WebP or JPG helps preserve fine detail while hitting strict upload limits.',
        },
        {
          question: 'Are my photos uploaded to a server when I compress them?',
          answer: 'No. Every image is compressed locally inside your own browser using HTML5 Canvas, Web Workers, and client-side encoders. Your personal documents, ID photos, and design assets never touch a remote server, and the app even works offline once installed.',
        },
        {
          question: 'Which image formats are supported (JPG, PNG, WebP, GIF, SVG)?',
          answer: 'CompressImg accepts JPG/JPEG, PNG, WebP, GIF, and SVG files. You can keep the original format or convert photos to JPG, PNG, or WebP in one click while keeping transparent backgrounds intact on PNG and WebP exports.',
        },
        {
          question: 'Can I batch compress multiple images at once for free with no daily limits?',
          answer: 'Yes. Drop or select as many images as your device handles, inspect the live before-and-after preview slider on any file, and download images individually or bundle the entire batch into a single ZIP archive—completely free with no watermarks or sign-ups.',
        },
      ],
    },
    compressor: {
      dropTitle: 'Drop images here to compress locally',
      dropSubtitle: 'Supports JPG, PNG, WebP, GIF & SVG • Zero uploads • Instant exact-KB targets',
      dropAriaLabel: 'Drop images here or press Enter to select files from your device',
      selectImages: 'Select Images',
      addMoreImages: 'Add More Images',
      trySample: 'Try Sample Image',
      clearAll: 'Clear All',
      modeQuality: 'Quality Mode',
      modeTargetKb: 'Target Size (KB)',
      qualityLabel: 'Compression Quality',
      outputFormatLabel: 'Output Format',
      formatOriginal: 'Original',
      targetSizeLabel: 'Exact Target Size',
      customKbLabel: 'Custom KB',
      customKbPlaceholder: 'e.g. 75',
      applyCustomKb: 'Apply',
      kbUnit: 'KB',
      beforeLabel: 'Before (Original)',
      afterLabel: 'After (Compressed)',
      sliderAriaLabel: 'Before and after image comparison split slider',
      originalSizeLabel: 'Original',
      compressedSizeLabel: 'Compressed',
      savedLabel: 'saved',
      smallerLabel: 'smaller',
      largerWarning: 'Already well optimized — try WebP/JPG or a lower target.',
      processingStatus: 'Compressing locally...',
      readyStatus: 'Ready',
      downloadBtn: 'Download',
      inspectBtn: 'Compare',
      removeBtn: 'Remove image',
      downloadAllZip: 'Download All (ZIP)',
      creatingZip: 'Building ZIP...',
      totalSummary: 'Batch Total',
      liveProcessedSingle: '{name} compressed from {before} to {after} ({saved}% saved). Ready to download.',
      liveProcessedBatch: 'Compressed {count} images from {before} to {after} ({saved}% saved). Ready for download or ZIP export.',
      liveZipReady: 'ZIP archive containing {count} compressed images is ready and downloading.',
      liveError: 'Could not process {name}. Please try another image file.',
      unsupportedFile: 'Skipped unsupported file: {name}. Please choose JPG, PNG, WebP, GIF, or SVG.',
    },
    howToUse: {
      breadcrumbCurrent: 'How to Use',
      h1: 'How to Compress Images to an Exact KB Size Privately',
      intro: 'Whether you are preparing a 50KB portrait for an online form, optimizing product photos for a store, or shrinking large PNG screenshots, CompressImg handles everything directly inside your browser.',
      stepsHeading: 'Step-by-Step Guide',
      steps: [
        {
          title: '1. Drop your photos or click Select Images',
          description: 'Drag and drop one or multiple JPG, PNG, WebP, GIF, or SVG files into the workspace—or paste directly from your clipboard. Nothing is uploaded to any server.',
        },
        {
          title: '2. Choose Quality Mode or an Exact KB Target',
          description: 'Use Quality Mode (10%–100%) for general web optimization, or switch to Target Size (KB) and tap 20KB, 50KB, 100KB, 200KB, or any custom KB limit. CompressImg automatically solves for the clearest image under your exact target.',
        },
        {
          title: '3. Check clarity with the Before / After slider',
          description: 'Click any image in your batch and drag the split-screen slider left or right to verify text, edges, and colors before downloading.',
        },
        {
          title: '4. Download individually or export all as a ZIP',
          description: 'Save individual files with one click or use Download All (ZIP) to bundle an entire batch locally. You can also add CompressImg to your Home Screen to compress photos completely offline.',
        },
      ],
      tipsHeading: 'Quick Format & Size Tips',
      tips: [
        {
          title: 'Best choice for websites & blogs: WebP',
          body: 'Converting heavy JPG or PNG images to WebP typically cuts file size by 25%–50% at identical visual quality while keeping transparency intact.',
        },
        {
          title: 'Best choice for forms & ID portals: JPG under 50KB or 100KB',
          body: 'Government portals and job boards often require strict JPG limits like 20KB, 50KB, or 100KB. Pick Target Size (KB) and set Output Format to JPG to match those limits reliably.',
        },
        {
          title: 'Best choice for crisp icons & logos: PNG or SVG',
          body: 'Keep vector logos as SVG for clean XML minification, or keep screenshots as PNG so sharp text and transparent edges stay clean.',
        },
      ],
      ctaButton: 'Open Image Compressor',
    },
    hireMe: {
      breadcrumbCurrent: 'Hire Me',
      badge: 'Available for Freelance Projects',
      heading: 'Need a Custom IT Solution?',
      intro: "Hi, I'm Kishara Dilshan, the developer behind CompressImg.",
      subcopy: 'If you love this fast, client-side tool and need a world-class IT solution for your own business, I am available for freelance projects. I specialize in:',
      specialties: [
        {
          title: 'Ultra-fast, SEO-optimized web applications',
          description: 'Astro, React, Next.js — engineered for sub-second loads, technical SEO, and clean scalability.',
        },
        {
          title: 'Client-side processing & WebAssembly (WASM) tools',
          description: 'Zero-server media, PDF, and data utilities that run privately inside the browser.',
        },
        {
          title: 'UI/UX design & High-converting landing pages',
          description: 'Minimal, accessible interfaces crafted to convert visitors effortlessly across desktop and mobile.',
        },
      ],
      ctaHeading: "Let's build something amazing together.",
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Email me directly: kisharadilshan007@gmail.com',
      copyButton: 'Copy Email',
      copiedButton: 'Copied!',
      copiedAnnouncement: 'Email address kisharadilshan007@gmail.com copied to clipboard.',
    },
    footer: {
      tagline: 'Fast, private, client-side image optimization.',
      privacyStatement: 'Zero server uploads • Works offline as a PWA',
      builtBy: 'Built by Kishara Dilshan',
      supportLink: 'Buy me a coffee',
      openSourceLink: 'GitHub Source',
    },
  },

  es: {
    nav: {
      brandName: 'CompressImg',
      home: 'Inicio',
      howToUse: 'Cómo usar',
      hireMe: 'Contrátame',
      languageAriaLabel: 'Seleccionar idioma',
      themeToggleAriaLabel: 'Cambiar entre tema claro y oscuro',
      themeDarkLabel: 'Oscuro',
      themeLightLabel: 'Claro',
      installApp: 'Añadir a inicio',
      installAppAriaLabel: 'Añadir CompressImg a la pantalla de inicio para usar sin conexión',
      installedLabel: 'Listo sin conexión',
      supportDeveloper: 'Apoyar al creador',
      supportDeveloperAriaLabel: 'Apoyar al desarrollador en Gumroad',
      githubAriaLabel: 'Ver código fuente en GitHub',
      menuAriaLabel: 'Abrir menú de navegación',
      iosModalTitle: 'Añadir CompressImg a la pantalla de inicio',
      iosModalBody: 'Instala CompressImg en tu dispositivo para comprimir y exportar imágenes 100 % sin conexión.',
      iosModalStep1: 'Toca el icono Compartir en Safari (o el menú de tu navegador).',
      iosModalStep2: 'Desplázate y elige "Añadir a pantalla de inicio".',
      iosModalStep3: 'Pulsa "Añadir" para abrir CompressImg como una app sin conexión.',
      browserModalBody: 'Abre el menú de tu navegador y selecciona "Instalar aplicación" o "Añadir a pantalla de inicio" para usarla sin conexión.',
      closeModal: 'Entendido',
    },
    seo: {
      homeTitle: 'Compresor de Imágenes Online - JPG, PNG y WebP Gratis',
      homeDescription: 'Comprime imágenes JPG, PNG y WebP a un tamaño exacto en KB desde tu navegador. Compresor por lotes 100% gratis, sin subidas ni marcas de agua.',
      howToUseTitle: 'Cómo Comprimir Imágenes a 50KB o 100KB - CompressImg',
      howToUseDescription: 'Aprende a reducir fotos JPG, PNG y WebP a un tamaño exacto en KB o comprimir por lotes en tu navegador sin perder calidad ni privacidad.',
      hireMeTitle: 'Contratar a Kishara Dilshan - Dev Web & WASM | CompressImg',
      hireMeDescription: '¿Necesitas una web ultrarrápida con Astro, React o Next.js o una herramienta WebAssembly? Contrata a Kishara Dilshan para soluciones IT a medida.',
      ogImageAlt: 'CompressImg — Compresor de imágenes privado en el navegador',
    },
    home: {
      h1: 'Compresor de Imágenes — Reduce JPG, PNG y WebP Online',
      subtitle: 'Comprime fotos a un tamaño exacto en KB o optimiza archivos JPG, PNG y WebP por lotes en tu navegador. 100 % gratis, sin subidas ni marcas de agua.',
      privacyNote: '100 % Privado: procesado localmente en tu dispositivo. Tus archivos nunca salen del navegador.',
      faqHeading: 'Preguntas frecuentes',
      faqs: [
        {
          question: '¿Cómo comprimir una imagen a 50KB o 100KB sin perder calidad?',
          answer: 'Cambia al modo Tamaño exacto (KB), pulsa 50KB o 100KB (o escribe cualquier valor personalizado) y CompressImg buscará automáticamente la mejor calidad dentro de tu navegador. En fotos grandes, elegir formato WebP o JPG ayuda a conservar los detalles.',
        },
        {
          question: '¿Mis fotos se suben a algún servidor al comprimirlas?',
          answer: 'No. Cada imagen se procesa localmente en tu navegador mediante HTML5 Canvas y Web Workers. Tus documentos o fotos personales jamás se envían a ningún servidor y la app funciona incluso sin conexión.',
        },
        {
          question: '¿Qué formatos de imagen admite (JPG, PNG, WebP, GIF, SVG)?',
          answer: 'Admite JPG/JPEG, PNG, WebP, GIF y SVG. Puedes mantener el formato original o convertir a JPG, PNG o WebP con un clic conservando las transparencias.',
        },
        {
          question: '¿Puedo comprimir varias imágenes a la vez gratis y sin límites?',
          answer: 'Sí. Arrastra todas las imágenes que necesites, compara el antes y después con el deslizador interactivo y descárgalas una por una o juntas en un archivo ZIP sin registros ni marcas de agua.',
        },
      ],
    },
    compressor: {
      dropTitle: 'Arrastra tus imágenes aquí para comprimir localmente',
      dropSubtitle: 'Admite JPG, PNG, WebP, GIF y SVG • Sin subidas • Tamaño exacto en KB',
      dropAriaLabel: 'Arrastra imágenes aquí o pulsa Intro para seleccionar archivos',
      selectImages: 'Seleccionar imágenes',
      addMoreImages: 'Añadir más',
      trySample: 'Probar imagen de ejemplo',
      clearAll: 'Limpiar todo',
      modeQuality: 'Modo Calidad',
      modeTargetKb: 'Tamaño exacto (KB)',
      qualityLabel: 'Calidad de compresión',
      outputFormatLabel: 'Formato de salida',
      formatOriginal: 'Original',
      targetSizeLabel: 'Tamaño objetivo exacto',
      customKbLabel: 'KB personalizado',
      customKbPlaceholder: 'ej. 75',
      applyCustomKb: 'Aplicar',
      kbUnit: 'KB',
      beforeLabel: 'Antes (Original)',
      afterLabel: 'Después (Comprimida)',
      sliderAriaLabel: 'Deslizador comparativo antes y después',
      originalSizeLabel: 'Original',
      compressedSizeLabel: 'Comprimida',
      savedLabel: 'ahorrado',
      smallerLabel: 'menor',
      largerWarning: 'Ya está muy optimizada; prueba WebP/JPG o un tamaño menor.',
      processingStatus: 'Comprimiendo localmente...',
      readyStatus: 'Listo',
      downloadBtn: 'Descargar',
      inspectBtn: 'Comparar',
      removeBtn: 'Eliminar imagen',
      downloadAllZip: 'Descargar todo (ZIP)',
      creatingZip: 'Creando ZIP...',
      totalSummary: 'Total del lote',
      liveProcessedSingle: '{name} comprimida de {before} a {after} ({saved}% ahorrado). Lista para descargar.',
      liveProcessedBatch: '{count} imágenes comprimidas de {before} a {after} ({saved}% ahorrado). Listas para descargar o exportar en ZIP.',
      liveZipReady: 'El archivo ZIP con {count} imágenes comprimidas está listo y descargándose.',
      liveError: 'No se pudo procesar {name}. Prueba con otro archivo.',
      unsupportedFile: 'Archivo no compatible omitido: {name}. Usa JPG, PNG, WebP, GIF o SVG.',
    },
    howToUse: {
      breadcrumbCurrent: 'Cómo usar',
      h1: 'Cómo Comprimir Imágenes a un Tamaño Exacto en KB',
      intro: 'Tanto si necesitas una foto de 50KB para un trámite online como optimizar imágenes para tu tienda web, CompressImg lo resuelve al instante dentro de tu navegador.',
      stepsHeading: 'Guía paso a paso',
      steps: [
        {
          title: '1. Arrastra tus fotos o pulsa Seleccionar imágenes',
          description: 'Añade uno o varios archivos JPG, PNG, WebP, GIF o SVG. Todo permanece en tu equipo.',
        },
        {
          title: '2. Elige Modo Calidad o Tamaño exacto (KB)',
          description: 'Ajusta el porcentaje de calidad o pulsa 20KB, 50KB, 100KB, 200KB o un límite personalizado.',
        },
        {
          title: '3. Revisa el resultado con el deslizador Antes / Después',
          description: 'Inspecciona nitidez y bordes antes de guardar cualquier archivo.',
        },
        {
          title: '4. Descarga por separado o todo junto en ZIP',
          description: 'Descarga cada foto al instante o exporta todo el lote en un único archivo ZIP, incluso sin internet.',
        },
      ],
      tipsHeading: 'Consejos rápidos de formato',
      tips: [
        {
          title: 'Ideal para webs y blogs: WebP',
          body: 'Reduce el peso entre un 25 % y un 50 % frente a JPG o PNG manteniendo gran nitidez y transparencia.',
        },
        {
          title: 'Ideal para formularios y portales: JPG de 50KB o 100KB',
          body: 'Muchos portales oficiales exigen JPG menores de 50KB o 100KB. Usa Tamaño exacto (KB) con salida JPG.',
        },
        {
          title: 'Ideal para logos e iconos: PNG o SVG',
          body: 'Optimiza SVG sin pérdida o mantén capturas con texto nítido en PNG.',
        },
      ],
      ctaButton: 'Ir al compresor de imágenes',
    },
    hireMe: {
      breadcrumbCurrent: 'Contrátame',
      badge: 'Disponible para proyectos freelance',
      heading: '¿Necesitas una solución IT a medida?',
      intro: 'Hola, soy Kishara Dilshan, el desarrollador detrás de CompressImg.',
      subcopy: 'Si te gusta esta herramienta rápida en el navegador y necesitas una solución IT de primer nivel para tu negocio, estoy disponible para proyectos freelance. Me especializo en:',
      specialties: [
        {
          title: 'Aplicaciones web ultrarrápidas y optimizadas para SEO',
          description: 'Astro, React, Next.js — diseñadas para cargar en menos de un segundo, SEO técnico y escalabilidad limpia.',
        },
        {
          title: 'Procesamiento en cliente y herramientas WebAssembly (WASM)',
          description: 'Utilidades de medios, PDF y datos sin servidor que funcionan de forma privada dentro del navegador.',
        },
        {
          title: 'Diseño UI/UX y páginas de aterrizaje de alta conversión',
          description: 'Interfaces minimalistas y accesibles creadas para convertir visitantes en escritorio y móvil.',
        },
      ],
      ctaHeading: 'Construyamos algo increíble juntos.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Escríbeme directamente: kisharadilshan007@gmail.com',
      copyButton: 'Copiar email',
      copiedButton: '¡Copiado!',
      copiedAnnouncement: 'Correo kisharadilshan007@gmail.com copiado al portapapeles.',
    },
    footer: {
      tagline: 'Optimización de imágenes rápida, privada y en el navegador.',
      privacyStatement: 'Cero subidas al servidor • Funciona sin conexión (PWA)',
      builtBy: 'Desarrollado por Kishara Dilshan',
      supportLink: 'Invítame a un café',
      openSourceLink: 'Código en GitHub',
    },
  },

  pt: {
    nav: {
      brandName: 'CompressImg',
      home: 'Início',
      howToUse: 'Como usar',
      hireMe: 'Contrate-me',
      languageAriaLabel: 'Selecionar idioma',
      themeToggleAriaLabel: 'Alternar tema claro e escuro',
      themeDarkLabel: 'Escuro',
      themeLightLabel: 'Claro',
      installApp: 'Adicionar à tela inicial',
      installAppAriaLabel: 'Adicionar CompressImg à tela inicial para uso offline',
      installedLabel: 'Pronto offline',
      supportDeveloper: 'Apoiar o desenvolvedor',
      supportDeveloperAriaLabel: 'Apoiar o desenvolvedor no Gumroad',
      githubAriaLabel: 'Ver código-fonte no GitHub',
      menuAriaLabel: 'Abrir menu de navegação',
      iosModalTitle: 'Adicionar CompressImg à tela inicial',
      iosModalBody: 'Instale o CompressImg no seu dispositivo para comprimir e exportar imagens 100% offline.',
      iosModalStep1: 'Toque no ícone Compartilhar no Safari (ou no menu do navegador).',
      iosModalStep2: 'Role para baixo e escolha "Adicionar à Tela de Início".',
      iosModalStep3: 'Toque em "Adicionar" para abrir o CompressImg como um app offline.',
      browserModalBody: 'Abra o menu do navegador e selecione "Instalar aplicativo" ou "Adicionar à tela inicial" para usar offline.',
      closeModal: 'Entendi',
    },
    seo: {
      homeTitle: 'Compressor de Imagens Online - JPG, PNG e WebP Grátis',
      homeDescription: 'Comprima imagens JPG, PNG e WebP para um tamanho exato em KB no navegador. Compressor em lote 100% grátis, sem uploads e sem marca d’água.',
      howToUseTitle: 'Como Comprimir Imagens para 50KB ou 100KB - CompressImg',
      howToUseDescription: 'Aprenda a reduzir fotos JPG, PNG e WebP para um tamanho exato em KB ou comprimir imagens em lote no navegador sem perder qualidade.',
      hireMeTitle: 'Contratar Kishara Dilshan - Dev Web & WASM | CompressImg',
      hireMeDescription: 'Precisa de um site ultrarrápido em Astro, React ou Next.js ou ferramenta WebAssembly? Contrate Kishara Dilshan para soluções sob medida.',
      ogImageAlt: 'CompressImg — Compressor de imagens privado no navegador',
    },
    home: {
      h1: 'Compressor de Imagens — Reduza JPG, PNG e WebP Online',
      subtitle: 'Comprima fotos para um tamanho exato em KB ou otimize arquivos JPG, PNG e WebP em lote direto no navegador. 100% grátis, sem uploads e sem marca d’água.',
      privacyNote: '100% Privado: processamento local no seu dispositivo. Seus arquivos nunca saem do navegador.',
      faqHeading: 'Perguntas frequentes',
      faqs: [
        {
          question: 'Como comprimir uma imagem para 50KB ou 100KB sem perder qualidade?',
          answer: 'Ative o modo Tamanho Exato (KB), escolha 50KB ou 100KB (ou digite um limite próprio) e o CompressImg encontra automaticamente a melhor nitidez dentro do navegador. Em fotos grandes, escolher WebP ou JPG preserva mais detalhes.',
        },
        {
          question: 'Minhas fotos são enviadas para algum servidor?',
          answer: 'Não. Toda a compressão acontece localmente com HTML5 Canvas e Web Workers. Seus documentos e imagens nunca são enviados para servidores externos, e o app funciona até sem internet.',
        },
        {
          question: 'Quais formatos de imagem são aceitos (JPG, PNG, WebP, GIF, SVG)?',
          answer: 'Aceitamos JPG/JPEG, PNG, WebP, GIF e SVG. Você pode manter o formato original ou converter para JPG, PNG ou WebP com um clique preservando fundos transparentes.',
        },
        {
          question: 'Posso comprimir várias imagens de graça e sem limite diário?',
          answer: 'Sim. Arraste quantas fotos precisar, confira o controle Antes e Depois e baixe uma por uma ou todas em um único arquivo ZIP sem cadastro ou marcas d’água.',
        },
      ],
    },
    compressor: {
      dropTitle: 'Solte suas imagens aqui para comprimir localmente',
      dropSubtitle: 'Suporta JPG, PNG, WebP, GIF e SVG • Zero uploads • Tamanho exato em KB',
      dropAriaLabel: 'Solte imagens aqui ou pressione Enter para selecionar arquivos',
      selectImages: 'Selecionar imagens',
      addMoreImages: 'Adicionar mais',
      trySample: 'Testar imagem de exemplo',
      clearAll: 'Limpar tudo',
      modeQuality: 'Modo Qualidade',
      modeTargetKb: 'Tamanho exato (KB)',
      qualityLabel: 'Qualidade da compressão',
      outputFormatLabel: 'Formato de saída',
      formatOriginal: 'Original',
      targetSizeLabel: 'Tamanho alvo exato',
      customKbLabel: 'KB personalizado',
      customKbPlaceholder: 'ex: 75',
      applyCustomKb: 'Aplicar',
      kbUnit: 'KB',
      beforeLabel: 'Antes (Original)',
      afterLabel: 'Depois (Comprimida)',
      sliderAriaLabel: 'Controle deslizante de comparação antes e depois',
      originalSizeLabel: 'Original',
      compressedSizeLabel: 'Comprimida',
      savedLabel: 'economizado',
      smallerLabel: 'menor',
      largerWarning: 'Arquivo já otimizado — tente WebP/JPG ou um limite menor.',
      processingStatus: 'Comprimindo localmente...',
      readyStatus: 'Pronto',
      downloadBtn: 'Baixar',
      inspectBtn: 'Comparar',
      removeBtn: 'Remover imagem',
      downloadAllZip: 'Baixar tudo (ZIP)',
      creatingZip: 'Gerando ZIP...',
      totalSummary: 'Total do lote',
      liveProcessedSingle: '{name} comprimida de {before} para {after} ({saved}% economizado). Pronta para baixar.',
      liveProcessedBatch: '{count} imagens comprimidas de {before} para {after} ({saved}% economizado). Prontas para baixar ou exportar em ZIP.',
      liveZipReady: 'Arquivo ZIP com {count} imagens comprimidas pronto e iniciando download.',
      liveError: 'Não foi possível processar {name}. Tente outro arquivo.',
      unsupportedFile: 'Arquivo não suportado ignorado: {name}. Use JPG, PNG, WebP, GIF ou SVG.',
    },
    howToUse: {
      breadcrumbCurrent: 'Como usar',
      h1: 'Como Comprimir Imagens para um Tamanho Exato em KB',
      intro: 'Seja para enviar uma foto de 50KB em um formulário ou acelerar sua loja virtual, o CompressImg comprime tudo direto no seu navegador com privacidade total.',
      stepsHeading: 'Passo a passo',
      steps: [
        {
          title: '1. Arraste suas fotos ou clique em Selecionar imagens',
          description: 'Adicione um ou vários arquivos JPG, PNG, WebP, GIF ou SVG sem enviar nada para servidores.',
        },
        {
          title: '2. Escolha Modo Qualidade ou Tamanho exato (KB)',
          description: 'Ajuste a qualidade ou clique em 20KB, 50KB, 100KB, 200KB ou digite qualquer meta em KB.',
        },
        {
          title: '3. Compare nitidez com o controle Antes / Depois',
          description: 'Arraste a divisória para inspecionar cada detalhe antes de baixar.',
        },
        {
          title: '4. Baixe individualmente ou tudo em um ZIP',
          description: 'Salve uma imagem por vez ou baixe todo o lote em ZIP, mesmo sem conexão após instalar o PWA.',
        },
      ],
      tipsHeading: 'Dicas de formato e tamanho',
      tips: [
        {
          title: 'Melhor para sites e blogs: WebP',
          body: 'Converter JPG ou PNG pesados para WebP reduz de 25% a 50% do tamanho mantendo transparência e nitidez.',
        },
        {
          title: 'Melhor para documentos e portais: JPG até 50KB ou 100KB',
          body: 'Portais públicos costumam exigir JPG leve. Use Tamanho exato (KB) com saída em JPG.',
        },
        {
          title: 'Melhor para logotipos e ícones: PNG ou SVG',
          body: 'Mantenha vetores em SVG otimizados ou capturas com textos nítidos em PNG.',
        },
      ],
      ctaButton: 'Abrir Compressor de Imagens',
    },
    hireMe: {
      breadcrumbCurrent: 'Contrate-me',
      badge: 'Disponível para projetos freelance',
      heading: 'Precisa de uma solução de TI sob medida?',
      intro: 'Olá, eu sou Kishara Dilshan, o desenvolvedor por trás do CompressImg.',
      subcopy: 'Se você gostou desta ferramenta rápida no navegador e precisa de uma solução de TI de alto nível para o seu negócio, estou disponível para projetos freelance. Sou especialista em:',
      specialties: [
        {
          title: 'Aplicações web ultrarrápidas e otimizadas para SEO',
          description: 'Astro, React, Next.js — projetadas para carregamento instantâneo, SEO técnico e escalabilidade limpa.',
        },
        {
          title: 'Processamento no cliente e ferramentas WebAssembly (WASM)',
          description: 'Utilitários de mídia, PDF e dados sem servidor que rodam com privacidade direto no navegador.',
        },
        {
          title: 'Design UI/UX e landing pages de alta conversão',
          description: 'Interfaces minimalistas e acessíveis criadas para converter visitantes no desktop e no celular.',
        },
      ],
      ctaHeading: 'Vamos construir algo incrível juntos.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Envie um e-mail direto: kisharadilshan007@gmail.com',
      copyButton: 'Copiar e-mail',
      copiedButton: 'Copiado!',
      copiedAnnouncement: 'Endereço kisharadilshan007@gmail.com copiado para a área de transferência.',
    },
    footer: {
      tagline: 'Otimização de imagens rápida, privada e local.',
      privacyStatement: 'Zero uploads • Funciona offline como PWA',
      builtBy: 'Desenvolvido por Kishara Dilshan',
      supportLink: 'Pague um café',
      openSourceLink: 'Código no GitHub',
    },
  },

  de: {
    nav: {
      brandName: 'CompressImg',
      home: 'Startseite',
      howToUse: 'Anleitung',
      hireMe: 'Beauftragen',
      languageAriaLabel: 'Sprache auswählen',
      themeToggleAriaLabel: 'Zwischen hellem und dunklem Design wechseln',
      themeDarkLabel: 'Dunkel',
      themeLightLabel: 'Hell',
      installApp: 'Zum Startbildschirm',
      installAppAriaLabel: 'CompressImg für Offline-Nutzung zum Startbildschirm hinzufügen',
      installedLabel: 'Offline bereit',
      supportDeveloper: 'Entwickler unterstützen',
      supportDeveloperAriaLabel: 'Entwickler auf Gumroad unterstützen',
      githubAriaLabel: 'Quellcode auf GitHub ansehen',
      menuAriaLabel: 'Navigationsmenü öffnen',
      iosModalTitle: 'CompressImg zum Startbildschirm hinzufügen',
      iosModalBody: 'Installiere CompressImg auf deinem Gerät, um Bilder jederzeit 100 % offline zu komprimieren.',
      iosModalStep1: 'Tippe in Safari auf das Teilen-Symbol (oder öffne das Browser-Menü).',
      iosModalStep2: 'Wähle „Zum Home-Bildschirm“ aus.',
      iosModalStep3: 'Tippe auf „Hinzufügen“, um CompressImg offline wie eine App zu nutzen.',
      browserModalBody: 'Öffne das Browser-Menü und wähle „App installieren“ oder „Zum Startbildschirm hinzufügen“ für die Offline-Nutzung.',
      closeModal: 'Verstanden',
    },
    seo: {
      homeTitle: 'Bilder Komprimieren Online - JPG, PNG & WebP Kostenlos',
      homeDescription: 'Komprimiere JPG-, PNG- und WebP-Bilder direkt im Browser auf eine exakte KB-Größe. 100 % kostenlos ohne Upload und ohne Wasserzeichen.',
      howToUseTitle: 'Bilder auf 50KB oder 100KB komprimieren - CompressImg',
      howToUseDescription: 'Erfahre, wie du JPG-, PNG- und WebP-Fotos privat im Browser auf exakte KB-Größen oder im Stapel ohne Qualitätsverlust verkleinerst.',
      hireMeTitle: 'Kishara Dilshan beauftragen - Web & WASM | CompressImg',
      hireMeDescription: 'Ultraschnelle Astro-, React- oder Next.js-Web-Apps und clientseitige WebAssembly-Tools. Beauftrage Kishara Dilshan für SEO-starke Lösungen.',
      ogImageAlt: 'CompressImg — Privater Bildkompressor direkt im Browser',
    },
    home: {
      h1: 'Bildkompressor — JPG, PNG & WebP online verkleinern',
      subtitle: 'Verkleinere Fotos auf eine exakte KB-Größe oder optimiere JPG-, PNG- und WebP-Dateien im Stapel direkt im Browser. 100 % kostenlos, ohne Upload und ohne Wasserzeichen.',
      privacyNote: '100 % Privat: Alles wird lokal auf deinem Gerät verarbeitet. Keine Datei verlässt den Browser.',
      faqHeading: 'Häufig gestellte Fragen',
      faqs: [
        {
          question: 'Wie komprimiere ich ein Bild auf 50KB oder 100KB ohne Qualitätsverlust?',
          answer: 'Wechsle oben zu „Zielgröße (KB)“, wähle 50KB oder 100KB (oder gib einen eigenen Wert ein) und CompressImg ermittelt lokal die schärfste Einstellung. Bei großen Fotos liefert das Ausgabeformat WebP oder JPG besonders klare Details.',
        },
        {
          question: 'Werden meine Fotos zum Komprimieren auf einen Server hochgeladen?',
          answer: 'Nein. Jedes Bild wird lokal in deinem Browser über HTML5 Canvas und Web Worker verarbeitet. Persönliche Dokumente und Fotos erreichen keinen Server und funktionieren installiert sogar offline.',
        },
        {
          question: 'Welche Bildformate werden unterstützt (JPG, PNG, WebP, GIF, SVG)?',
          answer: 'CompressImg unterstützt JPG/JPEG, PNG, WebP, GIF und SVG. Du kannst das Originalformat behalten oder per Klick in JPG, PNG oder WebP inklusive Transparenz umwandeln.',
        },
        {
          question: 'Kann ich mehrere Bilder gleichzeitig kostenlos und ohne Limit komprimieren?',
          answer: 'Ja. Ziehe beliebig viele Dateien hinein, prüfe jede mit dem Vorher/Nachher-Schieberegler und lade Bilder einzeln oder gesammelt als ZIP ohne Wasserzeichen herunter.',
        },
      ],
    },
    compressor: {
      dropTitle: 'Bilder hier ablegen zum lokalen Komprimieren',
      dropSubtitle: 'JPG, PNG, WebP, GIF & SVG • Kein Upload • Exakte KB-Ziele',
      dropAriaLabel: 'Bilder ablegen oder Eingabetaste drücken, um Dateien auszuwählen',
      selectImages: 'Bilder auswählen',
      addMoreImages: 'Weitere hinzufügen',
      trySample: 'Beispielbild testen',
      clearAll: 'Alle entfernen',
      modeQuality: 'Qualitätsmodus',
      modeTargetKb: 'Zielgröße (KB)',
      qualityLabel: 'Komprimierungsqualität',
      outputFormatLabel: 'Ausgabeformat',
      formatOriginal: 'Original',
      targetSizeLabel: 'Exakte Zielgröße',
      customKbLabel: 'Eigene KB',
      customKbPlaceholder: 'z. B. 75',
      applyCustomKb: 'Anwenden',
      kbUnit: 'KB',
      beforeLabel: 'Vorher (Original)',
      afterLabel: 'Nachher (Komprimiert)',
      sliderAriaLabel: 'Vorher-Nachher-Vergleichsregler',
      originalSizeLabel: 'Original',
      compressedSizeLabel: 'Komprimiert',
      savedLabel: 'gespart',
      smallerLabel: 'kleiner',
      largerWarning: 'Bereits stark komprimiert — WebP/JPG oder kleineres Ziel wählen.',
      processingStatus: 'Wird lokal komprimiert...',
      readyStatus: 'Bereit',
      downloadBtn: 'Herunterladen',
      inspectBtn: 'Vergleichen',
      removeBtn: 'Bild entfernen',
      downloadAllZip: 'Alle als ZIP laden',
      creatingZip: 'ZIP wird erstellt...',
      totalSummary: 'Stapel gesamt',
      liveProcessedSingle: '{name} von {before} auf {after} komprimiert ({saved}% gespart). Bereit zum Download.',
      liveProcessedBatch: '{count} Bilder von {before} auf {after} komprimiert ({saved}% gespart). Bereit für Download oder ZIP.',
      liveZipReady: 'ZIP-Archiv mit {count} komprimierten Bildern ist bereit und wird heruntergeladen.',
      liveError: '{name} konnte nicht verarbeitet werden. Bitte anderes Bild wählen.',
      unsupportedFile: 'Nicht unterstützte Datei übersprungen: {name}. Bitte JPG, PNG, WebP, GIF oder SVG wählen.',
    },
    howToUse: {
      breadcrumbCurrent: 'Anleitung',
      h1: 'Bilder privat auf eine exakte KB-Größe komprimieren',
      intro: 'Ob 50KB-Bewerbungsfoto für ein Online-Portal oder schnelle Web-Grafiken für deinen Shop: CompressImg erledigt alles direkt in deinem Browser.',
      stepsHeading: 'Schritt-für-Schritt-Anleitung',
      steps: [
        {
          title: '1. Bilder ablegen oder auswählen',
          description: 'Ziehe ein oder mehrere JPG-, PNG-, WebP-, GIF- oder SVG-Dateien ins Feld. Es findet kein Upload statt.',
        },
        {
          title: '2. Qualitätsmodus oder Zielgröße (KB) wählen',
          description: 'Stelle die gewünschte Qualität ein oder tippe auf 20KB, 50KB, 100KB, 200KB bzw. einen eigenen KB-Wert.',
        },
        {
          title: '3. Schärfe im Vorher/Nachher-Vergleich prüfen',
          description: 'Verschiebe den Vergleichsregler auf jedem Bild, um Details vor dem Speichern zu kontrollieren.',
        },
        {
          title: '4. Einzeln laden oder als ZIP exportieren',
          description: 'Speichere einzelne Dateien oder den gesamten Stapel per ZIP-Download — installiert sogar offline.',
        },
      ],
      tipsHeading: 'Tipps zu Formaten und Dateigrößen',
      tips: [
        {
          title: 'Optimal für Websites & Blogs: WebP',
          body: 'WebP spart gegenüber JPG und PNG oft 25 %–50 % Dateigröße bei gleicher Schärfe und unterstützt Transparenz.',
        },
        {
          title: 'Optimal für Formulare & Behörden: JPG unter 50KB / 100KB',
          body: 'Viele Portale verlangen JPGs bis 50KB oder 100KB. Wähle Zielgröße (KB) und Ausgabeformat JPG.',
        },
        {
          title: 'Optimal für Logos & UI: PNG oder SVG',
          body: 'SVG bleibt als optimierter Vektor gestochen scharf; Screenshots behalten im PNG-Format saubere Kanten.',
        },
      ],
      ctaButton: 'Zum Bildkompressor',
    },
    hireMe: {
      breadcrumbCurrent: 'Beauftragen',
      badge: 'Verfügbar für Freelance-Projekte',
      heading: 'Maßgeschneiderte IT-Lösung gesucht?',
      intro: 'Hallo, ich bin Kishara Dilshan, der Entwickler hinter CompressImg.',
      subcopy: 'Wenn dir dieses schnelle, lokale Tool gefällt und du eine erstklassige IT-Lösung für dein Unternehmen brauchst, stehe ich für Freelance-Projekte zur Verfügung. Meine Schwerpunkte:',
      specialties: [
        {
          title: 'Ultraschnelle, SEO-optimierte Webanwendungen',
          description: 'Astro, React, Next.js — entwickelt für Ladezeiten unter einer Sekunde, technisches SEO und saubere Skalierbarkeit.',
        },
        {
          title: 'Clientseitige Verarbeitung & WebAssembly-Tools (WASM)',
          description: 'Serverlose Medien-, PDF- und Daten-Werkzeuge, die privat direkt im Browser laufen.',
        },
        {
          title: 'UI/UX-Design & konversionsstarke Landingpages',
          description: 'Minimalistische, barrierefreie Oberflächen, die Besucher auf Desktop und Mobilgeräten überzeugen.',
        },
      ],
      ctaHeading: 'Lass uns gemeinsam etwas Großartiges bauen.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Direkt per E-Mail: kisharadilshan007@gmail.com',
      copyButton: 'E-Mail kopieren',
      copiedButton: 'Kopiert!',
      copiedAnnouncement: 'E-Mail-Adresse kisharadilshan007@gmail.com in die Zwischenablage kopiert.',
    },
    footer: {
      tagline: 'Schnelle, private Bildoptimierung im Browser.',
      privacyStatement: 'Kein Server-Upload • Offline nutzbar als PWA',
      builtBy: 'Entwickelt von Kishara Dilshan',
      supportLink: 'Kaffee spendieren',
      openSourceLink: 'GitHub-Code',
    },
  },

  fr: {
    nav: {
      brandName: 'CompressImg',
      home: 'Accueil',
      howToUse: 'Mode d’emploi',
      hireMe: 'Me recruter',
      languageAriaLabel: 'Choisir la langue',
      themeToggleAriaLabel: 'Basculer entre thème clair et sombre',
      themeDarkLabel: 'Sombre',
      themeLightLabel: 'Clair',
      installApp: 'Ajouter à l’écran',
      installAppAriaLabel: 'Ajouter CompressImg à l’écran d’accueil pour un usage hors ligne',
      installedLabel: 'Prêt hors ligne',
      supportDeveloper: 'Soutenir le créateur',
      supportDeveloperAriaLabel: 'Soutenir le développeur sur Gumroad',
      githubAriaLabel: 'Voir le code source sur GitHub',
      menuAriaLabel: 'Ouvrir le menu de navigation',
      iosModalTitle: 'Ajouter CompressImg à l’écran d’accueil',
      iosModalBody: 'Installez CompressImg sur votre appareil pour compresser et exporter vos images 100 % hors ligne.',
      iosModalStep1: 'Touchez l’icône Partager dans Safari (ou le menu du navigateur).',
      iosModalStep2: 'Sélectionnez « Sur l’écran d’accueil ».',
      iosModalStep3: 'Touchez « Ajouter » pour lancer CompressImg hors ligne.',
      browserModalBody: 'Ouvrez le menu du navigateur et choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».',
      closeModal: 'Compris',
    },
    seo: {
      homeTitle: 'Compresseur d’Images en Ligne - JPG, PNG & WebP Gratuit',
      homeDescription: 'Compressez vos images JPG, PNG et WebP à une taille exacte en Ko dans votre navigateur. Gratuit, par lot, sans envoi ni filigrane.',
      howToUseTitle: 'Compresser une Image à 50Ko ou 100Ko - CompressImg',
      howToUseDescription: 'Découvrez comment réduire des photos JPG, PNG et WebP à un poids exact en Ko ou compresser par lot en privé sans perdre en qualité.',
      hireMeTitle: 'Engager Kishara Dilshan - Dev Web & WASM | CompressImg',
      hireMeDescription: 'Besoin d’une application Astro, React ou Next.js ultra-rapide ou d’un outil WebAssembly ? Engagez Kishara Dilshan pour vos solutions IT SEO.',
      ogImageAlt: 'CompressImg — Compresseur d’images privé dans le navigateur',
    },
    home: {
      h1: 'Compresseur d’Images — Réduire JPG, PNG & WebP',
      subtitle: 'Compressez vos photos à une taille exacte en Ko ou optimisez vos fichiers JPG, PNG et WebP par lot dans votre navigateur. 100 % gratuit, sans envoi ni filigrane.',
      privacyNote: '100 % Privé : traitement local sur votre appareil. Aucune image ne quitte votre navigateur.',
      faqHeading: 'Questions fréquentes',
      faqs: [
        {
          question: 'Comment compresser une image à 50 Ko ou 100 Ko sans perte de qualité ?',
          answer: 'Passez en mode Taille cible (Ko), cliquez sur 50 Ko ou 100 Ko (ou saisissez votre valeur) et CompressImg calcule localement le meilleur compromis netteté/poids. Pour de grandes photos, le format WebP ou JPG conserve davantage de détails.',
        },
        {
          question: 'Mes photos sont-elles envoyées sur un serveur lors de la compression ?',
          answer: 'Non. Chaque image est traitée localement via HTML5 Canvas et Web Workers. Vos pièces d’identité et créations restent sur votre appareil, même hors ligne une fois l’app installée.',
        },
        {
          question: 'Quels formats sont pris en charge (JPG, PNG, WebP, GIF, SVG) ?',
          answer: 'CompressImg gère JPG/JPEG, PNG, WebP, GIF et SVG. Conservez le format d’origine ou convertissez en JPG, PNG ou WebP en préservant la transparence.',
        },
        {
          question: 'Puis-je compresser plusieurs images gratuitement et sans limite ?',
          answer: 'Oui. Déposez tout un lot, vérifiez la netteté avec le curseur Avant / Après et téléchargez vos images à l’unité ou en archive ZIP sans inscription.',
        },
      ],
    },
    compressor: {
      dropTitle: 'Déposez vos images ici pour les compresser localement',
      dropSubtitle: 'JPG, PNG, WebP, GIF & SVG • Zéro envoi serveur • Cibles exactes en Ko',
      dropAriaLabel: 'Déposez vos images ici ou appuyez sur Entrée pour parcourir',
      selectImages: 'Choisir des images',
      addMoreImages: 'Ajouter d’autres images',
      trySample: 'Tester un exemple',
      clearAll: 'Tout effacer',
      modeQuality: 'Mode Qualité',
      modeTargetKb: 'Taille cible (Ko)',
      qualityLabel: 'Qualité de compression',
      outputFormatLabel: 'Format de sortie',
      formatOriginal: 'Original',
      targetSizeLabel: 'Taille exacte visée',
      customKbLabel: 'Ko personnalisé',
      customKbPlaceholder: 'ex. 75',
      applyCustomKb: 'Appliquer',
      kbUnit: 'Ko',
      beforeLabel: 'Avant (Original)',
      afterLabel: 'Après (Compressé)',
      sliderAriaLabel: 'Curseur comparatif avant et après compression',
      originalSizeLabel: 'Original',
      compressedSizeLabel: 'Compressé',
      savedLabel: 'économisé',
      smallerLabel: 'plus léger',
      largerWarning: 'Déjà très optimisée — essayez WebP/JPG ou une cible plus basse.',
      processingStatus: 'Compression locale...',
      readyStatus: 'Prêt',
      downloadBtn: 'Télécharger',
      inspectBtn: 'Comparer',
      removeBtn: 'Retirer l’image',
      downloadAllZip: 'Tout télécharger (ZIP)',
      creatingZip: 'Création du ZIP...',
      totalSummary: 'Total du lot',
      liveProcessedSingle: '{name} compressé de {before} à {after} ({saved} % économisés). Prêt au téléchargement.',
      liveProcessedBatch: '{count} images compressées de {before} à {after} ({saved} % économisés). Prêtes pour téléchargement ou ZIP.',
      liveZipReady: 'Archive ZIP de {count} images prête et en cours de téléchargement.',
      liveError: 'Impossible de traiter {name}. Veuillez essayer un autre fichier.',
      unsupportedFile: 'Fichier ignoré : {name}. Utilisez JPG, PNG, WebP, GIF ou SVG.',
    },
    howToUse: {
      breadcrumbCurrent: 'Mode d’emploi',
      h1: 'Comment compresser des images à une taille exacte en Ko',
      intro: 'Que ce soit pour un justificatif limité à 50 Ko ou pour accélérer votre site web, CompressImg optimise vos visuels directement dans le navigateur.',
      stepsHeading: 'Étapes simples',
      steps: [
        {
          title: '1. Déposez vos fichiers ou cliquez sur Choisir des images',
          description: 'Ajoutez un ou plusieurs fichiers JPG, PNG, WebP, GIF ou SVG sans aucun transfert vers un serveur.',
        },
        {
          title: '2. Sélectionnez Mode Qualité ou Taille cible (Ko)',
          description: 'Réglez la qualité ou cliquez sur 20 Ko, 50 Ko, 100 Ko, 200 Ko ou une valeur sur mesure.',
        },
        {
          title: '3. Contrôlez la qualité avec le curseur Avant / Après',
          description: 'Glissez la barre de comparaison pour vérifier la netteté avant d’enregistrer.',
        },
        {
          title: '4. Téléchargez à l’unité ou en archive ZIP',
          description: 'Récupérez chaque fichier ou tout le lot en un clic, même hors ligne après installation PWA.',
        },
      ],
      tipsHeading: 'Conseils pratiques',
      tips: [
        {
          title: 'Meilleur choix web : WebP',
          body: 'Convertir vos JPG/PNG en WebP réduit souvent le poids de 25 % à 50 % tout en gardant la transparence.',
        },
        {
          title: 'Meilleur choix démarches en ligne : JPG 50 Ko ou 100 Ko',
          body: 'Les formulaires administratifs imposent souvent du JPG léger : choisissez Taille cible (Ko) + JPG.',
        },
        {
          title: 'Meilleur choix logos & captures : PNG ou SVG',
          body: 'Le SVG reste net à toute taille ; le PNG préserve les textes et contours nets.',
        },
      ],
      ctaButton: 'Ouvrir le compresseur',
    },
    hireMe: {
      breadcrumbCurrent: 'Me recruter',
      badge: 'Disponible pour des projets freelance',
      heading: 'Besoin d’une solution IT sur mesure ?',
      intro: 'Bonjour, je suis Kishara Dilshan, le développeur derrière CompressImg.',
      subcopy: 'Si vous appréciez cet outil rapide côté client et recherchez une solution IT de premier ordre pour votre entreprise, je suis disponible en freelance. Mes spécialités :',
      specialties: [
        {
          title: 'Applications web ultra-rapides et optimisées SEO',
          description: 'Astro, React, Next.js — conçues pour un chargement instantané, le SEO technique et une évolutivité propre.',
        },
        {
          title: 'Traitement côté client & outils WebAssembly (WASM)',
          description: 'Utilitaires média, PDF et données sans serveur qui fonctionnent en privé dans le navigateur.',
        },
        {
          title: 'Design UI/UX & pages de destination à forte conversion',
          description: 'Interfaces minimalistes et accessibles conçues pour convertir sur ordinateur et mobile.',
        },
      ],
      ctaHeading: 'Construisons quelque chose d’exceptionnel ensemble.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Écrivez-moi directement : kisharadilshan007@gmail.com',
      copyButton: 'Copier l’e-mail',
      copiedButton: 'Copié !',
      copiedAnnouncement: 'Adresse kisharadilshan007@gmail.com copiée dans le presse-papiers.',
    },
    footer: {
      tagline: 'Compression d’images rapide, privée et locale.',
      privacyStatement: 'Zéro envoi serveur • Fonctionne hors ligne (PWA)',
      builtBy: 'Créé par Kishara Dilshan',
      supportLink: 'M’offrir un café',
      openSourceLink: 'Code GitHub',
    },
  },

  ja: {
    nav: {
      brandName: 'CompressImg',
      home: 'ホーム',
      howToUse: '使い方',
      hireMe: '制作依頼',
      languageAriaLabel: '言語を選択',
      themeToggleAriaLabel: 'ライトテーマとダークテーマを切り替え',
      themeDarkLabel: 'ダーク',
      themeLightLabel: 'ライト',
      installApp: 'ホーム画面に追加',
      installAppAriaLabel: 'オフライン利用のためCompressImgをホーム画面に追加',
      installedLabel: 'オフライン対応',
      supportDeveloper: '開発者を応援',
      supportDeveloperAriaLabel: 'Gumroadで開発者を応援する',
      githubAriaLabel: 'GitHubでソースコードを見る',
      menuAriaLabel: 'ナビゲーションメニューを開く',
      iosModalTitle: 'CompressImgをホーム画面に追加',
      iosModalBody: 'デバイスにインストールすると、いつでも完全オフラインで画像圧縮とZIP保存が使えます。',
      iosModalStep1: 'Safariの共有アイコン（またはブラウザメニュー）をタップします。',
      iosModalStep2: '下にスクロールして「ホーム画面に追加」を選びます。',
      iosModalStep3: '「追加」をタップするとオフラインアプリとして起動できます。',
      browserModalBody: 'ブラウザのメニューから「アプリをインストール」または「ホーム画面に追加」を選択してください。',
      closeModal: '閉じる',
    },
    seo: {
      homeTitle: '画像圧縮オンライン - JPG・PNG・WebPを無料軽量化',
      homeDescription: 'JPG・PNG・WebP画像をブラウザ上で指定KBサイズに無料圧縮。サーバー送信なし・透かしなし・一括ZIPダウンロード対応の画像圧縮ツール。',
      howToUseTitle: '画像を50KBや100KBに圧縮する方法 - CompressImg',
      howToUseDescription: 'JPG・PNG・WebP写真を高画質のまま指定KBサイズへ縮小する方法や、一括圧縮をブラウザ内で安全に行う手順を分かりやすく解説。',
      hireMeTitle: 'Kishara Dilshanへの開発依頼 - Web & WASM | CompressImg',
      hireMeDescription: '超高速Astro・React・Next.jsサイトやブラウザ完結型WebAssemblyツールの開発ならKishara Dilshanへ。SEO対策済みのIT開発に対応。',
      ogImageAlt: 'CompressImg — ブラウザ完結の無料・高プライバシー画像圧縮ツール',
    },
    home: {
      h1: '画像圧縮ツール — JPG・PNG・WebPをブラウザで軽量化',
      subtitle: '指定したKBサイズへの圧縮やJPG・PNG・WebPの一括最適化をブラウザ上で完結。完全無料・サーバー送信なし・透かしなし。',
      privacyNote: '100%プライベート処理：すべてお使いの端末内で完結し、画像が外部へ送信されることはありません。',
      faqHeading: 'よくある質問',
      faqs: [
        {
          question: '画質を保ったまま画像を50KBや100KBに圧縮するには？',
          answer: '上の「目標サイズ (KB)」モードに切り替え、50KBや100KB（または任意のKB値）を選ぶと、ブラウザ内で最適な圧縮率を自動計算します。大きな写真は出力形式をWebPやJPGにすると鮮明さを保ちやすくなります。',
        },
        {
          question: '圧縮時に写真はサーバーへアップロードされますか？',
          answer: 'いいえ。HTML5 CanvasとWeb Workerを使い、すべてお使いのブラウザ内だけで処理します。証明写真や社内資料が外部サーバーに保存されることはなく、PWAとして追加すればオフラインでも利用できます。',
        },
        {
          question: '対応している画像形式（JPG・PNG・WebP・GIF・SVG）は？',
          answer: 'JPG/JPEG、PNG、WebP、GIF、SVGに対応しています。元の形式のまま圧縮できるほか、透過背景を保ったままPNGやWebPなどへワンクリック変換も可能です。',
        },
        {
          question: '複数枚の画像を回数制限なしで無料一括圧縮できますか？',
          answer: 'はい。複数画像をまとめてドロップし、圧縮前後の比較スライダーで画質を確認したうえで、1枚ずつまたはZIPファイルで一括ダウンロードできます。登録や透かしは一切不要です。',
        },
      ],
    },
    compressor: {
      dropTitle: 'ここに画像をドロップしてブラウザ内で圧縮',
      dropSubtitle: 'JPG・PNG・WebP・GIF・SVG対応 • 送信なし • 指定KBサイズに自動調整',
      dropAriaLabel: '画像をドロップするかEnterキーでファイルを選択',
      selectImages: '画像を選択',
      addMoreImages: '画像を追加',
      trySample: 'サンプル画像で試す',
      clearAll: 'すべて削除',
      modeQuality: '画質モード',
      modeTargetKb: '目標サイズ (KB)',
      qualityLabel: '圧縮画質',
      outputFormatLabel: '出力形式',
      formatOriginal: '元の形式',
      targetSizeLabel: '目標ファイルサイズ',
      customKbLabel: '任意のKB',
      customKbPlaceholder: '例: 75',
      applyCustomKb: '適用',
      kbUnit: 'KB',
      beforeLabel: '圧縮前（元画像）',
      afterLabel: '圧縮後',
      sliderAriaLabel: '圧縮前と圧縮後の比較スライダー',
      originalSizeLabel: '元サイズ',
      compressedSizeLabel: '圧縮後',
      savedLabel: '削減',
      smallerLabel: '軽量化',
      largerWarning: 'すでに最適化されています。WebP/JPGまたは小さい目標をお試しください。',
      processingStatus: '端末内で圧縮中...',
      readyStatus: '完了',
      downloadBtn: '保存',
      inspectBtn: '比較',
      removeBtn: '画像を削除',
      downloadAllZip: 'すべてZIPで保存',
      creatingZip: 'ZIP作成中...',
      totalSummary: '合計サイズ',
      liveProcessedSingle: '{name}を{before}から{after}へ圧縮しました（{saved}%削減）。ダウンロードできます。',
      liveProcessedBatch: '{count}枚の画像を{before}から{after}へ圧縮しました（{saved}%削減）。',
      liveZipReady: '{count}枚の圧縮画像を含むZIPファイルの準備ができました。',
      liveError: '{name}を処理できませんでした。別の画像をお試しください。',
      unsupportedFile: '非対応ファイルをスキップしました: {name}。JPG・PNG・WebP・GIF・SVGを選択してください。',
    },
    howToUse: {
      breadcrumbCurrent: '使い方',
      h1: '画像を安全に指定KBサイズへ圧縮する手順',
      intro: '申請フォーム向けの50KB画像からWebサイト用の画像軽量化まで、CompressImgならアップロード不要で直感的に圧縮できます。',
      stepsHeading: '4ステップの使い方',
      steps: [
        {
          title: '1. 画像をドロップまたは「画像を選択」をクリック',
          description: 'JPG・PNG・WebP・GIF・SVGを1枚または複数選択します。画像は一切サーバーに送信されません。',
        },
        {
          title: '2. 画質モードまたは目標サイズ (KB) を選択',
          description: 'スライダーで画質を調整するか、20KB・50KB・100KB・200KB・任意KBを選んで自動最適化します。',
        },
        {
          title: '3. 比較スライダーで圧縮前後の画質を確認',
          description: '画像をクリックして中央のスライダーを動かし、文字や輪郭の鮮明さをその場で確認できます。',
        },
        {
          title: '4. 個別保存またはZIPで一括ダウンロード',
          description: '1枚ずつ保存するほか、ZIP一括保存もワンクリック。ホーム画面に追加すればオフラインでも動作します。',
        },
      ],
      tipsHeading: '形式とサイズの選び方',
      tips: [
        {
          title: 'Webサイト・ブログ向け：WebP',
          body: '同じ見た目でもJPGやPNGより25%〜50%軽量化でき、透過画像にも対応しています。',
        },
        {
          title: 'Web申請・履歴書向け：JPGで50KB / 100KB指定',
          body: '提出フォームに容量制限がある場合は「目標サイズ (KB)」と出力形式JPGを選ぶと確実です。',
        },
        {
          title: 'ロゴ・スクリーンショット向け：PNGまたはSVG',
          body: 'ベクターロゴはSVG最適化、シャープな文字を含む画像はPNGが最適です。',
        },
      ],
      ctaButton: '画像圧縮ツールを開く',
    },
    hireMe: {
      breadcrumbCurrent: '制作依頼',
      badge: 'フリーランス案件のご相談受付中',
      heading: 'カスタムITソリューションが必要ですか？',
      intro: 'こんにちは、CompressImgの開発者 Kishara Dilshan です。',
      subcopy: 'この高速なブラウザ完結型ツールを気に入っていただけて、ビジネス向けに高品質なITソリューションをお探しでしたら、フリーランスとして開発を承ります。専門分野：',
      specialties: [
        {
          title: '超高速・SEO最適化されたWebアプリケーション',
          description: 'Astro・React・Next.js を用い、1秒未満の高速表示、テクニカルSEO、保守性の高い設計を実現します。',
        },
        {
          title: 'クライアント完結処理 & WebAssembly (WASM) ツール',
          description: 'サーバー不要でブラウザ内だけで安全に動作するメディア・PDF・データ処理ユーティリティ。',
        },
        {
          title: 'UI/UXデザイン & 高コンバージョンLP制作',
          description: 'PC・スマホのどちらでも直感的に使え、成果につながるミニマルでアクセシブルなUIを設計します。',
        },
      ],
      ctaHeading: '素晴らしいプロダクトを一緒に作りましょう。',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: '直接メールで相談する: kisharadilshan007@gmail.com',
      copyButton: 'メールをコピー',
      copiedButton: 'コピー完了！',
      copiedAnnouncement: 'メールアドレス kisharadilshan007@gmail.com をクリップボードにコピーしました。',
    },
    footer: {
      tagline: 'ブラウザ完結の高速・安全な画像圧縮ツール。',
      privacyStatement: 'サーバー送信ゼロ • PWAでオフライン動作',
      builtBy: '開発: Kishara Dilshan',
      supportLink: 'コーヒーで応援',
      openSourceLink: 'GitHubソース',
    },
  },

  zh: {
    nav: {
      brandName: 'CompressImg',
      home: '首页',
      howToUse: '使用指南',
      hireMe: '定制开发',
      languageAriaLabel: '选择语言',
      themeToggleAriaLabel: '切换浅色或深色主题',
      themeDarkLabel: '深色',
      themeLightLabel: '浅色',
      installApp: '添加到主屏幕',
      installAppAriaLabel: '将 CompressImg 添加到主屏幕以离线使用',
      installedLabel: '已支持离线',
      supportDeveloper: '支持开发者',
      supportDeveloperAriaLabel: '在 Gumroad 上支持开发者',
      githubAriaLabel: '在 GitHub 查看源代码',
      menuAriaLabel: '打开导航菜单',
      iosModalTitle: '将 CompressImg 添加到主屏幕',
      iosModalBody: '将 CompressImg 安装到您的设备，随时随地 100% 离线压缩与打包导出图片。',
      iosModalStep1: '在 Safari 中轻点“分享”按钮（或打开浏览器菜单）。',
      iosModalStep2: '向下滑动并选择“添加到主屏幕”。',
      iosModalStep3: '轻点“添加”，即可像原生离线应用一样打开。',
      browserModalBody: '打开浏览器菜单，选择“安装应用”或“添加到主屏幕”即可完全离线使用。',
      closeModal: '知道了',
    },
    seo: {
      homeTitle: '在线图片压缩工具 - 免费压缩 JPG、PNG 与 WebP',
      homeDescription: '直接在浏览器中将 JPG、PNG 和 WebP 图片精准压缩到指定 KB 大小。100% 免费批量压缩，零服务器上传，无水印。',
      howToUseTitle: '如何将图片压缩到 50KB 或 100KB - CompressImg',
      howToUseDescription: '了解如何在浏览器中无损画质地把 JPG、PNG 和 WebP 照片缩小到指定 KB 体积，并安全地批量打包导出。',
      hireMeTitle: '雇佣 Kishara Dilshan - Web 与 WASM 开发 | CompressImg',
      hireMeDescription: '需要极速 Astro、React 或 Next.js 网页应用，或纯前端 WebAssembly 工具？联系 Kishara Dilshan 定制 SEO 级 IT 方案。',
      ogImageAlt: 'CompressImg — 浏览器本地免费隐私图片压缩工具',
    },
    home: {
      h1: '在线图片压缩 — 本地无损压缩 JPG、PNG 与 WebP',
      subtitle: '直接在浏览器中将照片精准压缩到指定 KB 大小，或批量优化 JPG、PNG 与 WebP 文件。100% 免费、零上传、无水印。',
      privacyNote: '100% 隐私安全：所有处理均在本地设备完成，图片绝不离开您的浏览器。',
      faqHeading: '常见问题',
      faqs: [
        {
          question: '如何在不明显降低画质的情况下把图片压缩到 50KB 或 100KB？',
          answer: '切换到上方的“目标大小 (KB)”模式，点选 50KB 或 100KB（或输入任意 KB 数值），CompressImg 会自动在浏览器本地求解最清晰的压缩参数。对于高分辨率大图，选择 WebP 或 JPG 格式能保留更多细节。',
        },
        {
          question: '压缩图片时照片会被上传到服务器吗？',
          answer: '不会。每张图片都通过 HTML5 Canvas 与 Web Worker 在您的浏览器本地完成压缩。证件照、设计稿等敏感文件绝不会上传到任何服务器，安装后还可完全离线使用。',
        },
        {
          question: '支持哪些图片格式（JPG、PNG、WebP、GIF、SVG）？',
          answer: '支持 JPG/JPEG、PNG、WebP、GIF 和 SVG。您可以保持原格式输出，也可以一键转换为 JPG、PNG 或 WebP，并在 PNG/WebP 导出时完整保留透明背景。',
        },
        {
          question: '可以免费批量压缩多张图片且没有每日次数限制吗？',
          answer: '可以。一次性拖入多张图片，随时使用前后对比滑块检查画质，然后单张下载或一键打包为 ZIP 压缩包下载，全程免费且无水印、无需注册。',
        },
      ],
    },
    compressor: {
      dropTitle: '将图片拖放到此处即可本地压缩',
      dropSubtitle: '支持 JPG、PNG、WebP、GIF 与 SVG • 零上传 • 精准指定 KB 体积',
      dropAriaLabel: '拖放图片到此处，或按回车键选择设备中的图片文件',
      selectImages: '选择图片',
      addMoreImages: '继续添加图片',
      trySample: '试用示例图片',
      clearAll: '全部清空',
      modeQuality: '画质模式',
      modeTargetKb: '目标大小 (KB)',
      qualityLabel: '压缩画质',
      outputFormatLabel: '输出格式',
      formatOriginal: '保持原格式',
      targetSizeLabel: '精准目标大小',
      customKbLabel: '自定义 KB',
      customKbPlaceholder: '例如 75',
      applyCustomKb: '应用',
      kbUnit: 'KB',
      beforeLabel: '压缩前（原图）',
      afterLabel: '压缩后',
      sliderAriaLabel: '压缩前后画质对比滑块',
      originalSizeLabel: '原图',
      compressedSizeLabel: '压缩后',
      savedLabel: '已缩减',
      smallerLabel: '更小',
      largerWarning: '原图已高度优化 — 建议尝试 WebP/JPG 或更小目标。',
      processingStatus: '正在本地压缩...',
      readyStatus: '已完成',
      downloadBtn: '下载',
      inspectBtn: '对比',
      removeBtn: '移除图片',
      downloadAllZip: '打包下载全部 (ZIP)',
      creatingZip: '正在打包 ZIP...',
      totalSummary: '批量总计',
      liveProcessedSingle: '{name} 已从 {before} 压缩至 {after}（节省 {saved}%），可以下载。',
      liveProcessedBatch: '已将 {count} 张图片从 {before} 压缩至 {after}（节省 {saved}%），可单张下载或导出 ZIP。',
      liveZipReady: '包含 {count} 张压缩图片的 ZIP 压缩包已生成并开始下载。',
      liveError: '无法处理 {name}，请尝试其他图片文件。',
      unsupportedFile: '已跳过不支持的文件：{name}。请选择 JPG、PNG、WebP、GIF 或 SVG。',
    },
    howToUse: {
      breadcrumbCurrent: '使用指南',
      h1: '如何在本地将图片隐私压缩到指定 KB 大小',
      intro: '无论是报名系统要求的 50KB 证件照，还是网页商城的批量配图优化，CompressImg 都能在您的浏览器中安全完成。',
      stepsHeading: '四步快速压缩',
      steps: [
        {
          title: '1. 拖入照片或点击“选择图片”',
          description: '支持一次性添加一张或多张 JPG、PNG、WebP、GIF、SVG 文件，不会上传任何数据。',
        },
        {
          title: '2. 选择画质模式或目标大小 (KB)',
          description: '日常优化可拖动压缩画质滑块；遇到表单体积限制时可直接点击 20KB、50KB、100KB、200KB 或输入任意数值。',
        },
        {
          title: '3. 拖动前后对比滑块确认清晰度',
          description: '点击列表中的任意图片，左右滑动对比条检查细节与文字锐度。',
        },
        {
          title: '4. 单张保存或一键 ZIP 批量导出',
          description: '支持单张保存或全量 ZIP 下载；添加到主屏幕后断网也能照常使用。',
        },
      ],
      tipsHeading: '格式与大小建议',
      tips: [
        {
          title: '网站与博客推荐：WebP',
          body: '转换为 WebP 通常能在相同观感下减少 25%–50% 体积，同时支持透明通道。',
        },
        {
          title: '证件照与报名表单推荐：50KB / 100KB JPG',
          body: '常见考试或政务网站限制 JPG 体积，开启目标大小 (KB) 并选择 JPG 输出即可达标。',
        },
        {
          title: '图标与截图推荐：PNG 或 SVG',
          body: '矢量图标保持 SVG 精简代码，含清晰文字的界面截图保留 PNG 最合适。',
        },
      ],
      ctaButton: '立即使用图片压缩器',
    },
    hireMe: {
      breadcrumbCurrent: '定制开发',
      badge: '可承接自由职业开发项目',
      heading: '需要定制化的 IT 解决方案吗？',
      intro: '你好，我是 Kishara Dilshan，CompressImg 的开发者。',
      subcopy: '如果您喜欢这款极速纯前端工具，并希望为自己的业务打造世界级的 IT 解决方案，欢迎联系我进行自由职业项目合作。我专注于：',
      specialties: [
        {
          title: '极速、SEO 友好的现代 Web 应用',
          description: 'Astro、React、Next.js —— 专为亚秒级加载速度、技术型 SEO 与清晰可扩展架构而构建。',
        },
        {
          title: '纯前端本地处理与 WebAssembly (WASM) 工具',
          description: '零服务器依赖的媒体、PDF 与数据处理工具，完全在浏览器内安全私密运行。',
        },
        {
          title: 'UI/UX 设计与高转化率落地页',
          description: '极简且符合无障碍标准的设计界面，助力桌面端与移动端访客高效转化。',
        },
      ],
      ctaHeading: '让我们一起打造令人惊艳的产品。',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: '直接发送邮件给我：kisharadilshan007@gmail.com',
      copyButton: '复制邮箱',
      copiedButton: '已复制！',
      copiedAnnouncement: '邮箱地址 kisharadilshan007@gmail.com 已复制到剪贴板。',
    },
    footer: {
      tagline: '快速、私密、纯本地的浏览器图片压缩工具。',
      privacyStatement: '零服务器上传 • 支持 PWA 离线安装',
      builtBy: '由 Kishara Dilshan 构建',
      supportLink: '请我喝杯咖啡',
      openSourceLink: 'GitHub 源码',
    },
  },

  ru: {
    nav: {
      brandName: 'CompressImg',
      home: 'Главная',
      howToUse: 'Инструкция',
      hireMe: 'Нанять меня',
      languageAriaLabel: 'Выбрать язык',
      themeToggleAriaLabel: 'Переключить светлую и тёмную тему',
      themeDarkLabel: 'Тёмная',
      themeLightLabel: 'Светлая',
      installApp: 'На главный экран',
      installAppAriaLabel: 'Добавить CompressImg на главный экран для работы офлайн',
      installedLabel: 'Готово офлайн',
      supportDeveloper: 'Поддержать автора',
      supportDeveloperAriaLabel: 'Поддержать разработчика на Gumroad',
      githubAriaLabel: 'Открыть исходный код на GitHub',
      menuAriaLabel: 'Открыть меню навигации',
      iosModalTitle: 'Добавить CompressImg на экран «Домой»',
      iosModalBody: 'Установите CompressImg на устройство, чтобы сжимать и сохранять изображения на 100 % офлайн.',
      iosModalStep1: 'Нажмите значок «Поделиться» в Safari (или меню браузера).',
      iosModalStep2: 'Прокрутите вниз и выберите «На экран “Домой”».',
      iosModalStep3: 'Нажмите «Добавить», чтобы запускать CompressImg без интернета.',
      browserModalBody: 'Откройте меню браузера и выберите «Установить приложение» или «Добавить на главный экран» для работы офлайн.',
      closeModal: 'Понятно',
    },
    seo: {
      homeTitle: 'Сжатие Изображений Онлайн - JPG, PNG и WebP Бесплатно',
      homeDescription: 'Сжимайте JPG, PNG и WebP до точного размера в КБ прямо в браузере. Бесплатное пакетное сжатие без загрузки на сервер и водяных знаков.',
      howToUseTitle: 'Как сжать фото до 50 КБ или 100 КБ онлайн - CompressImg',
      howToUseDescription: 'Узнайте, как сжать JPG, PNG и WebP до точного размера в КБ или пакетно уменьшить фото прямо в браузере без потери качества и без загрузок.',
      hireMeTitle: 'Нанять Kishara Dilshan - Веб-разработчик | CompressImg',
      hireMeDescription: 'Нужно сверхбыстрое приложение на Astro, React или Next.js или инструмент на WebAssembly? Наймите Kishara Dilshan для SEO-готовых IT-решений.',
      ogImageAlt: 'CompressImg — Приватный компрессор изображений в браузере',
    },
    home: {
      h1: 'Сжатие изображений — уменьшить JPG, PNG и WebP онлайн',
      subtitle: 'Сжимайте фото до точного размера в КБ или пакетно оптимизируйте JPG, PNG и WebP прямо в браузере. 100 % бесплатно, без загрузки на сервер и водяных знаков.',
      privacyNote: '100 % Приватно: обработка локально на вашем устройстве. Файлы не покидают браузер.',
      faqHeading: 'Частые вопросы',
      faqs: [
        {
          question: 'Как сжать изображение до 50 КБ или 100 КБ без потери качества?',
          answer: 'Переключитесь в режим «Целевой размер (КБ)», выберите 50 КБ или 100 КБ (или задайте свой лимит), и CompressImg локально подберёт максимальную чёткость под ваш размер. Для крупных фото формат WebP или JPG лучше сохраняет детали.',
        },
        {
          question: 'Загружаются ли мои фотографии на сервер при сжатии?',
          answer: 'Нет. Вся обработка происходит локально в браузере с помощью HTML5 Canvas и Web Workers. Документы и личные снимки никогда не попадают на сервер, а установленное приложение работает даже офлайн.',
        },
        {
          question: 'Какие форматы поддерживаются (JPG, PNG, WebP, GIF, SVG)?',
          answer: 'Поддерживаются JPG/JPEG, PNG, WebP, GIF и SVG. Вы можете сохранить исходный формат или конвертировать фото в JPG, PNG или WebP в один клик с сохранением прозрачности.',
        },
        {
          question: 'Можно ли сжимать несколько изображений сразу бесплатно и без лимитов?',
          answer: 'Да. Загрузите сразу пакет файлов, оцените качество ползунком «До / После» и скачайте снимки по одному или одним ZIP-архивом без регистрации и водяных знаков.',
        },
      ],
    },
    compressor: {
      dropTitle: 'Перетащите изображения сюда для локального сжатия',
      dropSubtitle: 'JPG, PNG, WebP, GIF и SVG • Без отправки на сервер • Точный размер в КБ',
      dropAriaLabel: 'Перетащите изображения сюда или нажмите Enter, чтобы выбрать файлы',
      selectImages: 'Выбрать файлы',
      addMoreImages: 'Добавить ещё',
      trySample: 'Тестовое фото',
      clearAll: 'Очистить всё',
      modeQuality: 'Режим качества',
      modeTargetKb: 'Целевой размер (КБ)',
      qualityLabel: 'Качество сжатия',
      outputFormatLabel: 'Формат вывода',
      formatOriginal: 'Исходный',
      targetSizeLabel: 'Точный целевой размер',
      customKbLabel: 'Свой размер (КБ)',
      customKbPlaceholder: 'напр. 75',
      applyCustomKb: 'Применить',
      kbUnit: 'КБ',
      beforeLabel: 'До (Оригинал)',
      afterLabel: 'После (Сжато)',
      sliderAriaLabel: 'Ползунок сравнения до и после сжатия',
      originalSizeLabel: 'Оригинал',
      compressedSizeLabel: 'Сжато',
      savedLabel: 'сжатие',
      smallerLabel: 'меньше',
      largerWarning: 'Файл уже хорошо сжат — попробуйте WebP/JPG или меньший лимит.',
      processingStatus: 'Локальное сжатие...',
      readyStatus: 'Готово',
      downloadBtn: 'Скачать',
      inspectBtn: 'Сравнить',
      removeBtn: 'Удалить файл',
      downloadAllZip: 'Скачать всё (ZIP)',
      creatingZip: 'Создание ZIP...',
      totalSummary: 'Итого по пакету',
      liveProcessedSingle: '{name} сжато с {before} до {after} (экономия {saved}%). Готово к скачиванию.',
      liveProcessedBatch: 'Сжато {count} файлов с {before} до {after} (экономия {saved}%). Можно скачать или сохранить в ZIP.',
      liveZipReady: 'ZIP-архив с {count} сжатыми изображениями готов и скачивается.',
      liveError: 'Не удалось обработать {name}. Попробуйте другой файл.',
      unsupportedFile: 'Пропущен неподдерживаемый файл: {name}. Выберите JPG, PNG, WebP, GIF или SVG.',
    },
    howToUse: {
      breadcrumbCurrent: 'Инструкция',
      h1: 'Как приватно сжать изображение до точного размера в КБ',
      intro: 'Будь то фото до 50 КБ для анкеты или пакетная оптимизация изображений для сайта — CompressImg решает задачу мгновенно прямо в браузере.',
      stepsHeading: 'Пошаговая инструкция',
      steps: [
        {
          title: '1. Перетащите файлы или нажмите «Выбрать файлы»',
          description: 'Добавьте один или несколько файлов JPG, PNG, WebP, GIF или SVG — ничего не загружается в сеть.',
        },
        {
          title: '2. Выберите режим качества или целевой размер (КБ)',
          description: 'Настройте ползунок качества или нажмите 20 КБ, 50 КБ, 100 КБ, 200 КБ либо введите нужное значение.',
        },
        {
          title: '3. Проверьте чёткость слайдером «До / После»',
          description: 'Выберите любой файл в списке и сравните детали перед сохранением.',
        },
        {
          title: '4. Скачайте по отдельности или одним ZIP-архивом',
          description: 'Сохраняйте снимки по одному или все сразу в ZIP. После добавления PWA работает даже офлайн.',
        },
      ],
      tipsHeading: 'Советы по выбору формата',
      tips: [
        {
          title: 'Лучше всего для сайтов: WebP',
          body: 'Перевод тяжёлых JPG и PNG в WebP сокращает размер на 25–50 % при той же чёткости и с прозрачностью.',
        },
        {
          title: 'Для анкет и гос. порталов: JPG до 50 КБ или 100 КБ',
          body: 'Многие формы требуют строгий JPG. Включите режим «Целевой размер (КБ)» и формат JPG.',
        },
        {
          title: 'Для логотипов и скриншотов: PNG или SVG',
          body: 'SVG сжимается с сохранением векторной чёткости, а PNG бережёт текст и прозрачный фон.',
        },
      ],
      ctaButton: 'Открыть компрессор изображений',
    },
    hireMe: {
      breadcrumbCurrent: 'Нанять меня',
      badge: 'Доступен для фриланс-проектов',
      heading: 'Нужно индивидуальное IT-решение?',
      intro: 'Привет! Я Кишара Дилшан (Kishara Dilshan), разработчик CompressImg.',
      subcopy: 'Если вам понравился этот быстрый клиентский инструмент и вашему бизнесу нужно первоклассное IT-решение, я открыт для фриланс-проектов. Моя специализация:',
      specialties: [
        {
          title: 'Сверхбыстрые, SEO-оптимизированные веб-приложения',
          description: 'Astro, React, Next.js — загрузка менее чем за секунду, техническое SEO и чистая масштабируемость.',
        },
        {
          title: 'Клиентская обработка и инструменты на WebAssembly (WASM)',
          description: 'Инструменты для медиа, PDF и данных без серверов, работающие приватно в браузере.',
        },
        {
          title: 'UI/UX-дизайн и высококонверсионные лендинги',
          description: 'Минималистичные, доступные интерфейсы с высокой конверсией на десктопе и мобильных устройствах.',
        },
      ],
      ctaHeading: 'Давайте создадим что-нибудь потрясающее вместе.',
      email: 'kisharadilshan007@gmail.com',
      emailLabel: 'Напишите мне напрямую: kisharadilshan007@gmail.com',
      copyButton: 'Копировать Email',
      copiedButton: 'Скопировано!',
      copiedAnnouncement: 'Адрес kisharadilshan007@gmail.com скопирован в буфер обмена.',
    },
    footer: {
      tagline: 'Быстрое и приватное сжатие изображений в браузере.',
      privacyStatement: 'Ноль загрузок на сервер • Работает офлайн как PWA',
      builtBy: 'Создал Kishara Dilshan',
      supportLink: 'Угостить кофе',
      openSourceLink: 'Исходники на GitHub',
    },
  },
};

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const TranslateText = ({
  children,
  hindiText,
  className = '',
  translationKey,
  dynamic = true,
  ...rest
}) => {
  const { language, getTranslation } = useLanguage();
  const textRef = useRef(null);

  useEffect(() => {
    if (!translationKey && !hindiText && dynamic && textRef.current) {
      textRef.current.setAttribute('data-translate', 'true');
    }
  }, [translationKey, hindiText, dynamic]);

  // 🟢 1️⃣ Handle multilingual objects like { en: "...", hi: "..." }
  if (children && typeof children === 'object' && (children.en || children.hi)) {
    return (
      <span className={className} {...rest}>
        {children[language] || children.en || ''}
      </span>
    );
  }

  // 🟢 2️⃣ Use translation key if provided
  if (translationKey) {
    return (
      <span className={className} {...rest}>
        {getTranslation(translationKey)}
      </span>
    );
  }

  // 🟢 3️⃣ Use Hindi text if language is Hindi
  if (hindiText && language === 'hi') {
    return (
      <span className={className} {...rest}>
        {hindiText}
      </span>
    );
  }

  // 🟢 4️⃣ Default fallback
  return (
    <span ref={textRef} className={className} {...rest}>
      {children}
    </span>
  );
};

export default TranslateText;

import { useState, useEffect, useRef, useCallback } from 'react';
import { STARTER_CODE } from '../constants/editor';

const STORAGE_KEY_PREFIX = 'ca:code';
const DEBOUNCE_MS = 600;

/**
 * Builds a deterministic localStorage key per problem + language.
 * e.g. "ca:code:two-sum:python3"
 */
const buildKey = (problemId: string, language: string): string =>
  `${STORAGE_KEY_PREFIX}:${problemId}:${language}`;

/**
 * usePersistedCode
 *
 * Manages code editor content with localStorage persistence.
 * - On mount: restores saved code for the current problem + language.
 * - On change: debounces writes to localStorage (avoids thrashing on every keystroke).
 * - On language switch: saves current code, then restores (or falls back to starter) for new lang.
 *
 * @param problemId  Unique problem identifier (e.g. "two-sum")
 * @param language   Currently selected language key (e.g. "python3")
 */
export const usePersistedCode = (problemId: string, language: string) => {
  const getInitialCode = (lang: string): string => {
    const saved = localStorage.getItem(buildKey(problemId, lang));
    return saved ?? (STARTER_CODE[lang] || STARTER_CODE['python3']);
  };

  const [code, setCode] = useState<string>(() => getInitialCode(language));

  // Keep a ref so the debounced flush always has the latest code value
  const codeRef = useRef<string>(code);
  codeRef.current = code;

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist code to localStorage with debounce
  const persist = useCallback(
    (value: string) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        localStorage.setItem(buildKey(problemId, language), value);
      }, DEBOUNCE_MS);
    },
    [problemId, language],
  );

  // When language changes: flush current code immediately, then load saved/starter for new lang
  const prevLanguage = useRef<string>(language);
  useEffect(() => {
    if (prevLanguage.current === language) return;

    // Flush unsaved code for the previous language right away
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    localStorage.setItem(buildKey(problemId, prevLanguage.current), codeRef.current);

    // Restore code for the new language
    setCode(getInitialCode(language));
    prevLanguage.current = language;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, problemId]);

  // Flush on unmount (e.g. user navigates away)
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      localStorage.setItem(buildKey(problemId, language), codeRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setCode(value);
      persist(value);
    },
    [persist],
  );

  const resetToStarter = useCallback(() => {
    const starter = STARTER_CODE[language] ?? STARTER_CODE['python3'];
    setCode(starter);
    localStorage.removeItem(buildKey(problemId, language));
  }, [problemId, language]);

  return { code, onChange: handleChange, resetToStarter };
};

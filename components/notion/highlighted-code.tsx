import { highlight, languages } from "prismjs";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-json";
import "prismjs/components/prism-reason";
import "prismjs/components/prism-typescript";
import "../../app/prism.css";

export function HighlightedCode({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const prismLanguage = languages[language];
  return (
    <pre className="p-3 bg-neutral-800 text-neutral-200 rounded overflow-auto leading-normal">
      {prismLanguage !== undefined ? (
        <code
          dangerouslySetInnerHTML={{
            __html: highlight(code, prismLanguage, language),
          }}
        />
      ) : (
        <code>{code}</code>
      )}
    </pre>
  );
}

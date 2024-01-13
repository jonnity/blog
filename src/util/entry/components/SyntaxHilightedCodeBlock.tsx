import { CSSProperties } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const SyntaxHighlightedCodeBlock: React.FC<{
  code: string;
  language: string;
  filename?: string;
}> = ({ code, language, filename }) => {
  return (
    <>
      {filename && (
        <div
          className="text-monokai-filename-text bg-monokai-filename-bg m-0 rounded-t px-4 font-bold"
          // global.cssより優先するため、styleで指定
          style={{ marginBottom: 0 }}
        >
          <span>{filename}</span>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        showLineNumbers
        style={monokai}
        customStyle={
          !filename ? {} : { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
        }
      >
        {code}
      </SyntaxHighlighter>
    </>
  );
};

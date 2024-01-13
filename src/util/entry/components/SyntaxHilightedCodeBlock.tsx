import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const SyntaxHighlightedCodeBlock: React.FC<{
  code: string;
  language: string;
  filename?: string;
}> = ({ code, language }) => {
  return (
    <>
      <SyntaxHighlighter language={language} showLineNumbers style={monokai}>
        {code}
      </SyntaxHighlighter>
      ;
    </>
  );
};

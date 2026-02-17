"use client";

/**
 * Renders markdown with Codex-style typography.
 * Supports: headings, blockquotes, code blocks (with copy), lists, links, math (KaTeX).
 */

import React, { useCallback, lazy, Suspense } from "react";
import { slugify } from "@/lib/slugify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

// Lazy-load the heavy syntax highlighter (~280KB) — only loaded when a code block exists
const SyntaxHighlighter = lazy(() =>
  import("react-syntax-highlighter").then((mod) => ({ default: mod.Prism }))
);
const prismStylePromise = import("react-syntax-highlighter/dist/cjs/styles/prism").then(
  (mod) => mod.prism
);

function CodeBlock({ language, code, onCopy }: { language: string; code: string; onCopy: (s: string) => void }) {
  const [style, setStyle] = React.useState<Record<string, React.CSSProperties> | null>(null);

  React.useEffect(() => {
    prismStylePromise.then(setStyle);
  }, []);

  return (
    <div className="blog-code-block">
      <div className="blog-code-header">
        <span className="blog-code-lang">{language}</span>
        <button
          type="button"
          onClick={() => onCopy(code)}
          className="blog-code-copy"
        >
          Copy
        </button>
      </div>
      <Suspense fallback={<pre style={{ margin: 0, padding: "1rem", fontSize: "0.875rem" }}><code>{code}</code></pre>}>
        {style && (
          <SyntaxHighlighter
            style={style}
            language={language}
            PreTag="div"
            customStyle={{ margin: 0, borderRadius: "0 0 6px 6px" }}
            codeTagProps={{ className: "blog-syntax" }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </Suspense>
    </div>
  );
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const handleCopy = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
  }, []);

  return (
    <article
      className={`blog-prose ${className}`}
      data-blog-content
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="blog-h1">{children}</h1>
          ),
          h2: ({ children }) => {
            const text = typeof children === "string" ? children : String(children);
            const id = slugify(text);
            return <h2 id={id} className="blog-h2">{children}</h2>;
          },
          h3: ({ children }) => {
            const text = typeof children === "string" ? children : String(children);
            const id = slugify(text);
            return <h3 id={id} className="blog-h3">{children}</h3>;
          },
          p: ({ children }) => (
            <p className="blog-p">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="blog-ul">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="blog-ol">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="blog-li">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="blog-blockquote">{children}</blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="blog-link"
            >
              {children}
            </a>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");

            if (match) {
              return (
                <CodeBlock
                  language={match[1]}
                  code={codeString}
                  onCopy={handleCopy}
                />
              );
            }

            return (
              <code className="blog-inline-code" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

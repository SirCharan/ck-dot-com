"use client";

/**
 * Renders markdown with Codex-style typography.
 * Supports: headings, blockquotes, code blocks (with copy), lists, links, math (KaTeX).
 */

import React, { useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "katex/dist/katex.min.css";

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
          h2: ({ children }) => (
            <h2 className="blog-h2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="blog-h3">{children}</h3>
          ),
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
                <div className="blog-code-block">
                  <div className="blog-code-header">
                    <span className="blog-code-lang">{match[1]}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(codeString)}
                      className="blog-code-copy"
                    >
                      Copy
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={prism}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ margin: 0, borderRadius: "0 0 6px 6px" }}
                    codeTagProps={{ className: "blog-syntax" }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
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

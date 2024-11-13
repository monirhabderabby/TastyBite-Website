/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const RichTextViewer = ({ content, type }: { content: string |undefined; type: 'card' | 'details' }) => {
    const cleanHTMLContent = (html: string) => {
        // Remove empty <p> tags, <p> with only whitespace, or styles without content
        return html.replace(/<p[^>]*>(\s|&nbsp;)*<\/p>/g, "").trim();
      };
    
      // Function to get the first 100 words, with clean HTML
      const getFirst100Words = (html: string) => {
        const cleanContent = cleanHTMLContent(html);
        const words = cleanContent.split(" ");
        return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : cleanContent;
      };
  // Choose content based on the type
  const displayContent = type === 'card' ? getFirst100Words(content!) : content;

  // Initialize the editor with the chosen content
  const editor = useEditor({
    extensions: [StarterKit],
    content: displayContent,
    editable: false,
  });

  return (
    <div className="prose">
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextViewer;

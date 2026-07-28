"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { cn } from "@/lib/utils";

/**
 * A no-code rich-text editor with a full toolbar (headings, styles, lists,
 * alignment, links, images) plus a raw-HTML source mode for power users.
 *
 * The HTML it produces is written to a hidden input (`name`) so it submits
 * with the surrounding <form> to a Server Action.
 */
export function RichTextEditor({
  name,
  defaultValue = "",
  placeholder = "Start writing…",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [html, setHtml] = useState(defaultValue);
  const [mode, setMode] = useState<"rich" | "html">("rich");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class: "prose-content px-4 py-3 min-h-[320px] focus:outline-none",
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  // Switch to raw-HTML mode: mirror the current editor HTML into the textarea.
  const openHtml = () => {
    if (editor) setHtml(editor.getHTML());
    setMode("html");
  };
  // Switch back to the rich editor: push the (possibly hand-edited) HTML in.
  const openRich = () => {
    if (editor) editor.commands.setContent(html || "<p></p>", { emitUpdate: false });
    setMode("rich");
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <Toolbar editor={editor} mode={mode} onOpenHtml={openHtml} onOpenRich={openRich} />
      {mode === "rich" ? (
        <EditorContent editor={editor} />
      ) : (
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          spellCheck={false}
          className="block min-h-[320px] w-full resize-y bg-background px-4 py-3 font-mono text-[13px] leading-relaxed text-foreground focus:outline-none"
          placeholder="<p>Write or paste raw HTML…</p>"
        />
      )}
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

function Toolbar({
  editor,
  mode,
  onOpenHtml,
  onOpenRich,
}: {
  editor: Editor | null;
  mode: "rich" | "html";
  onOpenHtml: () => void;
  onOpenRich: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return <div className="h-11 border-b bg-muted" aria-hidden />;
  }

  // HTML source mode: only expose the toggle back to the visual editor.
  if (mode === "html") {
    return (
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted px-2 py-1.5">
        <span className="px-2 text-xs font-medium text-muted-foreground">HTML source</span>
        <div className="ml-auto">
          <Btn active onClick={onOpenRich} label="◀ Visual editor" />
        </div>
      </div>
    );
  }

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const imageByUrl = () => {
    const url = window.prompt("Image URL", "https://");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      editor.chain().focus().setImage({ src }).run();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b bg-muted px-2 py-1.5">
      {/* Headings */}
      <Btn active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()} label="¶" />
      <Btn active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} label="H1" />
      <Btn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} label="H2" />
      <Btn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} label="H3" />
      <Divider />

      {/* Inline styles */}
      <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} label="B" className="font-bold" />
      <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} label="I" className="italic" />
      <Btn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} label="U" className="underline" />
      <Btn active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} label="S" className="line-through" />
      <Btn active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} label="</>" className="font-mono" />
      <Divider />

      {/* Alignment */}
      <Btn active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} label="⯇" />
      <Btn active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} label="≡" />
      <Btn active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} label="⯈" />
      <Divider />

      {/* Blocks */}
      <Btn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} label="• List" />
      <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} label="1. List" />
      <Btn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} label="❝" />
      <Btn active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} label="{ }" className="font-mono" />
      <Btn active={false} onClick={() => editor.chain().focus().setHorizontalRule().run()} label="―" />
      <Divider />

      {/* Link + media */}
      <Btn active={editor.isActive("link")} onClick={setLink} label="Link" />
      <Btn active={false} onClick={() => fileRef.current?.click()} label="Upload" />
      <Btn active={false} onClick={imageByUrl} label="Image URL" />
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickFile} />
      <Divider />

      {/* History + source */}
      <Btn active={false} disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} label="↶" />
      <Btn active={false} disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} label="↷" />
      <Btn active={false} onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} label="Clear" />

      <div className="ml-auto">
        <Btn active={false} onClick={onOpenHtml} label="</> HTML" className="font-mono" />
      </div>
    </div>
  );
}

function Btn({
  onClick,
  active,
  label,
  className,
  disabled,
}: {
  onClick: () => void;
  active: boolean;
  label: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "min-w-8 rounded px-2 py-1 text-sm transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40",
        active ? "bg-eb-navy text-white hover:bg-eb-navy" : "text-foreground",
        className,
      )}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-border" aria-hidden />;
}

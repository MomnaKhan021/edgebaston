import { Node, mergeAttributes } from "@tiptap/core";

/**
 * A minimal block-level <video> node so uploaded videos survive editing and
 * round-trip through the editor's HTML (StarterKit would otherwise strip an
 * unknown tag). Rendered as a native controls player on the live site.
 */
export const Video = Node.create({
  name: "video",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "video" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      mergeAttributes(HTMLAttributes, {
        controls: "controls",
        playsinline: "true",
        preload: "metadata",
        class: "eb-video",
      }),
    ];
  },
});

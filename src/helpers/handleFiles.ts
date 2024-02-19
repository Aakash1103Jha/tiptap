import { Editor } from "@tiptap/react";

export async function handleFileDrop(editor: Editor | null, files: File[], pos: number) {
  if (!editor) return;
  files.forEach((file) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      editor
        .chain()
        .insertContentAt(pos, {
          type: "image",
          attrs: {
            src: fr.result as string,
          },
        })
        .focus()
        .run();
    };
  });
}
export async function handleFilePaste(editor: Editor | null, files: File[], content?: string) {
  console.log(files);
}
export async function handleImageSelection(editor: Editor | null, inputId: string) {
  if (!editor) return;
  const input = document.getElementById(inputId) as HTMLInputElement;
  if (input) {
    input.click();
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        // handleFileDrop(editor, Array.from(files), editor.state.selection.from);
        // upload to S3
        console.log();
        editor.commands.insertContentAt(editor.state.selection.from, {
          type: "image",
          attrs: {
            src: "https://images.unsplash.com/photo-1682685796852-aa311b46f50d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "alt text",
          },
        });
      }
    };
  }
}

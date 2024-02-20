import { memo, createContext, useContext, useState, ComponentPropsWithRef, useCallback } from "react";

type UploadContextType = {
  uploaderList: Uploader[];
  addUploader: (uploader: Uploader) => void;
  removeUploader: (uploaderId: string) => void;
};

const UploadContext = createContext<UploadContextType>({
  uploaderList: [],
  addUploader: () => {},
  removeUploader: () => {},
});

export const useUploadContext = () => useContext(UploadContext);

export default memo(function UploadProvider({ children }: ComponentPropsWithRef<"main">) {
  const [uploaderList, setUploaderList] = useState<Uploader[]>([]);

  console.log(uploaderList);

  const addUploader = useCallback((uploader: Uploader) => {
    setUploaderList((prev) => {
      if (!prev.some((u) => u.id === uploader.id)) {
        return [...prev, uploader];
      }
      return prev;
    });
  }, []);

  const removeUploader = useCallback((uploaderId: string) => {
    setUploaderList((prev) => prev.filter((u) => u.id !== uploaderId));
  }, []);

  return (
    <UploadContext.Provider value={{ uploaderList, addUploader, removeUploader }}>
      {children}
      <section className="uploader-list">
        {uploaderList.map((uploader) => (
          <UploadFileList key={uploader.id} u={uploader} />
        ))}
      </section>
    </UploadContext.Provider>
  );
});

function UploadFileList({ u }: { u: Uploader }) {
  return (
    <div className="uploader-list-item">
      <h4>{u.id}</h4>
      <ul>
        {u.files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export class Uploader {
  id: string;
  files: Partial<File>[] = [{ name: "file1" }, { name: "file2" }, { name: "file3" }];

  constructor() {
    this.id = Math.random().toString(36).substring(2, 30);
    console.log(`Uploader created with id: ${this.id}`);
  }
  onDragOver(e: DragEvent) {
    e.preventDefault();
  }
  onDrop(e: DragEvent) {
    e.preventDefault();
    console.log(e);
  }
  onDragLeave(e: DragEvent) {
    e.preventDefault();
  }
  onDragEnter(e: DragEvent) {
    e.preventDefault();
  }
}

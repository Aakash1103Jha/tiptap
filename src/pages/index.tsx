import { Uploader, useUploadContext } from "@/context/UploadContext";
import Link from "next/link";
import { useEffect } from "react";

const uploader = new Uploader();

export default function Home() {
  const { addUploader } = useUploadContext();
  useEffect(() => {
    addUploader(uploader);
  }, [addUploader]);

  return (
    <main>
      <h3>home</h3>
      <Link href="/about">about</Link>
    </main>
  );
}

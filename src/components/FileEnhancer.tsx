import { useState } from "react";

export default function FileEnhancer() {
  const [file, setFile] = useState<File | null>(null);
  const [downUrl, setDownUrl] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setWorking(true);
    setError(null);
    setDownUrl(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/enhance", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Server: ${res.status}`);
      const data = await res.json();
      setDownUrl(data.downloadUrl);
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={!file || working}>
        {working ? "Enhancing..." : "Enhance"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {downUrl && (
        <a href={downUrl} download>
          Download Enhanced File
        </a>
      )}
    </div>
  );
}

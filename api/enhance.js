const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

// NOTE: /tmp is the only writable folder on Vercel functions
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const form = formidable({ multiples: false, uploadDir: "/tmp", keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) throw err;

      // handle both formidable v2 and v3 shapes
      const f = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!f) throw new Error("No file received");

      const src = f.filepath || f.path;                 // v3 uses filepath, v2 uses path
      const original = f.originalFilename || "file.bin";
      const outName = `${Date.now()}_${original}`;
      const outPath = path.join("/tmp", outName);

      // TODO: replace this copy with your actual enhancement (ffmpeg/AI/etc)
      fs.copyFileSync(src, outPath);

      res.status(200).json({ downloadUrl: `/api/download?file=${encodeURIComponent(outName)}` });
    } catch (e) {
      res.status(500).json({ error: e.message || "Processing failed" });
    }
  });
};

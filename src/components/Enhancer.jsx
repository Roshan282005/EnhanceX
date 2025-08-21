import React, { useState } from "react";
import DownloadButton from "./DownloadButton";

const Enhancer = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [enhancedVideoUrl, setEnhancedVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleEnhance = async () => {
    if (!videoFile) {
      alert("Please select a video first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("video", videoFile);

      // ✅ Replace with your backend API endpoint
      const response = await fetch("https://your-backend.com/enhance", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Enhancement failed");

      const data = await response.json();
      setEnhancedVideoUrl(data.enhancedUrl); // ✅ backend should return the enhanced video URL
    } catch (error) {
      console.error(error);
      alert("❌ Video enhancement failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold">🎥 Video Enhancer</h1>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="block w-full text-gray-300"
      />

      <button
        onClick={handleEnhance}
        disabled={loading}
        className="px-4 py-2 bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 transition"
      >
        {loading ? "Enhancing..." : "✨ Enhance Video"}
      </button>

      {enhancedVideoUrl && (
        <div className="space-y-3">
          <video src={enhancedVideoUrl} controls className="w-full rounded-lg" />
          <DownloadButton
            fileUrl={enhancedVideoUrl}
            fileName="my-enhanced-video.mp4"
          />
        </div>
      )}
    </div>
  );
};

export default Enhancer;

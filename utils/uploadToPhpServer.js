const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const uploadToPhpServer = async (filePath) => {
  const form = new FormData();

  form.append("image", fs.createReadStream(filePath));
  form.append("api_key", "SECRET123"); // 🔥 VERY IMPORTANT

  try {
    const res = await axios.post(
      "https://24carret.in/upload.php",
      form,
      {
        headers: form.getHeaders(),
        timeout: 15000,
      }
    );

    // 🔍 DEBUG
    console.log("PHP upload response:", res.data);

    if (!res.data || !res.data.url) {
      throw new Error("Image upload failed");
    }

    return res.data.url;
  } catch (err) {
    console.error("PHP upload error:", err.response?.data || err.message);
    throw new Error("Image upload failed");
  }
};

module.exports = uploadToPhpServer;

const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { file } = req.query;
  if (!file) {
    res.status(400).send("Missing file");
    return;
  }
  const p = path.join("/tmp", file);
  if (!fs.existsSync(p)) {
    res.status(404).send("File not found");
    return;
  }
  res.setHeader("Content-Disposition", `attachment; filename="${file}"`);
  fs.createReadStream(p).pipe(res);
};

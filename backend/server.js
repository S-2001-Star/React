const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/api/upload', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  // Simulate summarization process
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const summary = fileContent.substring(0, 100); // Mock summary logic
  fs.unlinkSync(filePath); // Remove file after reading
  res.json({ summary });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

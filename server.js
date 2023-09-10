const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/tech-news/browser')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/tech-news/browser', 'index.html'));
});

const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


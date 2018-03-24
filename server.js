const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });
}

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log('port', PORT);
});
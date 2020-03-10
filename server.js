const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/bundle', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Link': '<https://marc-service.herokuapp.com/bundle.js>; rel="fragment-script"'
    });
    res.end('');
});
app.listen(process.env.PORT || 8080, () => {
  console.log(`Service Server started at ${process.env.PORT}`);
})
const api = require('./api');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const cors=require('cors')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8') //?是否改vue
  res.send(html)
})
app.listen(8011);
console.log('the listen successes');
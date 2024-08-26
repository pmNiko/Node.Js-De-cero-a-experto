const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'Readme.md'), 'utf8');

const newData = data.replace(/React/ig, 'Angular')

fs.writeFileSync('Readme-Angular.md', newData)


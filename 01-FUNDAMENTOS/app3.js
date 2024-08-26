const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'Readme.md'), 'utf8');

const pattern = /React/ig

const matches = data.match(pattern)

console.log('Coincidencias "React": ', matches.length)


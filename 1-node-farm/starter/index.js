const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');

// const hello = 'Hello world';
// console.log(hello);

// Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

/*
// Non-blocking, Asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('ERROR! 🇻🇳');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);

        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Your file has been written! 🥰');
            });
        })


    });
});
console.log('Will read file!');
*/

// fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
//     const products = JSON.parse(data);
//     res.writeHead(200, {'Content-type': 'application/json'});
//     res.end(data);
// });

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const products = JSON.parse(data);

const slugs = products.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// SERVER
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Page Overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    let cardsHtml = products
      .map((el) => replaceTemplate(tempCard, el))
      .join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = products[query.id];

    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(products);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

const PORT = 8000;
const HOST = 'localhost';
server.listen(PORT, HOST, () => {
  console.log(`Listening to request on port ${PORT}`);
});

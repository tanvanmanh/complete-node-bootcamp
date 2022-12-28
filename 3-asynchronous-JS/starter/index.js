const fs = require('fs');
const superagent = require('superagent');

const FILE_NAME = `${__dirname}/dog.txt`;
const OUTPUT_FILE = `${__dirname}/dog-image.txt`;

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😆');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😂');
      resolve('success');
    });
  });
};

// Async/Await
const getDogPic = async () => {
  try {
    const data = await readFilePro(FILE_NAME);
    console.log(`Breed: ${data}`);

    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breeds/image/random`
    );
    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breeds/image/random`
    );
    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breeds/image/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro(OUTPUT_FILE, imgs.join('\n'));
    console.log('Random dog image saved to file');
  } catch (error) {
    throw error;
  }
  return '2: READY 🐶';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    console.log(await getDogPic());
    console.log('3: Done getting dog pics!');
  } catch (error) {
    console.log(error);
  }
})();

// console.log('1: Will get dog pics!');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3: Done getting dog pics!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Promise
// readFilePro(FILE_NAME)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breeds/image/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePro(OUTPUT_FILE, res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Callback
// fs.readFile(FILE_NAME, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breeds/image/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-image.txt', res.body.message, (err) => {
//         console.log('Random dog image saved to file');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

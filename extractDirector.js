const fs = require('fs')
const movielist = JSON.parse(fs.readFileSync('data.json').toString())
const directors = [];
const directorExists = (arrOfDirectors, directorName) => {
  for (let i = 0; i < arrOfDirectors.length; i += 1) {
    if (directorName === arrOfDirectors[i].Name) {
      return true;
    }
  }
  return false;
};

let id = 1;
movielist.forEach((movie) => {
  if (!directorExists(directors, movie.Director)) {
    directors.push({ Id: id, Name: movie.Director });
    id += 1;
  }
});

fs.writeFile('direct.json', JSON.stringify(directors), () => {
  console.log("directors are extracted")
});
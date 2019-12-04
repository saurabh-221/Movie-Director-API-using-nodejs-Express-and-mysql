const fs = require('fs')
const movielist1 = JSON.parse(fs.readFileSync('data.json').toString())
const director1 = JSON.parse(fs.readFileSync('direct.json').toString())
const movies = []

const findDirectorIdByName = (directorName) => {
  for (let i = 0; i < director1.length; i += 1) {
    if (director1[i].Name === directorName) {
      return director1[i].Id;
    }
  }
  return -1;
};

movielist1.forEach((movie) => {
  const directorId = findDirectorIdByName(movie.Director);
  movies.push({
    Rank: movie.Rank,
    Title: movie.Title,
    Description: movie.Description,
    Runtime: movie.Runtime,
    Genre: movie.Genre,
    Rating: movie.Rating,
    Metascore: movie.Metascore,
    Votes: movie.Votes,
    Gross_Earning_in_Mil: movie.Gross_Earning_in_Mil,
    Director_Id: directorId,
    Actor: movie.Actor,
    Year: movie.Year,
  });
});
fs.writeFile('movie1.json', JSON.stringify(movies), () => {
  console.log("movies are extracted")
})
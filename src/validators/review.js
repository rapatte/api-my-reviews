const { isNil } = require("lodash");

const titleValidation = (title) => {
  if (isNil(title) || title === "") return "Le titre doit être renseigné";
  if (typeof title !== "string")
    return "Le titre doit être une chaîne de caractères";
  if (title.length < 3 || title.length > 50)
    return "Le titre doit contenir entre 3 et 50 caractères";
  return null;
};

const resumeValidation = (resume) => {
  if (isNil(resume) || resume === "") return "Le synopsis doit être renseigné";
  if (typeof resume !== "string")
    return "Le synopsis doit être une chaîne de caractères";
  if (resume.length < 100 || resume.length > 500)
    return "Le synopsis doit contenir entre 100 et 500 caractères";
  return null;
};

const scoreValidation = (score) => {
  if (isNil(score) || score === "") return "La note doit être renseignée";
  if (typeof score !== "number") return "La note doit être un nombre";
  if (score > 20 || score < 0)
    return "La note doit être comprise entre 0 et 20";
  return null;
};

const trailerValidation = (trailer) => {
  if (isNil(trailer) || trailer === "")
    return "L'url du trailer doit être renseigné";
  if (typeof trailer !== "string")
    return "L'url du trailer doit être une chaîne de caractère";
  return null;
};

const posterValidation = (poster) => {
  if (isNil(poster) || poster === "")
    return "L'url de l'affiche doit être renseigné";
  if (typeof poster !== "string")
    return "L'url de l'affiche doit être une chaîne de caractère";
  return null;
};

const categoryValidation = (category) => {
  if (isNil(category) || category === "")
    return "La catégorie doit être renseignée";
  if (typeof category !== "string")
    return "La catégorie doit être une chaîne de caractère";
  if (category.length < 3 || category.length > 26)
    return "La catégorie doit faire entre 3 et 26 caractères";
  return null;
};

const genresValidation = (genres) => {
  if (isNil(genres) || genres.length === 0) {
    return "Les genres doivent être renseignés";
  }
  for (let index = 0; index < genres.length; index += 1) {
    const musicalGenre = genres[index];
    if (typeof musicalGenre !== "string") {
      return "Le genre doit être une chaîne de caractères";
    }
    if (musicalGenre.length < 3 || musicalGenre.length > 50) {
      return `Le genre doit contenir entre 3 et 50 caractères`;
    }
  }
  return null;
};
// const musicalGenresValidation = (musicalGenres) => {
//   if (isNil(musicalGenres) || musicalGenres.length === 0) {
//     return "Les genres de musique doivent être renseignés";
//   }
//   for (let index = 0; index < musicalGenres.length; index += 1) {
//     const musicalGenre = musicalGenres[index];
//     if (typeof musicalGenre !== "string") {
//       return "Le genre de musique doit être une chaîne de caractères";
//     }
//     if (musicalGenre.length < 3 || musicalGenre.length > 50) {
//       return `Le genre de musique doit contenir entre 3 et 50 caractères`;
//     }
//   }
//   return null;
// };

// const socialNetworkValidation = (socialNetworkData, socialNetworkName) => {
//   if (isNil(socialNetworkData) || socialNetworkData === "") {
//     return `Le nom d'utilisateur du compte ${socialNetworkName} doit être renseignée`;
//   }
//   if (typeof socialNetworkData !== "string") {
//     return `L'url de la photo de profil doit être une chaîne de caractères`;
//   }
//   if (socialNetworkData.length < 10 || socialNetworkData.length > 2083) {
//     return `L'url de la photo de profil doit contenir entre 10 et 255 caractères`;
//   }
//   return null;
// };

module.exports = (data) => {
  /* eslint-disable camelcase */
  const { title, resume, score, trailer, poster, category, genre } = data;
  /* eslint-enable camelcase */
  const errors = [];

  const titleError = titleValidation(title);
  if (titleError) errors.push({ field: "title", message: titleError });

  const resumeError = resumeValidation(resume);
  if (resumeError) errors.push({ field: "resume", message: resumeError });

  if (score) {
    const scoreError = scoreValidation(score);
    if (scoreError) errors.push({ field: "score", message: scoreError });
  }

  if (trailer) {
    const trailerError = trailerValidation(trailer);
    if (trailerError) errors.push({ field: "trailer", message: trailerError });
  }

  if (poster) {
    const posterError = posterValidation(poster);
    if (posterError) errors.push({ field: "poster", message: posterError });
  }

  if (category) {
    const categoryError = categoryValidation(category);
    if (categoryError)
      errors.push({ field: "category", message: categoryError });
  }

  if (genre) {
    const genreError = genresValidation(genre);
    if (genreError) errors.push({ field: "genre", message: genreError });
  }

  return errors.length > 0 ? errors : null;
};

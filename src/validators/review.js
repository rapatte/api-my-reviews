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

const trailerValidation = (trailer) => {
  if (isNil(trailer) || trailer === "")
    return "L'url du trailer doit être renseigné";
  if (typeof trailer !== "string")
    return "L'url du trailer doit être une chaîne de caractère";
  return null;
};

const scoreValidation = (score) => {
  if (isNil(score) || score === "") return "La note doit être renseignée";
  if (Number.isNaN(score)) return "La note doit être un nombre";
  if (score > 20 || score < 0)
    return "La note doit être comprise entre 0 et 20";
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

const genresValidation = (genre) => {
  if (
    genre === null ||
    genre === [{ name: "" }] ||
    genre === [""] ||
    genre === []
  ) {
    return "Le genre doit être renseigné";
  }

  return null;
};

module.exports = (data) => {
  const { title, resume, score, trailer, poster, category, genre } = data;
  const errors = [];

  const titleError = titleValidation(title);
  if (titleError) errors.push({ field: "title", message: titleError });

  const resumeError = resumeValidation(resume);
  if (resumeError) errors.push({ field: "resume", message: resumeError });

  const trailerError = trailerValidation(trailer);
  if (trailerError) errors.push({ field: "trailer", message: trailerError });

  const scoreError = scoreValidation(score);
  if (scoreError) errors.push({ field: "score", message: scoreError });

  const posterError = posterValidation(poster);
  if (posterError) errors.push({ field: "poster", message: posterError });

  const categoryError = categoryValidation(category);
  if (categoryError) errors.push({ field: "category", message: categoryError });

  const genreError = genresValidation(genre);
  if (genreError) errors.push({ field: "genre", message: genreError });

  return errors.length > 0 ? errors : null;
};

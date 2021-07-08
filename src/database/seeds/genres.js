const now = new Date();
const uuid = require("uuid").v4;

module.exports = [
  { id: uuid(), name: "Action", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Aventure", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Super-héros", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Thriller", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Fantasy", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Science-fiction", createdAt: now, updatedAt: now },
  { id: uuid(), name: "Roman", createdAt: now, updatedAt: now },
];

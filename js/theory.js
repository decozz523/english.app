import { TENSES } from "../data/examples.js";

const grid = document.getElementById("theoryGrid");

TENSES.forEach((tense) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3>${tense.name}</h3>
    <ul class="theory-list">
      <li><strong>Когда:</strong> ${tense.theory.use}</li>
      <li><strong>Маркеры:</strong> ${tense.theory.markers}</li>
      <li><strong>Формула:</strong> ${tense.theory.formula}</li>
    </ul>
  `;
  grid.appendChild(card);
});

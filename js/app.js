import { TENSES } from "../data/examples.js";

const STORAGE_KEY = "english_tenses_trainer_state_v1";

const tenseSelect = document.getElementById("tenseSelect");
const modeSelect = document.getElementById("modeSelect");
const checkModeSelect = document.getElementById("checkModeSelect");
const loadBtn = document.getElementById("loadBtn");
const theoryList = document.getElementById("theoryList");
const intro = document.getElementById("practiceIntro");
const progressBar = document.getElementById("progressBar");
const practiceContainer = document.getElementById("practiceContainer");
const successPct = document.getElementById("successPct");
const failurePct = document.getElementById("failurePct");
const attemptsEl = document.getElementById("attempts");
const remainingEl = document.getElementById("remaining");

const state = {
  attempts: 0,
  success: 0,
  failure: 0,
  done: 0,
  tenseId: "",
  mode: "choice",
  checkMode: "strict",
  tasks: []
};

function saveState() {
  const payload = {
    attempts: state.attempts,
    success: state.success,
    failure: state.failure,
    done: state.done,
    tenseId: state.tenseId,
    mode: state.mode,
    checkMode: state.checkMode,
    tasks: state.tasks
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[.,!?;:'"()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function expandContractions(text) {
  const map = {
    "don't": "do not",
    "doesn't": "does not",
    "didn't": "did not",
    "can't": "cannot",
    "won't": "will not",
    "isn't": "is not",
    "aren't": "are not",
    "wasn't": "was not",
    "weren't": "were not",
    "hasn't": "has not",
    "haven't": "have not",
    "hadn't": "had not",
    "i'm": "i am",
    "it's": "it is",
    "he's": "he is",
    "she's": "she is",
    "they're": "they are",
    "we're": "we are",
    "you're": "you are",
    "i've": "i have",
    "they've": "they have",
    "we've": "we have",
    "you've": "you have",
    "i'll": "i will",
    "we'll": "we will",
    "they'll": "they will",
    "you'll": "you will"
  };

  return text
    .split(" ")
    .map((token) => map[token] ?? token)
    .join(" ");
}

function withoutArticles(text) {
  return text
    .split(" ")
    .filter((word) => !["a", "an", "the"].includes(word))
    .join(" ");
}

function lettersOnly(text) {
  return normalizeText(text).replace(/\s/g, "");
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }

  return dp[a.length][b.length];
}

function checkAnswer(userInput, correctAnswer, checkMode) {
  const normalizedUser = expandContractions(normalizeText(userInput));
  const normalizedCorrect = expandContractions(normalizeText(correctAnswer));

  if (checkMode === "strict") {
    if (normalizedUser === normalizedCorrect) {
      return {
        ok: true,
        details: "Строгая проверка: полное совпадение по словам."
      };
    }

    if (withoutArticles(normalizedUser) === withoutArticles(normalizedCorrect)) {
      return {
        ok: true,
        details: "Принято: различие только в артиклях (a/an/the)."
      };
    }

    return {
      ok: false,
      details: "Строгая проверка: полное совпадение по словам."
    };
  }

  const userLetters = lettersOnly(withoutArticles(normalizedUser));
  const correctLetters = lettersOnly(withoutArticles(normalizedCorrect));
  const distance = levenshtein(userLetters, correctLetters);
  const maxLen = Math.max(userLetters.length, correctLetters.length) || 1;
  const similarity = 1 - distance / maxLen;

  return {
    ok: similarity >= 0.78,
    details: `Проверка по буквам: совпадение ${(similarity * 100).toFixed(0)}%.`
  };
}

function buildThirty(seedItems, mode) {
  const arr = [];
  for (let i = 0; i < 30; i += 1) {
    const item = seedItems[i % seedItems.length];
    arr.push({
      ...item,
      idx: i + 1,
      mode,
      userAnswer: "",
      checked: false,
      ok: null,
      feedbackText: ""
    });
  }
  return arr;
}

function updateStats() {
  attemptsEl.textContent = String(state.attempts);
  remainingEl.textContent = String(30 - state.done);
  const ok = state.attempts ? Math.round((state.success / state.attempts) * 100) : 0;
  const bad = state.attempts ? 100 - ok : 0;
  successPct.textContent = `${ok}%`;
  failurePct.textContent = `${bad}%`;
  progressBar.style.width = `${(state.done / 30) * 100}%`;
}

function resetStats() {
  state.attempts = 0;
  state.success = 0;
  state.failure = 0;
  state.done = 0;
  updateStats();
}

function recalcStatsFromTasks() {
  const checkedTasks = state.tasks.filter((task) => task.checked);
  state.done = checkedTasks.length;
  state.attempts = checkedTasks.length;
  state.success = checkedTasks.filter((task) => task.ok === true).length;
  state.failure = checkedTasks.filter((task) => task.ok === false).length;
}

function renderTheory(tense) {
  theoryList.innerHTML = `
    <li><strong>Время:</strong> ${tense.name}</li>
    <li><strong>Когда используется:</strong> ${tense.theory.use}</li>
    <li><strong>Маркеры:</strong> ${tense.theory.markers}</li>
    <li><strong>Формула:</strong> ${tense.theory.formula}</li>
  `;
}

function choiceMarkup(task) {
  return `
    <p>${task.idx}. ${task.sentence}</p>
    <select>
      <option value="">Выберите ответ</option>
      ${task.options.map((option) => `<option value="${option}">${option}</option>`).join("")}
    </select>
  `;
}

function translateMarkup(task) {
  return `
    <p>${task.idx}. Переведите на английский: <strong>${task.ru}</strong></p>
    <input type="text" placeholder="Введите ваш перевод" />
  `;
}

function renderTaskCard(task, index) {
  const card = document.createElement("article");
  card.className = "exercise";

  card.innerHTML = `
    <h3>Пример ${task.idx}</h3>
    ${task.mode === "choice" ? choiceMarkup(task) : translateMarkup(task)}
    <button type="button">Проверить</button>
    <div class="feedback"></div>
  `;

  const button = card.querySelector("button");
  const feedback = card.querySelector(".feedback");
  const input = task.mode === "choice" ? card.querySelector("select") : card.querySelector("input");

  if (task.userAnswer) {
    input.value = task.userAnswer;
  }

  if (task.checked) {
    button.disabled = true;
    input.disabled = true;
    feedback.textContent = task.feedbackText;
    feedback.className = `feedback ${task.ok ? "good" : "bad"}`;
  }

  button.addEventListener("click", () => {
    if (state.tasks[index].checked) return;
    const value = (input.value || "").trim();

    if (!value) {
      feedback.textContent = "Сначала введите или выберите ответ.";
      feedback.className = "feedback bad";
      return;
    }

    const result = checkAnswer(value, state.tasks[index].answer, state.checkMode);
    const isOk = result.ok;
    const text = isOk
      ? `Хорошо. Ответ верный. ${result.details}`
      : `Плохо. Правильно: ${state.tasks[index].answer}. ${result.details}`;

    state.tasks[index].userAnswer = value;
    state.tasks[index].checked = true;
    state.tasks[index].ok = isOk;
    state.tasks[index].feedbackText = text;

    button.disabled = true;
    input.disabled = true;

    feedback.textContent = text;
    feedback.className = `feedback ${isOk ? "good" : "bad"}`;

    recalcStatsFromTasks();
    updateStats();
    saveState();
  });

  return card;
}

function renderTasks() {
  intro.textContent = `Режим: ${state.mode === "choice" ? "Выбор ответа" : "Translate"}. Проверка: ${state.checkMode === "strict" ? "Строгая" : "По буквам"}.`;
  practiceContainer.innerHTML = "";
  state.tasks.forEach((task, index) => {
    practiceContainer.appendChild(renderTaskCard(task, index));
  });
  recalcStatsFromTasks();
  updateStats();
}

function startNewSession() {
  const selected = TENSES.find((item) => item.id === tenseSelect.value) ?? TENSES[0];

  state.tenseId = selected.id;
  state.mode = modeSelect.value;
  state.checkMode = checkModeSelect.value;

  const seeds = state.mode === "choice" ? selected.choiceSeeds : selected.translateSeeds;
  state.tasks = buildThirty(seeds, state.mode);

  renderTheory(selected);
  resetStats();
  renderTasks();
  saveState();
}

function restoreSession(saved) {
  const selected = TENSES.find((item) => item.id === saved.tenseId) ?? TENSES[0];

  state.tenseId = selected.id;
  state.mode = saved.mode === "translate" ? "translate" : "choice";
  state.checkMode = saved.checkMode === "letters" ? "letters" : "strict";

  tenseSelect.value = state.tenseId;
  modeSelect.value = state.mode;
  checkModeSelect.value = state.checkMode;

  const seeds = state.mode === "choice" ? selected.choiceSeeds : selected.translateSeeds;
  const fallbackTasks = buildThirty(seeds, state.mode);
  state.tasks = Array.isArray(saved.tasks) && saved.tasks.length === 30
    ? saved.tasks.map((task, index) => ({ ...fallbackTasks[index], ...task }))
    : fallbackTasks;

  renderTheory(selected);
  renderTasks();
}

function init() {
  TENSES.forEach((tense) => {
    const option = document.createElement("option");
    option.value = tense.id;
    option.textContent = tense.name;
    tenseSelect.appendChild(option);
  });

  loadBtn.addEventListener("click", startNewSession);

  const saved = loadSavedState();
  if (saved && saved.tenseId) {
    restoreSession(saved);
  } else {
    tenseSelect.value = TENSES[0].id;
    modeSelect.value = "choice";
    checkModeSelect.value = "strict";
    startNewSession();
  }
}

init();

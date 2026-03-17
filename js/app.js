import { TENSES } from "../data/examples.js";

const STORAGE_KEY = "english_tenses_trainer_state_v3";

const tenseSelect = document.getElementById("tenseSelect");
const levelSelect = document.getElementById("levelSelect");
const taskTypeSelect = document.getElementById("taskTypeSelect");
const checkModeSelect = document.getElementById("checkModeSelect");
const loadBtn = document.getElementById("loadBtn");
const resetBtn = document.getElementById("resetBtn");

const theoryList = document.getElementById("theoryList");
const intro = document.getElementById("practiceIntro");
const progressBar = document.getElementById("progressBar");
const practiceContainer = document.getElementById("practiceContainer");

const successPct = document.getElementById("successPct");
const failurePct = document.getElementById("failurePct");
const attemptsEl = document.getElementById("attempts");
const remainingEl = document.getElementById("remaining");
const pointsEl = document.getElementById("points");
const streakEl = document.getElementById("streak");
const bestStreakEl = document.getElementById("bestStreak");

const state = {
  tenseId: "",
  level: "beginner",
  taskType: "choice",
  checkMode: "strict",
  attempts: 0,
  success: 0,
  failure: 0,
  done: 0,
  points: 0,
  streak: 0,
  bestStreak: 0,
  tasks: []
};

const sentenceAddons = [
  "at school",
  "at home",
  "with friends",
  "in the evening",
  "during the lesson",
  "on weekdays"
];

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

function normalizeText(text) {
  return text.toLowerCase().replace(/[’`]/g, "'").replace(/[.,!?;:'"()]/g, "").replace(/\s+/g, " ").trim();
}

function expandContractions(text) {
  const map = {
    "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "cannot", "won't": "will not",
    "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not",
    "hasn't": "has not", "haven't": "have not", "hadn't": "had not", "i'm": "i am", "it's": "it is",
    "he's": "he is", "she's": "she is", "they're": "they are", "we're": "we are", "you're": "you are"
  };
  return text.split(" ").map((token) => map[token] ?? token).join(" ");
}

function withoutArticles(text) {
  return text.split(" ").filter((word) => !["a", "an", "the"].includes(word)).join(" ");
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

function checkAnswer(userInput, correctAnswer, checkMode, level) {
  const normalizedUser = expandContractions(normalizeText(userInput));
  const normalizedCorrect = expandContractions(normalizeText(correctAnswer));

  if (checkMode === "strict") {
    if (normalizedUser === normalizedCorrect) return { ok: true, details: "Точное совпадение." };
    if (withoutArticles(normalizedUser) === withoutArticles(normalizedCorrect)) return { ok: true, details: "Принято: разница только в артиклях." };
    return { ok: false, details: "В строгом режиме нужен максимально точный ответ." };
  }

  const left = lettersOnly(withoutArticles(normalizedUser));
  const right = lettersOnly(withoutArticles(normalizedCorrect));
  const similarity = 1 - levenshtein(left, right) / (Math.max(left.length, right.length) || 1);
  const threshold = level === "beginner" ? 0.74 : 0.82;
  return { ok: similarity >= threshold, details: `Совпадение по буквам: ${(similarity * 100).toFixed(0)}% (порог ${Math.round(threshold * 100)}%).` };
}

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleWords(sentence) {
  return shuffle(sentence.replace(/[.?!,]/g, "").split(" "));
}

function baseTask(task, idx, tense) {
  return {
    ...task,
    idx,
    tenseName: tense?.name ?? "Random",
    formula: tense?.theory?.formula ?? "Определите по маркерам и структуре",
    markers: tense?.theory?.markers ?? "mixed markers",
    checked: false,
    ok: null,
    userAnswer: "",
    feedbackText: "",
    hintVisible: false
  };
}

function diversifySentence(sentence, variant) {
  if (variant === 0) return sentence;
  const clean = sentence.replace(/\.$/, "");
  const addon = sentenceAddons[(variant - 1) % sentenceAddons.length];
  return `${clean} ${addon}.`;
}

function buildRandomPool() {
  const pool = [];
  TENSES.forEach((tense) => {
    tense.translateSeeds.forEach((seed) => {
      pool.push({
        taskType: "random",
        ru: "Случайные слова: определите нужное время и соберите английское предложение.",
        answer: seed.answer,
        words: shuffleWords(seed.answer),
        tense
      });
    });
  });
  return shuffle(pool);
}

function buildTasks(tense, taskType) {
  const tasks = [];

  if (taskType === "random") {
    const pool = buildRandomPool();
    for (let i = 0; i < 30; i += 1) {
      const item = pool[i % pool.length];
      tasks.push(baseTask({ taskType, ru: item.ru, answer: item.answer, words: item.words }, i + 1, item.tense));
    }
    return tasks;
  }

  const source = taskType === "compose" ? tense.translateSeeds : tense.choiceSeeds;
  for (let i = 0; i < 30; i += 1) {
    const item = source[i % source.length];
    const variant = Math.floor(i / source.length);
    const idx = i + 1;

    if (taskType === "choice") {
      tasks.push(baseTask({ taskType, sentence: diversifySentence(item.sentence, variant), answer: item.answer, options: item.options }, idx, tense));
    } else if (taskType === "fill") {
      tasks.push(baseTask({ taskType, sentence: diversifySentence(item.sentence, variant), answer: item.answer }, idx, tense));
    } else {
      const words = shuffleWords(item.answer);
      tasks.push(baseTask({ taskType, ru: item.ru, answer: item.answer, words }, idx, tense));
    }
  }

  return tasks;
}

function taskHint(task) {
  if (task.taskType === "compose" || task.taskType === "random") return `Подсказка: соберите структуру по формуле ${task.formula}.`;
  if (task.sentence?.includes("now")) return "Подсказка: маркер now часто указывает на Continuous.";
  if (task.sentence?.includes("yesterday")) return "Подсказка: yesterday обычно указывает на Past Simple.";
  return `Подсказка: ориентируйтесь на маркеры (${task.markers}).`;
}

function explainError(task, result) {
  return `Почему ошибка: для ${task.tenseName} важна структура ${task.formula}. Маркеры: ${task.markers}. ${result.details}`;
}

function updateStats() {
  attemptsEl.textContent = String(state.attempts);
  remainingEl.textContent = String(30 - state.done);
  pointsEl.textContent = String(state.points);
  streakEl.textContent = String(state.streak);
  bestStreakEl.textContent = String(state.bestStreak);

  const ok = state.attempts ? Math.round((state.success / state.attempts) * 100) : 0;
  successPct.textContent = `${ok}%`;
  failurePct.textContent = `${state.attempts ? 100 - ok : 0}%`;
  progressBar.style.width = `${(state.done / 30) * 100}%`;
}

function recalcFromTasks() {
  const checked = state.tasks.filter((task) => task.checked);
  state.done = checked.length;
  state.attempts = checked.length;
  state.success = checked.filter((task) => task.ok).length;
  state.failure = checked.filter((task) => task.ok === false).length;
}

function renderTheory(tense) {
  theoryList.innerHTML = `
    <li><strong>Время:</strong> ${tense.name}</li>
    <li><strong>Когда используется:</strong> ${tense.theory.use}</li>
    <li><strong>Маркеры:</strong> ${tense.theory.markers}</li>
    <li><strong>Формула:</strong> ${tense.theory.formula}</li>
  `;
}

function taskMarkup(task) {
  if (task.taskType === "choice") {
    const options = state.level === "beginner" ? task.options : [...task.options].sort();
    return `<p>${task.idx}. ${task.sentence}</p><select><option value="">Выберите ответ</option>${options.map((o) => `<option value="${o}">${o}</option>`).join("")}</select>`;
  }

  if (task.taskType === "fill") {
    return `<p>${task.idx}. Впишите пропущенное: ${task.sentence}</p><input type="text" placeholder="Введите слово/фразу" />`;
  }

  return `<p>${task.idx}. ${task.ru}</p><div class="chips">${task.words.map((word) => `<span class="chip">${word}</span>`).join("")}</div><input type="text" placeholder="Соберите предложение" />`;
}

function applyScore(isOk) {
  if (isOk) {
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.points += state.level === "beginner" ? 10 : 14;
  } else {
    state.streak = 0;
    state.points = Math.max(0, state.points - 4);
  }
}

function renderTaskCard(task, index) {
  const card = document.createElement("article");
  card.className = `exercise ${task.checked ? (task.ok ? "ok" : "fail") : ""}`;

  card.innerHTML = `
    <h3>Пример ${task.idx}</h3>
    ${taskMarkup(task)}
    <div class="inline-group"><button type="button" class="check-btn">Проверить</button><button type="button" class="hint-btn ghost">Подсказка</button></div>
    <div class="hint ${task.hintVisible ? "visible" : ""}">${taskHint(task)}</div>
    <div class="feedback ${task.checked ? (task.ok ? "good" : "bad") : ""}">${task.feedbackText}</div>
  `;

  const checkBtn = card.querySelector(".check-btn");
  const hintBtn = card.querySelector(".hint-btn");
  const hintBlock = card.querySelector(".hint");
  const feedback = card.querySelector(".feedback");
  const input = card.querySelector(task.taskType === "choice" ? "select" : "input");

  if (task.userAnswer) input.value = task.userAnswer;
  if (task.checked) {
    checkBtn.disabled = true;
    input.disabled = true;
  }

  hintBtn.addEventListener("click", () => {
    state.tasks[index].hintVisible = !state.tasks[index].hintVisible;
    hintBlock.classList.toggle("visible", state.tasks[index].hintVisible);
    saveState();
  });

  checkBtn.addEventListener("click", () => {
    if (state.tasks[index].checked) return;
    const userInput = (input.value || "").trim();
    if (!userInput) {
      feedback.textContent = "Введите/выберите ответ перед проверкой.";
      feedback.className = "feedback bad";
      return;
    }

    const result = checkAnswer(userInput, state.tasks[index].answer, state.checkMode, state.level);
    const ok = result.ok;

    state.tasks[index].checked = true;
    state.tasks[index].ok = ok;
    state.tasks[index].userAnswer = userInput;
    state.tasks[index].feedbackText = ok ? `✅ Верно. ${result.details}` : `❌ Неверно. Правильный ответ: ${state.tasks[index].answer}.`;

    applyScore(ok);
    recalcFromTasks();
    updateStats();

    checkBtn.disabled = true;
    input.disabled = true;
    card.classList.add(ok ? "ok" : "fail");

    if (ok) {
      feedback.className = "feedback good";
      feedback.textContent = state.tasks[index].feedbackText;
    } else {
      feedback.className = "feedback bad";
      feedback.innerHTML = `${state.tasks[index].feedbackText}<small>${explainError(state.tasks[index], result)}</small>`;
    }

    saveState();
  });

  return card;
}

function renderTasks() {
  intro.textContent = `Уровень: ${state.level}. Тип: ${state.taskType}. Проверка: ${state.checkMode}.`;
  practiceContainer.innerHTML = "";
  state.tasks.forEach((task, index) => practiceContainer.appendChild(renderTaskCard(task, index)));
  recalcFromTasks();
  updateStats();
}

function startSession() {
  const selected = TENSES.find((t) => t.id === tenseSelect.value) ?? TENSES[0];

  state.tenseId = selected.id;
  state.level = levelSelect.value;
  state.taskType = taskTypeSelect.value;
  state.checkMode = checkModeSelect.value;
  state.attempts = 0;
  state.success = 0;
  state.failure = 0;
  state.done = 0;
  state.points = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.tasks = buildTasks(selected, state.taskType);

  renderTheory(selected);
  renderTasks();
  saveState();
}

function restoreSession(saved) {
  Object.assign(state, {
    ...state,
    ...saved,
    level: saved.level === "intermediate" ? "intermediate" : "beginner",
    taskType: ["choice", "fill", "compose", "random"].includes(saved.taskType) ? saved.taskType : "choice",
    checkMode: saved.checkMode === "letters" ? "letters" : "strict"
  });

  const selected = TENSES.find((t) => t.id === state.tenseId) ?? TENSES[0];
  const fallback = buildTasks(selected, state.taskType);
  state.tasks = Array.isArray(saved.tasks) && saved.tasks.length === 30
    ? saved.tasks.map((task, idx) => ({ ...fallback[idx], ...task }))
    : fallback;

  tenseSelect.value = selected.id;
  levelSelect.value = state.level;
  taskTypeSelect.value = state.taskType;
  checkModeSelect.value = state.checkMode;

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

  loadBtn.addEventListener("click", startSession);
  resetBtn.addEventListener("click", () => {
    clearState();
    startSession();
  });

  const saved = loadState();
  if (saved && saved.tenseId) {
    restoreSession(saved);
  } else {
    tenseSelect.value = TENSES[0].id;
    startSession();
  }
}

init();

export const TENSES = [
  {
    id: "present_simple",
    name: "Present Simple",
    theory: {
      use: "Факты, привычки, повторяющиеся действия.",
      markers: "usually, often, every day, sometimes",
      formula: "V1 / V1+s, do/does"
    },
    choiceSeeds: [
      { sentence: "She ___ coffee every morning.", answer: "drinks", options: ["drinks", "is drinking", "drank", "will drink"] },
      { sentence: "They ___ English on Mondays.", answer: "study", options: ["study", "are studying", "studied", "will study"] },
      { sentence: "My school ___ at 8 a.m.", answer: "starts", options: ["starts", "is starting", "started", "will start"] },
      { sentence: "He ___ in London.", answer: "lives", options: ["lives", "is living", "lived", "will live"] },
      { sentence: "We ___ football on Fridays.", answer: "play", options: ["play", "are playing", "played", "will play"] }
    ],
    translateSeeds: [
      { ru: "Я обычно читаю перед сном.", answer: "I usually read before bed." },
      { ru: "Она ходит в школу пешком.", answer: "She goes to school on foot." },
      { ru: "Мы часто встречаемся по выходным.", answer: "We often meet on weekends." },
      { ru: "Он работает в банке.", answer: "He works in a bank." },
      { ru: "Они не смотрят телевизор утром.", answer: "They do not watch TV in the morning." }
    ]
  },
  {
    id: "present_continuous",
    name: "Present Continuous",
    theory: {
      use: "Процесс в момент речи, временные действия.",
      markers: "now, at the moment, right now",
      formula: "am/is/are + V-ing"
    },
    choiceSeeds: [
      { sentence: "I ___ a report now.", answer: "am writing", options: ["am writing", "write", "wrote", "will write"] },
      { sentence: "They ___ in the gym at the moment.", answer: "are training", options: ["are training", "train", "trained", "will train"] },
      { sentence: "She ___ to the principal now.", answer: "is talking", options: ["is talking", "talks", "talked", "will talk"] },
      { sentence: "We ___ dinner right now.", answer: "are cooking", options: ["are cooking", "cook", "cooked", "will cook"] },
      { sentence: "He ___ an email now.", answer: "is sending", options: ["is sending", "sends", "sent", "will send"] }
    ],
    translateSeeds: [
      { ru: "Я сейчас делаю домашнюю работу.", answer: "I am doing my homework now." },
      { ru: "Она разговаривает по телефону в данный момент.", answer: "She is talking on the phone at the moment." },
      { ru: "Мы готовим ужин прямо сейчас.", answer: "We are cooking dinner right now." },
      { ru: "Они ждут автобус.", answer: "They are waiting for the bus." },
      { ru: "Он не спит, он читает.", answer: "He is not sleeping, he is reading." }
    ]
  },
  {
    id: "present_perfect",
    name: "Present Perfect",
    theory: {
      use: "Результат к настоящему моменту, жизненный опыт.",
      markers: "already, just, yet, ever, never",
      formula: "have/has + V3"
    },
    choiceSeeds: [
      { sentence: "She ___ her project already.", answer: "has finished", options: ["has finished", "finishes", "finished", "will finish"] },
      { sentence: "I ___ this film before.", answer: "have seen", options: ["have seen", "see", "saw", "will see"] },
      { sentence: "They ___ to London twice.", answer: "have been", options: ["have been", "are", "were", "will be"] },
      { sentence: "He ___ his keys.", answer: "has lost", options: ["has lost", "loses", "lost", "will lose"] },
      { sentence: "We ___ just ___ lunch.", answer: "have had", options: ["have had", "have", "had", "will have"] }
    ],
    translateSeeds: [
      { ru: "Я уже сделал это упражнение.", answer: "I have already done this exercise." },
      { ru: "Она только что пришла домой.", answer: "She has just come home." },
      { ru: "Мы еще не начали урок.", answer: "We have not started the lesson yet." },
      { ru: "Ты когда-нибудь был в Париже?", answer: "Have you ever been to Paris?" },
      { ru: "Они никогда не пробовали суши.", answer: "They have never tried sushi." }
    ]
  },
  {
    id: "present_perfect_continuous",
    name: "Present Perfect Continuous",
    theory: {
      use: "Действие началось в прошлом и длится до сейчас.",
      markers: "for, since, all day",
      formula: "have/has been + V-ing"
    },
    choiceSeeds: [
      { sentence: "I ___ for this exam since morning.", answer: "have been studying", options: ["have been studying", "study", "studied", "will study"] },
      { sentence: "She ___ here for two hours.", answer: "has been waiting", options: ["has been waiting", "waits", "waited", "will wait"] },
      { sentence: "They ___ tennis all afternoon.", answer: "have been playing", options: ["have been playing", "play", "played", "will play"] },
      { sentence: "He ___ on this task since 9 o'clock.", answer: "has been working", options: ["has been working", "works", "worked", "will work"] },
      { sentence: "We ___ English for three years.", answer: "have been learning", options: ["have been learning", "learn", "learned", "will learn"] }
    ],
    translateSeeds: [
      { ru: "Я учу английский уже три года.", answer: "I have been learning English for three years." },
      { ru: "Она ждет тебя с утра.", answer: "She has been waiting for you since morning." },
      { ru: "Мы работаем над этим проектом весь день.", answer: "We have been working on this project all day." },
      { ru: "Они бегают уже час.", answer: "They have been running for an hour." },
      { ru: "Он читает эту книгу с понедельника.", answer: "He has been reading this book since Monday." }
    ]
  },
  {
    id: "past_simple",
    name: "Past Simple",
    theory: { use: "Завершенное действие в прошлом.", markers: "yesterday, last week, ago", formula: "V2 / did" },
    choiceSeeds: [
      { sentence: "I ___ my teacher yesterday.", answer: "met", options: ["met", "meet", "have met", "will meet"] },
      { sentence: "They ___ to Paris last year.", answer: "went", options: ["went", "go", "have gone", "will go"] },
      { sentence: "She ___ her room yesterday evening.", answer: "cleaned", options: ["cleaned", "cleans", "has cleaned", "will clean"] },
      { sentence: "He ___ me two days ago.", answer: "called", options: ["called", "calls", "has called", "will call"] },
      { sentence: "We ___ an interesting lesson last Friday.", answer: "had", options: ["had", "have", "has had", "will have"] }
    ],
    translateSeeds: [
      { ru: "Я видел его вчера.", answer: "I saw him yesterday." },
      { ru: "Мы посетили музей на прошлой неделе.", answer: "We visited the museum last week." },
      { ru: "Она закончила работу час назад.", answer: "She finished the work an hour ago." },
      { ru: "Они не пришли вчера.", answer: "They did not come yesterday." },
      { ru: "Ты сделал домашнее задание?", answer: "Did you do your homework?" }
    ]
  },
  {
    id: "past_continuous",
    name: "Past Continuous",
    theory: { use: "Процесс в конкретный момент в прошлом.", markers: "while, when, at 5 p.m. yesterday", formula: "was/were + V-ing" },
    choiceSeeds: [
      { sentence: "I ___ when you called.", answer: "was reading", options: ["was reading", "read", "had read", "will read"] },
      { sentence: "They ___ football at 6 p.m. yesterday.", answer: "were playing", options: ["were playing", "played", "had played", "will play"] },
      { sentence: "She ___ dinner while he was working.", answer: "was cooking", options: ["was cooking", "cooked", "had cooked", "will cook"] },
      { sentence: "We ___ TV when the lights went out.", answer: "were watching", options: ["were watching", "watched", "had watched", "will watch"] },
      { sentence: "He ___ to music all evening.", answer: "was listening", options: ["was listening", "listened", "had listened", "will listen"] }
    ],
    translateSeeds: [
      { ru: "Я читал, когда ты позвонил.", answer: "I was reading when you called." },
      { ru: "Они играли в футбол в шесть вечера.", answer: "They were playing football at six p.m." },
      { ru: "Мы смотрели фильм, когда начался дождь.", answer: "We were watching a film when it started to rain." },
      { ru: "Она готовила ужин в это время вчера.", answer: "She was cooking dinner at this time yesterday." },
      { ru: "Он не спал, он работал.", answer: "He was not sleeping, he was working." }
    ]
  },
  {
    id: "past_perfect",
    name: "Past Perfect",
    theory: { use: "Действие завершилось до другого момента в прошлом.", markers: "before, by the time", formula: "had + V3" },
    choiceSeeds: [
      { sentence: "She ___ before the lesson started.", answer: "had arrived", options: ["had arrived", "arrived", "has arrived", "will arrive"] },
      { sentence: "I ___ my homework before I went out.", answer: "had finished", options: ["had finished", "finished", "have finished", "will finish"] },
      { sentence: "They ___ the room by 5 p.m.", answer: "had left", options: ["had left", "left", "have left", "will leave"] },
      { sentence: "He ___ the book before the exam.", answer: "had read", options: ["had read", "read", "has read", "will read"] },
      { sentence: "We ___ dinner before guests came.", answer: "had cooked", options: ["had cooked", "cooked", "have cooked", "will cook"] }
    ],
    translateSeeds: [
      { ru: "Она ушла до того, как я пришел.", answer: "She had left before I arrived." },
      { ru: "Мы закончили работу к пяти часам.", answer: "We had finished the work by five o'clock." },
      { ru: "Он прочитал книгу до экзамена.", answer: "He had read the book before the exam." },
      { ru: "Они уже поужинали, когда мы пришли.", answer: "They had already had dinner when we came." },
      { ru: "Я никогда не видел море до той поездки.", answer: "I had never seen the sea before that trip." }
    ]
  },
  {
    id: "past_perfect_continuous",
    name: "Past Perfect Continuous",
    theory: { use: "Длительность до момента в прошлом.", markers: "for, since, before", formula: "had been + V-ing" },
    choiceSeeds: [
      { sentence: "I ___ for an hour before class began.", answer: "had been waiting", options: ["had been waiting", "waited", "have waited", "will wait"] },
      { sentence: "She ___ there since noon before he came.", answer: "had been sitting", options: ["had been sitting", "sat", "has sat", "will sit"] },
      { sentence: "They ___ all day before the meeting.", answer: "had been working", options: ["had been working", "worked", "have worked", "will work"] },
      { sentence: "He ___ English for years before he moved.", answer: "had been studying", options: ["had been studying", "studied", "has studied", "will study"] },
      { sentence: "We ___ for 30 minutes before the bus arrived.", answer: "had been walking", options: ["had been walking", "walked", "have walked", "will walk"] }
    ],
    translateSeeds: [
      { ru: "Я ждал автобус уже полчаса, когда он приехал.", answer: "I had been waiting for the bus for half an hour when it arrived." },
      { ru: "Она работала там три года до переезда.", answer: "She had been working there for three years before moving." },
      { ru: "Они учились весь вечер перед тестом.", answer: "They had been studying all evening before the test." },
      { ru: "Мы шли уже час, когда начался дождь.", answer: "We had been walking for an hour when it started to rain." },
      { ru: "Он тренировался до того, как команда приехала.", answer: "He had been training before the team arrived." }
    ]
  },
  {
    id: "future_simple",
    name: "Future Simple",
    theory: { use: "Решение в момент речи, обещания, прогноз.", markers: "tomorrow, next week, I think", formula: "will + V1" },
    choiceSeeds: [
      { sentence: "I ___ you tomorrow.", answer: "will call", options: ["will call", "call", "called", "have called"] },
      { sentence: "She ___ the report next week.", answer: "will send", options: ["will send", "sends", "sent", "has sent"] },
      { sentence: "They ___ us later.", answer: "will help", options: ["will help", "help", "helped", "have helped"] },
      { sentence: "We ___ this task soon.", answer: "will finish", options: ["will finish", "finish", "finished", "have finished"] },
      { sentence: "He ___ it, I promise.", answer: "will do", options: ["will do", "does", "did", "has done"] }
    ],
    translateSeeds: [
      { ru: "Я позвоню тебе завтра.", answer: "I will call you tomorrow." },
      { ru: "Она поможет нам позже.", answer: "She will help us later." },
      { ru: "Мы закончим проект на следующей неделе.", answer: "We will finish the project next week." },
      { ru: "Он не забудет это.", answer: "He will not forget it." },
      { ru: "Я думаю, будет дождь.", answer: "I think it will rain." }
    ]
  },
  {
    id: "future_continuous",
    name: "Future Continuous",
    theory: { use: "Процесс в определенный момент будущего.", markers: "this time tomorrow", formula: "will be + V-ing" },
    choiceSeeds: [
      { sentence: "This time tomorrow, I ___ to school.", answer: "will be going", options: ["will be going", "go", "went", "have gone"] },
      { sentence: "At 8 p.m., they ___ dinner.", answer: "will be having", options: ["will be having", "have", "had", "will have"] },
      { sentence: "She ___ at 10 a.m. tomorrow.", answer: "will be working", options: ["will be working", "works", "worked", "has worked"] },
      { sentence: "We ___ on the train at noon.", answer: "will be travelling", options: ["will be travelling", "travel", "traveled", "have traveled"] },
      { sentence: "He ___ in the exam hall at 9.", answer: "will be sitting", options: ["will be sitting", "sits", "sat", "has sat"] }
    ],
    translateSeeds: [
      { ru: "Завтра в это время я буду лететь в Лондон.", answer: "This time tomorrow I will be flying to London." },
      { ru: "В восемь вечера мы будем ужинать.", answer: "At eight p.m. we will be having dinner." },
      { ru: "Она будет работать весь день.", answer: "She will be working all day." },
      { ru: "Они будут ждать нас у входа.", answer: "They will be waiting for us at the entrance." },
      { ru: "Он будет сдавать экзамен в девять.", answer: "He will be taking an exam at nine." }
    ]
  },
  {
    id: "future_perfect",
    name: "Future Perfect",
    theory: { use: "Действие завершится к моменту в будущем.", markers: "by, by the time", formula: "will have + V3" },
    choiceSeeds: [
      { sentence: "By 6 p.m., I ___ this essay.", answer: "will have finished", options: ["will have finished", "finish", "finished", "have finished"] },
      { sentence: "She ___ the task by Monday.", answer: "will have completed", options: ["will have completed", "completes", "completed", "has completed"] },
      { sentence: "They ___ the project by June.", answer: "will have delivered", options: ["will have delivered", "deliver", "delivered", "have delivered"] },
      { sentence: "We ___ all topics by the exam.", answer: "will have revised", options: ["will have revised", "revise", "revised", "have revised"] },
      { sentence: "He ___ home by 9 o'clock.", answer: "will have returned", options: ["will have returned", "returns", "returned", "has returned"] }
    ],
    translateSeeds: [
      { ru: "К пяти часам я закончу отчет.", answer: "By five o'clock I will have finished the report." },
      { ru: "К понедельнику она завершит проект.", answer: "She will have completed the project by Monday." },
      { ru: "К этому времени они уже уедут.", answer: "By that time they will have left." },
      { ru: "Мы изучим все темы к экзамену.", answer: "We will have studied all topics by the exam." },
      { ru: "Он вернется домой к девяти.", answer: "He will have returned home by nine." }
    ]
  },
  {
    id: "future_perfect_continuous",
    name: "Future Perfect Continuous",
    theory: { use: "Длительность действия до момента в будущем.", markers: "for, by", formula: "will have been + V-ing" },
    choiceSeeds: [
      { sentence: "By May, I ___ here for 5 years.", answer: "will have been working", options: ["will have been working", "work", "worked", "have worked"] },
      { sentence: "She ___ English for 10 years by next summer.", answer: "will have been studying", options: ["will have been studying", "studies", "studied", "has studied"] },
      { sentence: "They ___ for hours by the time we arrive.", answer: "will have been waiting", options: ["will have been waiting", "wait", "waited", "have waited"] },
      { sentence: "We ___ all day by evening.", answer: "will have been travelling", options: ["will have been travelling", "travel", "traveled", "have traveled"] },
      { sentence: "He ___ for two hours by noon.", answer: "will have been training", options: ["will have been training", "trains", "trained", "has trained"] }
    ],
    translateSeeds: [
      { ru: "К маю я буду работать здесь уже пять лет.", answer: "By May I will have been working here for five years." },
      { ru: "К лету она будет учить английский уже десять лет.", answer: "By summer she will have been learning English for ten years." },
      { ru: "К нашему приезду они будут ждать уже два часа.", answer: "By the time we arrive they will have been waiting for two hours." },
      { ru: "К вечеру мы будем ехать уже весь день.", answer: "By evening we will have been travelling all day." },
      { ru: "К полудню он будет тренироваться уже два часа.", answer: "By noon he will have been training for two hours." }
    ]
  }
];

/* ============================================================
   GitQuest — app.js
   Lesson: Git Basics + XP / progress / persistence
   ============================================================ */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     1. LESSON DATA — Git Basics only
     ------------------------------------------------------------ */
  const GIT_BASICS = {
    id: "git-basics",
    title: "Git Basics",
    titleKm: "មូលដ្ឋានគ្រឹះ Git",
    difficulty: "Beginner",
    xp: 100,
    objectives: [
      "Explain what version control is and why it matters.",
      "Describe what Git is and what a repository stores.",
      "Understand what a commit records and why commit messages matter."
    ],
    vocab: [
      { en: "Version control", km: "ការគ្រប់គ្រងកំណែ", note: "Tracking changes to files over time." },
      { en: "Repository", km: "ឃ្លាំងកូដ", note: "A project folder that Git tracks." },
      { en: "Commit", km: "ការរក្សាទុក", note: "A saved snapshot of your changes." },
      { en: "Working directory", km: "ថតធ្វើការ", note: "The files you are currently editing." },
      { en: "Commit message", km: "សារ commit", note: "A short note explaining what changed." }
    ],
    english: [
      "Git is a version control system. It records changes to your files so you can review, undo, and share work safely.",
      "A repository (repo) is your project folder plus a hidden .git folder. Every commit is a snapshot of your work with a short message describing what changed."
    ],
    khmer: [
      "Git គឺជាប្រព័ន្ធគ្រប់គ្រងកំណែ (version control) ដែលរក្សាទុកការផ្លាស់ប្តូរឯកសាររបស់អ្នក។ អ្នកអាចត្រឡប់ក្រោយ ឬចែករំលែកកូដបានយ៉ាងសុវត្ថិភាព។",
      "Repository គឺជាថតគម្រោងរបស់អ្នក បូករួមទាំងថត .git ដែលផ្ទុកប្រវត្តិទាំងអស់។ Commit នីមួយៗគឺជាការថតរូបនៃការផ្លាស់ប្តូរ ដែលមានសារខ្លីៗពន្យល់ពីអ្វីដែលបានផ្លាស់ប្តូរ។"
    ],
    commands: [
      { cmd: "git --version", output: "git version 2.43.0" },
      { cmd: "git init", output: "Initialized empty Git repository in /home/sokha/project/.git/" },
      {
        cmd: "git status",
        output:
          "On branch main\n\nNo commits yet\n\nnothing to commit (create/copy files and use \"git add\" to track)"
      }
    ],
    practice:
      "Open a terminal and run `git --version` to confirm Git is installed. Then create an empty folder, move into it, run `git init`, and finally `git status` to see that Git now tracks your folder.",
    practiceHint:
      "On Windows, use Git Bash or PowerShell. On macOS/Linux, use Terminal. If `git --version` shows a version, Git is ready.",
    quiz: [
      {
        q: "What does Git mainly help you do?",
        options: [
          "Edit photos",
          "Track changes in your code over time",
          "Browse the internet",
          "Send emails"
        ],
        correct: 1,
        explain:
          "Git is a version control system — it records changes to files so you can review, undo, and share them."
      },
      {
        q: "What is a repository?",
        options: [
          "A folder that Git tracks and stores project history in",
          "A website for hosting videos",
          "A type of Git command",
          "A programming language"
        ],
        correct: 0,
        explain:
          "A repository (repo) is your project folder plus the hidden .git history Git keeps inside it."
      },
      {
        q: "What is a commit?",
        options: [
          "Deleting your project",
          "Uploading a photo",
          "A saved snapshot of your staged changes",
          "A chat message"
        ],
        correct: 2,
        explain:
          "A commit records a snapshot of your changes together with a message describing them."
      },
      {
        q: "Why do commit messages matter?",
        options: [
          "They make commits faster",
          "They help you and your team understand what changed",
          "They are required by GitHub",
          "They unlock hidden features"
        ],
        correct: 1,
        explain:
          "A clear commit message explains the change so future you (and teammates) can understand the history."
      }
    ]
  };

  const TOTAL_LESSONS = 10;              // full path has 10 lessons
  const PASS_THRESHOLD = 70;             // percent to pass the quiz
  const XP_PER_LEVEL = 250;              // XP needed per level
  const STORAGE_KEY = "gitquest:progress:v1";
  const LEVEL_TITLES = [
    "Fresh Clone",
    "Initiate",
    "Commit Cadet",
    "Branch Builder",
    "Merge Master",
    "Rebase Ranger",
    "Git Guru",
    "Open Source Hero"
  ];

  /* ------------------------------------------------------------
     2. DOM helpers
     ------------------------------------------------------------ */
  const $ = function (selector) { return document.querySelector(selector); };

  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        const val = props[key];
        if (key === "className") node.className = val;
        else if (key === "text") node.textContent = val;
        else if (key === "attrs") {
          Object.keys(val).forEach(function (a) {
            if (val[a] === false || val[a] == null) return;
            node.setAttribute(a, String(val[a]));
          });
        } else if (key === "dataset") {
          Object.assign(node.dataset, val);
        } else if (key.indexOf("on") === 0 && typeof val === "function") {
          node.addEventListener(key.slice(2).toLowerCase(), val);
        } else {
          node[key] = val;
        }
      });
    }
    if (children) {
      const list = Array.isArray(children) ? children : [children];
      list.forEach(function (child) {
        if (child == null || child === false) return;
        if (child.nodeType) node.appendChild(child);
        else node.appendChild(document.createTextNode(String(child)));
      });
    }
    return node;
  }

  function formatNumber(n) {
    return Number(n).toLocaleString("en-US");
  }

  /* ------------------------------------------------------------
     3. Persistent state
     ------------------------------------------------------------ */
  function defaultProgress() {
    return {
      xp: 0,
      completed: {},          // { "git-basics": true }
      quizScores: {},         // { "git-basics": 100 }
      startedLesson: null     // id of the lesson currently open
    };
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultProgress();
      const parsed = JSON.parse(raw);
      const base = defaultProgress();
      if (parsed && typeof parsed === "object") {
        if (Number.isFinite(parsed.xp) && parsed.xp >= 0) base.xp = parsed.xp;
        if (parsed.completed && typeof parsed.completed === "object") {
          Object.keys(parsed.completed).forEach(function (id) {
            if (parsed.completed[id] === true) base.completed[id] = true;
          });
        }
        if (parsed.quizScores && typeof parsed.quizScores === "object") {
          Object.keys(parsed.quizScores).forEach(function (id) {
            const v = parsed.quizScores[id];
            if (Number.isFinite(v) && v >= 0 && v <= 100) base.quizScores[id] = v;
          });
        }
        if (typeof parsed.startedLesson === "string") {
          base.startedLesson = parsed.startedLesson;
        }
      }
      return base;
    } catch (err) {
      console.warn("GitQuest: could not load progress", err);
      return defaultProgress();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.warn("GitQuest: could not save progress", err);
    }
  }

  let progress = loadProgress();

  /* ------------------------------------------------------------
     4. Derived values
     ------------------------------------------------------------ */
  function levelForXp(xp) {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
  }

  function levelTitle(level) {
    return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  }

  function completedCount() {
    return Object.keys(progress.completed).length;
  }

  function overallPercent() {
    return Math.min(100, Math.round((completedCount() / TOTAL_LESSONS) * 100));
  }

  function isLessonCompleted(id) {
    return progress.completed[id] === true;
  }

  /* ------------------------------------------------------------
     5. DOM cache
     ------------------------------------------------------------ */
  const dom = {};

  function cacheDom() {
    dom.dashboardSections = [
      document.getElementById("dashboard"),
      document.getElementById("progress"),
      document.getElementById("lessons"),
      document.getElementById("quiz-arena"),
      document.getElementById("challenges"),
      document.getElementById("leaderboard")
    ].filter(Boolean);

    dom.lessonView = $("#lesson-view");
    dom.lessonBody = $("#lesson-view-body");
    dom.lessonPosition = $("#lesson-view-position");
    dom.backBtn = $("#back-to-lessons-btn");
    dom.nextBtn = $("#next-lesson-btn");
    dom.nextNote = $("#next-note");

    dom.gitBasicsCard = $("#lesson-card-1");
    dom.gitBasicsBtn = $("#lesson-start-1");
    dom.gitBasicsProgress = $("#lesson-progress-1");
    dom.gitBasicsProgressValue = $("#lesson-progress-value-1");

    // Dashboard progress + XP
    dom.overallProgress = $("#overall-progress");
    dom.overallProgressValue = $("#overall-progress-value");
    dom.completedLessons = $("#completed-lessons");
    dom.totalLessons = $("#total-lessons");
    dom.xpDisplay = $("#xp-display");
    dom.currentLevel = $("#current-level");
    dom.headerXp = $("#header-xp");
    dom.headerLevel = $("#header-level");
    dom.profileRole = $(".profile-role");
    dom.profileChip = $(".profile-chip");
    dom.levelBadge = $(".level-badge");

    // Reset control
    dom.resetBtn = $("#reset-progress-btn");

    dom.toast = null; // created lazily by showToast()
  }

  /* ------------------------------------------------------------
     6. Toast
     ------------------------------------------------------------ */
  let toastTimer = null;

  function showToast(message) {
    if (!dom.toast) {
      dom.toast = el("div", {
        className: "toast",
        attrs: { role: "status", "aria-live": "polite" }
      });
      document.body.appendChild(dom.toast);
    }
    dom.toast.textContent = message;
    dom.toast.classList.add("is-visible");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      dom.toast.classList.remove("is-visible");
    }, 3200);
  }

  /* ------------------------------------------------------------
     7. Render progress on the dashboard
     ------------------------------------------------------------ */
  let lastRenderedLevel = null;

  function renderDashboard() {
    const pct = overallPercent();
    const done = completedCount();
    const level = levelForXp(progress.xp);

    // Overall progress bar
    if (dom.overallProgress) {
      dom.overallProgress.value = pct;
      dom.overallProgress.textContent = pct + "%";
    }
    if (dom.overallProgressValue) {
      dom.overallProgressValue.textContent = pct + "%";
    }

    // Stat cards
    if (dom.completedLessons) dom.completedLessons.textContent = done;
    if (dom.totalLessons) dom.totalLessons.textContent = TOTAL_LESSONS;
    if (dom.xpDisplay) dom.xpDisplay.textContent = formatNumber(progress.xp);
    if (dom.currentLevel) dom.currentLevel.textContent = level;

    // Header
    if (dom.headerXp) dom.headerXp.textContent = formatNumber(progress.xp);
    if (dom.headerLevel) dom.headerLevel.textContent = level;
    if (dom.profileRole) dom.profileRole.textContent = levelTitle(level);
    if (dom.profileChip) {
      dom.profileChip.setAttribute(
        "aria-label",
        "Open your profile: Sokha, Level " + level + ", " + progress.xp + " XP"
      );
    }

    // Level-up pulse (only when the level actually increases)
    if (lastRenderedLevel !== null && level > lastRenderedLevel && dom.levelBadge) {
      dom.levelBadge.classList.remove("is-level-up");
      // restart the animation
      void dom.levelBadge.offsetWidth;
      dom.levelBadge.classList.add("is-level-up");
    }
    lastRenderedLevel = level;
  }

  function renderLessonCard() {
    if (!dom.gitBasicsCard) return;

    const completed = isLessonCompleted(GIT_BASICS.id);
    const progressPct = completed ? 100 : 0;

    dom.gitBasicsCard.classList.toggle("is-completed", completed);

    if (dom.gitBasicsProgress) {
      dom.gitBasicsProgress.value = progressPct;
      dom.gitBasicsProgress.textContent = progressPct + "%";
    }
    if (dom.gitBasicsProgressValue) {
      dom.gitBasicsProgressValue.textContent = progressPct + "%";
    }
    if (dom.gitBasicsBtn) {
      dom.gitBasicsBtn.textContent = completed ? "Review lesson" : "Start lesson";
    }

    // Status badge (insert once, update text/classes after)
    const head = dom.gitBasicsCard.querySelector(".lesson-card-head");
    if (head) {
      let badge = head.querySelector(".lesson-status-badge");
      if (!badge) {
        badge = el("span", { className: "lesson-status-badge" });
        // Append after the difficulty badge so it sits on the right
        head.appendChild(badge);
      }
      badge.className =
        "lesson-status-badge " +
        (completed ? "lesson-status-completed" : "lesson-status-in-progress");
      badge.textContent = completed ? "Completed" : "Not started";
    }
  }

  /* ------------------------------------------------------------
     8. Award XP (only once per lesson)
     ------------------------------------------------------------ */
  function awardXpForLesson(lesson) {
    if (isLessonCompleted(lesson.id)) return false;

    progress.completed[lesson.id] = true;
    progress.xp += lesson.xp;
    saveProgress();

    renderDashboard();
    renderLessonCard();
    showToast("+" + lesson.xp + " XP earned! Lesson completed.");
    return true;
  }

  /* ------------------------------------------------------------
     9. Open / close the lesson view
     ------------------------------------------------------------ */
  function openLesson() {
    progress.startedLesson = GIT_BASICS.id;
    saveProgress();

    renderLesson();
    dom.dashboardSections.forEach(function (s) { s.hidden = true; });
    dom.lessonView.hidden = false;
    if (dom.nextNote) dom.nextNote.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });

    const heading = document.getElementById("lesson-view-title");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }

  function closeLesson() {
    if (!dom.lessonView || dom.lessonView.hidden) return;
    dom.lessonView.hidden = true;
    dom.dashboardSections.forEach(function (s) { s.hidden = false; });
    progress.startedLesson = null;
    saveProgress();

    const lessonsSection = document.getElementById("lessons");
    if (lessonsSection) {
      lessonsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (dom.gitBasicsBtn) dom.gitBasicsBtn.focus();
  }

  /* ------------------------------------------------------------
     10. Render the lesson (unchanged from previous step)
     ------------------------------------------------------------ */
  function renderLesson() {
    const lesson = GIT_BASICS;

    if (dom.lessonPosition) {
      dom.lessonPosition.textContent = "Lesson 1 of " + TOTAL_LESSONS;
    }

    const headerBlock = el("div", { className: "lesson-header-block" }, [
      el("div", { className: "lesson-meta-row" }, [
        el("span", {
          className: "badge badge-" + lesson.difficulty.toLowerCase(),
          text: lesson.difficulty
        }),
        el("span", { className: "lesson-xp-tag" }, [
          el("i", { className: "fa-solid fa-bolt", attrs: { "aria-hidden": "true" } }),
          " +" + lesson.xp + " XP"
        ])
      ]),
      el("h2", {
        className: "lesson-title-large",
        text: lesson.title,
        attrs: { id: "lesson-view-title" }
      }),
      el("p", {
        className: "lesson-title-km",
        text: lesson.titleKm,
        attrs: { lang: "km" }
      })
    ]);

    const objectives = el("section", { className: "lesson-section" }, [
      el("h3", { className: "lesson-section-title", text: "Learning Objectives" }),
      el("ul", { className: "objectives-list" },
        lesson.objectives.map(function (o) { return el("li", { text: o }); })
      )
    ]);

    const vocabRows = lesson.vocab.map(function (v) {
      return el("tr", {}, [
        el("td", { text: v.en }),
        el("td", { text: v.km, attrs: { lang: "km" } }),
        el("td", { text: v.note || "" })
      ]);
    });

    const vocab = el("section", { className: "lesson-section" }, [
      el("h3", { className: "lesson-section-title", text: "Key Vocabulary — ពាក្យបច្ចេកទេស" }),
      el("table", { className: "vocab-table" }, [
        el("thead", {}, [
          el("tr", {}, [
            el("th", { text: "English", attrs: { scope: "col" } }),
            el("th", { text: "ខ្មែរ", attrs: { scope: "col" } }),
            el("th", { text: "Meaning", attrs: { scope: "col" } })
          ])
        ]),
        el("tbody", {}, vocabRows)
      ])
    ]);

    const englishBlock = el("section", { className: "lesson-section" },
      [el("h3", { className: "lesson-section-title", text: "Simple English Explanation" })].concat(
        lesson.english.map(function (p) { return el("p", { className: "lesson-text", text: p }); })
      )
    );

    const khmerBlock = el("section", { className: "lesson-section" },
      [el("h3", { className: "lesson-section-title", text: "ការពន្យល់ជាភាសាខ្មែរ" })].concat(
        lesson.khmer.map(function (p) {
          return el("p", { className: "lesson-text", text: p, attrs: { lang: "km" } });
        })
      )
    );

    const commandBlocks = lesson.commands.map(function (c) {
      const parts = [el("pre", { className: "command-line" }, [el("code", { text: "$ " + c.cmd })])];
      if (c.output) {
        parts.push(el("pre", { className: "output-block" }, [el("code", { text: c.output })]));
      }
      return el("div", { className: "command-block" }, parts);
    });

    const commands = el("section", { className: "lesson-section" },
      [el("h3", { className: "lesson-section-title", text: "Command Examples" })].concat(commandBlocks)
    );

    const practiceParts = [
      el("h3", { className: "lesson-section-title", text: "Hands-on Practice" }),
      el("p", { className: "lesson-text", text: lesson.practice })
    ];

    if (lesson.practiceHint) {
      practiceParts.push(el("details", { className: "practice-hint" }, [
        el("summary", { text: "Show hint" }),
        el("p", { text: lesson.practiceHint })
      ]));
    }

    const practice = el("section", { className: "lesson-section" }, practiceParts);

    const quizBlock = buildQuizBlock(lesson);

    dom.lessonBody.replaceChildren(
      headerBlock,
      objectives,
      vocab,
      englishBlock,
      khmerBlock,
      commands,
      practice,
      quizBlock
    );
  }

  /* ------------------------------------------------------------
     11. Quiz
     ------------------------------------------------------------ */
  let quizSubmitted = false;

  function buildQuizBlock(lesson) {
    quizSubmitted = false;

    const form = el("form", { className: "quiz-form", attrs: { id: "lesson-quiz-form" } });

    lesson.quiz.forEach(function (q, i) {
      const fieldset = el("fieldset", {
        className: "quiz-question",
        attrs: { "data-q": String(i) }
      });

      fieldset.appendChild(el("legend", { className: "quiz-question-text" }, [
        el("span", { className: "quiz-question-number", text: (i + 1) + "." }),
        " " + q.q
      ]));

      const optionsWrap = el("div", { className: "quiz-options" });

      q.options.forEach(function (opt, optIdx) {
        const inputId = lesson.id + "-q" + i + "-o" + optIdx;
        const input = el("input", {
          type: "radio",
          attrs: { name: "q" + i, value: String(optIdx), id: inputId }
        });
        optionsWrap.appendChild(el("label", { className: "quiz-option", attrs: { for: inputId } }, [
          input,
          el("span", { text: opt })
        ]));
      });

      fieldset.appendChild(optionsWrap);
      fieldset.appendChild(el("p", {
        className: "quiz-feedback",
        attrs: { hidden: "", "aria-live": "polite" }
      }));
      form.appendChild(fieldset);
    });

    form.appendChild(el("div", { className: "quiz-actions" }, [
      el("button", {
        type: "submit",
        className: "btn btn-primary",
        text: "Check Answers",
        attrs: { id: "quiz-check-btn" }
      })
    ]));

    form.addEventListener("submit", function (e) { handleQuizSubmit(e, lesson); });

    return el("section", { className: "lesson-section quiz-block", attrs: { id: "lesson-quiz" } }, [
      el("h3", { className: "lesson-section-title", text: "Quick Quiz" }),
      el("p", {
        className: "quiz-intro",
        text:
          "Choose one answer per question. You need " + PASS_THRESHOLD +
          "% or higher to pass. You can retry as many times as you like."
      }),
      form,
      el("div", { className: "quiz-result", attrs: { id: "quiz-result", "aria-live": "polite" } })
    ]);
  }

  function handleQuizSubmit(event, lesson) {
    event.preventDefault();
    if (quizSubmitted) return;

    const form = event.currentTarget;
    const answers = [];
    let allAnswered = true;

    lesson.quiz.forEach(function (q, i) {
      const checked = form.querySelector('input[name="q' + i + '"]:checked');
      if (!checked) allAnswered = false;
      answers.push(checked ? Number(checked.value) : -1);
    });

    const result = form.parentElement.querySelector("#quiz-result");

    if (!allAnswered) {
      result.textContent = "Please answer every question before checking.";
      result.classList.remove("is-pass", "is-fail");
      return;
    }

    quizSubmitted = true;

    let score = 0;
    lesson.quiz.forEach(function (q, i) {
      if (answers[i] === q.correct) score += 1;
    });

    const pct = Math.round((score / lesson.quiz.length) * 100);
    const passed = pct >= PASS_THRESHOLD;

    lesson.quiz.forEach(function (q, i) {
      const fieldset = form.querySelector('[data-q="' + i + '"]');
      const labels = fieldset.querySelectorAll(".quiz-option");

      labels.forEach(function (label, optIdx) {
        label.classList.remove("is-correct", "is-wrong");
        const input = label.querySelector("input");
        if (input) input.disabled = true;

        if (optIdx === q.correct) label.classList.add("is-correct");
        if (answers[i] === optIdx && answers[i] !== q.correct) {
          label.classList.add("is-wrong");
        }
      });

      const fb = fieldset.querySelector(".quiz-feedback");
      const isRight = answers[i] === q.correct;

      fb.hidden = false;
      fb.classList.toggle("is-correct", isRight);
      fb.classList.toggle("is-wrong", !isRight);
      fb.textContent = (isRight ? "✓ Correct. " : "✗ Not quite. ") + q.explain;
    });

    result.classList.remove("is-pass", "is-fail");
    result.classList.add(passed ? "is-pass" : "is-fail");
    result.textContent =
      "You scored " + score + " of " + lesson.quiz.length + " (" + pct + "%). " +
      (passed
        ? "You passed! Well done. 🎉"
        : "You need " + PASS_THRESHOLD + "% to pass. Review the lesson and try again.");

    const checkBtn = form.querySelector("#quiz-check-btn");
    if (checkBtn) checkBtn.hidden = true;

    if (!passed) {
      const retry = el("button", {
        type: "button",
        className: "btn btn-secondary",
        text: "Retry Quiz"
      });
      retry.addEventListener("click", retryQuiz);
      result.appendChild(el("div", { className: "quiz-actions" }, [retry]));
    } else {
      // Save best score
      const prev = progress.quizScores[lesson.id] || 0;
      if (pct > prev) {
        progress.quizScores[lesson.id] = pct;
        saveProgress();
      }
      // Award XP once (awardXpForLesson is idempotent per lesson id)
      awardXpForLesson(lesson);
    }

    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function retryQuiz() {
    renderLesson();
    const quiz = document.getElementById("lesson-quiz");
    if (quiz) quiz.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ------------------------------------------------------------
     12. Next lesson
     ------------------------------------------------------------ */
  function handleNextClick() {
    if (!dom.nextNote) return;
    dom.nextNote.hidden = false;
    dom.nextNote.textContent =
      "More lessons are coming soon. Great job finishing Git Basics! 🎉";
  }

  /* ------------------------------------------------------------
     13. Reset progress
     ------------------------------------------------------------ */
  function resetProgress() {
    const ok = window.confirm(
      "Reset all GitQuest progress? This clears your XP, completed lessons, and quiz scores."
    );
    if (!ok) return;

    progress = defaultProgress();
    saveProgress();
    renderDashboard();
    renderLessonCard();

    // If the lesson view is open, close it so the card refreshes in context.
    if (dom.lessonView && !dom.lessonView.hidden) {
      closeLesson();
    }
    showToast("Progress reset. You're starting fresh.");
  }

  /* ------------------------------------------------------------
     14. Events
     ------------------------------------------------------------ */
  function bindEvents() {
    if (dom.gitBasicsBtn) {
      dom.gitBasicsBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        openLesson();
      });
    }

    if (dom.gitBasicsCard) {
      dom.gitBasicsCard.addEventListener("click", function (e) {
        if (e.target.closest("button")) return;
        openLesson();
      });
      dom.gitBasicsCard.style.cursor = "pointer";
    }

    if (dom.backBtn) dom.backBtn.addEventListener("click", closeLesson);
    if (dom.nextBtn) dom.nextBtn.addEventListener("click", handleNextClick);
    if (dom.resetBtn) dom.resetBtn.addEventListener("click", resetProgress);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && dom.lessonView && !dom.lessonView.hidden) {
        closeLesson();
      }
    });
  }

  /* ------------------------------------------------------------
     15. Init
     ------------------------------------------------------------ */
  function init() {
    cacheDom();
    renderDashboard();
    renderLessonCard();
    lastRenderedLevel = levelForXp(progress.xp);
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
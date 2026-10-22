/* ============================================================
   GitQuest — app.js
   Lesson system · quizzes · XP · progress · localStorage
   ============================================================ */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     1. LESSON DATA
     ------------------------------------------------------------ */
  const LESSONS = [
    {
      id: "git-basics",
      title: "Git Basics",
      titleKm: "មូលដ្ឋានគ្រឹះ Git",
      difficulty: "Beginner",
      xp: 100,
      summary: "Understand version control and why Git matters for every developer.",
      objectives: [
        "Explain what version control is and why it matters.",
        "Describe what Git is and what a repository stores.",
        "Understand what a commit records."
      ],
      vocab: [
        { en: "Version control", km: "ការគ្រប់គ្រងកំណែ", note: "Tracking changes to files over time." },
        { en: "Repository", km: "ឃ្លាំងកូដ", note: "A project folder that Git tracks." },
        { en: "Commit", km: "ការរក្សាទុក", note: "A saved snapshot of changes." }
      ],
      english: [
        "Git is a distributed version control system. It records changes to your files so you can review, undo, and share work safely.",
        "A repository (repo) is your project folder plus a hidden .git folder that stores the full history. Every commit is a snapshot with a message."
      ],
      khmer: [
        "Git គឺជាប្រព័ន្ធគ្រប់គ្រងកំណែ (version control) ដែលរក្សាទុកការផ្លាស់ប្តូរឯកសាររបស់អ្នក។ អ្នកអាចត្រឡប់ក្រោយ ឬចែករំលែកកូដបានយ៉ាងសុវត្ថិភាព។",
        "Repository គឺជាថតគម្រោងរបស់អ្នក បូករួមទាំងថត .git ដែលផ្ទុកប្រវត្តិទាំងអស់។ Commit នីមួយៗគឺជាការថតរូបនៃការផ្លាស់ប្តូរ។"
      ],
      commands: [
        { cmd: "git --version", output: "git version 2.43.0" },
        { cmd: "git init", output: "Initialized empty Git repository in /home/sokha/project/.git/" }
      ],
      practice: "Open a terminal and run `git --version`. Then create an empty folder and run `git init` inside it. Look for the new `.git` folder.",
      practiceHint: "On Windows, use Git Bash or PowerShell. On macOS/Linux, use Terminal.",
      quiz: [
        { q: "What does Git mainly help you do?", options: ["Edit photos", "Track changes in your code over time", "Browse the internet", "Send emails"], correct: 1, explain: "Git is a version control system that records changes so you can revisit or undo them." },
        { q: "What is a repository?", options: ["A folder that Git tracks and stores project history in", "A website for hosting videos", "A type of Git command", "A programming language"], correct: 0, explain: "A repository (repo) is your project folder plus the hidden .git history Git keeps." },
        { q: "What is a commit?", options: ["Deleting your project", "Uploading a photo", "A saved snapshot of your staged changes", "A chat message"], correct: 2, explain: "A commit records a snapshot of your changes with a message." },
        { q: "Why is Git called distributed?", options: ["Because every developer has a full copy of the history", "Because it only works offline", "Because it is paid", "Because it uses one central server only"], correct: 0, explain: "Each clone contains the full repository history, so work continues even offline." }
      ]
    },
    {
      id: "installation-setup",
      title: "Git Installation and Setup",
      titleKm: "ការដំឡើង និងការកំណត់ Git",
      difficulty: "Beginner",
      xp: 100,
      summary: "Install Git on Windows, macOS, or Linux and check that it works.",
      objectives: [
        "Install Git on your operating system.",
        "Verify the installation from the terminal.",
        "Know where to find help."
      ],
      vocab: [
        { en: "Terminal", km: "ស្ថានីយ (Terminal)", note: "The text window where you type commands." },
        { en: "Installer", km: "កម្មវិធីដំឡើង", note: "The file that installs Git on your computer." },
        { en: "PATH", km: "ផ្លូវបញ្ជា", note: "The list of folders your terminal searches for commands." }
      ],
      english: [
        "Download Git from the official site git-scm.com. On Windows you get Git Bash, which is a friendly terminal.",
        "After installing, open your terminal and run git --version. If you see a version number, Git is ready."
      ],
      khmer: [
        "ទាញយក Git ពីគេហទំព័រផ្លូវការ git-scm.com។ នៅលើ Windows អ្នកនឹងទទួលបាន Git Bash ដែលជា terminal ងាយស្រួលប្រើ។",
        "បន្ទាប់ពីដំឡើងរួច បើក terminal ហើយរត់ git --version។ ប្រសិនបើឃើញលេខកំណែ នោះ Git រួចរាល់ហើយ។"
      ],
      commands: [
        { cmd: "git --version", output: "git version 2.43.0" },
        { cmd: "which git", output: "/usr/bin/git" }
      ],
      practice: "Run `git --version` in your terminal and note the version. Then run `git --help` to see the list of commands.",
      practiceHint: "If the command is not found, restart your terminal or reinstall Git and choose the option to add Git to PATH.",
      quiz: [
        { q: "Which command checks if Git is installed?", options: ["git status", "git --version", "git install", "git check"], correct: 1, explain: "git --version prints the installed Git version." },
        { q: "Which site provides the official Git download?", options: ["github.com", "git-scm.com", "npmjs.com", "python.org"], correct: 1, explain: "The official Git download lives at git-scm.com." },
        { q: "On Windows, which tool is recommended to run Git commands?", options: ["Notepad", "Git Bash", "Excel", "Photoshop"], correct: 1, explain: "Git Bash gives you a Unix-like terminal on Windows." },
        { q: "After installing, where should the git command be available?", options: ["Only in the browser", "In your terminal PATH", "Only in GitHub", "Only inside VS Code"], correct: 1, explain: "The installer adds Git to PATH so your terminal can find it." }
      ]
    },
    {
      id: "git-configuration",
      title: "Git Configuration",
      titleKm: "ការកំណត់ Git",
      difficulty: "Beginner",
      xp: 100,
      summary: "Set your name and email so every commit is linked to you.",
      objectives: [
        "Set user.name and user.email.",
        "Understand global vs local configuration.",
        "List your current settings."
      ],
      vocab: [
        { en: "Configuration", km: "ការកំណត់", note: "Settings that control how Git behaves." },
        { en: "Global", km: "សកល", note: "Applies to every repository for your user." },
        { en: "Local", km: "មូលដ្ឋាន", note: "Applies only to the current repository." }
      ],
      english: [
        "Git stamps every commit with your name and email. Set them once with --global so every repository uses them.",
        "You can also set a different email per repository by running the same command without --global inside that repo."
      ],
      khmer: [
        "Git ដាក់ឈ្មោះ និងអ៊ីមែលរបស់អ្នកលើ commit នីមួយៗ។ កំណត់ពួកវាម្តងដោយប្រើ --global ដើម្បីឱ្យ repository ទាំងអស់ប្រើវា។",
        "អ្នកក៏អាចកំណត់អ៊ីមែលខុសៗគ្នាសម្រាប់ repository នីមួយៗ ដោយរត់ពាក្យបញ្ជាដូចគ្នាដោយគ្មាន --global នៅក្នុង repository នោះ។"
      ],
      commands: [
        { cmd: 'git config --global user.name "Sokha"', output: "" },
        { cmd: 'git config --global user.email "sokha@example.com"', output: "" },
        { cmd: "git config --list", output: "user.name=Sokha\nuser.email=sokha@example.com" }
      ],
      practice: "Set your name and email with `git config --global`. Then run `git config --list` and confirm both appear.",
      practiceHint: "If you already set them, `git config --list` will show your values. Use `--show-origin` to see where each value comes from.",
      quiz: [
        { q: "Which command sets your name globally?", options: ['git config --global user.name "Your Name"', 'git set name "Your Name"', 'git name "Your Name"', 'git config name "Your Name"'], correct: 0, explain: "The correct key is user.name and --global applies it everywhere." },
        { q: "Why set user.email?", options: ["To buy Git Pro", "So commits are linked to you", "To download Git", "To change your username"], correct: 1, explain: "Git uses the email to attribute each commit to its author." },
        { q: "What does --global mean?", options: ["Applies to all repositories for your user", "Applies only to the current file", "Deletes all settings", "Only works online"], correct: 0, explain: "--global writes the setting to your user-level Git config." },
        { q: "Which command lists current config?", options: ["git list", "git config --list", "git show config", "git settings"], correct: 1, explain: "git config --list prints all active configuration values." }
      ]
    },
    {
      id: "init-add-commit",
      title: "Git Init, Add, and Commit",
      titleKm: "Git Init, Add និង Commit",
      difficulty: "Intermediate",
      xp: 150,
      summary: "Create a repository, stage your files, and save your first commit.",
      objectives: [
        "Initialize a new repository with git init.",
        "Stage changes with git add.",
        "Save a snapshot with git commit.",
        "Read the history with git log."
      ],
      vocab: [
        { en: "Init", km: "ចាប់ផ្តើម", note: "Create a new empty Git repository." },
        { en: "Staging area", km: "តំបន់រៀបចំ", note: "Files prepared for the next commit." },
        { en: "Log", km: "កំណត់ត្រា", note: "The list of past commits." }
      ],
      english: [
        "git init turns the current folder into a Git repository. git add moves changes into the staging area. git commit saves the staged snapshot with a message.",
        "Use git status often to see what is staged, modified, or untracked."
      ],
      khmer: [
        "git init បំប្លែងថតបច្ចុប្បន្នទៅជា Git repository។ git add ផ្លាស់ប្តូរទៅតំបន់រៀបចំ (staging)។ git commit រក្សាទុក snapshot ជាមួយសារ។",
        "ប្រើ git status ឱ្យបានញឹកញាប់ ដើម្បីដឹងថាឯកសារណាត្រូវបានរៀបចំ កែប្រែ ឬមិនទាន់តាមដាន។"
      ],
      commands: [
        { cmd: "git init", output: "Initialized empty Git repository in /home/sokha/project/.git/" },
        { cmd: "git add .", output: "" },
        { cmd: 'git commit -m "first commit"', output: "[main (root-commit) 1a2b3c4] first commit\n 1 file changed, 1 insertion(+)" },
        { cmd: "git log --oneline", output: "1a2b3c4 first commit" }
      ],
      practice: "Inside a new folder, run `git init`, create a file `hello.txt`, run `git add hello.txt`, then commit it with a message. Finish with `git log --oneline`.",
      practiceHint: "Use `git status` between steps to see how the file moves from untracked to staged to committed.",
      quiz: [
        { q: "What does git init do?", options: ["Deletes the folder", "Creates a new Git repository", "Uploads to GitHub", "Installs Git"], correct: 1, explain: "git init creates the hidden .git folder that makes a repository." },
        { q: "What does git add . do?", options: ["Stages all changes in the current folder", "Commits everything", "Pushes to GitHub", "Deletes files"], correct: 0, explain: "The dot means the current folder; git add stages those changes." },
        { q: "Which command saves a snapshot with a message?", options: ["git save", "git commit -m \"msg\"", "git push", "git stage"], correct: 1, explain: "git commit -m records staged changes with the given message." },
        { q: "Which command shows commit history compactly?", options: ["git list", "git log --oneline", "git history", "git show all"], correct: 1, explain: "git log --oneline prints one line per commit." }
      ]
    },
    {
      id: "push-pull",
      title: "Git Push and Pull",
      titleKm: "Git Push និង Pull",
      difficulty: "Intermediate",
      xp: 150,
      summary: "Send your work to GitHub and bring the latest changes back.",
      objectives: [
        "Add a remote with git remote add.",
        "Push commits with git push.",
        "Pull updates with git pull.",
        "Clone a repository."
      ],
      vocab: [
        { en: "Remote", km: "ម៉ាស៊ីនមេពីចម្ងាយ", note: "A repository hosted somewhere else, like GitHub." },
        { en: "Origin", km: "ដើម", note: "The default name for your main remote." },
        { en: "Clone", km: "ការចម្លង", note: "Copy a remote repository to your computer." }
      ],
      english: [
        "A remote is a copy of your repository on a server such as GitHub. origin is the default name. git push sends your commits there and git pull brings new commits down.",
        "git clone creates a full local copy of a remote repository, including its history."
      ],
      khmer: [
        "Remote គឺជាការចម្លង repository របស់អ្នកនៅលើម៉ាស៊ីនមេដូចជា GitHub។ origin គឺជាឈ្មោះលំនាំដើម។ git push ផ្ញើ commit ទៅ ហើយ git pull ទាញ commit ថ្មីមកវិញ។",
        "git clone បង្កើតការចម្លងពេញលេញនៅលើកុំព្យូទ័ររបស់អ្នក រួមទាំងប្រវត្តិទាំងអស់។"
      ],
      commands: [
        { cmd: "git remote add origin https://github.com/user/repo.git", output: "" },
        { cmd: "git push -u origin main", output: "To https://github.com/user/repo.git\n * [new branch]      main -> main" },
        { cmd: "git pull", output: "Already up to date." },
        { cmd: "git clone https://github.com/user/repo.git", output: "Cloning into 'repo'..." }
      ],
      practice: "Create an empty repository on GitHub. Add it as origin, push your main branch, then make a change on GitHub and pull it back.",
      practiceHint: "If push asks for a password, use a personal access token instead of your account password.",
      quiz: [
        { q: "What is origin?", options: ["The default name for a remote repository", "Your local branch", "A Git installer", "A commit message"], correct: 0, explain: "origin is the conventional name for the main remote." },
        { q: "Which command sends commits to GitHub?", options: ["git send", "git push", "git upload", "git sync"], correct: 1, explain: "git push uploads local commits to the remote." },
        { q: "Which command brings remote changes to your local repo?", options: ["git pull", "git fetch-only", "git copy", "git import"], correct: 0, explain: "git pull fetches and merges remote changes." },
        { q: "What does git clone do?", options: ["Deletes a repository", "Copies a remote repo to your computer", "Creates a branch", "Merges two repos"], correct: 1, explain: "git clone makes a full local copy including history." }
      ]
    },
    {
      id: "branches-merging",
      title: "Branches and Merging",
      titleKm: "មែកធាង និងការបញ្ចូលគ្នា",
      difficulty: "Intermediate",
      xp: 150,
      summary: "Work safely on separate branches, then merge them back together.",
      objectives: [
        "Create and switch branches.",
        "Merge a branch into main.",
        "Delete a finished branch."
      ],
      vocab: [
        { en: "Branch", km: "មែកធាង", note: "A separate line of development." },
        { en: "Checkout", km: "ប្តូរ", note: "Switch to a branch or restore files." },
        { en: "Merge", km: "បញ្ចូលគ្នា", note: "Combine two branches." }
      ],
      english: [
        "A branch is a movable pointer to a line of commits. Create one with git branch, switch with git switch, and merge with git merge.",
        "After merging, delete the finished branch to keep the list tidy. The main branch keeps a clean history."
      ],
      khmer: [
        "មែកធាង (branch) គឺជាទ្រនិចដែលអាចផ្លាស់ទីបាន ចង្អុលទៅបន្ទាត់នៃ commit។ បង្កើតដោយ git branch ប្តូរដោយ git switch និងបញ្ចូលដោយ git merge។",
        "បន្ទាប់ពីបញ្ចូលរួច លុបមែកធាងដែលបានបញ្ចប់ ដើម្បីរក្សាបញ្ជីឱ្យស្អាត។ មែកធាង main រក្សាប្រវត្តិស្អាត។"
      ],
      commands: [
        { cmd: "git branch feature", output: "" },
        { cmd: "git switch feature", output: "Switched to branch 'feature'" },
        { cmd: "git switch main", output: "Switched to branch 'main'" },
        { cmd: "git merge feature", output: "Fast-forward\n file.txt | 1 +\n 1 file changed, 1 insertion(+)" },
        { cmd: "git branch -d feature", output: "Deleted branch feature (was 1a2b3c4)." }
      ],
      practice: "On main, create a branch `feature`, switch to it, make a commit, switch back to main, and merge `feature`. Then delete the branch.",
      practiceHint: "Use `git branch` with no arguments to see the full list and confirm which branch you are on.",
      quiz: [
        { q: "Which command creates a new branch?", options: ["git branch feature", "git new feature", "git add feature", "git create feature"], correct: 0, explain: "git branch <name> creates a new branch pointer." },
        { q: "Which command switches branches?", options: ["git checkout-only", "git switch feature", "git change feature", "git move feature"], correct: 1, explain: "git switch is the modern command for changing branches." },
        { q: "What does git merge feature do while on main?", options: ["Deletes feature", "Combines feature into main", "Renames main", "Pushes to GitHub"], correct: 1, explain: "git merge integrates the named branch into the current branch." },
        { q: "Which command deletes a branch?", options: ["git remove feature", "git branch -d feature", "git delete feature", "git branch --remove"], correct: 1, explain: "git branch -d removes a merged branch safely." }
      ]
    },
    {
      id: "merge-conflicts",
      title: "Merge Conflicts",
      titleKm: "ជម្លោះពេលបញ្ចូលគ្នា",
      difficulty: "Advanced",
      xp: 200,
      summary: "Understand why conflicts happen and how to resolve them.",
      objectives: [
        "Recognize conflict markers.",
        "Resolve a conflict by editing the file.",
        "Finish the merge or abort it."
      ],
      vocab: [
        { en: "Conflict", km: "ជម្លោះ", note: "Two branches changed the same lines." },
        { en: "Markers", km: "សញ្ញាសម្គាល់", note: "The <<<<<<<, =======, >>>>>>> lines." },
        { en: "Resolve", km: "ដោះស្រាយ", note: "Edit the file so the conflict is gone." }
      ],
      english: [
        "A conflict happens when both branches edit the same lines. Git stops and writes markers into the file so you can choose what to keep.",
        "Edit the file to keep the correct lines, remove the markers, run git add, then git commit. To cancel, run git merge --abort."
      ],
      khmer: [
        "ជម្លោះកើតឡើងនៅពេលមែកធាងទាំងពីរកែប្រែបន្ទាត់ដូចគ្នា។ Git ឈប់ ហើយសរសេរសញ្ញាសម្គាល់ចូលក្នុងឯកសារ ដើម្បីឱ្យអ្នកជ្រើសរើសអ្វីដែលត្រូវរក្សា។",
        "កែឯកសារដើម្បីរក្សាបន្ទាត់ត្រឹមត្រូវ លុបសញ្ញាសម្គាល់ រត់ git add បន្ទាប់មក git commit។ ដើម្បីបោះបង់ រត់ git merge --abort។"
      ],
      commands: [
        { cmd: "git merge feature", output: "Auto-merging file.txt\nCONFLICT (content): Merge conflict in file.txt\nAutomatic merge failed; fix conflicts and then commit the result." },
        { cmd: "git add file.txt", output: "" },
        { cmd: 'git commit -m "resolve conflict"', output: "[main 9z8y7x6] resolve conflict" },
        { cmd: "git merge --abort", output: "" }
      ],
      practice: "Create a conflict on purpose: on main and on a feature branch, edit the same line of the same file. Merge and resolve the markers by hand.",
      practiceHint: "Search the file for `<<<<<<<`, `=======`, and `>>>>>>>` to find the conflict quickly.",
      quiz: [
        { q: "When does a merge conflict happen?", options: ["When both branches change the same lines", "When you push to GitHub", "When you clone a repo", "When you set user.name"], correct: 0, explain: "Git cannot pick a winner when the same lines changed differently." },
        { q: "What do conflict markers look like?", options: ["<<<<<<<, =======, >>>>>>>", "{{{{ }}}}", "[[[ ]]]", "*****"], correct: 0, explain: "Git uses those three marker lines to show the competing versions." },
        { q: "After resolving, what do you run?", options: ["git add then git commit", "git reset", "git push --force", "git init"], correct: 0, explain: "Staging the file and committing completes the merge." },
        { q: "Which command cancels a merge?", options: ["git stop", "git merge --abort", "git reset --hard", "git cancel"], correct: 1, explain: "git merge --abort restores the state before the merge." }
      ]
    },
    {
      id: "pull-requests",
      title: "Pull Requests",
      titleKm: "សំណើទាញ (Pull Requests)",
      difficulty: "Intermediate",
      xp: 150,
      summary: "Propose changes on GitHub, review them, and merge safely.",
      objectives: [
        "Explain what a pull request is.",
        "Create a PR from a branch.",
        "Review, comment, and merge."
      ],
      vocab: [
        { en: "Pull Request", km: "សំណើទាញ", note: "A request to merge your branch into another." },
        { en: "Fork", km: "ការបំបែក", note: "A personal copy of someone else's repository." },
        { en: "Review", km: "ពិនិត្យ", note: "Teammates read and comment on your changes." }
      ],
      english: [
        "A pull request is a GitHub feature. You push a branch, open a PR, and teammates review the diff before it is merged.",
        "PRs keep the main branch stable and give everyone a place to discuss changes."
      ],
      khmer: [
        "Pull Request គឺជាមុខងាររបស់ GitHub។ អ្នកផ្ញើមែកធាងទៅ បើក PR ហើយសមាជិកក្រុមពិនិត្យការផ្លាស់ប្តូរ មុនពេលបញ្ចូល។",
        "PR រក្សាមែកធាង main ឱ្យមានស្ថិរភាព និងផ្តល់កន្លែងពិភាក្សាការផ្លាស់ប្តូរ។"
      ],
      commands: [
        { cmd: "git push -u origin feature", output: " * [new branch]      feature -> feature" }
      ],
      practice: "Push a branch to GitHub, open a pull request against main, add a description, and request a review. Merge it once approved.",
      practiceHint: "Write a clear PR title and a short list of what changed. Mention how to test it.",
      quiz: [
        { q: "Where do pull requests live?", options: ["In your local terminal only", "On GitHub", "Inside git config", "In the .git folder"], correct: 1, explain: "Pull requests are a GitHub feature, not a core Git command." },
        { q: "What is a fork?", options: ["A personal copy of someone else's repository", "A Git installer", "A commit message", "A branch deletion"], correct: 0, explain: "Forking copies a repository to your own account." },
        { q: "What does a code review do?", options: ["Deletes your branch", "Lets teammates comment before merging", "Installs Git", "Creates a commit"], correct: 1, explain: "Reviews give feedback and catch problems before merge." },
        { q: "Which branch is usually the base of a pull request?", options: ["feature", "main", "gh-pages", "release"], correct: 1, explain: "Most PRs target main as the stable base branch." }
      ]
    },
    {
      id: "git-rebase",
      title: "Git Rebase",
      titleKm: "Git Rebase",
      difficulty: "Advanced",
      xp: 200,
      summary: "Rewrite history into a clean line and squash small commits.",
      objectives: [
        "Explain what rebase does.",
        "Run a basic rebase onto main.",
        "Know when not to rebase."
      ],
      vocab: [
        { en: "Rebase", km: "រៀបចំឡើងវិញ", note: "Replay commits on a new base." },
        { en: "Interactive", km: "អន្តរកម្ម", note: "Choose what to edit, squash, or drop." },
        { en: "Squash", km: "បង្រួម", note: "Combine several commits into one." }
      ],
      english: [
        "git rebase main replays your branch commits on top of main, producing a straight history. It is different from merge, which creates a merge commit.",
        "Never rebase branches that other people share, because it rewrites commit history. Use rebase on your own feature branches."
      ],
      khmer: [
        "git rebase main ចាក់ commit នៃមែកធាងរបស់អ្នកលើ main ឡើងវិញ ដែលបង្កើតប្រវត្តិជាបន្ទាត់ត្រង់។ វាខុសពី merge ដែលបង្កើត merge commit។",
        "កុំ rebase លើមែកធាងដែលអ្នកដទៃចែករំលែក ព្រោះវាសរសេរប្រវត្តិឡើងវិញ។ ប្រើ rebase តែលើមែកធាងផ្ទាល់ខ្លួនរបស់អ្នក។"
      ],
      commands: [
        { cmd: "git switch feature", output: "Switched to branch 'feature'" },
        { cmd: "git rebase main", output: "Successfully rebased and updated refs/heads/feature." },
        { cmd: "git rebase -i HEAD~3", output: "" },
        { cmd: "git rebase --abort", output: "" }
      ],
      practice: "On a feature branch, make two small commits, then run `git rebase -i HEAD~2` and squash them into one commit with a clear message.",
      practiceHint: "In the interactive editor, change `pick` to `squash` on the second line and save.",
      quiz: [
        { q: "What does git rebase main do?", options: ["Deletes main", "Replays your commits on top of main", "Pushes to GitHub", "Clones main"], correct: 1, explain: "Rebase moves your commits to a new base." },
        { q: "How is rebase different from merge?", options: ["It rewrites history into a straight line", "It creates a merge commit", "It deletes the branch", "It is slower to type"], correct: 0, explain: "Rebase avoids a merge commit by rewriting commits on a new base." },
        { q: "Why avoid rebasing shared branches?", options: ["It rewrites commits others may have", "It costs money", "It breaks the terminal", "It deletes files"], correct: 0, explain: "Rewriting shared history causes confusion for teammates." },
        { q: "Which command aborts a rebase?", options: ["git stop", "git rebase --abort", "git cancel", "git reset"], correct: 1, explain: "git rebase --abort restores the pre-rebase state." }
      ]
    },
    {
      id: "real-world-workflow",
      title: "Real-world Git Workflow",
      titleKm: "លំហូរការងារ Git ជាក់ស្តែង",
      difficulty: "Advanced",
      xp: 200,
      summary: "Put everything together in a team-friendly feature workflow.",
      objectives: [
        "Describe the feature-branch workflow.",
        "Open a pull request, get a review, and merge.",
        "Keep main stable for releases."
      ],
      vocab: [
        { en: "Workflow", km: "លំហូរ", note: "The steps a team follows to ship code." },
        { en: "Feature branch", km: "មែកធាងមុខងារ", note: "A branch for one task or feature." },
        { en: "CI", km: "CI", note: "Continuous integration — automated tests on every push." }
      ],
      english: [
        "The most common team workflow: branch from main, commit small changes, push, open a pull request, get a review, then merge.",
        "Keep main deployable at all times. Use feature branches and pull requests so changes are reviewed before they reach main."
      ],
      khmer: [
        "លំហូរការងារក្រុមដែលពេញនិយមបំផុត៖ បង្កើតមែកធាងពី main commit តូចៗ ផ្ញើ បើក pull request ទទួលការពិនិត្យ បន្ទាប់មកបញ្ចូល។",
        "រក្សា main ឱ្យអាចដាក់ឱ្យដំណើរការបានគ្រប់ពេល។ ប្រើមែកធាងមុខងារ និង pull request ដើម្បីឱ្យការផ្លាស់ប្តូរត្រូវបានពិនិត្យមុនពេលចូល main។"
      ],
      commands: [
        { cmd: "git switch -c feature-login", output: "Switched to a new branch 'feature-login'" },
        { cmd: 'git commit -m "add login form"', output: "[feature-login 5f4e3d2] add login form" },
        { cmd: "git push -u origin feature-login", output: " * [new branch]      feature-login -> feature-login" }
      ],
      practice: "Run through the full cycle on a test repo: branch, commit, push, open a PR, get a review, merge, and delete the branch.",
      practiceHint: "Ask a friend to review your PR. Reviewing someone else's PR is the fastest way to learn.",
      quiz: [
        { q: "What is the first step in a feature workflow?", options: ["Push to main", "Create a branch from main", "Delete main", "Force push"], correct: 1, explain: "Start from a fresh branch so main stays stable." },
        { q: "What should you do before opening a PR?", options: ["Push your branch and write a clear description", "Delete the branch", "Rebase shared branches", "Push directly to main"], correct: 0, explain: "A clear description helps reviewers understand your change." },
        { q: "What happens after a PR is approved?", options: ["Merge it into main", "Delete the repository", "Reinstall Git", "Reset the branch"], correct: 0, explain: "Approved PRs are merged into the base branch." },
        { q: "Why keep main stable?", options: ["So releases stay reliable", "So Git runs faster", "So you can skip reviews", "So branches disappear"], correct: 0, explain: "A stable main is always safe to deploy." }
      ]
    }
  ];

  /* ------------------------------------------------------------
     2. CONSTANTS & HELPERS
     ------------------------------------------------------------ */
  const STORAGE_KEY = "gitquest:v1";
  const PASS_THRESHOLD = 70;         // percent needed to pass a quiz
  const XP_PER_LEVEL = 250;          // XP needed per level
  const REQUIRE_PREREQUISITES = true; // set false to unlock all lessons
  const LEVEL_TITLES = [
    "Fresh Clone", "Initiate", "Commit Cadet", "Branch Builder",
    "Merge Master", "Rebase Ranger", "Git Guru", "Open Source Hero"
  ];

  function formatNumber(n) {
    return Number(n).toLocaleString("en-US");
  }
  function levelForXp(xp) {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
  }
  function levelTitle(level) {
    return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  }
  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }
  function yesterdayISO() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  }

  /**
   * Tiny DOM builder. All text goes through textContent, so no HTML injection.
   */
  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        const val = props[key];
        if (key === "className") {
          node.className = val;
        } else if (key === "text") {
          node.textContent = val;
        } else if (key === "attrs") {
          Object.keys(val).forEach(function (ak) {
            if (val[ak] === false || val[ak] == null) return;
            node.setAttribute(ak, String(val[ak]));
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

  /* ------------------------------------------------------------
     3. STATE & STORAGE
     ------------------------------------------------------------ */
  function defaultState() {
    return {
      version: 1,
      completed: {},   // { lessonId: true }
      started: {},     // { lessonId: true }
      quizScores: {},  // { lessonId: bestPercent }
      xp: 0,
      streak: { count: 0, lastDate: null }
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const s = defaultState();
      if (parsed && typeof parsed === "object") {
        if (parsed.completed && typeof parsed.completed === "object") s.completed = parsed.completed;
        if (parsed.started && typeof parsed.started === "object") s.started = parsed.started;
        if (parsed.quizScores && typeof parsed.quizScores === "object") s.quizScores = parsed.quizScores;
        if (Number.isFinite(parsed.xp)) s.xp = parsed.xp;
        if (parsed.streak && typeof parsed.streak === "object") {
          s.streak.count = Number.isFinite(parsed.streak.count) ? parsed.streak.count : 0;
          s.streak.lastDate = typeof parsed.streak.lastDate === "string" ? parsed.streak.lastDate : null;
        }
      }
      // Expire the streak if more than one day was skipped
      const today = todayISO();
      if (s.streak.lastDate !== today && s.streak.lastDate !== yesterdayISO()) {
        s.streak.count = 0;
      }
      return s;
    } catch (err) {
      console.warn("GitQuest: could not load saved state", err);
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("GitQuest: could not save state", err);
    }
  }

  let state = loadState();
  let currentLessonId = null;
  let quizState = null;

  /* ------------------------------------------------------------
     4. DOM CACHE
     ------------------------------------------------------------ */
  const $ = function (sel) { return document.querySelector(sel); };
  const $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  let els = {};

  function cacheDom() {
    els = {
      lessonGrid: $("#lesson-grid"),
      lessonView: $("#lesson-view"),
      lessonBody: $("#lesson-view-body"),
      lessonFooter: $("#lesson-view-footer"),
      lessonPosition: $("#lesson-view-position"),
      backBtn: $("#back-to-lessons-btn"),
      nextBtn: $("#next-lesson-btn"),
      overallProgress: $("#overall-progress"),
      overallProgressValue: $("#overall-progress-value"),
      completedLessons: $("#completed-lessons"),
      totalLessons: $("#total-lessons"),
      xpDisplay: $("#xp-display"),
      headerXp: $("#header-xp"),
      currentLevel: $("#current-level"),
      headerLevel: $("#header-level"),
      streakCount: $("#streak-count"),
      profileRole: $(".profile-role"),
      profileChip: $(".profile-chip"),
      searchForm: $("#lesson-search-form"),
      searchInput: $("#lesson-search"),
      startQuizBtn: $("#start-quiz-btn"),
      startChallengeBtn: $("#start-challenge-btn"),
      toast: $("#toast"),
      navLinks: $$(".nav-link"),
      dashboardSections: $$(".dashboard-section")
    };
  }

  /* ------------------------------------------------------------
     5. LESSON STATUS
     ------------------------------------------------------------ */
  function isCompleted(id) { return !!state.completed[id]; }
  function isStarted(id) { return !!state.started[id]; }

  function isUnlocked(id) {
    if (!REQUIRE_PREREQUISITES) return true;
    const idx = LESSONS.findIndex(function (l) { return l.id === id; });
    if (idx <= 0) return true;
    const prev = LESSONS[idx - 1];
    return isCompleted(prev.id);
  }

  function lessonStatus(id) {
    if (isCompleted(id)) return "completed";
    if (!isUnlocked(id)) return "locked";
    if (isStarted(id)) return "in-progress";
    return "not-started";
  }

  /* ------------------------------------------------------------
     6. PROGRESS RENDERING
     ------------------------------------------------------------ */
  function renderProgress() {
    const total = LESSONS.length;
    const completed = LESSONS.filter(function (l) { return isCompleted(l.id); }).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;

    if (els.overallProgress) {
      els.overallProgress.value = pct;
      els.overallProgress.textContent = pct + "%";
    }
    if (els.overallProgressValue) els.overallProgressValue.textContent = pct + "%";
    if (els.completedLessons) els.completedLessons.textContent = completed;
    if (els.totalLessons) els.totalLessons.textContent = total;
    if (els.xpDisplay) els.xpDisplay.textContent = formatNumber(state.xp);
    if (els.headerXp) els.headerXp.textContent = formatNumber(state.xp);

    const lvl = levelForXp(state.xp);
    if (els.currentLevel) els.currentLevel.textContent = lvl;
    if (els.headerLevel) els.headerLevel.textContent = lvl;
    if (els.streakCount) els.streakCount.textContent = state.streak.count;
    if (els.profileRole) els.profileRole.textContent = levelTitle(lvl);
    if (els.profileChip) {
      els.profileChip.setAttribute(
        "aria-label",
        "Open your profile: Sokha, Level " + lvl + ", " + state.xp + " XP"
      );
    }
  }

  /* ------------------------------------------------------------
     7. LESSON CARDS
     ------------------------------------------------------------ */
  function renderLessonCards() {
    if (!els.lessonGrid) return;
    const frag = document.createDocumentFragment();
    LESSONS.forEach(function (lesson) {
      frag.appendChild(buildLessonCard(lesson, lessonStatus(lesson.id)));
    });
    els.lessonGrid.replaceChildren(frag);
  }

  function buildLessonCard(lesson, status) {
    const statusLabel =
      status === "completed" ? "Completed" :
      status === "in-progress" ? "In progress" :
      status === "locked" ? "Locked" : "Not started";

    const iconName =
      status === "completed" ? "fa-circle-check" :
      status === "in-progress" ? "fa-hourglass-half" :
      status === "locked" ? "fa-lock" : "fa-book-open";

    const icon = el("span", { className: "lesson-icon" }, [
      el("i", { className: "fa-solid " + iconName, attrs: { "aria-hidden": "true" } })
    ]);

    const difficulty = el("span", {
      className: "badge badge-" + lesson.difficulty.toLowerCase(),
      text: lesson.difficulty
    });
    const statusBadge = el("span", {
      className: "lesson-status-badge lesson-status-" + status,
      text: statusLabel
    });

    const head = el("div", { className: "lesson-card-head" }, [
      icon,
      el("div", { className: "lesson-card-badges" }, [difficulty, statusBadge])
    ]);

    const title = el("h3", { className: "lesson-title", text: lesson.title });
    const desc = el("p", { className: "lesson-desc", text: lesson.summary });
    const descKm = el("p", { className: "lesson-desc-km", text: lesson.titleKm, attrs: { lang: "km" } });

    const progressPct = status === "completed" ? 100 : status === "in-progress" ? 50 : 0;
    const progressWrap = el("div", { className: "lesson-progress" }, [
      el("div", { className: "lesson-progress-head" }, [
        el("span", { text: "Progress" }),
        el("span", { className: "lesson-progress-value", text: progressPct + "%" })
      ]),
      el("progress", {
        className: "progress-bar",
        attrs: {
          value: String(progressPct),
          max: "100",
          "aria-label": lesson.title + " lesson progress"
        }
      })
    ]);

    const btnLabel =
      status === "completed" ? "Review lesson" :
      status === "in-progress" ? "Continue lesson" :
      status === "locked" ? "Locked" : "Start lesson";

    const btnClass =
      status === "locked" ? "btn btn-secondary btn-block" :
      status === "not-started" ? "btn btn-outline btn-block" :
      "btn btn-primary btn-block";

    const btn = el("button", {
      type: "button",
      className: btnClass,
      text: btnLabel,
      attrs: {
        "data-lesson-id": lesson.id,
        "aria-label": status === "locked"
          ? lesson.title + " is locked. Complete the previous lesson first."
          : btnLabel + ": " + lesson.title
      }
    });

    if (status === "locked") {
      btn.disabled = true;
      btn.setAttribute("aria-disabled", "true");
    } else {
      btn.addEventListener("click", function () { openLesson(lesson.id); });
    }

    const card = el("article", {
      className: "lesson-card is-" + status,
      attrs: { "data-lesson-id": lesson.id }
    }, [head, title, desc, descKm, progressWrap, btn]);

    if (status !== "locked") {
      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        if (e.target.closest("button")) return;
        openLesson(lesson.id);
      });
    }
    return card;
  }

  /* ------------------------------------------------------------
     8. LESSON NAVIGATION
     ------------------------------------------------------------ */
  function openLesson(id) {
    const lesson = LESSONS.find(function (l) { return l.id === id; });
    if (!lesson) return;

    if (!isUnlocked(id)) {
      showToast("Complete the previous lesson to unlock this one.");
      return;
    }

    currentLessonId = id;
    if (!state.started[id]) {
      state.started[id] = true;
      saveState();
    }
    quizState = null;
    renderLessonView(lesson);
    showLessonView();
    renderLessonCards();
  }

  function showLessonView() {
    els.dashboardSections.forEach(function (s) { s.hidden = true; });
    els.lessonView.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
    const heading = document.getElementById("lesson-view-title");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }

  function closeLesson() {
    if (!els.lessonView || els.lessonView.hidden) return;
    els.lessonView.hidden = true;
    els.dashboardSections.forEach(function (s) { s.hidden = false; });
    currentLessonId = null;
    quizState = null;
    renderLessonCards();
    const lessonsSection = document.getElementById("lessons");
    if (lessonsSection) lessonsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToNextLesson() {
    const idx = LESSONS.findIndex(function (l) { return l.id === currentLessonId; });
    if (idx < 0 || idx >= LESSONS.length - 1) {
      showToast("You are on the last lesson.");
      return;
    }
    const next = LESSONS[idx + 1];
    if (!isUnlocked(next.id)) {
      showToast("Pass this lesson's quiz and complete it to unlock the next lesson.");
      return;
    }
    openLesson(next.id);
  }

  /* ------------------------------------------------------------
     9. LESSON VIEW RENDERING
     ------------------------------------------------------------ */
  function renderLessonView(lesson) {
    const idx = LESSONS.indexOf(lesson);
    els.lessonPosition.textContent = "Lesson " + (idx + 1) + " of " + LESSONS.length;

    const status = lessonStatus(lesson.id);

    const headerBlock = el("div", { className: "lesson-header-block" }, [
      el("div", { className: "lesson-meta-row" }, [
        el("span", { className: "badge badge-" + lesson.difficulty.toLowerCase(), text: lesson.difficulty }),
        el("span", { className: "lesson-xp-tag" }, [
          el("i", { className: "fa-solid fa-bolt", attrs: { "aria-hidden": "true" } }),
          " +" + lesson.xp + " XP"
        ]),
        el("span", {
          className: "lesson-status-badge lesson-status-" + status,
          text: status === "completed" ? "Completed" : status === "in-progress" ? "In progress" : "Not started"
        })
      ]),
      el("h2", {
        className: "lesson-title-large",
        text: lesson.title,
        attrs: { id: "lesson-view-title" }
      }),
      el("p", { className: "lesson-title-km", text: lesson.titleKm, attrs: { lang: "km" } })
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
      if (c.output) parts.push(el("pre", { className: "output-block" }, [el("code", { text: c.output })]));
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

    els.lessonBody.replaceChildren(
      headerBlock, objectives, vocab, englishBlock, khmerBlock, commands, practice, quizBlock
    );
    renderLessonFooter(lesson);

    const isLast = idx === LESSONS.length - 1;
    els.nextBtn.disabled = isLast;
    if (isLast) els.nextBtn.setAttribute("aria-disabled", "true");
    else els.nextBtn.removeAttribute("aria-disabled");
  }

  function renderLessonFooter(lesson) {
    const footer = els.lessonFooter;
    footer.replaceChildren();

    if (isCompleted(lesson.id)) {
      footer.appendChild(el("p", { className: "completion-done" }, [
        el("i", { className: "fa-solid fa-circle-check", attrs: { "aria-hidden": "true" } }),
        " Lesson completed. XP already claimed."
      ]));
      return;
    }

    if (quizState && quizState.passed && quizState.lessonId === lesson.id) {
      const btn = el("button", {
        type: "button",
        className: "btn btn-primary",
        attrs: { id: "complete-lesson-btn" }
      }, [
        el("i", { className: "fa-solid fa-trophy", attrs: { "aria-hidden": "true" } }),
        " Complete Lesson (+" + lesson.xp + " XP)"
      ]);
      btn.addEventListener("click", function () { completeLesson(lesson); });

      footer.appendChild(el("div", { className: "completion-panel" }, [
        el("p", { className: "completion-message", text: "Great job! You passed the quiz. Claim your XP below." }),
        btn
      ]));
    } else {
      footer.appendChild(el("p", {
        className: "completion-hint",
        text: "Pass the quiz above with at least " + PASS_THRESHOLD + "% to unlock the completion button."
      }));
    }
  }

  /* ------------------------------------------------------------
     10. QUIZ
     ------------------------------------------------------------ */
  function buildQuizBlock(lesson) {
    const form = el("form", { className: "quiz-form", attrs: { id: "lesson-quiz-form" } });

    lesson.quiz.forEach(function (q, i) {
      const fieldset = el("fieldset", { className: "quiz-question", attrs: { "data-q": String(i) } });
      fieldset.appendChild(el("legend", { className: "quiz-question-text" }, [
        el("span", { className: "quiz-question-number", text: (i + 1) + "." }),
        " " + q.q
      ]));

      const optionsWrap = el("div", { className: "quiz-options" });
      q.options.forEach(function (opt, optIdx) {
        const inputId = "q" + i + "-o" + optIdx + "-" + lesson.id;
        const input = el("input", {
          type: "radio",
          attrs: { name: "q" + i, value: String(optIdx), id: inputId }
        });
        optionsWrap.appendChild(el("label", { className: "quiz-option", attrs: { for: inputId } }, [
          input,
          el("span", { className: "quiz-option-text", text: opt })
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
        text: "Choose one answer per question. You need " + PASS_THRESHOLD +
              "% or higher to pass. You can retry as many times as you like."
      }),
      form,
      el("div", { className: "quiz-result", attrs: { id: "quiz-result", "aria-live": "polite" } })
    ]);
  }

  function handleQuizSubmit(event, lesson) {
    event.preventDefault();
    if (quizState && quizState.submitted) return;

    const form = event.currentTarget;
    const answers = [];
    let allAnswered = true;

    lesson.quiz.forEach(function (q, i) {
      const checked = form.querySelector('input[name="q' + i + '"]:checked');
      if (!checked) allAnswered = false;
      answers.push(checked ? Number(checked.value) : -1);
    });

    const result = document.getElementById("quiz-result");
    if (!allAnswered) {
      result.textContent = "Please answer every question before checking.";
      result.classList.remove("is-pass", "is-fail");
      return;
    }

    let score = 0;
    lesson.quiz.forEach(function (q, i) {
      if (answers[i] === q.correct) score += 1;
    });
    const pct = Math.round((score / lesson.quiz.length) * 100);
    const passed = pct >= PASS_THRESHOLD;

    quizState = { lessonId: lesson.id, submitted: true, answers: answers, score: score, pct: pct, passed: passed };

    lesson.quiz.forEach(function (q, i) {
      const fieldset = form.querySelector('[data-q="' + i + '"]');
      const labels = fieldset.querySelectorAll(".quiz-option");
      labels.forEach(function (label, optIdx) {
        label.classList.remove("is-correct", "is-wrong");
        const input = label.querySelector("input");
        if (input) input.disabled = true;
        if (optIdx === q.correct) label.classList.add("is-correct");
        if (answers[i] === optIdx && answers[i] !== q.correct) label.classList.add("is-wrong");
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
    result.textContent = "You scored " + score + " of " + lesson.quiz.length + " (" + pct + "%). " +
      (passed ? "You passed! 🎉" : "You need " + PASS_THRESHOLD + "% to pass.");

    const checkBtn = form.querySelector("#quiz-check-btn");
    if (checkBtn) checkBtn.hidden = true;

    if (!passed) {
      const retry = el("button", { type: "button", className: "btn btn-secondary", text: "Retry Quiz" });
      retry.addEventListener("click", function () { retryQuiz(lesson); });
      result.appendChild(el("div", { className: "quiz-actions" }, [retry]));
    }

    renderLessonFooter(lesson);
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function retryQuiz(lesson) {
    quizState = null;
    renderLessonView(lesson);
    const quiz = document.getElementById("lesson-quiz");
    if (quiz) quiz.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ------------------------------------------------------------
     11. COMPLETION & XP
     ------------------------------------------------------------ */
  function completeLesson(lesson) {
    // Guard: only award XP once, and only after a real pass.
    if (!quizState || !quizState.passed || quizState.lessonId !== lesson.id) return;
    if (isCompleted(lesson.id)) {
      showToast("You already completed this lesson.");
      return;
    }

    state.completed[lesson.id] = true;
    state.xp += lesson.xp;
    state.quizScores[lesson.id] = quizState.pct;
    updateStreak();
    saveState();

    renderProgress();
    renderLessonCards();
    renderLessonFooter(lesson);
    showToast("+" + lesson.xp + " XP earned! Lesson completed.");

    els.lessonFooter.replaceChildren(el("p", { className: "completion-done" }, [
      el("i", { className: "fa-solid fa-circle-check", attrs: { "aria-hidden": "true" } }),
      " Lesson completed. +" + lesson.xp + " XP added."
    ]));

    // If the next lesson is now unlocked, enable the Next button.
    const idx = LESSONS.findIndex(function (l) { return l.id === lesson.id; });
    if (idx < LESSONS.length - 1) {
      const next = LESSONS[idx + 1];
      if (isUnlocked(next.id)) {
        els.nextBtn.disabled = false;
        els.nextBtn.removeAttribute("aria-disabled");
      }
    }
  }

  function updateStreak() {
    const today = todayISO();
    if (state.streak.lastDate === today) return;
    if (state.streak.lastDate === yesterdayISO()) state.streak.count += 1;
    else state.streak.count = 1;
    state.streak.lastDate = today;
  }

  /* ------------------------------------------------------------
     12. TOAST
     ------------------------------------------------------------ */
  let toastTimer = null;
  function showToast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      els.toast.classList.remove("is-visible");
    }, 3200);
  }

  /* ------------------------------------------------------------
     13. SEARCH
     ------------------------------------------------------------ */
  function filterLessonCards(query) {
    const q = query.trim().toLowerCase();
    if (!els.lessonGrid) return;
    Array.prototype.forEach.call(els.lessonGrid.children, function (card) {
      const id = card.getAttribute("data-lesson-id");
      const lesson = LESSONS.find(function (l) { return l.id === id; });
      if (!lesson) return;
      const haystack = (
        lesson.title + " " +
        lesson.summary + " " +
        lesson.english.join(" ") + " " +
        lesson.titleKm
      ).toLowerCase();
      card.hidden = q !== "" && haystack.indexOf(q) === -1;
    });
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (!els.lessonView.hidden) closeLesson();
    filterLessonCards(els.searchInput.value);
    const lessonsSection = document.getElementById("lessons");
    if (lessonsSection) lessonsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ------------------------------------------------------------
     14. INIT
     ------------------------------------------------------------ */
  function bindEvents() {
    if (els.backBtn) els.backBtn.addEventListener("click", closeLesson);
    if (els.nextBtn) els.nextBtn.addEventListener("click", goToNextLesson);

    if (els.searchForm) els.searchForm.addEventListener("submit", handleSearchSubmit);
    if (els.searchInput) {
      els.searchInput.addEventListener("input", function () {
        if (!els.lessonView.hidden) closeLesson();
        filterLessonCards(els.searchInput.value);
      });
    }

    els.navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (!els.lessonView.hidden) closeLesson();
        els.navLinks.forEach(function (l) {
          l.classList.remove("is-active");
          l.removeAttribute("aria-current");
        });
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      });
    });

    if (els.startQuizBtn) {
      els.startQuizBtn.addEventListener("click", function () {
        const target =
          LESSONS.find(function (l) { return isUnlocked(l.id) && !isCompleted(l.id); }) ||
          LESSONS[0];
        openLesson(target.id);
        setTimeout(function () {
          const quiz = document.getElementById("lesson-quiz");
          if (quiz) quiz.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      });
    }

    if (els.startChallengeBtn) {
      els.startChallengeBtn.addEventListener("click", function () {
        const target =
          LESSONS.find(function (l) { return isUnlocked(l.id) && !isCompleted(l.id); }) ||
          LESSONS[0];
        openLesson(target.id);
      });
    }
  }

  function init() {
    cacheDom();
    renderLessonCards();
    renderProgress();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
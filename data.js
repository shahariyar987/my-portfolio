/* =====================================================================
   EDIT YOUR CONTENT HERE — every page is built from this one file.
   Leave a link as "" and its button shows "coming soon" instead.
   ===================================================================== */
const DATA = {
  name: "Md. Al Shahariyar",
  email: "mshahamshahariyar2330987@bscse.uiu.ac.bd",
  phone: "+880 1790-996237",
  phoneRaw: "+8801790996237",
  location: "Vatara, Dhaka, Bangladesh",
  resume: "resume.pdf",
  photo: "as.jpg",        // your photo file, placed next to index.html
  formKey: "53141c11-35b4-4502-8b81-e82703a01ad7",            // Web3Forms access key — paste it here to receive contact-form messages by email
  socials: {
    linkedin: "https://linkedin.com/in/md-al-shahariyar-175731394",
    github: "https://github.com/shahariyar987",
    facebook: "https://www.facebook.com/alshahariar.islam37/",
    scholar: ""          // Google Scholar, when you have one
  },
  roles: ["Aspiring Researcher", "LLM & NLP Enthusiast", "Educator & Mentor", "Software + Hardware Builder", "Security Curious"],
  stats: [
    { n: 3.8, dec: 1, suf: "+", lbl: "CGPA at UIU" },
    { n: 5.00, dec: 2, suf: "", lbl: "HSC GPA (out of 5.00)" },
    { n: 0, suf: "", lbl: "Software, ML & hardware projects", auto: "projects" },
    { n: 2, suf: "", lbl: "Teaching roles" }
  ],

  /* ---------------- RESEARCH ---------------- */
  research: [
    { ico: "🧠", t: "Large Language Models", d: "How LLMs represent knowledge and reason — prompting, fine-tuning, evaluation, and where they fail.", tag: "research direction" },
    { ico: "💬", t: "Natural Language Processing", d: "Understanding and generating human language, with special interest in low-resource languages like Bangla.", tag: "research interest" },
    { ico: "📈", t: "Machine Learning & AI", d: "The foundations: learning algorithms, deep neural networks, and building models that generalise.", tag: "primary interest" },
    { ico: "🛡️", t: "Security", d: "Securing software and AI systems — from classic vulnerabilities to adversarial attacks on models.", tag: "technical interest" }
  ],
  questions: [
    { q: "How well do LLMs understand low-resource languages like Bangla?", a: "Most large models are trained mostly on English. I'm interested in measuring where they break down for Bangla — and how better data, tokenization and fine-tuning can close the gap." },
    { q: "Can we make language models more reliable and less prone to hallucination?", a: "Models often sound confident while being wrong. I want to explore evaluation methods and grounding techniques that make their outputs more trustworthy." },
    { q: "How vulnerable are AI systems to adversarial attacks and prompt injection?", a: "As AI systems are deployed widely, they become attack surfaces. This is where my interests in security and machine learning meet." },
    { q: "How can AI support teaching and learning?", a: "My teaching experience makes me curious about how NLP tools could give students personalised explanations and feedback." }
  ],
  roadmap: [
    { cls: "now", phase: "Now", t: "Building foundations", items: ["Final year of B.Sc. CSE at UIU", "Applied ML: XGBoost price forecasting", "Self-study in deep learning & NLP", "Reading LLM research papers"] },
    { cls: "next", phase: "Next", t: "First research", items: ["Undergraduate thesis in NLP / LLMs", "Research assistant work with faculty", "First paper submission", "Open-source models & datasets"] },
    { cls: "future", phase: "Future", t: "Academia", items: ["Graduate studies (MS / PhD)", "Research in LLMs & NLP", "Teaching at university level", "Mentoring the next generation"] }
  ],

  /* ---------------- SKILLS ---------------- */
  skills: [
    { cat: "Programming Languages", ico: "⌨️", items: ["C", "C++", "Java", "Python", "PHP"] },
    { cat: "AI / ML & Data", ico: "🤖", items: ["XGBoost", "Time-series Forecasting", "Jupyter", "Streamlit", "pytest"] },
    { cat: "Web Technologies", ico: "🌐", items: ["Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"] },
    { cat: "Databases & Backend", ico: "🗄️", items: ["MySQL", "PostgreSQL", "Supabase", "SQL", "Row-Level Security"] },
    { cat: "Hardware & Embedded", ico: "🔌", items: ["Arduino / Microcontrollers", "Sensors", "IoT", "Robotics"] },
    { cat: "Core CS", ico: "🧩", items: ["Data Structures", "Algorithms", "OOP", "Problem Solving"] }
  ],

  /* ---------------- PROJECTS ----------------
     repo = GitHub link, live = demo link. Fill them in!            */
  projects: [
    { title: "Bangladesh Commodity Price Predictor", type: "AI / ML", sub: "XGBoost forecasting web app", year: "Personal project", role: "ML engineer & developer", status: "v2.1",
      desc: "A Streamlit app that forecasts retail prices of chicken, rice and fish across Bangladeshi districts, up to 18 months ahead.",
      overview: "Food prices in Bangladesh vary a lot from district to district and month to month. This app trains an XGBoost model on Department of Agricultural Marketing (DAM) data to forecast a commodity's price in any district 1–18 months ahead, estimate prices across districts, and help users plan a budget. Admins can upload real monthly prices and retrain the model from inside the app.",
      stack: ["Python", "XGBoost", "Streamlit", "Jupyter", "pytest"],
      points: ["Multi-step forecasting 1–18 months ahead, with charts and downloadable tables", "Cross-district price estimation using a price-ratio method", "Budget planner that ranks district & commodity combinations by predicted price rise", "Crowd-sourced price submissions with automatic anomaly review (moderate / severe)", "Admin panel: CSV uploads with validation, undo, and retraining with a safety test", "Model evaluated on the latest 3 unseen months against a naive baseline", "Automated tests for uploads, forecasting and cross-district estimates"],
      learned: "The full ML lifecycle — data cleaning, feature design from lagged prices, honest evaluation against a baseline, and the limits of a model (it can't predict beyond the range it has seen).",
      repo: "https://github.com/shahariyar987/Price-Forecasting-of-comodity", live: "", visual: "forecast" },
    { title: "Messmate", type: "Web", sub: "Shared-household mess manager", year: "Personal project", role: "Full-stack developer", status: "Deployable on Vercel",
      desc: "A responsive Next.js + TypeScript dashboard for running a shared mess — meals, expenses, balances and monthly bills.",
      overview: "Students in Dhaka often share a mess, and keeping track of who ate what and who owes whom is messy. Messmate gives members and admins one dashboard for logging meals, tracking expenses, splitting bills into a per-meal rate and settling balances at month end — with real-time updates through Supabase.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel"],
      points: ["Overview dashboard: spending trends, cost per meal, house balance, daily meal status", "Monthly meal calendar for breakfast, lunch and dinner (admin-edit, member read-only)", "Expense ledger with categories and per-year filters", "Monthly close: shared bills turn into a per-meal rate and each member's payable", "Role-based access with Supabase Auth and row-level security (RLS) policies", "Meal-adjustment requests, group chat with pinned notices, and settings"],
      learned: "Designing a real multi-user system: database schema, row-level security, real-time sync, and role-based permissions.",
      repo: "https://github.com/shahariyar987/mess-manager", live: "", visual: "dash" },
    { title: "NextNest", type: "Web", sub: "House rent & sublet platform", year: "UIU project", role: "Full-stack developer", status: "Completed",
      desc: "A web platform connecting tenants and property owners to find houses for rent or sublet.",
      overview: "Finding a place to rent or sublet in Dhaka usually means scattered social-media posts and phone calls. NextNest brings listings into one place, so tenants can browse available homes and property owners can reach them directly.",
      stack: ["PHP", "MySQL", "HTML", "CSS"],
      points: ["Property listings for rent and sublet with detailed information", "Separate flows for tenants and property owners", "Search and browse listings to find a suitable home", "Database-backed storage of users and properties"],
      learned: "Designing a relational database for a real use case, and building a complete web app from login to listing.",
      repo: "https://github.com/shahariyar987/Next-Nest", live: "", visual: "house" },
    { title: "Vintage Task", type: "Web", sub: "Jira-style project management", year: "UIU project", role: "Full-stack developer", status: "Completed",
      desc: "A project and task management tool for issue tracking and organising team workflow.",
      overview: "Inspired by industry tools like Jira, Vintage Task lets a team create projects, break them into tasks and issues, and track each one as it moves through the workflow.",
      stack: ["PHP", "MySQL", "HTML", "CSS"],
      points: ["Create projects and break them into tasks / issues", "Track status across a workflow board", "Assign and organise work across a team", "Issue tracking from creation to completion"],
      learned: "Modelling workflows and relationships between users, projects and tasks, and thinking like a product designer.",
      repo: "https://github.com/shahariyar987/Vintage-task", live: "", visual: "kanban" },
    { title: "DSA in C++", type: "Algorithms", sub: "Data structures & algorithms", year: "Ongoing practice", role: "Author", status: "Ongoing",
      desc: "My collection of data structure and algorithm implementations in C++.",
      overview: "A repository of data structures and algorithms I've implemented in C++ while studying and practising problem solving — the foundation behind everything else I build.",
      stack: ["C++", "STL", "Algorithms"],
      points: ["Implementations of core data structures", "Classic algorithms written from scratch", "Practice for problem solving and technical interviews"],
      learned: "Thinking about time and space complexity, and writing code that is both correct and efficient.",
      repo: "https://github.com/shahariyar987/DSA", live: "", visual: "tree" },
    { title: "MMG-Controlled Bot", type: "Hardware", sub: "Remotely controlled robot", year: "Microcontroller project", role: "Hardware & firmware", status: "Completed",
      desc: "A remotely controlled robot built as a hardware and embedded systems project.",
      overview: "A hands-on embedded systems project: designing, wiring and programming a robot that can be driven remotely, combining electronics, firmware and mechanical assembly.",
      stack: ["Embedded C", "Microcontroller", "Motor Drivers", "Wireless"],
      points: ["Designed and assembled the robot chassis and circuitry", "Wireless remote control of movement", "Microcontroller firmware for motor control", "Debugging hardware and software together"],
      learned: "How software meets the physical world — power, timing, noise and the patience hardware debugging takes.",
      repo: "", live: "", visual: "wave" },
    { title: "Smart Home IoT", type: "IoT", sub: "Home automation system", year: "Hardware project", role: "IoT developer", status: "Completed",
      desc: "A system to remotely control and monitor household devices.",
      overview: "A home automation system that lets a user switch household devices on and off remotely and check their status, built with microcontrollers, sensors and relays.",
      stack: ["IoT", "Microcontroller", "Sensors", "Relays"],
      points: ["Control home appliances remotely", "Monitor device status in real time", "Sensor integration for smarter automation", "Practical, low-cost design"],
      learned: "Connecting devices into a system, and designing with safety in mind when switching real appliances.",
      repo: "https://github.com/shahariyar987/SmartNest", live: "", visual: "nodes" }
  ],

  /* ---------------- JOURNEY ---------------- */
  education: [
    { when: "Final year · 10th trimester", t: "B.Sc. in Computer Science & Engineering", where: "United International University (UIU), Dhaka", p: "Coursework across programming, data structures, algorithms, databases, and systems, with a growing focus on AI and machine learning.", pill: "CGPA 3.8+ · Final year" },
    { when: "2021", t: "Higher Secondary Certificate (HSC) — Science", where: "Shahid Buddhijibi Govt. College", p: "Science group with a perfect result.", pill: "GPA 5.00 / 5.00" }
  ],
  teaching: [
    { when: "Instructor", t: "SSC Coaching Center", where: "Classroom teaching", p: "Taught and mentored SSC-level students in core subjects, planning lessons and helping students prepare for board examinations." },
    { when: "Self-employed", t: "Private Tutor", where: "One-on-one & small groups", p: "Personalised tutoring tailored to each student's pace, building strong fundamentals and problem-solving confidence." }
  ]
};

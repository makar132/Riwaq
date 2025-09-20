// scripts/seedFirestore.mjs
import admin from "firebase-admin";

try {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
} catch (_) {}

const db = admin.firestore();

// ----- helpers -----
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = (arr) => arr[rand(0, arr.length - 1)];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const ADJ = ["complete", "ultimate", "hands_on", "practical", "modern", "advanced", "beginner", "zero_to_hero", "pro", "crash", "intensive", "mastery"];
const SUBJ = ["react", "nextjs", "typescript", "nodejs", "firebase", "tailwind", "data_structures", "algorithms", "python", "django", "flutter", "kotlin", "swiftui", "sql", "nosql", "mongodb", "docker", "kubernetes", "aws", "gcp", "azure", "graphql", "trpc", "prisma", "rust", "go", "cpp"];
const VARI = ["bootcamp", "guide", "course", "workshop", "series"];
const BLURB = [
  "real_projects",
  "step_by_step",
  "fundamentals_to_advanced",
  "beginners_and_pros",
  "exercises_cheatsheets_reviews",
];

const CATS = [
  { key: "web_dev", en: "Web Development" },
  { key: "mobile_dev", en: "Mobile Development" },
  { key: "data_science", en: "Data Science" },
  { key: "cloud_devops", en: "Cloud & DevOps" },
  { key: "prog_langs", en: "Programming Languages" },
  { key: "databases", en: "Databases" },
  { key: "design_ui", en: "Design & UI" },
  { key: "security", en: "Security" },
  { key: "testing_qa", en: "Testing & QA" },
  { key: "career", en: "Career & Soft Skills" },
  { key: "game_dev", en: "Game Development" },
  { key: "ai_ml", en: "AI & ML" },
  { key: "iot_embedded", en: "IoT & Embedded" },
  { key: "blockchain", en: "Blockchain" },
  { key: "automation", en: "Automation" },
  { key: "ar_vr", en: "AR/VR" },
  { key: "big_data", en: "Big Data" },
  { key: "biz_apps", en: "Business Apps" },
  { key: "open_source", en: "Open Source" },
  { key: "misc", en: "Miscellaneous" },
];

function randomDateWithin(daysBack = 365) {
  const now = Date.now();
  const past = now - rand(0, daysBack) * 24 * 60 * 60 * 1000;
  return new Date(past);
}

async function seed() {
  console.log("Seeding (EN-only + tokens)…");

  // 1) Categories
  const categoryDocs = [];
  for (const c of CATS) {
    const ref = db.collection("categories").doc();
    categoryDocs.push({ id: ref.id, key: c.key, en: c.en });
    await ref.set({
      name: c.en,           // existing field (EN)
      key: c.key,           // NEW: token for client i18n (cat.<key>)
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // 2) Courses (~160)
  const total = 160;
  const currencies = ["USD", "EUR", "GBP"];
  let batch = db.batch();
  let count = 0;

  for (let i = 0; i < total; i++) {
    const adj = sample(ADJ);
    const subj = sample(SUBJ);
    const vari = sample(VARI);
    const blurb1 = sample(BLURB);
    const blurb2 = sample(BLURB);

    const titleEN = `${adj.replace(/_/g, " ")} ${subj.replace(/_/g, " ")} ${vari.replace(/_/g, " ")}`.replace(/\b\w/g, c => c.toUpperCase());
    const descriptionEN = `${titleEN}. ${blurb1.replace(/_/g, " ")}. ${blurb2.replace(/_/g, " ")}.`.replace(/\b\w/g, c => c.toUpperCase());

    const courseRef = db.collection("courses").doc();
    const cat = sample(categoryDocs);

    const price = [0, 0, 9, 19, 29, 39, 49, 59, 79, 99][rand(0, 9)];
    const currency = sample(currencies);
    const isPublished = Math.random() < 0.75;
    const thumbnailUrl = `https://picsum.photos/seed/${encodeURIComponent(slug(titleEN) + "-" + i)}/400/240`;

    batch.set(courseRef, {
      // EN fields you already use
      title: titleEN,
      title_lc: titleEN.toLowerCase(),
      description: descriptionEN,
      thumbnailUrl,
      price,
      currency,
      categoryId: cat.id,
      isPublished,
      createdAt: randomDateWithin(365),

      // NEW: tokens to build localized strings on the client
      meta: {
        adj, subj, vari, blurb1, blurb2, // maps to i18n keys
        catKey: cat.key,                // matches category key
      },
    });

    if (++count % 400 === 0) {
      await batch.commit();
      batch = db.batch();
      console.log("Committed a batch…");
    }
  }
  if (count % 400 !== 0) await batch.commit();

  console.log("Done ✅");
}

seed().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });

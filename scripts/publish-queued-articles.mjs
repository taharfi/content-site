import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, "content", "articles");
const QUEUED_DIR = path.join(ROOT, "content", "queued");
const STATE_PATH = path.join(ROOT, "content", ".publish-state.json");

const batchSize = Number(process.env.PUBLISH_BATCH_SIZE || "10");
const force = process.env.PUBLISH_FORCE === "1";
const today = new Date().toISOString().slice(0, 10);

function readState() {
  if (!fs.existsSync(STATE_PATH)) {
    return { lastPublishedDate: null, publishedFiles: [] };
  }

  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
}

function writeState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n", "utf8");
}

function ensureDirs() {
  if (!fs.existsSync(QUEUED_DIR)) {
    fs.mkdirSync(QUEUED_DIR, { recursive: true });
  }

  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

function listQueuedFiles() {
  return fs
    .readdirSync(QUEUED_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));
}

function publishFile(fileName) {
  const sourcePath = path.join(QUEUED_DIR, fileName);
  const targetPath = path.join(ARTICLES_DIR, fileName);

  if (fs.existsSync(targetPath)) {
    throw new Error(`Target article already exists: ${fileName}`);
  }

  const raw = fs.readFileSync(sourcePath, "utf8");
  const parsed = matter(raw);
  const nextData = {
    ...parsed.data,
    date: today,
  };

  const nextRaw = matter.stringify(parsed.content, nextData);
  fs.writeFileSync(targetPath, nextRaw, "utf8");
  fs.unlinkSync(sourcePath);

  return fileName;
}

function main() {
  ensureDirs();

  const state = readState();
  if (state.lastPublishedDate === today && !force) {
    console.log(`Already published a batch on ${today}. Use PUBLISH_FORCE=1 to override.`);
    return;
  }

  const queuedFiles = listQueuedFiles();
  if (queuedFiles.length === 0) {
    console.log("No queued articles found.");
    return;
  }

  const batch = queuedFiles.slice(0, batchSize);
  const publishedFiles = batch.map(publishFile);

  writeState({
    lastPublishedDate: today,
    publishedFiles,
  });

  console.log(`Published ${publishedFiles.length} queued article(s) on ${today}.`);
  for (const file of publishedFiles) {
    console.log(`- ${file}`);
  }
}

main();

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getTopicBank } from "./article-topic-bank.mjs";

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, "content", "articles");
const QUEUED_DIR = path.join(ROOT, "content", "queued");
const STATE_PATH = path.join(ROOT, "content", ".generation-state.json");
const queueTarget = Number(process.env.QUEUE_TARGET_SIZE || "40");
const batchLimit = Number(process.env.GENERATE_BATCH_SIZE || "20");

function ensureDirs() {
  if (!fs.existsSync(QUEUED_DIR)) {
    fs.mkdirSync(QUEUED_DIR, { recursive: true });
  }
}

function readState() {
  if (!fs.existsSync(STATE_PATH)) {
    return { generatedSlugs: [] };
  }

  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
}

function writeState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n", "utf8");
}

function getExistingSlugs(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function articleMeta(topic) {
  return {
    title: `What Is ${topic.topic}?`,
    description: `${topic.topic} is a common tech term people run into without a clear explanation. Here is what it means, why it matters, and how it shows up in real life.`,
    date: "2099-01-01",
    author: "Mango Oasis Editorial",
  };
}

function categoryExamples(category) {
  const examples = {
    networking: "home internet, routers, devices, and connection quality",
    security: "account safety, scams, login systems, and online protection",
    web: "websites, browsers, page loading, and online publishing",
    software: "apps, updates, tools, and everyday computer use",
    hardware: "computers, accessories, ports, performance, and devices",
    cloud: "hosting, online storage, managed services, and remote systems",
    privacy: "tracking, permissions, personal data, and online visibility",
  };

  return examples[category] || "everyday technology";
}

function relatedLinks(category) {
  const links = {
    networking: [
      "/blog/what-is-wi-fi/",
      "/blog/what-is-a-router/",
      "/blog/what-is-latency/",
    ],
    security: [
      "/blog/what-is-phishing/",
      "/blog/what-is-two-factor-authentication/",
      "/blog/what-is-malware/",
    ],
    web: [
      "/blog/what-is-a-browser/",
      "/blog/what-is-dns/",
      "/blog/what-is-https/",
    ],
    software: [
      "/blog/what-is-an-operating-system/",
      "/blog/what-is-git/",
      "/blog/what-is-an-api/",
    ],
    hardware: [
      "/blog/what-is-ram/",
      "/blog/what-is-an-ssd/",
      "/blog/what-is-bluetooth/",
    ],
    cloud: [
      "/blog/what-is-the-cloud/",
      "/blog/what-is-web-hosting/",
      "/blog/what-is-a-cdn/",
    ],
    privacy: [
      "/blog/what-is-metadata/",
      "/blog/what-is-private-browsing/",
      "/blog/what-is-a-cookie/",
    ],
  };

  return links[category] || ["/blog/"];
}

function buildArticleContent(topic) {
  const [firstLink, secondLink] = relatedLinks(topic.category);

  return `
${topic.topic} is one of those terms people see in settings menus, product pages, or troubleshooting guides without always getting a plain-English explanation. In simple terms, it relates to ${categoryExamples(topic.category)}, and understanding it makes other tech topics easier to follow.

## What ${topic.topic} Means

At a practical level, ${topic.topic} is a concept used to describe part of how a system works rather than a buzzword that only matters to specialists. You may encounter it while setting up a device, comparing services, reading a support article, or trying to understand what changed after an update.

The exact technical definition can get more detailed, but most people do not need the most formal version first. They need to know what job it does and why it matters.

## Where You Usually Run Into It

${topic.topic} tends to appear in everyday situations where technology is trying to connect, organize, protect, or manage something. Sometimes it shows up directly in settings. Other times it appears in tutorials, troubleshooting steps, or the fine print of a product page.

That is why people often recognize the term before they really understand it. It is familiar enough to keep appearing, but not always explained in a way that connects it to real-world use.

## Why It Matters

Understanding ${topic.topic} helps because it changes how you interpret related tools, settings, or problems. A lot of confusion in tech comes from seeing individual terms in isolation and not realizing how they fit into the bigger system around them.

Once the role of ${topic.topic} is clear, product choices and troubleshooting steps usually make more sense. What looked random often turns out to be part of a predictable pattern.

## Common Misunderstandings

One common mistake is treating ${topic.topic} as something more mysterious than it really is. Another is assuming it solves every nearby problem just because it sounds important. In practice, most tech terms are narrower than the marketing around them.

The useful question is not whether the term sounds advanced. It is what part of the system it actually affects and what it does not affect.

## Summary

${topic.topic} is a practical concept that shows up in ${categoryExamples(topic.category)}. You do not need the most technical definition to benefit from understanding it. For more related explanations, see [this guide](${firstLink}) and [this one too](${secondLink}).
`.trimStart();
}

function writeQueuedArticle(topic) {
  const fileName = `${topic.slug}.mdx`;
  const filePath = path.join(QUEUED_DIR, fileName);
  const raw = matter.stringify(buildArticleContent(topic), articleMeta(topic));
  fs.writeFileSync(filePath, raw, "utf8");
  return fileName;
}

function main() {
  ensureDirs();

  const queuedCount = getExistingSlugs(QUEUED_DIR).length;
  if (queuedCount >= queueTarget) {
    console.log(`Queue already has ${queuedCount} article(s). No generation needed.`);
    return;
  }

  const state = readState();
  const used = new Set([
    ...getExistingSlugs(ARTICLES_DIR),
    ...getExistingSlugs(QUEUED_DIR),
    ...state.generatedSlugs,
  ]);

  const needed = Math.min(queueTarget - queuedCount, batchLimit);
  const nextTopics = getTopicBank().filter((topic) => !used.has(topic.slug)).slice(0, needed);

  if (nextTopics.length === 0) {
    console.log("No unused topics left in the topic bank.");
    return;
  }

  const generatedFiles = nextTopics.map(writeQueuedArticle);
  writeState({
    generatedSlugs: [...state.generatedSlugs, ...nextTopics.map((topic) => topic.slug)],
  });

  console.log(`Generated ${generatedFiles.length} queued article(s).`);
  for (const file of generatedFiles) {
    console.log(`- ${file}`);
  }
}

main();

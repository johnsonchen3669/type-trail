import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DAY_ONE_DATE = '2026-09-14';
const MILLISECONDS_PER_DAY = 86_400_000;

function readOption(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;

  const value = process.argv[index + 1];
  if (!value || value.startsWith('--')) {
    throw new Error(`${name} requires a value`);
  }

  return value;
}

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid publish date: ${value}`);
  }

  const timestamp = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value) {
    throw new Error(`Invalid publish date: ${value}`);
  }

  return timestamp;
}

const publishDate = readOption('--date');
const catalogPath = resolve(
  readOption('--catalog', 'src/app/quiz/quiz-catalog.ts'),
);
const targetDay =
  Math.floor(
    (parseDate(publishDate) - parseDate(DAY_ONE_DATE)) /
      MILLISECONDS_PER_DAY,
  ) + 1;

if (targetDay < 1) {
  console.log(`No quizzes are due by ${publishDate}.`);
  process.exit(0);
}

const source = readFileSync(catalogPath, 'utf8');
const publishedDays = [];
const updated = source.replace(
  /(\{\n\s+status: )'coming-soon'(,\n\s+day: (\d+),)/g,
  (entry, prefix, suffix, dayText) => {
    const day = Number(dayText);
    if (day > targetDay) return entry;

    publishedDays.push(day);
    return `${prefix}'published'${suffix}`;
  },
);

if (publishedDays.length === 0) {
  console.log(`No quizzes are due by ${publishDate} (through Day ${targetDay}).`);
  process.exit(0);
}

writeFileSync(catalogPath, updated);
console.log(
  `Published ${publishedDays.map((day) => `Day ${day}`).join(', ')} for ${publishDate}.`,
);

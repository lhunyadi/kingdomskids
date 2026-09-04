import { readFile, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { ESLint } from "eslint";
import { format, getFileInfo, resolveConfig } from "prettier";

function inside(file) {
  const step = relative(process.cwd(), resolve(file));
  return step !== "" && !step.startsWith("..");
}

async function tidy(file) {
  const info = await getFileInfo(file, { ignorePath: ".prettierignore" });
  if (info.ignored || !info.inferredParser) return;

  const source = await readFile(file, "utf8");
  const options = await resolveConfig(file);
  const output = await format(source, { ...options, filepath: file });

  if (output !== source) await writeFile(file, output);
}

async function lint(file) {
  const eslint = new ESLint({ cwd: process.cwd() });
  const results = await eslint.lintFiles([file]);

  if (!results.some((result) => result.errorCount > 0)) return;

  const formatter = await eslint.loadFormatter("stylish");
  process.stderr.write(await formatter.format(results));
  process.exit(2);
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", async () => {
  let file;
  try {
    file = JSON.parse(raw.replace(/^﻿/, "")).tool_input?.file_path;
  } catch {
    process.exit(0);
  }

  if (!file || !inside(file)) process.exit(0);

  await tidy(file);
  if (/\.(ts|mjs|astro)$/.test(file)) await lint(file);
  process.exit(0);
});

// Entry runner for "Monday, Reviewed in One Line" (zeroxfive).
// The funniest one-line review of a Monday, formatted as the review it
// deserves: one star out of five, rendered in the stars themselves. The
// charges are itemised — it arrived uninvited, it ate the weekend's
// leftovers, and in place of a tip it left a meeting in the calendar.
// The review is written to /output/entry.txt; management has responded
// by scheduling a follow-up.
import { promises as fs } from "node:fs";
import path from "node:path";

const LINE =
  "My Monday: ★☆☆☆☆ — arrived uninvited, ate the weekend's leftovers, and left a meeting in my calendar as a tip.";

async function run(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await fs.mkdir(out, { recursive: true });
  for (const name of await fs.readdir(out).catch(() => [] as string[])) {
    await fs.rm(path.join(out, name), { recursive: true, force: true });
  }
  await fs.writeFile(path.join(out, "entry.txt"), LINE + "\n", "utf8");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

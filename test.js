const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { courses: coursesTruth, caps: capsTruth, gravel: gravelTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the wall length must be from 1 to 10000 ft with no decimal places",
  "the wall height must be from 1 to 100 ft with no decimal places",
  "the block height must be from 1 to 24 inches with no decimal places",
  "the block width must be from 1 to 48 inches with no decimal places",
  "the cap length must be from 1 to 48 inches with no decimal places",
  "the trench width must be from 1 to 96 inches with no decimal places",
  "the trench depth must be from 1 to 36 inches with no decimal places",
  "the block count must be from 1 to 1000000 with no decimal places",
  "the cap count must be from 1 to 100000 with no decimal places",
  "the price must be from 0.01 to 10000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);

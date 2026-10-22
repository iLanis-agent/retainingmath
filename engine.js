// Retaining Math engine: courses and blocks for a segmental retaining wall, cap units for the run, base-trench gravel volume, and the block-plus-cap cost per face square foot. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the wall plan and the pallet tag.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _LEN = "the wall length must be from 1 to 10000 ft with no decimal places";
var _HT = "the wall height must be from 1 to 100 ft with no decimal places";
var _BH = "the block height must be from 1 to 24 inches with no decimal places";
var _BW = "the block width must be from 1 to 48 inches with no decimal places";
var _CAP = "the cap length must be from 1 to 48 inches with no decimal places";
var _TW = "the trench width must be from 1 to 96 inches with no decimal places";
var _TD = "the trench depth must be from 1 to 36 inches with no decimal places";
var _BLOCKS = "the block count must be from 1 to 1000000 with no decimal places";
var _CAPS = "the cap count must be from 1 to 100000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function coursesTruth(lenft, htft, bh, bw) {
  var l = _i(lenft, _LEN, 5, 1, 10000), h = _i(htft, _HT, 3, 1, 100);
  var bhi = _i(bh, _BH, 2, 1, 24), bwi = _i(bw, _BW, 2, 1, 48);
  var lin = l * 12, hin = h * 12;
  var courses = Math.floor((hin + bhi - 1) / bhi);
  var per = Math.floor((lin + bwi - 1) / bwi);
  var total = courses * per;
  var cw = courses === 1 ? " course of " : " courses of ";
  var bw2 = per === 1 ? " block" : " blocks";
  return "The wall of " + l + " ft at " + h + " ft tall takes " + courses + cw + per + bw2 + " each, " + total + (total === 1 ? " block" : " blocks") + " in all.";
}
function capsTruth(lenft, capin) {
  var l = _i(lenft, _LEN, 5, 1, 10000), c = _i(capin, _CAP, 2, 1, 48);
  var lin = l * 12;
  var n = Math.floor((lin + c - 1) / c);
  var spare = n * c - lin;
  var tail = spare === 0 ? ", with nothing left over" : ", leaving " + spare + (spare === 1 ? " inch" : " inches") + " of the last one";
  return "The run of " + l + " ft takes " + n + (n === 1 ? " cap unit" : " cap units") + " at " + c + " inches each" + tail + ".";
}
function gravelTruth(lenft, widthin, depthin) {
  var l = _i(lenft, _LEN, 5, 1, 10000), w = _i(widthin, _TW, 2, 1, 96), d = _i(depthin, _TD, 2, 1, 36);
  var cuft100 = _hu(l * w * d * 100, 144);
  var cuyd100 = _hu(cuft100, 27);
  return "The base trench of " + l + " ft by " + w + " inches wide by " + d + " inches deep takes " + _dec(cuft100, 2) + " cu ft of gravel, or " + _dec(cuyd100, 2) + " cu yd.";
}
function costTruth(blocks, blockprice, caps, capprice, lenft, htft) {
  var b = _i(blocks, _BLOCKS, 7, 1, 1000000), bp = _p(blockprice, _PRICE, 5, 2, 1, 1000000);
  var c = _i(caps, _CAPS, 6, 1, 100000), cp = _p(capprice, _PRICE, 5, 2, 1, 1000000);
  var l = _i(lenft, _LEN, 5, 1, 10000), h = _i(htft, _HT, 3, 1, 100);
  var cents = b * bp + c * cp;
  var face = l * h;
  var persqft = _hu(cents, face);
  return "The " + b + (b === 1 ? " block" : " blocks") + " at $" + _dec(bp, 2) + " and the " + c + (c === 1 ? " cap" : " caps") + " at $" + _dec(cp, 2) + " cost $" + _money(cents) + ", or $" + _money(persqft) + " a face square foot over the " + face + ".";
}

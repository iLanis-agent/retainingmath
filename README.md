# Retaining Math

Retaining wall block arithmetic. The wall of 30 ft at 3 ft tall takes 5 courses of 23 blocks each, 115 blocks in all.

## What it computes

- **The courses truth** - courses and blocks: the wall face (1 to 10000 ft long, 1 to 100 ft tall) divided by the block size (1 to 24 inches high, 1 to 48 inches wide), each rounded up.
- **The caps truth** - cap units: the run divided by the cap length (1 to 48 inches), rounded up, and what is left of the last one.
- **The gravel truth** - base gravel: the trench length times width (1 to 96 inches) times depth (1 to 36 inches), in cubic feet and cubic yards.
- **The cost truth** - cost: the blocks (1 to 1000000) and caps (1 to 100000) at their prices (0.01 to 10000 dollars), and what that is per face square foot.

## Boundary

Arithmetic only. Block counting, applied as written. It has not seen any slope and does not know the soil, the surcharge, the drainage, the geogrid needs or the local wall-height rules, and it gives no verdict that a wall stands. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/retainingmath/
Repo: https://github.com/iLanis-agent/retainingmath

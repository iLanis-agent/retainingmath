import json, random

def dec2(n):
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)

def courses(l, h, bh, bw):
    lin, hin = l*12, h*12
    c = (hin + bh - 1) // bh
    p = (lin + bw - 1) // bw
    t = c*p
    cw = " course of " if c == 1 else " courses of "
    bw2 = " block" if p == 1 else " blocks"
    tw = " block" if t == 1 else " blocks"
    return f"The wall of {l} ft at {h} ft tall takes {c}{cw}{p}{bw2} each, {t}{tw} in all."
def caps(l, ci):
    lin = l*12
    n = (lin + ci - 1) // ci
    spare = n*ci - lin
    tail = ", with nothing left over" if spare == 0 else f", leaving {spare} " + ("inch" if spare == 1 else "inches") + " of the last one"
    return f"The run of {l} ft takes {n} " + ("cap unit" if n == 1 else "cap units") + f" at {ci} inches each{tail}."
def gravel(l, w, d):
    cuft100 = hu(l*w*d*100, 144)
    cuyd100 = hu(cuft100, 27)
    return (f"The base trench of {l} ft by {w} inches wide by {d} inches deep takes "
            f"{dec2(cuft100)} cu ft of gravel, or {dec2(cuyd100)} cu yd.")
def cost(b, bp, c, cp, l, h):
    cents = b*bp + c*cp
    face = l*h
    per = hu(cents, face)
    return (f"The {b} " + ("block" if b == 1 else "blocks") + f" at ${dec2(bp)} and the {c} " +
            ("cap" if c == 1 else "caps") + f" at ${dec2(cp)} cost ${money(cents)}, "
            f"or ${money(per)} a face square foot over the {face}.")

random.seed(749)
cases = [
  dict(fn="courses", args=["30","3","8","16"], expect=courses(30,3,8,16)),
  dict(fn="caps", args=["30","16"], expect=caps(30,16)),
  dict(fn="gravel", args=["30","24","6"], expect=gravel(30,24,6)),
  dict(fn="cost", args=["115","4.50","23","6","30","3"], expect=cost(115,450,23,600,30,3)),
]
for _ in range(25):
    l = random.randint(1,10000); h = random.randint(1,100)
    bh = random.randint(1,24); bw = random.randint(1,48)
    cases.append(dict(fn="courses", args=[str(l),str(h),str(bh),str(bw)], expect=courses(l,h,bh,bw)))
for _ in range(25):
    l = random.randint(1,10000); ci = random.randint(1,48)
    cases.append(dict(fn="caps", args=[str(l),str(ci)], expect=caps(l,ci)))
for _ in range(20):
    l = random.randint(1,10000); w = random.randint(1,96); d = random.randint(1,36)
    cases.append(dict(fn="gravel", args=[str(l),str(w),str(d)], expect=gravel(l,w,d)))
for _ in range(20):
    b = random.randint(1,1000000); bp = random.randint(1,1000000)
    c = random.randint(1,100000); cp = random.randint(1,1000000)
    l = random.randint(1,10000); h = random.randint(1,100)
    cases.append(dict(fn="cost", args=[str(b),dec2(bp),str(c),dec2(cp),str(l),str(h)], expect=cost(b,bp,c,cp,l,h)))
errcases = [
  ["courses", ["0","3","8","16"]], ["courses", ["30","0","8","16"]], ["courses", ["30","3","0","16"]], ["courses", ["30","3","8","0"]],
  ["caps", ["0","16"]], ["caps", ["30","0"]],
  ["gravel", ["0","24","6"]], ["gravel", ["30","0","6"]], ["gravel", ["30","24","0"]],
  ["cost", ["0","4.50","23","6","30","3"]], ["cost", ["115","4.50","0","6","30","3"]], ["cost", ["115","4.50","23","6","30","0"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")

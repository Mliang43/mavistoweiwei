const $ = (id) => document.getElementById(id);

// screens
const screenReceive = $("screenReceive");
const screenAsk = $("screenAsk");
const screenLetter = $("screenLetter");

// buttons
const openBtn = $("openBtn");
const loveBtn = $("loveBtn");
const veryLoveBtn = $("veryLoveBtn");
const backBtn = $("backBtn");
const replayBtn = $("replayBtn");

// letter area
const typeBox = $("typeBox");
const question = $("question");
const toNameInTitle = $("toNameInTitle");

// ---- URL param for name ----
const params = new URLSearchParams(location.search);
const toName = params.get("to") || "weiwei";

// Default poem (fixed, not editable)
const poem =
`亲爱的 Weiwei：

很庆幸遇见你。
有你之后，日子都变得有点不一样了。
原来愿有岁月可回首，且以深情共白头，
也可以是此刻这样真实的心动。

这是我们的第一个情人节。
虽然只是平凡的一天，但因为是和你一起，就变得特别。
很开心我们出现在彼此的生命里，
慢慢靠近，慢慢喜欢，
最后成为对方最重要的人。

我不敢说未来有多远，
但此刻的认真和坚定，是真的。

和你在一起的时候，我可以当个小孩。
可以无忧无虑，可以撒娇，可以什么都不用想。
你给我的安全感，是风停在港口，
是夜里亮着的一盏灯。

山有木兮木有枝，心悦君兮君不知。
还好，你知道。
还好，你也愿意回应我这份喜欢。

关于坚持爱你这件事，
我会一直认真，也会一直坚定。
不需要轰轰烈烈，
只想细水长流。

愿我们慢慢走，
故事怎么写都没关系，
只要从头到尾都是你。

情人节快乐 🤍
我爱你。`;

// init question
question.textContent = `${toName}，爱我吗？🥺`;
toNameInTitle.textContent = toName;

// screen switch
function show(screen){
  [screenReceive, screenAsk, screenLetter].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
  sparkle();
}

openBtn.addEventListener("click", () => show(screenAsk));
backBtn.addEventListener("click", () => show(screenAsk));

// Only “非常爱你” opens letter
function openLetter(){
  show(screenLetter);
  setTimeout(() => typewriter(poem.replaceAll("Weiwei", toName)), 300);
  heartsRain();
}
veryLoveBtn.addEventListener("click", openLetter);

// “爱你” does not work (dodges)
function moveLoveAway(){
  const btnWrap = screenAsk.querySelector(".buttons").getBoundingClientRect();
  const maxX = btnWrap.width - loveBtn.offsetWidth - 8;
  const x = 8 + Math.random() * Math.max(30, maxX);
  const y = (Math.random() * 90) - 25;
  loveBtn.style.transform = `translate(${x}px, ${y}px)`;
}
loveBtn.addEventListener("mouseenter", moveLoveAway);
loveBtn.addEventListener("click", moveLoveAway);
loveBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveLoveAway(); }, { passive:false });

// Typewriter
function sleep(ms){ return new Promise(res => setTimeout(res, ms)); }
function getDelay(ch){
  if ("，。！？；：".includes(ch)) return 220;
  if (ch === "\n") return 120;
  if (ch === "…") return 260;
  return 45;
}
async function typewriter(text){
  typeBox.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "▍";
  typeBox.appendChild(cursor);

  for (let i = 0; i < text.length; i++) {
    cursor.insertAdjacentText("beforebegin", text[i]);
    await sleep(getDelay(text[i]));
  }
}

// Replay typing
replayBtn.addEventListener("click", () => typewriter(poem.replaceAll("Weiwei", toName)));

// Effects
function heartsRain(){
  const emojis = ["💗","💖","💞","✨","💘","🤍"];
  for (let i = 0; i < 26; i++) {
    const s = document.createElement("div");
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    s.style.position = "fixed";
    s.style.left = (Math.random()*100) + "vw";
    s.style.top = "-10px";
    s.style.fontSize = (16 + Math.random()*18) + "px";
    s.style.transition = "transform 1.25s linear, opacity 1.25s linear";
    s.style.zIndex = "9999";
    document.body.appendChild(s);

    requestAnimationFrame(() => {
      s.style.transform = `translateY(${110 + Math.random()*40}vh) rotate(${Math.random()*260-130}deg)`;
      s.style.opacity = "0";
    });
    setTimeout(() => s.remove(), 1300);
  }
}
function sparkle(){
  const emojis = ["✨","💗","💞"];
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("div");
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    s.style.position = "fixed";
    s.style.left = (30 + Math.random()*40) + "vw";
    s.style.top = (15 + Math.random()*20) + "vh";
    s.style.fontSize = (14 + Math.random()*12) + "px";
    s.style.opacity = "0.0";
    s.style.transition = "opacity .35s ease, transform .35s ease";
    s.style.zIndex = "9999";
    document.body.appendChild(s);
    requestAnimationFrame(() => {
      s.style.opacity = "1";
      s.style.transform = `translateY(${10 + Math.random()*20}px)`;
    });
    setTimeout(() => s.remove(), 500);
  }
}

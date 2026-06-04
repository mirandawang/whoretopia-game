// ═══════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════
const BUILDINGS = [
  { id:'home',      name:'your place',   emoji:'🏠', accent:'#ff7098', unlocked:true,  perkNeeded:0 },
  { id:'marigold',  name:"marigold's",   emoji:'🌼', accent:'#f8e048', unlocked:true,  perkNeeded:0 },
  { id:'rose',      name:"rose's",       emoji:'🌹', accent:'#ffa878', unlocked:false, perkNeeded:1 },
  { id:'clover',    name:"clover's legal aid",     emoji:'⚖️', accent:'#68d8a8', unlocked:false, perkNeeded:2 },
  { id:'chamomile', name:"chamomile's health clinic",  emoji:'🏥', accent:'#ffa878', unlocked:false, perkNeeded:3 },
  { id:'thistle',   name:"thistle's bdsm dungeon",    emoji:'🔗', accent:'#c8b8f8', unlocked:false, perkNeeded:4 },
  { id:'center',    name:'community center', emoji:'🏛️', accent:'#88c8f0', unlocked:false, perkNeeded:5 },
];

const PERKS = [
  {
    id:1, name:'screened booking',
    law:'FOSTA-SESTA shut down client screening platforms like Backpage, P411, and MyRedBook',
    why:'screening lets workers vet clients before meeting them. it\'s one of the most direct safety tools we have. without it, every booking is a leap of faith. with it, you can wear the sheer slip and mean it.',
    unlock:'your booking page now lets you screen clients before confirming. you walk into sessions knowing exactly who you\'re meeting. the lightness is immediate.',
    neighborId:'rose', neighborName:"rose's",
    neighborSkill:'rose is new to the industry but a veteran community organizer and zine-maker. she\'s been quietly building safety networks for years. and now she can do it openly.',
    neighborLine:"🌹 rose moves in next door. 'i've been waiting for this chance,' she says, and starts pinning things to the wall before she's even unpacked.",
  },
  {
    id:2, name:'safety registry',
    law:'FOSTA-SESTA made it illegal to share client safety information between workers, even privately',
    why:'workers have always shared safety info whether it\'s bad client lists, warning signs, or useful contacts. criminalizing it isolated everyone and stripped away a layer of needed protection.',
    unlock:'a shared safety registry is now running on the street. workers can flag clients and share warnings. information flows again.',
    neighborId:'clover', neighborName:"clover's",
    neighborSkill:'clover is a lawyer who specializes in sex work and workers\' rights. she built a practice specifically to serve people the legal system ignores. and she looks good doing it!',
    neighborLine:"⚖️ clover hangs her sign. LEGAL AID. WE'LL FIGURE IT OUT, BABE. she has already started a drop-in calendar.",
  },
  {
    id:3, name:'worker-owned payment',
    law:'PayPal, Stripe, Venmo and most major payment processors ban sex workers in their terms of service. Accounts are frozen without warning, often with no appeal',
    why:'losing payment access doesn\'t just mean lost income. it means losing savings, losing the ability to pay rent, losing financial history. it happens overnight with no recourse. fixing this fixes a lot.',
    unlock:'a worker-owned payment co-op is now running on the street. no frozen accounts, no arbitrary bans, no explaining yourself to an algorithm.',
    neighborId:'chamomile', neighborName:"chamomile's",
    neighborSkill:'chamomile is a nurse and harm reduction specialist. she opened her clinic because she\'d seen too many people unable to access care safely. her bedside manner is unmatched.',
    neighborLine:"🏥 chamomile's clinic opens. there\'s a plant by the door and a handwritten note: walk-ins welcome.",
  },
  {
    id:4, name:'secure hosting',
    law:'a CDA 230 carve-out lets platforms remove content and accounts related to sex work preemptively. this led to websites, forums, and hosting providers deplatforming workers without notice or appeal',
    why:'losing your online presence means losing income, losing community connections, and losing years of work. secure and legal hosting changes what\'s possible.',
    unlock:'the street has its own hosting infrastructure now. no platform can take it down. your online presence is yours, glitter and all.',
    neighborId:'thistle', neighborName:"thistle's",
    neighborSkill:"thistle runs a worker-owned BDSM space. It's professional, safe, and built entirely around the workers who use it. she knows what it means to build something nobody can take from you.",
    neighborLine:"🔗 thistle opens the doors. the music is already on, the candles already lit. 'come in,' she says. 'this place is ours.'",
  },
  {
    id:5, name:'decrim status',
    law:'full decriminalization of sex work, where selling and buying are both legal, and no criminal penalties for workers, does not exist in most of the world',
    why:'decrim doesn\'t make the work glamorous or fix everything. it removes the threat of arrest, the pressure to work in unsafe conditions, and the legal walls between you and housing, banking, healthcare. it makes the work survivable. it makes it yours.',
    unlock:'decrim is in effect on this street. every action costs a little less. wellness gains +10 everywhere, because safety changes what work feels like.',
    neighborId:'center', neighborName:'the community center',
    neighborSkill:"the community center is built by everyone on the street, together. it belongs to all of them. it's the proof that this works.",
    neighborLine:"🏛️ the community center is finished. someone has put flowers on the steps. the lights are on inside. someone's playing music. you can hear laughter.",
  },
];

const ARRIVAL_LINES = {
  rose:      "🌹 rose arrives carrying a potted fern, a stack of zines, and lipstick the same shade as her sweater. 'i brought snacks too,' she winks, patting her tote.",
  clover:    "⚖️ clover hangs a little sign in her window. it's hand-lettered, slightly crooked, and full of bite. LEGAL AID. WE'LL FIGURE IT OUT, BABE.",
  chamomile: "🏥 chamomile's door opens with a little bell and the smell of something herbal. a plant sits on the step, freshly watered, sweet as her bedside manner.",
  thistle:   "🔗 thistle flips the sign to OPEN, lights a candle, and turns up the music. the street just got a lot more interesting.",
  center:    "🏛️ the community center is finished. someone has put flowers on the steps and pinned a glittery banner above the door.",
};

const NEIGHBOR_EVENTS = {
  marigold: [
    { text:"the coffee is ready before you even sit down. you end up talking for two hours about everything. clients, gossip, who's good with their hands, the one who shows up every wednesday with the same bad haircut. the light shifts. neither of you ever put on real pants. you needed this more than you knew.", wellness:+20, community:+10 },
    { text:"marigold pulls out an old photo album. there are pictures of fellow workers who used to live on this street, who laughed, who built things that lasted. 'look how many of us there were,' she says, melancholically.", wellness:+18, community:+15 },
    { text:"you help her repot a trailing plant that's taken over an entire shelf. soil everywhere. she's wearing pearls to garden in, because of course she is. there's a smudge of dirt on her collarbone and you almost reach to brush it off. you don't. you both end up laughing instead.", wellness:+22, community:+8 },
    { text:"she makes tea and puts on an old record and you both sit in the good kind of quiet. she lends you her cashmere cardigan when the breeze comes through. it smells like her perfume. you leave still wearing it.", wellness:+25, community:+10 },
    { text:"marigold is teaching herself to bake sourdough. it is not going well, but the kitchen smells incredible and she's wearing a frilly apron she calls her seduction apron. you taste a slightly lopsided slice and it is perfect.", wellness:+20, community:+12 },
  ],
  rose: [
    { text:"rose is illustrating a new zine about safety and pleasure and the right to both. she wants your opinion on the cover. it's beautiful. there's a hand-drawn body on the front and you can't stop staring. you tell her so and mean it.", wellness:+12, community:+18 },
    { text:"she has covered her entire community board in sticky notes. resources, warmth, a little drawing of a cat in a tiny corset. you add something and feel immediately at home.", wellness:+10, community:+20 },
    { text:"rose found a new bdsm forum and has already decorated her profile with pixel flowers and a tiny heart border. she sends you the link and you bookmark it instantly.", wellness:+15, community:+15 },
    { text:"you make dinner together. on the menu is pasta, too much garlic, a bottle of wine. you eat in your fishnets and your slippers. her hand brushes yours over the salt and neither of you mentions it. it's the kind of evening that makes everything feel possible.", wellness:+18, community:+16 },
  ],
  clover: [
    { text:"clover sketches out what decrim would look like on your street, practically, day to day. she draws diagrams. you leave with notes and a head full of possibility.", wellness:+15, community:+15 },
    { text:"she tells you about a housing win this week, careful with details but beaming. 'the system is clunky but we found a door,' she says, kicking off her heels under the table and sipping who-knows-what out of a coffee mug.", wellness:+12, community:+18 },
    { text:"you bring her a sticky situation you weren't sure how to handle. she listens, thinks, and offers three useful ideas. 'you've got this babe,' she says as you leave. you believe her.", wellness:+20, community:+12 },
    { text:"clover is writing a policy brief and lets you read a section. it's sharp and warm and funnier than legal writing has any right to be. you didn't know it could be like this.", wellness:+10, community:+20 },
  ],
  chamomile: [
    { text:"chamomile checks in the way only they can: present, unhurried, actually curious. they pours you something herbal. their fingers rest on your wrist for a beat longer than the pulse-check requires. you feel genuinely seen and cared for.", wellness:+25, community:+10 },
    { text:"they're running a drop-in today and lets you help. it's quiet and purposeful and exactly the kind of work that matters. you go home glowing a little.", wellness:+20, community:+18 },
    { text:"they have a whole box of useful things like condoms, lube, vitamins, balm. they hand you exactly what you needed without any fuss. 'i just keep a stock,' they say. but it means so much.", wellness:+28, community:+8 },
    { text:"you sit in the little garden behind their clinic, drinking iced tea in the sun. the beams warm your shoulders and the light smell of lavender floats in the air. they ask how you have been doing. you actually tell her. it helps more than you expected.", wellness:+30, community:+12 },
  ],
  thistle: [
    { text:"you take a session through the house with proper equipment, clear rules, and someone at the door who greets you by name. you feel held before you're even touched. the work hums. safety is the sexiest thing in the world.", wellness:+20, money:+65 },
    { text:"thistle runs a rope workshop on saturday afternoons and you pick up three new knots. your body tingles with inspiration for hours after. you're already thinking about next week.", wellness:+18, community:+18 },
    { text:"a play party with low-key, lovely people, and everyone checking in throughout. your collar from last month is still in your bag. you leave feeling like the world figured something out it should have ages ago.", wellness:-5, community:+25, money:+30 },
    { text:"thistle gives a talk on consent and trust and what safety actually makes possible. it's the most interesting thing you've heard all week and you saw clover cheering from the back.", wellness:+15, community:+22 },
    { text:"a quiet reset and sensual evening with candles, soft music, the kind of company that doesn't need you to perform. someone draws a slow shape on your back through the silk. you float home barefoot.", wellness:+30, community:+14 },
  ],
  center: [
    { text:"the community center is buzzing today! someone's running a Know Your Rights workshop and there are homemade cookies. you sit in the back with your notebook and feel very much part of something.", wellness:+15, community:+25 },
    { text:"you help set up for an event. you put out folding chairs, you brew some tea, and you meet people you feel like you've always known. someone's wearing sequins at 2pm. the afternoon passes like a good dream.", wellness:+20, community:+20 },
    { text:"a town hall about decrim progress. the room is warm and a little chaotic and everyone is actually listening. this is exactly what it's supposed to look like.", wellness:+18, community:+28 },
    { text:"the noticeboard is so full it's spilling onto a second board. there are resources, poetry, a cute drawing of the street, a thank-you note in glitter pen. you stand in front of it for a long time.", wellness:+22, community:+22 },
  ],
};

// perk-unlock bonus events
const PERK_EVENTS = {
  marigold: {
    1: "marigold pulls up the new screening tool on her phone, manicure perfect. 'it actually works,' she says, sounding a little amazed. you sit with the wonder of that together.",
    3: "she shows you a payment app that finally, genuinely, works. 'no more frozen accounts!!!' she exclaims, and does a small celebratory shimmy.",
  },
  rose: {
    2: "rose has a whole spreadsheet going that's community-maintained, full of useful notes, and already color-coded in pink and glitter. 'we can actually do this now,' she says. she's already done half of it.",
  },
  clover: {
    2: "clover updates the safety registry with a happy little flourish. 'it's legal to share now,' she says. 'that changes so much.' she's already writing the announcement.",
    4: "clover explains the hosting win in plain, bright language, drawing a diagram on a cocktail napkin. platforms can't just vanish us anymore..",
  },
  chamomile: {
    3: "chamomile processes her first digital payment and stares at the confirmation screen for a long, happy moment. 'i've been waiting years for this,' she says quietly.",
  },
  thistle: {
    5: "thistle says it like she's been saving it, eyeliner sharp as ever: 'the work is still the work, but we're not treated like criminals anymore. do you know how much easier that makes everything feel?'",
  },
};

let G = {}; // game state
function initGame() {
  G = {
    day: 1,
    actionsUsed: 0,
    wellness: 80,
    community: 20,
    money: 0,
    perksWon: 0,
    buildings: JSON.parse(JSON.stringify(BUILDINGS)),
    visitedToday: [],
    newPerkToday: null,
    dayEnded: false,
    foughtToday: false,
  };
}
initGame();

// ═══════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════
function openFightModal() {
  document.getElementById('fight-modal').classList.add('show');
  resetFightOverlay();
}

function closeFightModal() {
  const fightWasPlayed = game.frameCount > 0;
  if (game.running) { cancelAnimationFrame(animId); game.running = false; }
  game.frameCount = 0;
  document.getElementById('fight-modal').classList.remove('show');
  if (fightWasPlayed) {
    G.foughtToday = true;
    useAction();
  } else {
    updateUI();
  }
}

function showToast(msg, dur=2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function statChange(stat, delta) {
  if (stat === 'wellness') G.wellness = clamp(G.wellness + delta, 0, 100);
  else if (stat === 'community') G.community = clamp(G.community + delta, 0, 200);
  else if (stat === 'money') G.money = Math.max(0, G.money + delta);
}

function updateUI() {
  // stats
  document.getElementById('wellness-val').textContent = Math.round(G.wellness);
  document.getElementById('wellness-bar').style.width = G.wellness + '%';
  document.getElementById('community-val').textContent = Math.round(G.community);
  document.getElementById('community-bar').style.width = Math.min(100, G.community) + '%';
  document.getElementById('money-val').textContent = G.money;
  const fwv = document.getElementById('fight-wellness-val');
  if (fwv) fwv.textContent = Math.round(G.wellness);
  const fmv = document.getElementById('fight-money-val');
  if (fmv) fmv.textContent = G.money;

  // day header
  document.getElementById('day-title').textContent = 'day ' + G.day + ' of 10';

  // day dots
  const dots = document.getElementById('day-dots');
  dots.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const d = document.createElement('div');
    d.className = 'day-dot' + (i < G.day ? ' done' : i === G.day ? ' current' : '');
    d.textContent = i;
    dots.appendChild(d);
  }

  // actions counter
  const left = Math.max(0, 2 - G.actionsUsed);
  document.getElementById('actions-left').textContent = left;

  // buildings grid
  renderBuildings();

  // action section done state
  const isDone = G.dayEnded || G.actionsUsed >= 2;
  document.getElementById('action-section').classList.toggle('done', isDone);

  // screened booking replaces regular booking when unlocked
  const screenedUnlocked = G.perksWon >= 1;
  const bookBtn = document.getElementById('btn-book');
  const screenedBtn = document.getElementById('btn-screened');
  if (bookBtn) bookBtn.style.display = (!screenedUnlocked && !isDone) ? 'flex' : 'none';
  if (screenedBtn) screenedBtn.style.display = (screenedUnlocked && !isDone) ? 'flex' : 'none';

  const fightBtn = document.getElementById('btn-fight-home');
  if (fightBtn) {
    fightBtn.disabled = G.wellness <= 40 || isDone || G.foughtToday;
    const costSpan = fightBtn.querySelector('.cost');
    if (costSpan) costSpan.textContent = G.foughtToday ? 'already fought today' : 'need >40 wellness';
  }

  const mapHint = document.getElementById('town-map-hint');
  if (mapHint) mapHint.style.display = isDone ? 'none' : '';

  // dialogue always shown; day-done card appears when actions used up
  const dialogue = document.getElementById('dialogue-box');
  dialogue.style.display = '';
  const ddc = document.getElementById('day-done-card');
  if (isDone) {
    ddc.classList.add('show');
    const ddBtn = document.getElementById('day-done-btn');
    if (ddBtn) ddBtn.textContent = G.day >= 10 ? 'see your ending →' : 'start day ' + (G.day + 1) + ' →';
  } else {
    ddc.classList.remove('show');
  }

  // perks
  renderPerks();
}

function renderBuildings() {
  const grid = document.getElementById('buildings-grid');
  grid.innerHTML = '';
  const visitable = !G.dayEnded && G.actionsUsed < 2;
  G.buildings.forEach(b => {
    const card = document.createElement('div');
    const isVisitable = b.unlocked && b.id !== 'home' && visitable;
    card.className = 'building-card' + (!b.unlocked ? ' locked' : '') + (isVisitable ? ' visitable' : '');
    card.innerHTML = `
      <div class="building-accent" style="background:${b.accent}"></div>
      <div class="building-inner">
        <div class="building-emoji-wrap">
          <img src="img/${b.id}.png" alt="${b.emoji}" onload="this.classList.add('loaded')" onerror="this.style.display='none'">
          <span class="emoji-fallback">${b.emoji}</span>
        </div>
        <div class="building-name">${b.name}</div>
      </div>`;
    if (isVisitable) {
      card.addEventListener('click', () => triggerVisit(b.id));
    }
    grid.appendChild(card);
  });
}

function renderPerks() {
  const list = document.getElementById('perks-list');
  list.innerHTML = '';
  PERKS.forEach(p => {
    const won = G.perksWon >= p.id;
    const div = document.createElement('div');
    div.className = 'perk-item' + (won ? ' unlocked expandable' : '');
    div.innerHTML = `
      <div class="perk-row">
        <span class="perk-check">${won ? '✅' : '⬜'}</span>
        <span class="perk-name">${p.name}</span>
        ${won ? '<span class="perk-toggle">▸</span>' : ''}
      </div>
      ${won ? `
      <div class="perk-details">
        <p><strong>why this matters:</strong> ${p.why}</p>
        <p><strong>what was banned:</strong> ${p.law}</p>
      </div>` : ''}`;
    if (won) {
      div.addEventListener('click', () => div.classList.toggle('expanded'));
    }
    list.appendChild(div);
  });
}

function triggerVisit(id) {
  if (G.actionsUsed >= 2 || G.dayEnded) return;

  const events = NEIGHBOR_EVENTS[id];
  if (!events) return;

  let evt = null;
  const perkEvts = PERK_EVENTS[id];
  if (perkEvts && G.newPerkToday) {
    const bonus = perkEvts[G.newPerkToday];
    if (bonus) evt = { text: bonus, wellness:+15, community:+12 };
  }
  if (!evt) evt = events[Math.floor(Math.random() * events.length)];

  const b = G.buildings.find(x => x.id === id);
  setDialogue(b.emoji + ' ' + b.name, evt.text);

  if (evt.wellness) statChange('wellness', evt.wellness);
  if (evt.community) statChange('community', evt.community);
  if (evt.money) statChange('money', evt.money);

  G.visitedToday.push(id);

  let changes = [];
  if (evt.wellness) changes.push((evt.wellness > 0 ? '+' : '') + evt.wellness + ' 🌿');
  if (evt.community) changes.push((evt.community > 0 ? '+' : '') + evt.community + ' 🤝');
  if (evt.money) changes.push((evt.money > 0 ? '+' : '') + evt.money + ' 💰');
  if (changes.length) showToast(changes.join('  '), 2000);

  useAction();
}

function setDialogue(speaker, text) {
  const sp = document.getElementById('dialogue-speaker');
  sp.textContent = speaker;
  sp.style.display = speaker ? '' : 'none';
  document.getElementById('dialogue-text').textContent = text;
}

function useAction() {
  G.actionsUsed++;
  if (G.actionsUsed >= 2) {
    G.dayEnded = true;
    G.newPerkToday = null;
    statChange('wellness', -5);
    const dt = document.getElementById('day-done-text');
    if (dt) dt.textContent = 'the day settles into evening. the street glows. someone\'s playing music two doors down. you did good today, and you\'re proud.';
  }
  updateUI();
}

// ═══════════════════════════════════════════════════
// HOME ACTIONS
// ═══════════════════════════════════════════════════
function doHomeAction(action) {
  if (G.dayEnded || G.actionsUsed >= 2) return;

  if (action === 'rest') {
    statChange('wellness', 40);
    setDialogue('🌸 your place', 'you draw a bath hot enough to fog the mirror, light a candle, slip out of everything and into the silk. by the time the water cools your skin is pink and warm and yours again. soft. steady. unbothered.');
    showToast('+40 🌿', 1800);
  } else if (action === 'book') {
    statChange('money', 30);
    statChange('wellness', -15);
    setDialogue('🌸 your place', 'a booking. they\'re nervous in a sweet way. you put them at ease, slow movement. at the end you stash the cash in your bra, and pick up something fresh from the bakery on the way home.');
    showToast('+30 💰  −15 🌿', 1800);
  } else if (action === 'screened') {
    statChange('money', 50);
    statChange('wellness', -10);
    setDialogue('🌸 your place', 'a screened booking. you knew exactly who you were meeting before you even fastened your garter. the work is easier to manage when you have the info you deserve. the money is good, and you feel satisfied.');
    showToast('+50 💰  −10 🌿', 1800);
  }

  useAction();
}

function goFight() {
  if (G.foughtToday) { showToast("only one fight a day. rest up and try again tomorrow."); return; }
  if (G.dayEnded || G.actionsUsed >= 2) { showToast("that's all for today."); return; }
  if (G.wellness <= 40) { showToast("wellness needs to be above 40. rest first."); return; }
  openFightModal();
}

// ═══════════════════════════════════════════════════
// DAY PROGRESSION
// ═══════════════════════════════════════════════════
function advanceDay() {
  if (G.day >= 10) { showEnding(); return; }
  G.day++;
  startNewDay();
}

function startNewDay() {
  if (G.day > 10) { showEnding(); return; }

  G.actionsUsed = 0;
  G.dayEnded = false;
  G.visitedToday = [];
  G.foughtToday = false;

  // check for building unlocks
  const arrival = G.buildings.find(b => !b.unlocked && b.perkNeeded <= G.perksWon);
  if (arrival) {
    arrival.unlocked = true;
    const perkForNeighbor = PERKS.find(p => p.neighborId === arrival.id);
    const line = perkForNeighbor ? perkForNeighbor.neighborLine : (ARRIVAL_LINES[arrival.id] || '✨ a new neighbor has arrived.');
    document.getElementById('arrival-text').textContent = line;
    document.getElementById('arrival-banner').classList.add('show');
  }

  setDialogue('🌸 your place', 'a new day. the street is still here, a little fuller than yesterday. so are you. time for a coffee?');
  updateUI();
}

// ═══════════════════════════════════════════════════
// PERK UNLOCK (called after win)
// ═══════════════════════════════════════════════════
function unlockPerk() {
  G.perksWon++;
  G.newPerkToday = G.perksWon;
  const perk = PERKS[G.perksWon - 1];
  statChange('money', 20);
  updateUI();
}

// ═══════════════════════════════════════════════════
// ENDING
// ═══════════════════════════════════════════════════
function showEnding() {
  const perks = G.perksWon;
  const com = G.community;
  const well = G.wellness;

  let title, body;
  if (perks >= 4 && com > 60 && well > 40) {
    title = 'whoretopia: built';
    body = 'five fights, five wins. the street is full and lit and humming. marigold\'s coffee is always on. rose has started a second zine, and a third. chamomile\'s garden is in bloom. thistle\'s has a waitlist a mile long and a candlelit back room. the community center is loud with laughter and someone\'s record collection. you built this, all of you, together. it\'s soft, it\'s warm, it\'s sexy, and it\'s ours. now go put on your lip gloss and enjoy it.';
  } else if (perks >= 2 && com > 40) {
    title = 'your street is alive';
    body = 'you didn\'t win every fight, but you fought, and the street shows it. there are neighbors now, lights in windows, a noticeboard thick with notes and at least one phone number. the community you built will carry this forward. that\'s most of it. that might be all of it.';
  } else if (perks >= 1) {
    title = 'still standing, still building';
    body = 'one win. it was real. something changed because you showed up and fought for it. the street is quieter than it could be but it\'s yours, and you\'re still here, which means tomorrow is still possible.';
  } else {
    title = 'rest first. the fight continues.';
    body = 'it\'s hard. and the fight cost more than expected this time. but you\'re still here, which means the street is still here, which means next time you\'ll know what to spend and what to save. run a bath. light something nice. then try again.';
  }

  const screen = document.getElementById('ending-screen');
  document.getElementById('ending-title').textContent = title;
  document.getElementById('ending-body').textContent = body;

  // build map
  const map = document.getElementById('ending-map');
  map.innerHTML = '';
  G.buildings.forEach(b => {
    const div = document.createElement('div');
    div.className = 'ending-building' + (!b.unlocked ? ' locked' : '');
    div.textContent = b.emoji;
    map.appendChild(div);
  });

  // stat tile grid
  const statgrid = document.getElementById('recap-statgrid');
  statgrid.innerHTML = `
    <div class="recap-tile"><div class="rt-num">${perks}<span class="rt-denom">/5</span></div><div class="rt-label">laws fought</div></div>
    <div class="recap-tile"><div class="rt-num">${G.buildings.filter(b => b.unlocked).length - 1}<span class="rt-denom">/6</span></div><div class="rt-label">neighbors</div></div>
    <div class="recap-tile"><div class="rt-num">${Math.round(com)}</div><div class="rt-label">🤝 community</div></div>
    <div class="recap-tile"><div class="rt-num">${Math.round(well)}</div><div class="rt-label">🌿 wellness</div></div>
    <div class="recap-tile"><div class="rt-num">${G.money}</div><div class="rt-label">💰 money</div></div>
  `;

  // perks list
  const perksWonList = PERKS.slice(0, perks);
  const recapPerks = document.getElementById('recap-perks');
  if (perksWonList.length) {
    recapPerks.innerHTML = `
      <h4 class="recap-subhead">✅ perks unlocked</h4>
      <ul class="recap-list">${perksWonList.map(p => `<li><strong>${p.name}</strong> <span class="recap-meta">— ${p.law.split('—')[0].trim()}</span></li>`).join('')}</ul>
    `;
  } else {
    recapPerks.innerHTML = `<p class="recap-empty">no perks unlocked this run. the law won...for now.</p>`;
  }

  // neighbors list
  const neighborBuildings = G.buildings.filter(b => b.unlocked && b.id !== 'home' && b.id !== 'marigold');
  const recapNeighbors = document.getElementById('recap-neighbors');
  if (neighborBuildings.length) {
    recapNeighbors.innerHTML = `
      <h4 class="recap-subhead">🏘️ new on the street</h4>
      <ul class="recap-list">${neighborBuildings.map(b => `<li>${b.emoji} <strong>${b.name}</strong></li>`).join('')}</ul>
    `;
  } else {
    recapNeighbors.innerHTML = `<p class="recap-empty">no new neighbors moved in. just you and marigold this run.</p>`;
  }

  screen.classList.add('show');
}

function restartGame() {
  document.getElementById('ending-screen').classList.remove('show');
  initGame();
  setDialogue('🌸 your place', 'the morning is yours. pick somewhere to go, or do something at home.');
  updateUI();
  document.getElementById('intro-screen').classList.add('show');
}

function startGame() {
  document.getElementById('intro-screen').classList.remove('show');
}

// ═══════════════════════════════════════════════════
// GALAGA MINIGAME
// ═══════════════════════════════════════════════════
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = 480, H = 420;

let game = {
  running: false,
  wave: 0,
  lives: 3,
  score: 0,
  player: { x: W/2, y: H - 40, w: 28, h: 28, speed: 4 },
  bullets: [],
  enemyBullets: [],
  enemies: [],
  particles: [],
  drops: [],
  hasShield: false,
  tripleShot: false,
  slowActive: false,
  lastFire: 0,
  waveComplete: false,
  frameCount: 0,
  powerups: { life: false, shield: false, triple: false, slow: false },
};

const keys = { left: false, right: false, fire: false };

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === ' ' || e.key === 'ArrowUp') { keys.fire = true; e.preventDefault(); }
});
document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
  if (e.key === ' ' || e.key === 'ArrowUp') keys.fire = false;
});

const ENEMY_TYPES = [
  { em:'👔', hp:1, pts:5,  name:'Lobbyist' },
  { em:'📜', hp:2, pts:15, name:'FOSTA-SESTA', drops:'shield' },
  { em:'🏦', hp:1, pts:8,  name:'Payment ban' },
  { em:'🚔', hp:1, pts:12, name:'Vice cop' },
  { em:'💰', hp:3, pts:25, name:'Corporate donor' },
];

// Space Invaders grid state
let grid = { stepX: 0, stepY: 0, dir: 1, stepTimer: 0, stepInterval: 55 };

function spawnWave() {
  game.enemies = [];
  game.bullets = [];
  game.enemyBullets = [];
  grid.dir = 1;
  grid.stepTimer = 0;
  grid.stepInterval = 55;

  // 2 rows × 6 cols — payment bans on top, lobbyists below
  const layout = [2, 0];
  for (let row = 0; row < 2; row++) {
    const t = ENEMY_TYPES[layout[row]];
    for (let col = 0; col < 6; col++) {
      game.enemies.push({ ...t, col, row, x: 48 + col * 66, y: 32 + row * 48, hpLeft: t.hp });
    }
  }
  game.waveComplete = false;
}

function startFight() {
  if (G.wellness <= 40) { showToast("wellness needs to be above 40."); return; }
  const overlay = document.getElementById('fight-overlay');
  overlay.style.display = 'none';
  overlay.classList.remove('shop-state');

  game.running = true;
  game.wave = 0;
  game.lives = 3 + (game.powerups.life ? 1 : 0);
  game.score = 0;
  game.bullets = [];
  game.enemyBullets = [];
  game.particles = [];
  game.drops = [];
  game.player.x = W/2;
  game.hasShield = game.powerups.shield;
  game.tripleShot = game.powerups.triple;
  game.slowActive = game.powerups.slow;
  game.waveComplete = false;
  game.frameCount = 0;
  grid.dir = 1; grid.stepTimer = 0; grid.stepInterval = 55;

  spawnWave();
  requestAnimationFrame(gameLoop);
}

function powerupShopHtml() {
  const items = [
    { id:'life',     emoji:'❤️', name:'extra life',               cost:25 },
    { id:'shield',   emoji:'🛡️', name:'solidarity shield',          cost:30 },
    { id:'triple',   emoji:'🌸', name:'friendship triple bullet',  cost:40 },
    { id:'slow',     emoji:'🐢', name:'slow enemies',              cost:35 },
    { id:'wellness', emoji:'🌿', name:'+20 wellness',              cost:20 },
  ];
  return `<div class="powerup-grid">${items.map(it => {
    const owned = it.id !== 'wellness' && game.powerups[it.id];
    const afford = G.money >= it.cost;
    const dis = owned || !afford;
    return `<button class="powerup-btn" ${dis ? 'disabled' : ''} onclick="buyPowerup('${it.id}')">
      <div class="pu-head">${it.emoji} ${it.name}${owned ? ' ✓' : ''}</div>
      <span class="pu-cost">${owned ? 'owned' : it.cost + ' 💰'}</span>
    </button>`;
  }).join('')}</div>`;
}

function resetFightOverlay() {
  const overlay = document.getElementById('fight-overlay');
  overlay.style.display = 'flex';
  overlay.classList.remove('end-state');
  overlay.classList.add('shop-state');
  overlay.innerHTML = `
    <h2>⚡ fight the law</h2>
    <p>stock up with powerups, or skip ahead.<br><span class="overlay-hint">arrow keys + space, or the buttons below to fight.</span></p>
    ${powerupShopHtml()}
    <button class="overlay-btn" onclick="startFight()">start fighting →</button>`;
  updateFightStatus();
}

function updateFightStatus() {
  document.getElementById('fight-wellness-val').textContent = Math.round(G.wellness);
  document.getElementById('fight-money-val').textContent = G.money;
  document.getElementById('fight-lives').textContent = game.lives;
  document.getElementById('fight-score').textContent = game.score;
}

let animId;
function gameLoop() {
  if (!game.running) return;
  animId = requestAnimationFrame(gameLoop);
  update();
  draw();
}

function update() {
  game.frameCount++;

  // player move
  if (keys.left) game.player.x = Math.max(16, game.player.x - game.player.speed);
  if (keys.right) game.player.x = Math.min(W - 16, game.player.x + game.player.speed);

  // fire
  const now = Date.now();
  if (keys.fire && now - game.lastFire > 220) {
    game.lastFire = now;
    if (game.tripleShot) {
      game.bullets.push({ x: game.player.x - 10, y: game.player.y - 14, vy: -8 });
      game.bullets.push({ x: game.player.x, y: game.player.y - 14, vy: -8 });
      game.bullets.push({ x: game.player.x + 10, y: game.player.y - 14, vy: -8 });
    } else {
      game.bullets.push({ x: game.player.x, y: game.player.y - 14, vy: -8 });
    }
  }

  // bullets
  game.bullets = game.bullets.filter(b => {
    b.y += b.vy;
    return b.y > -10;
  });

  // Space Invaders grid movement — step on a timer
  const effectiveInterval = game.slowActive ? grid.stepInterval * 2.5 : grid.stepInterval;
  grid.stepTimer++;
  if (grid.stepTimer >= effectiveInterval) {
    grid.stepTimer = 0;
    // check if any enemy would go out of bounds
    let wouldHitEdge = false;
    game.enemies.forEach(e => {
      const nx = e.x + grid.dir * 18;
      if (nx > W - 24 || nx < 24) wouldHitEdge = true;
    });
    if (wouldHitEdge) {
      grid.dir *= -1;
      game.enemies.forEach(e => { e.y += 18; });
    } else {
      game.enemies.forEach(e => { e.x += grid.dir * 18; });
    }
  }

  // enemy shoot — slow and bottom-row only (Space Invaders style)
  if (game.frameCount % 160 === 0 && game.enemies.length > 0) {
    // find bottom-most enemy in a random column
    const cols = [...new Set(game.enemies.map(e => Math.round(e.x)))];
    const col = cols[Math.floor(Math.random() * cols.length)];
    const inCol = game.enemies.filter(e => Math.round(e.x) === col).sort((a,b) => b.y - a.y);
    if (inCol.length) {
      const shooter = inCol[0];
      game.enemyBullets.push({ x: shooter.x, y: shooter.y + 10, vy: 2.5 });
    }
  }

  // enemy bullets
  game.enemyBullets = game.enemyBullets.filter(b => {
    b.y += b.vy;
    // hit player
    if (Math.abs(b.x - game.player.x) < 16 && Math.abs(b.y - game.player.y) < 16) {
      if (game.hasShield) { game.hasShield = false; spawnParticles(game.player.x, game.player.y, '#88c8f0', 8); return false; }
      playerHit();
      return false;
    }
    return b.y < H + 10;
  });

  // drops
  game.drops = game.drops.filter(d => {
    d.y += 1.5;
    if (Math.abs(d.x - game.player.x) < 18 && Math.abs(d.y - game.player.y) < 18) {
      game.hasShield = true;
      showToast('🛡️ shield!', 1500);
      return false;
    }
    return d.y < H + 20;
  });

  // bullet-enemy collision
  game.bullets.forEach((b, bi) => {
    game.enemies.forEach((e, ei) => {
      if (Math.abs(b.x - e.x) < 20 && Math.abs(b.y - e.y) < 20) {
        e.hpLeft--;
        spawnParticles(e.x, e.y, '#f8e048', 5);
        game.bullets.splice(bi, 1);
        if (e.hpLeft <= 0) {
          game.score += e.pts;
          if (e.drops) game.drops.push({ x: e.x, y: e.y, type: e.drops });
          spawnParticles(e.x, e.y, '#ff7098', 10);
          game.enemies.splice(ei, 1);
        }
      }
    });
  });

  // enemy reaches player line
  game.enemies.forEach(e => {
    if (e.y > H - 30) {
      if (!game.hasShield) playerHit();
      else { game.hasShield = false; spawnParticles(e.x, e.y, '#88c8f0', 8); }
      e.y = 20 + Math.random() * 40;
    }
  });

  // particles
  game.particles = game.particles.filter(p => {
    p.x += p.vx; p.y += p.vy; p.life--;
    return p.life > 0;
  });

  // wave complete — 1 wave = win
  if (game.enemies.length === 0 && !game.waveComplete) {
    game.waveComplete = true;
    game.wave++;
    endFight(true);
  }

  updateFightStatus();
}

function playerHit() {
  game.lives--;
  spawnParticles(game.player.x, game.player.y, '#ff7098', 15);
  game.player.x = W/2;
  if (game.lives <= 0) endFight(false);
}

function spawnParticles(x, y, color, n) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 1 + Math.random() * 3;
    game.particles.push({ x, y, vx: Math.cos(a)*s, vy: Math.sin(a)*s, color, life: 20 + Math.random()*15, size: 2+Math.random()*3 });
  }
}

function endFight(won) {
  game.running = false;
  cancelAnimationFrame(animId);

  const overlay = document.getElementById('fight-overlay');
  overlay.style.display = 'flex';
  overlay.classList.remove('shop-state');
  overlay.classList.add('end-state');

  game.powerups = { life: false, shield: false, triple: false, slow: false };

  if (won) {
    statChange('wellness', -15);
    unlockPerk();
    const perk = PERKS[G.perksWon - 1];
    const nextNeighbor = G.buildings.find(b => !b.unlocked && b.perkNeeded <= G.perksWon);
    showWinSequence(perk, nextNeighbor);
  } else {
    statChange('wellness', -20);
    overlay.innerHTML = `
      <h2 style="color:var(--rose)">you fell</h2>
      <p>−20 wellness. the fight cost something real. rest up. run a bath. try again tomorrow.</p>
      <button class="overlay-btn" onclick="closeFightModal()">← back to your street</button>`;
  }

  updateUI();
}

let winSequenceSteps = [];
let winSequenceIdx = 0;

function showWinSequence(perk, nextNeighbor) {
  winSequenceSteps = [];

  winSequenceSteps.push({
    html: `
      <div class="win-confetti">🎉✨🌟✨🎉</div>
      <h2 style="color:var(--mint);font-size:42px;letter-spacing:1px">YOU WON!!</h2>
      <p>you cleared the wave and fought the law.</p>
      <p class="win-tag">something good is about to happen 💖</p>
    `,
    nextLabel: 'see what you unlocked →',
  });

  if (perk) {
    winSequenceSteps.push({
      html: `
        <div class="win-confetti">🎁</div>
        <h2 style="color:var(--lemon)">perk unlocked!!</h2>
        <div class="fight-result-card">
          <div class="fr-title">${perk.name}</div>
          <div class="fr-body">${perk.unlock}</div>
          <div class="fr-meta"><strong>why this matters:</strong> ${perk.why}</div>
          <div class="fr-meta"><strong>what was banned:</strong> ${perk.law}</div>
        </div>
      `,
      nextLabel: 'next →',
    });
  }

  if (perk && nextNeighbor) {
    winSequenceSteps.push({
      html: `
        <div class="win-confetti">✨</div>
        <h2 style="color:var(--mint)">new neighbor incoming!!</h2>
        <p style="margin-bottom:10px">moving in tomorrow:</p>
        <div class="fight-result-card neighbor">
          <div class="fr-body">${perk.neighborLine}</div>
          <div class="fr-meta">${perk.neighborSkill}</div>
        </div>
      `,
      nextLabel: null,
    });
  }

  winSequenceIdx = 0;
  renderWinStep();
}

function renderWinStep() {
  const overlay = document.getElementById('fight-overlay');
  const step = winSequenceSteps[winSequenceIdx];
  const isLast = winSequenceIdx >= winSequenceSteps.length - 1;
  const buttonHtml = isLast
    ? `<button class="overlay-btn" onclick="closeFightModal()">← back to your street</button>`
    : `<button class="overlay-btn" onclick="advanceWinStep()">${step.nextLabel || 'next →'}</button>`;
  overlay.innerHTML = step.html + buttonHtml;
}

function advanceWinStep() {
  winSequenceIdx++;
  renderWinStep();
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  // bg
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0c0918');
  grad.addColorStop(1, '#1a0a2e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // stars
  ctx.fillStyle = 'rgba(255,255,255,.5)';
  for (let i = 0; i < 40; i++) {
    const sx = ((i * 73 + game.frameCount * 0.2) % W);
    const sy = ((i * 47) % (H * 0.7));
    const ss = (i % 3 === 0) ? 2 : 1;
    ctx.fillRect(sx, sy, ss, ss);
  }

  // drops
  game.drops.forEach(d => {
    ctx.font = '20px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🛡️', d.x, d.y);
  });

  // enemies
  game.enemies.forEach(e => {
    ctx.font = '22px serif';
    ctx.textAlign = 'center';
    ctx.fillText(e.em, e.x, e.y + 8);
    // hp bar
    if (e.hpLeft < e.hp) {
      ctx.fillStyle = 'rgba(255,112,152,.5)';
      ctx.fillRect(e.x - 12, e.y - 16, 24, 4);
      ctx.fillStyle = '#68d8a8';
      ctx.fillRect(e.x - 12, e.y - 16, 24 * (e.hpLeft / e.hp), 4);
    }
  });

  // bullets
  game.bullets.forEach(b => {
    ctx.fillStyle = '#f8e048';
    ctx.beginPath();
    ctx.ellipse(b.x, b.y, 3, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // glow
    ctx.fillStyle = 'rgba(248,224,72,.3)';
    ctx.beginPath();
    ctx.ellipse(b.x, b.y, 6, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // enemy bullets
  game.enemyBullets.forEach(b => {
    ctx.fillStyle = '#ff7098';
    ctx.beginPath();
    ctx.ellipse(b.x, b.y, 3, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // player
  const px = game.player.x, py = game.player.y;
  if (game.hasShield) {
    ctx.strokeStyle = '#88c8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(px, py, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(136,200,240,.3)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(px, py, 22, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.font = '26px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌸', px, py + 9);

  // lives
  ctx.font = '16px serif';
  ctx.textAlign = 'left';
  for (let i = 0; i < game.lives; i++) ctx.fillText('❤️', 10 + i * 22, 22);

  // particles
  game.particles.forEach(p => {
    ctx.globalAlpha = p.life / 35;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // score
  ctx.font = 'bold 14px Nunito';
  ctx.fillStyle = 'rgba(248,224,72,.9)';
  ctx.textAlign = 'right';
  ctx.fillText('⭐ ' + game.score, W - 10, 22);
}

// ═══════════════════════════════════════════════════
// POWERUPS SHOP
// ═══════════════════════════════════════════════════
function buyPowerup(type) {
  const costs = { life: 25, shield: 30, slow: 35, wellness: 20 };
  const cost = costs[type];
  if (G.money < cost) { showToast("not enough cash."); return; }
  statChange('money', -cost);
  if (type === 'wellness') {
    statChange('wellness', 20);
    showToast('+20 🌿 wellness', 2000);
  } else {
    game.powerups[type] = true;
    const names = { life: '❤️ extra life', shield: '🛡️ solidarity shield', triple: '🌸 friendship triple bullet', slow: '🐢 slow enemies' };
    showToast(names[type] + ' ready for next fight', 2000);
  }
  updateUI();
  const overlay = document.getElementById('fight-overlay');
  if (overlay.classList.contains('shop-state')) resetFightOverlay();
}

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
updateUI();

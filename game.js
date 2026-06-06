// ═══════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════
const BUILDINGS = [
  { id:'home',      name:'your place',               emoji:'🏠', accent:'#ff7098', unlocked:true,  perkNeeded:0, bx:44.9, by:3.7,  bw:18.1, bh:20.1 },
  { id:'marigold',  name:"marigold's",               emoji:'🌼', accent:'#f8e048', unlocked:true,  perkNeeded:0, bx:17.9, by:10.6, bw:18.3, bh:20.1 },
  { id:'rose',      name:"rose's",                   emoji:'🌹', accent:'#ffa878', unlocked:false, perkNeeded:1, bx:78.4, by:22.3, bw:16.8, bh:19.4 },
  { id:'clover',    name:"clover's legal aid",       emoji:'⚖️', accent:'#68d8a8', unlocked:false, perkNeeded:2, bx:4.7,  by:38.6, bw:20.4, bh:19.4 },
  { id:'chamomile', name:"chamomile's health clinic",emoji:'🏥', accent:'#ffa878', unlocked:false, perkNeeded:3, bx:72.6, by:58.4, bw:25.4, bh:17.5 },
  { id:'thistle',   name:"thistle's bdsm dungeon",   emoji:'🔗', accent:'#c8b8f8', unlocked:false, perkNeeded:4, bx:6.4,  by:67.6, bw:26.2, bh:19.2 },
  { id:'center',    name:'community center',         emoji:'🏛️', accent:'#88c8f0', unlocked:false, perkNeeded:5, bx:33.6, by:37.2, bw:38.2, bh:20.7 },
];

const PERKS = [
  {
    id:1, name:'screened booking',
    law:'FOSTA-SESTA shut down client screening platforms like Backpage, P411, and MyRedBook',
    why:'screening lets workers vet clients before meeting them. it\'s one of the most direct safety tools we have. without it, every booking is a leap of faith. with it, you can feel safer before you even start.',
    unlock:'your booking page now lets you screen clients before confirming. you walk into sessions knowing exactly who you\'re meeting, and it makes everything feel lighter.',
    neighborId:'rose', neighborName:"rose's",
    neighborSkill:'rose is new to the industry but a veteran community organizer and zine-maker. she\'s been quietly building safety networks for years. and now she can do it openly.',
    neighborLine:"🌹 rose moves in next door. 'i've been waiting for this chance,' she says with excitement, and starts pinning posters to the wall before she's even unpacked.",
  },
  {
    id:2, name:'safety registry',
    law:'FOSTA-SESTA made it illegal to share client safety information between workers, even privately',
    why:'workers have always shared safety info whether it\'s bad client lists, warning signs, or useful contacts. criminalizing it isolated everyone and stripped away a layer of needed protection.',
    unlock:'a shared safety registry is now running on the street. workers can flag clients and share warnings with each other. information flows freely again!',
    neighborId:'clover', neighborName:"clover's",
    neighborSkill:'clover is a lawyer who specializes in sex work and workers\' rights. she built a practice specifically to serve people the legal system ignores. and she looks good doing it!',
    neighborLine:"⚖️ clover hangs her sign. LEGAL AID. WE'LL FIGURE IT OUT, BABE. she has already started a drop-in calendar.",
  },
  {
    id:3, name:'worker-owned payment',
    law:'PayPal, Stripe, Venmo and most major payment processors ban sex workers in their terms of service. Accounts are frozen without warning, often with no appeal',
    why:'losing payment access means lost income, lost savings, losing the ability to pay rent, losing financial history, and more. it happens overnight with no recourse and no explanations.',
    unlock:'a worker-owned payment platform is now running on the street. no more frozen accounts, no more arbitrary bans, and no more explaining yourself to a corporation who doesn\'t care and never did.',
    neighborId:'chamomile', neighborName:"chamomile's",
    neighborSkill:'chamomile is a nurse and harm reduction specialist. she opened her clinic because she\'d seen too many people unable to access care safely. she gives out her lollies freely.',
    neighborLine:"🏥 chamomile's clinic opens. there\'s a plant by the door and a handwritten note: walk-ins welcome.",
  },
  {
    id:4, name:'secure hosting',
    law:'a CDA 230 carve-out (FOSTA-SESTA) lets platforms remove content and accounts related in any way to sex or sex work preemptively. this led to websites, forums, and hosting providers deplatforming workers without notice or appeal',
    why:'the internet is a big ecosystem these days especially for businesses and individuals. losing your online presence means losing income, losing community connections, and losing years of work. secure and legal hosting changes what\'s possible.',
    unlock:'the street has its own hosting infrastructure now. no platform can take it down. you can make your own website with no fear of losing it all.',
    neighborId:'thistle', neighborName:"thistle's",
    neighborSkill:"thistle runs a worker-owned BDSM space. It's professional, safe, and built around the workers who use it. they know what it means to build something nobody can take from you.",
    neighborLine:"🔗 thistle opens the doors and you can hear that the music is already on. 'come in,' they say. 'this place is ours. and we\'re gonna make it fun.'",
  },
  {
    id:5, name:'decriminalization status',
    law:'full decriminalization of sex work, where selling and buying are both legal, and no criminal penalties for workers, does not exist in most of the world',
    why:'decrim doesn\'t fix everything. but it removes the threat of arrest, the pressure to work in unsafe conditions, and the legal walls between you and housing, banking, healthcare. it makes it possible to live and it makes your life yours.',
    unlock:'decrim is in effect on this street. every action costs a little less. wellness gains +10 everywhere, because safety changes what work feels like.',
    neighborId:'center', neighborName:'the community center',
    neighborSkill:"the community center is built by everyone on the street, together. in solidarity, we fight, and in friendship, we laugh.",
    neighborLine:"🏛️ the community center is finished. someone has put fresh flowers on the steps. the lights are on inside and music is flowing onto the street. a big banner on the entrance says 'WELCOME TO OUR WHORETOPIA' in rainbow glitter puffy paint.",
  },
];

const ARRIVAL_LINES = {
  rose:      "🌹 rose arrives carrying a stack of zines and wearing makeup that perfectly matches the color of her sweater. 'i brought snacks too,' she smiles as she pats her overstuffed tote.",
  clover:    "⚖️ clover hangs a little sign in her window. it's hand-lettered, imperfect, and full of bite. LEGAL AID. WE'LL FIGURE IT OUT, BABE.",
  chamomile: "🏥 chamomile's door opens with a little jingle of a bell. the fragrance of the herbals and florals drift through the air, smelling as sweet as her bedside manner.",
  thistle:   "🔗 thistle flips the sign to OPEN, lights a candle, and turns up the music. the street just got a lot more interesting.",
  center:    "🏛️ the community center is finished!!! someone has put fresh flowers on the steps and there's a glittery banner pinned above the door.",
};

const NEIGHBOR_EVENTS = {
  marigold: [
    { text:"the aroma of freshly ground coffee beans draws you in. when the caffeine hits, mairgold and you end up talking for two hours about EVERYTHING. clients, gossip, who's good with their hands, the one who shows up every wednesday. the light shifts. you needed this more than you knew.", wellness:+20, community:+10 },
    { text:"marigold pulls out an old photo album. there are pictures of fellow friends and workers who used to live on this street, who laughed and built what they loved. 'look at how many of us there were,' she says, sighing with nostalgia.", wellness:+18, community:+15 },
    { text:"you help her repot a trailing plant that's taken over an entire shelf. she's wearing pearls to garden in and there's a smudge of dirt on her collarbone. you make awkward eye contact and you both end up laughing until you can\'t breathe.", wellness:+22, community:+8 },
    { text:"she\'s brewing coffee, decaf, and puts on an old record. you both sit together in the nice kind of quiet. she lends you her cardigan when the breeze comes through. it smells like her perfume.", wellness:+25, community:+10 },
    { text:"marigold is teaching herself to bake sourdough. it's a mess, there's flour everywhere, but the kitchen smells incredible. she's wearing a frilly apron that she calls her seduction apron. you taste a slightly lopsided slice and it is so fresh and so perfect.", wellness:+20, community:+12 },
  ],
  rose: [
    { text:"rose is illustrating a new zine about safety and pleasure and the right to both. she wants your opinion on the cover. there's a hand-drawn body on the front and it's beautiful. you tell her so and you can see the sparkles in her eyes.", wellness:+12, community:+18 },
    { text:"she welcomes you in enthusiastically and shows you her newest addition to her home. \"A community board for visitors!\" she explains. it has been covered in sticky notes. resources, warmth, a little drawing of a cat in a tiny corset. you add something and feel immediately at home.", wellness:+10, community:+20 },
    { text:"rose found a new bdsm forum and has already decorated her profile with pixel flowers and a tiny heart border. she's almost too excited to show you, but it's cute. she sends you the link and you bookmark it instantly.", wellness:+15, community:+15 },
    { text:"\"oh hey!\" rose greets you, \"this is perfect. i just finished.\" she kindly shares her meal with you after your long day. on the menu is pasta, with too much garlic, and a bottle of riesling. you eat in your fishnets and your slippers. it's the kind of evening that makes everything feel ok again.", wellness:+18, community:+16 },
  ],
  clover: [
    { text:"clover sketches out what decriminalization would look like on your street, practically, day to day. she draws diagrams. you leave with notes feeling inspired.", wellness:+15, community:+15 },
    { text:"she tells you about a housing win this week, careful with details but beaming. 'the system fucking sucks but we found a way,' she says, kicking off her heels under the table. 'shall we celebrate?'", wellness:+12, community:+18 },
    { text:"you bring her a sticky situation you weren't sure how to handle. she listens, thinks, and offers three useful ideas. 'you've got this babe!!!' she says as you leave. you feel hopeful.", wellness:+20, community:+12 },
    { text:"clover is writing a policy brief and lets you read a section. you are so excited about what she can do and how you can help.", wellness:+10, community:+20 },
  ],
  chamomile: [
    { text:"chamomile checks in on you. they pour you something herbal and ask how you've been. you actually tell them. it helps more than you even expected.", wellness:+25, community:+10 },
    { text:"they're running a drop-in today and let you help. it's quiet, purposeful, and the kind of work that feels really important. you go home glowing in your heart.", wellness:+20, community:+18 },
    { text:"they have a whole box of useful things like condoms, lube, vitamins, balm. they hand you exactly what you needed without any fuss. 'i just keep a stock,' they say. but it means so much.", wellness:+28, community:+8 },
    { text:"you sit in the little garden behind their clinic, drinking iced tea with fresh mint. the sunbeams are warm and the light smell of lavender floats in the air.", wellness:+30, community:+12 },
  ],
  thistle: [
    { text:"you take a session through the house with proper equipment, clear rules, and someone at the door who greets you and checks up on you. safety is the sexiest thing in the world.", wellness:+20, money:+65 },
    { text:"thistle runs a rope workshop on saturday afternoons and you pick up three new knots. your mind tingles with inspiration for hours after. your body tingles a little too.", wellness:+18, community:+18 },
    { text:"the dungeon is hosting a play party with low-key, lovely people, super cute outfits. you leave feeling like the world might be an ok place to live in after all.", wellness:-5, community:+25, money:+30 },
    { text:"thistle gives a talk on consent and trust and what safety actually makes possible. it's the most interesting thing you've heard all week and you saw clover cheering from the back.", wellness:+15, community:+22 },
    { text:"tonight is a quiet reset and sensual evening with candles, soft music, and good company. you go home feeling like you're floating on air.", wellness:+30, community:+14 },
  ],
  center: [
    { text:"the community center is buzzing today! someone's running a Know Your Rights workshop and chamomile brought homemade cookies. you sit in the back with your notebook and feel very much like a part of something.", wellness:+15, community:+25 },
    { text:"you help set up for an event. you put out folding chairs, you brew some tea, and you meet people you feel like you've always known. you don't have to censor anything, and they get it. the afternoon passes like a good dream.", wellness:+20, community:+20 },
    { text:"the center is hosting a town hall about the decriminalization progress. the room is warm, and a little chaotic, but everyone is intently listening. the energy is inspirational.", wellness:+18, community:+28 },
    { text:"it looks like rose has put up another community board in the center. you can tell by how cute it is. there are resources, poetry, a cute drawing of the street, a 'LOST DILDO' note in glitter pen. you smile, and stand in front of it for a long time.", wellness:+22, community:+22 },
  ],
};

// perk-unlock bonus events
const PERK_EVENTS = {
  marigold: {
    1: "marigold pulls up the new screening tool on her phone, manicure perfect. 'it actually works,' she says, sounding a little amazed. you sit with the wonder of that together.",
    3: "she shows you a payment app that finally, genuinely, works. 'no more frozen accounts!!!' she exclaims, and does a small celebratory shimmy.",
  },
  rose: {
    2: "rose has a whole spreadsheet going that's community-maintained, full of useful notes, and already color-coded in rainbow hues. 'we can actually do this now,' she says, excited as ever.",
  },
  clover: {
    4: "clover explains the hosting win in plain, bright language, drawing a diagram on a cocktail napkin. these online platforms can't just vanish us anymore..",
  },
  chamomile: {
    3: "chamomile processes her first digital payment and stares at the confirmation screen for a long, happy moment. 'i've been waiting years for this,' she says quietly.",
  },
  thistle: {
    5: "thistle says it like she's been holding it in, eyeliner sharp as ever: 'the work is still the work, but we're not treated like criminals anymore. do you know how much easier that makes EVERYTHING?'",
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
  document.getElementById('day-number-img').src = 'img/days/' + G.day + '.PNG';

  // actions counter image
  const left = Math.max(0, 2 - G.actionsUsed);
  document.getElementById('actions-count-img').src = 'img/days/' + left + '.PNG';

  // buildings grid
  renderBuildings();

  // action section done state
  const isDone = G.dayEnded || G.actionsUsed >= 2;
  document.getElementById('action-section').classList.toggle('done', isDone);
  document.getElementById('town-panel').classList.toggle('day-ended', isDone);

  // screened booking replaces regular booking when unlocked
  const screenedUnlocked = G.perksWon >= 1;
  const bookBtn = document.getElementById('btn-book');
  const bookLabel = document.getElementById('book-cost-label');
  if (bookBtn) bookBtn.onclick = () => doHomeAction(screenedUnlocked ? 'screened' : 'book');
  if (bookLabel) bookLabel.textContent = screenedUnlocked ? 'screened ✨  +50 💰 −10 wellness' : '+30 💰 −15 wellness';

  const fightBtn = document.getElementById('btn-fight-home');
  if (fightBtn) {
    const fightDisabled = G.wellness <= 40 || isDone || G.foughtToday;
    fightBtn.classList.toggle('disabled', fightDisabled);
    fightBtn.style.pointerEvents = fightDisabled ? 'none' : '';
    const fightLabel = document.getElementById('fight-cost-label');
    if (fightLabel) fightLabel.textContent = G.foughtToday ? 'already fought today' : 'need >40 wellness';
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

  // visual layers — purely decorative
  G.buildings.forEach(b => {
    const img = document.createElement('img');
    img.className = 'building-visual' + (!b.unlocked ? ' locked' : '');
    img.src = `img/${b.id}.png`;
    img.onerror = () => { img.style.display = 'none'; };
    grid.appendChild(img);
  });

  // clickable zones positioned over each non-home building
  const canAct = !G.dayEnded && G.actionsUsed < 2;
  G.buildings.filter(b => b.id !== 'home').forEach(b => {
    const zone = document.createElement('div');
    zone.style.left   = b.bx + '%';
    zone.style.top    = b.by + '%';
    zone.style.width  = b.bw + '%';
    zone.style.height = b.bh + '%';

    if (b.unlocked && canAct) {
      zone.className = 'building-clickzone visitable';
      zone.addEventListener('click', () => triggerVisit(b.id));
      zone.title = 'visit ' + b.name;
    } else if (!b.unlocked) {
      zone.className = 'building-clickzone locked-zone';
      zone.addEventListener('click', () => showToast('not unlocked yet — keep fighting the law! ⚖️'));
    } else {
      zone.className = 'building-clickzone';
    }
    grid.appendChild(zone);
  });

  // re-render neighbor menu inside modal
  closeNeighborModal();
  const menu = document.getElementById('neighbor-menu');
  if (!menu) return;
  menu.innerHTML = '';
  const visitable = !G.dayEnded && G.actionsUsed < 2;
  G.buildings.filter(b => b.id !== 'home').forEach(b => {
    const card = document.createElement('div');
    const canVisit = b.unlocked && visitable;
    card.className = 'neighbor-card' + (!b.unlocked ? ' locked' : '') + (canVisit ? ' visitable' : '');
    card.innerHTML = `
      <span class="neighbor-emoji">${b.emoji}</span>
      <span class="neighbor-name">${b.name}</span>`;
    if (canVisit) card.addEventListener('click', () => triggerVisit(b.id));
    menu.appendChild(card);
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

function openNeighborModal() {
  const modal = document.getElementById('neighbor-modal');
  if (modal) modal.classList.add('show');
}

function closeNeighborModal() {
  const modal = document.getElementById('neighbor-modal');
  if (modal) modal.classList.remove('show');
}

function handleNeighborModalBackdrop(e) {
  if (e.target === document.getElementById('neighbor-modal')) closeNeighborModal();
}

function triggerVisit(id) {
  if (G.actionsUsed >= 2 || G.dayEnded) return;
  closeNeighborModal();

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
  setDialogue(b.emoji + ' ' + b.name, evt.text, b.id);

  if (evt.wellness) statChange('wellness', evt.wellness);
  if (evt.community) statChange('community', evt.community);

  G.visitedToday.push(id);

  let changes = [];
  if (evt.wellness) changes.push((evt.wellness > 0 ? '+' : '') + evt.wellness + ' 🌿');
  if (evt.community) changes.push((evt.community > 0 ? '+' : '') + evt.community + ' 🤝');
  if (changes.length) showToast(changes.join('  '), 2000);

  useAction();
}

function setDialogue(speaker, text, portraitId = null) {
  const sp = document.getElementById('dialogue-speaker');
  sp.textContent = speaker;
  sp.style.display = speaker ? '' : 'none';
  document.getElementById('dialogue-text').textContent = text;
  const portrait = document.getElementById('dialogue-portrait');
  if (portraitId && portraitId !== 'center') {
    portrait.src = `img/portrait-${portraitId}.png`;
    portrait.classList.add('visible');
    portrait.classList.toggle('portrait-left', portraitId === 'chamomile');
  } else {
    portrait.classList.remove('visible');
    portrait.classList.remove('portrait-left');
  }
}

function useAction() {
  G.actionsUsed++;
  if (G.actionsUsed >= 2) {
    G.dayEnded = true;
    G.newPerkToday = null;
    statChange('wellness', -5);
    const dt = document.getElementById('day-done-text');
    if (dt) dt.textContent = 'the day settles into evening. the street glows. it was a good day and now it\'s time for bed.';
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
    setDialogue('🌸 your place', 'you draw a bath hot enough to fog the mirror, light a candle, slip out of everything and into the silky waters. soft and unbothered.');
    showToast('+40 🌿', 1800);
  } else if (action === 'book') {
    statChange('money', 30);
    statChange('wellness', -15);
    setDialogue('🌸 your place', 'you take a booking. it went well, but still work. at the end you stash your cash, and pick up something fresh from a cafe on your way home.');
    showToast('+30 💰  −15 🌿', 1800);
  } else if (action === 'screened') {
    statChange('money', 50);
    statChange('wellness', -10);
    setDialogue('🌸 your place', 'you take a screened booking. you knew exactly who you were meeting before you even put on your makeup. the work is easier to manage when you have the info you deserve. the money is good, and you feel satisfied.');
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
    const isCenter = arrival.id === 'center';
    document.getElementById('arrival-modal-title').textContent = isCenter
      ? 'the community center is unlocked!'
      : 'a new neighbor moved in!';
    document.getElementById('arrival-modal-images').innerHTML = isCenter
      ? `<img class="arrival-building" style="width:250px" src="img/crop-${arrival.id}.png" onerror="this.style.display='none'">`
      : `<img class="arrival-building" src="img/crop-${arrival.id}.png" onerror="this.style.display='none'">
         <img class="arrival-portrait" src="img/portrait-${arrival.id}.png" onerror="this.style.display='none'">`;
    document.getElementById('arrival-modal-text').textContent = line;
    document.getElementById('arrival-modal').classList.add('show');
  }

  setDialogue('🌸 your place', 'it\'s a new day and the street is still here, a little fuller than yesterday. you\'re still here too. time for a coffee?');
  updateUI();
}

// ═══════════════════════════════════════════════════
// PERK UNLOCK (called after win)
// ═══════════════════════════════════════════════════
function unlockPerk() {
  G.perksWon++;
  G.newPerkToday = G.perksWon;
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
    body = 'five fights, five wins. the street is full and lit and humming. marigold\'s coffee is always brewing. rose has started a second zine, and a third. chamomile\'s garden is in full bloom. thistle\'s has a waitlist a mile long and just opened a candlelit back room. the community center is loud with laughter. you built this together. now go put on your eyeliner and enjoy your whoretopia.';
  } else if (perks >= 2 && com > 40) {
    title = 'your street is alive';
    body = 'you didn\'t win every fight, but you fought, and the street shows it. there are neighbors now, lights in windows, a noticeboard thick with notes and at least one phone number. the community you built will carry this forward. that might just be enough.';
  } else if (perks >= 1) {
    title = 'still standing, still building';
    body = 'one win. it\'s just as real. something changed because you showed up and fought for it. the street is quieter than it could be but you\'re all still here, which means tomorrow is still possible.';
  } else {
    title = 'rest first. the fight continues.';
    body = 'it\'s hard. and the fight cost more than expected this time. but you\'re all still here, which means next time you\'ll know what to do. run a bath and have a snack. then try again.';
  }

  const screen = document.getElementById('ending-screen');
  document.getElementById('ending-title').textContent = title;
  document.getElementById('ending-body').textContent = body;

  // build map — same stacked-image approach as town map
  const map = document.getElementById('ending-map');
  map.innerHTML = '';
  const mapBg = document.createElement('img');
  mapBg.className = 'ending-map-bg';
  mapBg.src = 'img/map.png';
  mapBg.alt = '';
  mapBg.onerror = () => { mapBg.style.display = 'none'; };
  map.appendChild(mapBg);
  G.buildings.forEach(b => {
    const img = document.createElement('img');
    img.className = 'building-visual' + (!b.unlocked ? ' locked' : '');
    img.src = `img/${b.id}.png`;
    img.onerror = () => { img.style.display = 'none'; };
    map.appendChild(img);
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

  // neighbors — portrait gallery of everyone who moved in (always includes marigold)
  const neighborBuildings = G.buildings.filter(b => b.unlocked && b.id !== 'home' && b.id !== 'center');
  const recapNeighbors = document.getElementById('recap-neighbors');
  if (neighborBuildings.length) {
    recapNeighbors.innerHTML = `
      <h4 class="recap-subhead">🏘️ your neighbors</h4>
      <div class="recap-portraits">${neighborBuildings.map(b => `
        <div class="recap-portrait-item">
          <img src="img/portrait-${b.id}.png" alt="${b.name}" onerror="this.style.display='none'">
          <span>${b.name}</span>
        </div>`).join('')}
      </div>
    `;
  } else {
    recapNeighbors.innerHTML = `<p class="recap-empty">no new neighbors moved in.</p>`;
  }

  screen.classList.add('show');
}

function restartGame() {
  document.getElementById('ending-screen').classList.remove('show');
  initGame();
  setDialogue('🌸 your place', 'the sun is shining, the morning is yours. pick somewhere to go, or do something at home.');
  updateUI();
  document.getElementById('intro-screen').classList.add('show');
}

function closeArrivalModal() {
  document.getElementById('arrival-modal').classList.remove('show');
}

function startGame() {
  document.getElementById('intro-screen').classList.remove('show');
  document.getElementById('music-controls').classList.add('visible');
  playMusic();
}

// ── MUSIC ──
const bgMusic = document.getElementById('bg-music');
let musicMuted = false;
const TRACKS = ['lobbymusic.mp3', 'harvest.mp3', 'daisy.mp3'];
let trackIdx = 0;

bgMusic.addEventListener('ended', () => { nextTrack(); });

function loadTrack() {
  bgMusic.src = TRACKS[trackIdx];
  if (!musicMuted) { bgMusic.volume = 0.25; bgMusic.play().catch(() => {}); }
}

function prevTrack() {
  trackIdx = (trackIdx - 1 + TRACKS.length) % TRACKS.length;
  loadTrack();
}

function nextTrack() {
  trackIdx = (trackIdx + 1) % TRACKS.length;
  loadTrack();
}

function playMusic() {
  if (!musicMuted && bgMusic) {
    bgMusic.volume = 0.25;
    bgMusic.play().catch(() => {});
  }
}

function toggleMusic() {
  musicMuted = !musicMuted;
  const btn = document.getElementById('music-toggle');
  if (musicMuted) {
    bgMusic.pause();
    btn.classList.add('muted');
  } else {
    bgMusic.play().catch(() => {});
    btn.classList.remove('muted');
  }
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
  player: { x: W/2, y: H - 40, w: 28, h: 28, speed: 5 },
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
  invincible: 0,
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
let grid = { dir: 1, stepTimer: 0, stepInterval: 18 };

function spawnWave() {
  game.enemies = [];
  game.bullets = [];
  game.enemyBullets = [];
  grid.dir = 1;
  grid.stepTimer = 0;
  grid.stepInterval = 65;

  // 3 rows × 6 cols: FOSTA-SESTA top, Vice cops middle, Lobbyists bottom
  const rowTypes = [1, 3, 0];
  for (let row = 0; row < 3; row++) {
    const t = ENEMY_TYPES[rowTypes[row]];
    for (let col = 0; col < 6; col++) {
      game.enemies.push({ ...t, col, row, x: 45 + col * 66, y: 30 + row * 50, hpLeft: t.hp });
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
  game.invincible = 0;
  grid.dir = 1; grid.stepTimer = 0; grid.stepInterval = 65;

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
  if (game.invincible > 0) game.invincible--;

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

  // Space Invaders grid movement
  const effectiveInterval = game.slowActive ? grid.stepInterval * 2.5 : grid.stepInterval;
  grid.stepTimer++;
  if (grid.stepTimer >= effectiveInterval) {
    grid.stepTimer = 0;
    let wouldHitEdge = false;
    game.enemies.forEach(e => {
      const nx = e.x + grid.dir * 10;
      if (nx > W - 20 || nx < 20) wouldHitEdge = true;
    });
    if (wouldHitEdge) {
      grid.dir *= -1;
      game.enemies.forEach(e => { e.y += 10; });
      // speed up as enemies are destroyed
      grid.stepInterval = Math.max(12, 30 - (18 - game.enemies.length) * 1.0);
    } else {
      game.enemies.forEach(e => { e.x += grid.dir * 10; });
    }
  }

  // enemy shoot — bottom row of each column
  if (game.frameCount % 160 === 0 && game.enemies.length > 0) {
    const cols = [...new Set(game.enemies.map(e => e.col))];
    const col = cols[Math.floor(Math.random() * cols.length)];
    const inCol = game.enemies.filter(e => e.col === col).sort((a, b) => b.y - a.y);
    if (inCol.length) {
      game.enemyBullets.push({ x: inCol[0].x, y: inCol[0].y + 10, vy: 3.0 });
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
      if (game.hasShield) { game.hasShield = false; spawnParticles(e.x, e.y, '#88c8f0', 8); }
      else playerHit();
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
  if (game.invincible > 0) return;
  game.lives--;
  game.invincible = 90;
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
        <img class="neighbor-portrait" src="img/portrait-${perk.neighborId}.png" alt="${perk.neighborName}" onerror="this.style.display='none'">
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
  const costs = { life: 25, shield: 30, triple: 40, slow: 35, wellness: 20 };
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
// KONAMI CODE CHEAT
// ═══════════════════════════════════════════════════
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a','Enter'];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
  if (e.key === KONAMI[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === KONAMI.length) {
      konamiIdx = 0;
      activateCheat();
    }
  } else {
    konamiIdx = e.key === KONAMI[0] ? 1 : 0;
  }
});

function activateCheat() {
  G.perksWon = PERKS.length;
  G.buildings.forEach(b => { b.unlocked = true; });
  new Audio('anime-wow-sound-effect.mp3').play().catch(() => {});
  setDialogue('✨ whoretopia', 'cheat code activated! all perks and neighbors are yours. the street is full, the lights are on, and the community center has glitter on the door. 🌟');
  showToast('✨ whoretopia unlocked!', 3500);
  updateUI();
}

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
updateUI();

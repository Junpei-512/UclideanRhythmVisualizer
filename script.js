// ── データ定義 ────────────────────────────────────────────────

const SCALES = {
  penta:          [0, 3, 5, 7, 10],
  major:          [0, 2, 4, 5, 7, 9, 11],
  minor:          [0, 2, 3, 5, 7, 8, 10],
  harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
  dorian:         [0, 2, 3, 5, 7, 9, 10],
  phrygian:       [0, 1, 3, 5, 7, 8, 10],
  blues:          [0, 3, 5, 6, 7, 10],
  ryukyu:         [0, 4, 5, 7, 11],
  hirajoshi:      [0, 2, 3, 7, 8],
};

const SCALE_NAMES = {
  penta: 'ペンタトニック', major: 'メジャー', minor: 'マイナー',
  harmonic_minor: '和声短音階', dorian: 'ドリアン', phrygian: 'フリジアン',
  blues: 'ブルース', ryukyu: '琉球音階', hirajoshi: '平調子',
};

const SCALE_INFO = {
  penta: {
    en: 'Pentatonic Scale',
    degrees: '1  ♭3  4  5  ♭7',
    desc: '5音からなる最もシンプルなスケール。半音を含まないため不協和が生まれにくく、どんな和音にも合わせやすい。世界中の民族音楽で独立に発見されており、ロック・ブルース・日本の童謡にも広く使われる。',
    tags: ['ポップス', 'ロック', 'ブルース', '民族音楽', '初心者向け'],
  },
  major: {
    en: 'Major Scale (Ionian)',
    degrees: '1  2  3  4  5  6  7',
    desc: '西洋音楽の基盤となる7音スケール。明るく安定した響きを持ち、ハ長調（C major）はすべての白鍵で構成される。長3度と完全5度が明快な明るさを生み出す。',
    tags: ['クラシック', 'ポップス', '明るい', '安定'],
  },
  minor: {
    en: 'Natural Minor Scale (Aeolian)',
    degrees: '1  2  ♭3  4  5  ♭6  ♭7',
    desc: '長調に対応する短調スケール。第3・6・7音が半音低いことで暗く哀愁のある響きになる。メジャースケールの第6音から始めたものと同じ音列（平行短調）。',
    tags: ['ロック', 'クラシック', '哀愁', '暗い'],
  },
  harmonic_minor: {
    en: 'Harmonic Minor Scale',
    degrees: '1  2  ♭3  4  5  ♭6  7',
    desc: 'マイナースケールの第7音を半音上げたスケール。第6音と第7音の間に増2度（3半音）という特徴的な跳躍が生まれ、エキゾチックで劇的な響きになる。V7→iという強い解決感を持つドミナント和音を作れるのが最大の特徴。フラメンコ・東欧・中東音楽に多用される。',
    tags: ['フラメンコ', '東欧', '中東', 'ドラマティック', '劇的'],
  },
  dorian: {
    en: 'Dorian Mode',
    degrees: '1  2  ♭3  4  5  6  ♭7',
    desc: 'マイナースケールの第6音を半音上げた教会旋法。マイナーの暗さを持ちつつ長6度の明るさが共存するため「明るいマイナー」と呼ばれる。ジャズのii-V-I進行やファンク・ロックで頻繁に使われる。',
    tags: ['ジャズ', 'ファンク', 'ロック', '明るいマイナー'],
  },
  phrygian: {
    en: 'Phrygian Mode',
    degrees: '1  ♭2  ♭3  4  5  ♭6  ♭7',
    desc: '第2音が半音低い教会旋法。冒頭の半音下降が強烈な緊張感とエキゾチズムを生む。スペイン・フラメンコの代名詞的なスケールで、メタル音楽にも多用される。',
    tags: ['フラメンコ', 'スペイン', 'メタル', '緊張感', 'エキゾチック'],
  },
  blues: {
    en: 'Blues Scale',
    degrees: '1  ♭3  4  ♭5  5  ♭7',
    desc: 'ペンタトニックマイナーに♭5（ブルーノート）を加えた6音スケール。このフラットファイブが独特のグルーヴと泥臭さを生み出す。ブルース・ジャズ・R&Bの核心をなすスケール。',
    tags: ['ブルース', 'ジャズ', 'R&B', 'グルーヴ', 'ブルーノート'],
  },
  ryukyu: {
    en: 'Ryukyu Scale',
    degrees: '1  3  4  5  7',
    desc: '沖縄・琉球音楽に特有の5音音階。第3音と第7音が長音（半音高い）なのが特徴で、明るく南国的な響きを持つ。三線（さんしん）の代表的なスケールで、本州の民謡とは明らかに異なる独自の音世界を作る。',
    tags: ['沖縄', '琉球', '三線', '民族音楽', '南国'],
  },
  hirajoshi: {
    en: 'Hirajoshi Scale',
    degrees: '1  2  ♭3  5  ♭6',
    desc: '日本の箏（こと）の代表的な調弦から生まれた5音音階。長2度・短3度・短2度という独特の音程配置が、静寂・侘び・幽玄の響きを作り出す。ジャズピアニストにも好まれる異国的なスケール。',
    tags: ['箏', '琴', '和風', '侘び・さび', '瞑想的'],
  },
};

const MV_DESC = {
  ascend:   'スケールを1音ずつ上昇し、1オクターブ上で折り返して下降する',
  descend:  'スケールを1音ずつ下降し、1オクターブ下で折り返して上昇する',
  pendulum: '最低音と最高音の間をsin波的になめらかに往復する',
  arch:     'スケール中央から低・高方向へ交互に広がる',
  stepwise: '4度以内の狭い音域を隣接音へじわじわ動く',
  random:   'スケール内でランダムに跳躍する',
  repeat:   '同じ音を繰り返す（リズムに集中できる）',
};

const PRESETS = [
  { l: 'ボサノバ',     n: 3, m: 8,  r: 0, sc: 'penta',          t: 'guitar',     mv: 'pendulum', bpm: 90  },
  { l: 'キューバ',     n: 5, m: 8,  r: 0, sc: 'blues',           t: 'piano',      mv: 'ascend',   bpm: 110 },
  { l: '琉球',         n: 4, m: 8,  r: 1, sc: 'ryukyu',          t: 'koto',       mv: 'arch',     bpm: 96  },
  { l: '平調子',       n: 5, m: 12, r: 2, sc: 'hirajoshi',       t: 'koto',       mv: 'descend',  bpm: 80  },
  { l: 'フュージョン', n: 7, m: 16, r: 0, sc: 'dorian',          t: 'vibraphone', mv: 'pendulum', bpm: 130 },
  { l: 'フラメンコ',   n: 5, m: 12, r: 4, sc: 'phrygian',        t: 'guitar',     mv: 'arch',     bpm: 118 },
  { l: 'ジャズ',       n: 5, m: 8,  r: 2, sc: 'dorian',          t: 'vibraphone', mv: 'random',   bpm: 140 },
  { l: '和声短調',     n: 5, m: 8,  r: 0, sc: 'harmonic_minor',  t: 'piano',      mv: 'descend',  bpm: 100 },
];

// ── 状態 ────────────────────────────────────────────────────

let actx = null, reverbNode = null;
let isPlaying = false, curStep = -1, timer = null, bpm = 110;
let drumPat = [], melody = [];

// ── オーディオ初期化 ─────────────────────────────────────────

function getACtx() {
  if (!actx) {
    actx = new (window.AudioContext || window.webkitAudioContext)();
    buildReverb();
  }
  return actx;
}

function buildReverb() {
  reverbNode = actx.createConvolver();
  const len = actx.sampleRate * 2.5;
  const buf = actx.createBuffer(2, len, actx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
  }
  reverbNode.buffer = buf;
  reverbNode.connect(actx.destination);
}

function getRevMix() { return document.getElementById('sl-rev').value / 100; }

function mkGain(val) {
  const g = actx.createGain();
  g.gain.value = val;
  return g;
}

function connectWithReverb(node, dry, wet) {
  const dg = mkGain(dry), wg = mkGain(wet);
  node.connect(dg); dg.connect(actx.destination);
  node.connect(wg); wg.connect(reverbNode);
}

// ── ユークリッドリズム計算 ───────────────────────────────────

function euclidean(n, m) {
  if (n <= 0) return Array(m).fill(0);
  if (n >= m) return Array(m).fill(1);
  let a = Array(n).fill(null).map(() => [1]);
  let b = Array(m - n).fill(null).map(() => [0]);
  while (b.length > 1) {
    const mn = Math.min(a.length, b.length);
    const na = [];
    for (let i = 0; i < mn; i++) na.push([...a[i], ...b[i]]);
    const rem = a.length > b.length ? a.slice(mn) : b.slice(mn);
    a = na; b = rem;
  }
  return [...a, ...b].flat();
}

function rotate(arr, r) {
  const m = arr.length;
  r = ((r % m) + m) % m;
  return [...arr.slice(r), ...arr.slice(0, r)];
}

// ── メロディ生成 ─────────────────────────────────────────────

function buildMelody(pat, scale, rootFreq, motif) {
  const scLen = scale.length;
  const onCount = pat.filter(v => v).length;
  const notes = [];

  if (motif === 'ascend') {
    let idx = 0;
    pat.forEach(v => {
      if (!v) { notes.push(null); return; }
      const cycle = scLen * 2, pos = idx % cycle;
      const si = pos < scLen ? pos : cycle - 1 - pos;
      const oct = Math.floor(idx / cycle);
      notes.push(rootFreq * Math.pow(2, (scale[si] + oct * 12) / 12));
      idx++;
    });

  } else if (motif === 'descend') {
    let idx = 0;
    pat.forEach(v => {
      if (!v) { notes.push(null); return; }
      const cycle = scLen * 2, pos = idx % cycle;
      const si = pos < scLen ? (scLen - 1 - pos) : pos - scLen;
      const oct = 1 - Math.floor(idx / cycle);
      notes.push(rootFreq * Math.pow(2, (scale[si] + oct * 12) / 12));
      idx++;
    });

  } else if (motif === 'pendulum') {
    let idx = 0;
    pat.forEach(v => {
      if (!v) { notes.push(null); return; }
      const phase = (idx / Math.max(onCount, 1)) * Math.PI * 2;
      const t = (Math.sin(phase - Math.PI / 2) + 1) / 2;
      const semis = t * (scLen - 1);
      const si = Math.round(semis) % scLen;
      const oct = Math.floor(Math.round(semis) / scLen);
      notes.push(rootFreq * Math.pow(2, (scale[si] + oct * 12) / 12));
      idx++;
    });

  } else if (motif === 'arch') {
    let lo = Math.floor(scLen / 2), hi = Math.floor(scLen / 2), toggle = true;
    pat.forEach(v => {
      if (!v) { notes.push(null); return; }
      if (toggle) {
        lo = Math.max(0, lo - 1);
        const si = lo % scLen, oct = Math.floor(lo / scLen);
        notes.push(rootFreq * Math.pow(2, (scale[si] - oct * 12) / 12));
      } else {
        hi = Math.min(scLen * 2 - 1, hi + 1);
        const si = hi % scLen, oct = Math.floor(hi / scLen);
        notes.push(rootFreq * Math.pow(2, (scale[si] + oct * 12) / 12));
      }
      toggle = !toggle;
    });

  } else if (motif === 'stepwise') {
    let st = 0, dir = 1, range = Math.min(4, scLen - 1);
    pat.forEach(v => {
      if (!v) { notes.push(null); return; }
      const si = ((st % scLen) + scLen) % scLen;
      notes.push(rootFreq * Math.pow(2, scale[si] / 12));
      st += dir;
      if (st >= range) dir = -1;
      if (st <= 0) dir = 1;
    });

  } else if (motif === 'random') {
    const all = Array.from({ length: scLen * 2 }, (_, i) => i);
    pat.forEach(v => {
      if (!v) { notes.push(null); return; }
      const d = all[Math.floor(Math.random() * all.length)];
      notes.push(rootFreq * Math.pow(2, (scale[d % scLen] + Math.floor(d / scLen) * 12) / 12));
    });

  } else { // repeat
    pat.forEach(v => notes.push(v ? rootFreq : null));
  }

  return notes;
}

// ── 音色合成 ─────────────────────────────────────────────────

function synthPiano(freq, t, dur, rev) {
  const ctx = actx, master = ctx.createGain();
  master.gain.setValueAtTime(0, t);
  master.gain.linearRampToValueAtTime(0.25, t + 0.005);
  master.gain.exponentialRampToValueAtTime(0.08, t + 0.12);
  master.gain.exponentialRampToValueAtTime(0.001, t + Math.min(dur * 1.1, 2.0));
  [1,2,3,4,5,6,7,8,9,10].forEach((h, hi) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq * h * (1 + h * h * 0.00003 + h * 0.00008);
    const a  = [1, 0.55, 0.28, 0.14, 0.08, 0.05, 0.03, 0.015, 0.008, 0.004][hi] * 0.22;
    const dc = [2.0, 1.5, 1.2, 0.9, 0.7, 0.55, 0.4, 0.3, 0.25, 0.2][hi];
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(a, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dc);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dc + 0.1);
  });
  const nlen = Math.floor(ctx.sampleRate * 0.04);
  const nb = ctx.createBuffer(1, nlen, ctx.sampleRate);
  const nd = nb.getChannelData(0);
  for (let i = 0; i < nlen; i++) nd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / nlen, 3);
  const ns = ctx.createBufferSource(), nf = ctx.createBiquadFilter(), ng = ctx.createGain();
  ns.buffer = nb; nf.type = 'bandpass'; nf.frequency.value = freq * 3; nf.Q.value = 1.5;
  ng.gain.setValueAtTime(0.04, t); ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  ns.connect(nf); nf.connect(ng); ng.connect(master); ns.start(t);
  connectWithReverb(master, 1 - rev, rev);
}

function synthMarimba(freq, t, dur, rev) {
  const ctx = actx, master = ctx.createGain();
  [1, 3.932, 9.538, 16.6, 26.4].forEach((h, hi) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = freq * h;
    const a  = [1, 0.32, 0.18, 0.06, 0.02][hi] * 0.28;
    const dc = [0.45, 0.18, 0.09, 0.05, 0.03][hi];
    g.gain.setValueAtTime(a, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dc);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dc + 0.05);
  });
  connectWithReverb(master, 1 - rev, rev);
}

function synthGuitar(freq, t, dur, rev) {
  const ctx = actx, master = ctx.createGain();
  const bufLen = Math.floor(ctx.sampleRate / freq);
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = freq * 8;
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.28, t);
  env.gain.exponentialRampToValueAtTime(0.001, t + Math.min(dur * 1.6, 1.8));
  const bright = ctx.createBiquadFilter();
  bright.type = 'peaking'; bright.frequency.value = freq * 4; bright.gain.value = 3; bright.Q.value = 2;
  src.connect(lp); lp.connect(bright); bright.connect(env); env.connect(master);
  src.start(t); src.stop(t + Math.min(dur * 1.6, 1.8) + 0.1);
  const click = ctx.createOscillator(), cg = ctx.createGain();
  click.frequency.value = freq * 8; click.type = 'sine';
  cg.gain.setValueAtTime(0.06, t); cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);
  click.connect(cg); cg.connect(master); click.start(t); click.stop(t + 0.02);
  connectWithReverb(master, 1 - rev, rev);
}

function synthBass(freq, t, dur, rev) {
  const ctx = actx, master = ctx.createGain(), f = freq * 0.5;
  [1, 2, 3, 4, 5].forEach((h, hi) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = hi === 0 ? 'triangle' : 'sine';
    o.frequency.value = f * h * (1 + hi * 0.0002);
    const a = [1, 0.4, 0.2, 0.08, 0.03][hi] * 0.32;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(a, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, t + Math.min(dur, 1.0));
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  });
  connectWithReverb(master, 1 - rev, rev);
}

function synthVibraphone(freq, t, dur, rev) {
  const ctx = actx, master = ctx.createGain();
  [1, 4.07, 10.65, 20.0].forEach((h, hi) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = freq * h;
    const a  = [1, 0.18, 0.04, 0.01][hi] * 0.2;
    const dc = [1.6, 0.5, 0.18, 0.08][hi];
    const lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.type = 'sine'; lfo.frequency.value = 5.5 + hi * 0.3; lg.gain.value = a * 0.02;
    lfo.connect(lg); lg.connect(g.gain); lfo.start(t); lfo.stop(t + dc + 0.1);
    g.gain.setValueAtTime(a, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dc);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dc + 0.1);
  });
  connectWithReverb(master, 1 - rev, rev);
}

function synthKoto(freq, t, dur, rev) {
  const ctx = actx, master = ctx.createGain();
  const bufLen = Math.floor(ctx.sampleRate / freq);
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) d[i] = (Math.random() * 2 - 1) * 0.6 + Math.sin(2 * Math.PI * i / bufLen) * 0.4;
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = freq * 10;
  const bp = ctx.createBiquadFilter(); bp.type = 'peaking'; bp.frequency.value = freq * 2; bp.gain.value = 5; bp.Q.value = 3;
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.3, t);
  env.gain.exponentialRampToValueAtTime(0.001, t + Math.min(dur * 1.2, 1.2));
  src.connect(lp); lp.connect(bp); bp.connect(env); env.connect(master);
  src.start(t); src.stop(t + Math.min(dur * 1.2, 1.2) + 0.1);
  const click = ctx.createOscillator(), cg = ctx.createGain();
  click.frequency.value = freq * 5; click.type = 'sine';
  cg.gain.setValueAtTime(0.08, t); cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);
  click.connect(cg); cg.connect(master); click.start(t); click.stop(t + 0.025);
  connectWithReverb(master, 1 - rev, rev);
}

function synthDrum(t) {
  const ctx = actx, master = ctx.createGain();
  const kick = ctx.createOscillator(), kg = ctx.createGain();
  kick.type = 'sine';
  kick.frequency.setValueAtTime(160, t);
  kick.frequency.exponentialRampToValueAtTime(38, t + 0.08);
  kg.gain.setValueAtTime(0.9, t); kg.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  kick.connect(kg); kg.connect(master); kick.start(t); kick.stop(t + 0.13);
  const nlen = Math.floor(ctx.sampleRate * 0.04);
  const nb = ctx.createBuffer(1, nlen, ctx.sampleRate);
  const nd = nb.getChannelData(0);
  for (let i = 0; i < nlen; i++) nd[i] = Math.random() * 2 - 1;
  const ns = ctx.createBufferSource(), lp = ctx.createBiquadFilter(), ng = ctx.createGain();
  ns.buffer = nb; lp.type = 'lowpass'; lp.frequency.value = 200;
  ng.gain.setValueAtTime(0.25, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  ns.connect(lp); lp.connect(ng); ng.connect(master); ns.start(t);
  const dm = mkGain(0.85), wm = mkGain(0.15);
  master.connect(dm); dm.connect(actx.destination);
  master.connect(wm); wm.connect(reverbNode);
}

function playNote(freq, timbre, t, dur, rev) {
  const synths = {
    piano: synthPiano, marimba: synthMarimba, guitar: synthGuitar,
    bass: synthBass, vibraphone: synthVibraphone, koto: synthKoto,
  };
  (synths[timbre] || synthPiano)(freq, t, dur, rev);
}

// ── UI 描画 ──────────────────────────────────────────────────

function renderScaleInfo(sc) {
  const info = SCALE_INFO[sc];
  if (!info) return;
  const scale = SCALES[sc];
  const semitoneStr = scale.join(' – ');
  document.getElementById('scale-info').innerHTML = `
    <div class="scale-info-header">
      <span class="scale-info-name">${SCALE_NAMES[sc]}</span>
      <span class="scale-info-en">${info.en}</span>
    </div>
    <div class="scale-info-intervals">音程（半音）：${semitoneStr}</div>
    <div class="scale-info-intervals">音度：${info.degrees}</div>
    <div class="scale-info-desc">${info.desc}</div>
    <div class="scale-tags">
      ${info.tags.map(tag => `<span class="scale-tag">${tag}</span>`).join('')}
    </div>
  `;
}

function renderSeq() {
  const area = document.getElementById('seq-area');
  const dr = drumPat.map((v, i) =>
    `<div class="drum-cell${v ? ' on' : ''}${i === curStep ? ' cur' : ''}" id="dr-${i}"></div>`
  ).join('');
  const ml = melody.map((v, i) =>
    `<div class="note-cell${v ? ' on' : ''}${i === curStep ? ' cur' : ''}" id="ml-${i}"></div>`
  ).join('');
  area.innerHTML = `
    <div class="trow"><div class="tlabel">ドラム</div><div class="cells">${dr}</div></div>
    <div class="trow"><div class="tlabel">メロディ</div><div class="cells">${ml}</div></div>
  `;
}

function drawViz() {
  const canvas = document.getElementById('cv');
  const W = canvas.clientWidth * devicePixelRatio || 640;
  const H = 190;
  canvas.width = W; canvas.height = H;
  const cx = W / 2, cy = H / 2, R = H * 0.41;
  const ctx = canvas.getContext('2d');
  const dark = matchMedia('(prefers-color-scheme:dark)').matches;

  ctx.fillStyle = dark ? '#1e1e1c' : '#f5f4f0';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, R * 0.55, 0, Math.PI * 2); ctx.stroke();

  const m = drumPat.length;
  const onIdxs = drumPat.map((v, i) => v ? i : -1).filter(i => i >= 0);

  ctx.strokeStyle = dark ? 'rgba(29,158,117,0.18)' : 'rgba(29,158,117,0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < onIdxs.length; i++) {
    const a1 = (onIdxs[i] / m) * Math.PI * 2 - Math.PI / 2;
    const a2 = (onIdxs[(i + 1) % onIdxs.length] / m) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx + R * Math.cos(a1), cy + R * Math.sin(a1));
    ctx.lineTo(cx + R * Math.cos(a2), cy + R * Math.sin(a2));
    ctx.stroke();
  }

  const fs = melody.filter(f => f);
  const fMin = fs.length ? Math.min(...fs) : 200;
  const fMax = fs.length ? Math.max(...fs) : 900;
  const logMin = Math.log2(fMin + 1), logMax = Math.log2(fMax + 1);

  drumPat.forEach((v, i) => {
    const angle = (i / m) * Math.PI * 2 - Math.PI / 2;
    const isCur = i === curStep;
    if (v && melody[i]) {
      const t2 = logMax > logMin ? (Math.log2(melody[i] + 1) - logMin) / (logMax - logMin) : 0.5;
      const rr = R * 0.55 + t2 * (R - R * 0.55);
      ctx.beginPath(); ctx.arc(cx + rr * Math.cos(angle), cy + rr * Math.sin(angle), isCur ? 12 : 9, 0, Math.PI * 2);
      ctx.fillStyle = isCur ? '#185FA5' : '#7F77DD'; ctx.fill();
    } else if (v) {
      ctx.beginPath(); ctx.arc(cx + R * Math.cos(angle), cy + R * Math.sin(angle), isCur ? 12 : 9, 0, Math.PI * 2);
      ctx.fillStyle = isCur ? '#185FA5' : '#1D9E75'; ctx.fill();
    } else {
      ctx.beginPath(); ctx.arc(cx + R * Math.cos(angle), cy + R * Math.sin(angle), 5, 0, Math.PI * 2);
      ctx.fillStyle = dark ? '#2c2c2a' : '#e0ddd6'; ctx.fill();
    }
    if (m <= 16) {
      ctx.fillStyle = dark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.22)';
      ctx.font = '9px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(i + 1, cx + (R + 16) * Math.cos(angle), cy + (R + 16) * Math.sin(angle));
    }
  });

  if (fs.length > 1) {
    ctx.strokeStyle = dark ? 'rgba(127,119,221,0.3)' : 'rgba(127,119,221,0.25)';
    ctx.lineWidth = 1; ctx.beginPath(); let started = false;
    melody.forEach((f, i) => {
      if (!f) return;
      const t2 = logMax > logMin ? (Math.log2(f + 1) - logMin) / (logMax - logMin) : 0.5;
      const rr = R * 0.55 + t2 * (R - R * 0.55);
      const angle = (i / m) * Math.PI * 2 - Math.PI / 2;
      const x = cx + rr * Math.cos(angle), y = cy + rr * Math.sin(angle);
      if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  const ly = H - 12;
  [['#7F77DD', 'メロディ'], ['#1D9E75', 'ドラム']].forEach(([c, l], i) => {
    ctx.fillStyle = c; ctx.beginPath(); ctx.arc(W * 0.3 + i * W * 0.25, ly, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = dark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.3)';
    ctx.font = '10px sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(l, W * 0.3 + i * W * 0.25 + 8, ly);
  });
}

// ── メイン更新 ───────────────────────────────────────────────

function upd() {
  const n = +document.getElementById('sl-n').value;
  const m = +document.getElementById('sl-m').value;
  const r = Math.min(+document.getElementById('sl-r').value, m - 1);
  document.getElementById('sl-r').max = m - 1;
  document.getElementById('sl-r').value = r;
  ['n', 'm', 'r'].forEach(k => document.getElementById('o-' + k).textContent = document.getElementById('sl-' + k).value);

  const sc   = document.getElementById('sel-sc').value;
  const root = +document.getElementById('sel-root').value;
  const mv   = document.getElementById('sel-mv').value;

  document.getElementById('mv-desc').textContent = MV_DESC[mv] || '';
  drumPat = rotate(euclidean(n, m), r);
  melody  = buildMelody(drumPat, SCALES[sc], root, mv);

  document.getElementById('lbl-r').textContent = `E(${n},${m})`;
  document.getElementById('lbl-s').textContent = SCALE_NAMES[sc];

  renderScaleInfo(sc);
  renderSeq();
  drawViz();
}

function onBpm() {
  bpm = +document.getElementById('sl-bpm').value;
  document.getElementById('o-bpm').textContent = bpm;
  document.getElementById('lbl-b').textContent = bpm;
}

// ── 再生制御 ─────────────────────────────────────────────────

function tick() {
  if (!isPlaying) return;
  const ctx = getACtx();
  const ms = 60000 / bpm / 4;
  const t = ctx.currentTime;
  const dur = ms / 1000 * 0.88;
  const m = drumPat.length;
  curStep = (curStep + 1) % m;

  if (drumPat[curStep]) synthDrum(t);
  const timbre = document.getElementById('sel-t').value;
  const rev = getRevMix();
  if (melody[curStep]) playNote(melody[curStep], timbre, t, dur, rev);

  document.querySelectorAll('.drum-cell').forEach((c, i) => c.classList.toggle('cur', i === curStep));
  document.querySelectorAll('.note-cell').forEach((c, i) => c.classList.toggle('cur', i === curStep));
  drawViz();
  timer = setTimeout(tick, ms);
}

function togglePlay() {
  const btn = document.getElementById('play-btn');
  if (isPlaying) {
    isPlaying = false; clearTimeout(timer); curStep = -1;
    btn.textContent = '▶ 再生'; btn.classList.remove('playing');
    renderSeq(); drawViz();
  } else {
    getACtx();
    if (actx.state === 'suspended') actx.resume();
    isPlaying = true;
    btn.textContent = '■ 停止'; btn.classList.add('playing');
    tick();
  }
}

function randomize() {
  const n = Math.floor(Math.random() * 7) + 2;
  const m = [8, 12, 16][Math.floor(Math.random() * 3)];
  document.getElementById('sl-n').value = n;
  document.getElementById('sl-m').value = m;
  document.getElementById('sl-r').value = Math.floor(Math.random() * m);
  const scs = Object.keys(SCALES);
  document.getElementById('sel-sc').value = scs[Math.floor(Math.random() * scs.length)];
  upd();
}

function applyPreset(i) {
  const p = PRESETS[i];
  document.getElementById('sl-n').value  = p.n;
  document.getElementById('sl-m').value  = p.m;
  document.getElementById('sl-r').value  = p.r;
  document.getElementById('sel-sc').value = p.sc;
  document.getElementById('sel-t').value  = p.t;
  document.getElementById('lbl-t').textContent =
    document.getElementById('sel-t').options[document.getElementById('sel-t').selectedIndex].text;
  document.getElementById('sel-mv').value  = p.mv;
  document.getElementById('sl-bpm').value  = p.bpm;
  document.getElementById('o-bpm').textContent  = p.bpm;
  document.getElementById('lbl-b').textContent  = p.bpm;
  bpm = p.bpm;
  upd();
}

// ── 初期化 ───────────────────────────────────────────────────

function init() {
  const presetRow = document.getElementById('preset-row');
  presetRow.innerHTML = PRESETS.map((p, i) =>
    `<button class="tag-btn" onclick="applyPreset(${i})">${p.l}</button>`
  ).join('');
  upd();
  window.addEventListener('resize', drawViz);
}

document.addEventListener('DOMContentLoaded', init);

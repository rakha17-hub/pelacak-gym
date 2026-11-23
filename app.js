/* ==================== IRONRANK — OFFLINE WORKOUT & RANK ENGINE ==================== */
const STORAGE_KEY = "ironrank_gym_state_v1";

const RANK_TIERS = [
  {
    name: "Bronze Iron",
    minVol: 0,
    color: "#CD7F32",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="#CD7F32" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`
  },
  {
    name: "Silver Lifter",
    minVol: 5000,
    color: "#CBD5E1",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="#CBD5E1" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`
  },
  {
    name: "Gold Athlete",
    minVol: 25000,
    color: "#FACC15",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="#FACC15" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`
  },
  {
    name: "Platinum Titan",
    minVol: 75000,
    color: "#38BDF8",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="#38BDF8" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>`
  },
  {
    name: "Diamond Olympia",
    minVol: 200000,
    color: "#A855F7",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="#A855F7" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>`
  },
  {
    name: "Mythic Herculean",
    minVol: 500000,
    color: "#F43F5E",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="#F43F5E" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`
  }
];

const DEFAULT_EXERCISES = [
  { name: "Barbell Bench Press", muscle: "Dada" },
  { name: "Incline Dumbbell Press", muscle: "Dada" },
  { name: "Chest Fly / Pec Deck", muscle: "Dada" },
  { name: "Lat Pulldown", muscle: "Punggung" },
  { name: "Barbell / Cable Row", muscle: "Punggung" },
  { name: "Deadlift / Romanian Deadlift", muscle: "Punggung" },
  { name: "Barbell Squat", muscle: "Kaki" },
  { name: "Leg Press", muscle: "Kaki" },
  { name: "Leg Extension / Hamstring Curl", muscle: "Kaki" },
  { name: "Overhead Shoulder Press", muscle: "Bahu" },
  { name: "Dumbbell Lateral Raise", muscle: "Bahu" },
  { name: "Bicep Curl (Barbell/Dumbbell)", muscle: "Lengan" },
  { name: "Tricep Pushdown / Extension", muscle: "Lengan" },
  { name: "Hanging Leg Raise / Cable Crunch", muscle: "Perut" }
];

const DEFAULT_ROUTINES = [
  {
    id: "rt_push",
    name: "Push Day (Dada, Bahu, Tricep)",
    exercises: ["Barbell Bench Press", "Incline Dumbbell Press", "Overhead Shoulder Press", "Dumbbell Lateral Raise", "Tricep Pushdown / Extension"]
  },
  {
    id: "rt_pull",
    name: "Pull Day (Punggung & Bicep)",
    exercises: ["Lat Pulldown", "Barbell / Cable Row", "Romanian Deadlift", "Bicep Curl (Barbell/Dumbbell)"]
  },
  {
    id: "rt_legs",
    name: "Leg Day (Kaki & Core)",
    exercises: ["Barbell Squat", "Leg Press", "Leg Extension / Hamstring Curl", "Hanging Leg Raise / Cable Crunch"]
  }
];

function createInitialState() {
  return {
    settings: {
      userName: "Atlet Gym",
      theme: "dark",
      program: "bulking",
      accent: "auto",
      targetWeight: 70,
      defaultTimer: 90
    },
    exercises: [...DEFAULT_EXERCISES],
    routines: [...DEFAULT_ROUTINES],
    workouts: [],       // { id, date, name, totalVolume, prEarned, items: [{ name, muscle, sets: [{ weight, reps, done }] }] }
    bodyweights: [],    // { date, weight }
    personalRecords: {},// { [exerciseName]: maxWeight }
    totalVolume: 0,
    prCount: 0,
    activeSession: {
      name: "Sesi Latihan Baru",
      items: []
    }
  };
}

let state = loadState();
let selectedMuscleFilter = "Semua";
let timerInterval = null;
let remainingSeconds = 0;

/* ==================== STORAGE & UTILS ==================== */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw);
    return {
      ...createInitialState(),
      ...parsed,
      settings: { ...createInitialState().settings, ...(parsed.settings || {}) },
      activeSession: { ...createInitialState().activeSession, ...(parsed.activeSession || {}) }
    };
  } catch (e) {
    console.error("Gagal memuat data lokal:", e);
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(message) {
  const el = document.getElementById("toastNotification");
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.add("hidden"), 2400);
}

function formatDateID(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function playBeepAlert() {
  if (navigator.vibrate) {
    navigator.vibrate([250, 120, 250, 120, 400]);
  }
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (_) {}
}

/* ==================== THEME & PROGRAM SYNC ==================== */
function applyThemeAndProgram() {
  document.documentElement.setAttribute("data-theme", state.settings.theme);
  document.documentElement.setAttribute("data-program", state.settings.program);

  if (state.settings.accent && state.settings.accent !== "auto") {
    document.documentElement.setAttribute("data-accent", state.settings.accent);
  } else {
    document.documentElement.removeAttribute("data-accent");
  }

  const sunIcon = document.getElementById("themeIconSun");
  const moonIcon = document.getElementById("themeIconMoon");
  if (state.settings.theme === "light") {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }

  const badge = document.getElementById("headerProgramBadge");
  badge.textContent = state.settings.program === "cutting" ? "CUTTING MODE" : "BULKING MODE";

  document.getElementById("selectBulkingBtn").classList.toggle("active", state.settings.program === "bulking");
  document.getElementById("selectCuttingBtn").classList.toggle("active", state.settings.program === "cutting");

  document.querySelectorAll("#accentColorSwatches .swatch").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.accent === state.settings.accent);
  });
}

/* ==================== RANK & DASHBOARD RENDER ==================== */
function getRankInfo(volume) {
  let current = RANK_TIERS[0];
  let next = RANK_TIERS[1] || null;
  for (let i = 0; i < RANK_TIERS.length; i++) {
    if (volume >= RANK_TIERS[i].minVol) {
      current = RANK_TIERS[i];
      next = RANK_TIERS[i + 1] || null;
    }
  }
  let progressPct = 100;
  if (next) {
    const span = next.minVol - current.minVol;
    progressPct = Math.min(100, Math.max(0, ((volume - current.minVol) / span) * 100));
  }
  return { current, next, progressPct };
}

function calculateStreak() {
  if (!state.workouts.length) return 0;
  const uniqueDays = [...new Set(state.workouts.map(w => w.date.slice(0, 10)))].sort().reverse();
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const dayStr of uniqueDays) {
    const diffDays = Math.round((cursor - new Date(dayStr + "T00:00:00")) / 86400000);
    if (diffDays === 0 || diffDays === 1) {
      streak++;
      cursor = new Date(dayStr + "T00:00:00");
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function renderDashboard() {
  const { current, next, progressPct } = getRankInfo(state.totalVolume);

  document.getElementById("rankName").textContent = current.name;
  document.getElementById("displayUserName").textContent = state.settings.userName || "Atlet Gym";
  document.getElementById("rankBadgeVisual").innerHTML = current.icon;
  document.getElementById("rankBadgeVisual").style.borderColor = current.color;

  document.getElementById("currentVolumeText").textContent = `${state.totalVolume.toLocaleString("id-ID")} kg Volume`;
  document.getElementById("nextRankText").textContent = next
    ? `Target ${next.name}: ${next.minVol.toLocaleString("id-ID")} kg`
    : "Rank Maksimal Tercapai!";
  document.getElementById("rankProgressBar").style.width = `${progressPct}%`;

  document.getElementById("streakCount").textContent = `${calculateStreak()} Hari`;
  document.getElementById("totalSessionsCount").textContent = state.workouts.length;
  document.getElementById("totalPrCount").textContent = state.prCount || 0;

  const latestBw = state.bodyweights.length ? state.bodyweights[state.bodyweights.length - 1].weight : null;
  document.getElementById("latestBodyweight").textContent = latestBw ? `${latestBw} kg` : "-- kg";

  // Render Rank Tiers
  const tiersEl = document.getElementById("rankTiersList");
  tiersEl.innerHTML = RANK_TIERS.map(tier => {
    const unlocked = state.totalVolume >= tier.minVol;
    return `
      <div class="rank-tier-item ${unlocked ? "unlocked" : "locked"}">
        <div class="rank-tier-left">
          ${tier.icon}
          <span>${tier.name}</span>
        </div>
        <span>${tier.minVol.toLocaleString("id-ID")} kg</span>
      </div>
    `;
  }).join("");

  renderRoutines();
}

function renderRoutines() {
  const container = document.getElementById("routinesContainer");
  container.innerHTML = state.routines.map(rt => `
    <div class="routine-card">
      <div class="routine-info">
        <h4>${rt.name}</h4>
        <p>${rt.exercises.length} gerakan: ${rt.exercises.slice(0, 2).join(", ")}${rt.exercises.length > 2 ? "..." : ""}</p>
      </div>
      <div class="routine-actions">
        <button class="btn btn-primary" onclick="startRoutine('${rt.id}')">Mulai</button>
      </div>
    </div>
  `).join("");
}

window.startRoutine = function (routineId) {
  const rt = state.routines.find(r => r.id === routineId);
  if (!rt) return;
  state.activeSession = {
    name: rt.name,
    items: rt.exercises.map(exName => {
      const found = state.exercises.find(e => e.name === exName);
      return {
        name: exName,
        muscle: found ? found.muscle : "Custom",
        sets: [
          { weight: "", reps: "", done: false },
          { weight: "", reps: "", done: false },
          { weight: "", reps: "", done: false }
        ]
      };
    })
  };
  saveState();
  switchTab("tab-workout");
  renderActiveWorkout();
  showToast(`Template "${rt.name}" dimuat!`);
};

/* ==================== WORKOUT LOGGER ==================== */
function renderMuscleFilterAndSelect() {
  const select = document.getElementById("exerciseSelect");
  const filtered = selectedMuscleFilter === "Semua"
    ? state.exercises
    : state.exercises.filter(e => e.muscle === selectedMuscleFilter);

  select.innerHTML = filtered.map(e => `<option value="${e.name}">${e.name} (${e.muscle})</option>`).join("");
}

function getLastPerformanceText(exerciseName) {
  for (let i = state.workouts.length - 1; i >= 0; i--) {
    const found = state.workouts[i].items.find(it => it.name === exerciseName);
    if (found && found.sets.length) {
      const best = found.sets.reduce((acc, s) => {
        const w = parseFloat(s.weight) || 0;
        const r = parseInt(s.reps, 10) || 0;
        return (w * r > acc.w * acc.r) ? { w, r } : acc;
      }, { w: 0, r: 0 });
      if (best.w > 0 || best.r > 0) {
        return `Terakhir: ${best.w} kg × ${best.r} reps`;
      }
    }
  }
  return "Belum ada catatan sebelumnya";
}

function calcActiveSessionVolume() {
  let vol = 0;
  state.activeSession.items.forEach(item => {
    item.sets.forEach(s => {
      if (s.done) {
        vol += (parseFloat(s.weight) || 0) * (parseInt(s.reps, 10) || 0);
      }
    });
  });
  return Math.round(vol);
}

function renderActiveWorkout() {
  document.getElementById("workoutSessionName").value = state.activeSession.name || "Sesi Latihan";
  document.getElementById("workoutDateDisplay").textContent = formatDateID(new Date().toISOString());
  document.getElementById("sessionVolumeBadge").textContent = `${calcActiveSessionVolume().toLocaleString("id-ID")} kg`;

  const container = document.getElementById("activeExercisesContainer");
  if (!state.activeSession.items.length) {
    container.innerHTML = `
      <div class="empty-state card" id="emptyWorkoutState">
        <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/>
        </svg>
        <p>Belum ada gerakan dipilih. Pilih gerakan di atas atau mulai dari Template di Beranda.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.activeSession.items.map((item, exIdx) => {
    const prevRecord = state.personalRecords[item.name] || 0;
    const hasNewPr = item.sets.some(s => s.done && (parseFloat(s.weight) || 0) > prevRecord && (parseFloat(s.weight) || 0) > 0);

    return `
      <div class="exercise-block">
        <div class="exercise-block-header">
          <div>
            <div class="exercise-block-title">
              ${item.name}
              ${hasNewPr ? `<span class="pr-flash-badge">NEW PR!</span>` : ""}
            </div>
            <span class="prev-record-hint">${getLastPerformanceText(item.name)}</span>
          </div>
          <button class="btn-link" style="color:var(--danger);" onclick="removeExerciseFromSession(${exIdx})">Hapus</button>
        </div>

        <div class="sets-table-header">
          <span>SET</span>
          <span>BEBAN (KG)</span>
          <span>REPS</span>
          <span>SELESAI</span>
          <span></span>
        </div>

        ${item.sets.map((s, sIdx) => `
          <div class="set-row ${s.done ? "completed" : ""}">
            <span class="set-num">${sIdx + 1}</span>
            <input type="number" step="0.5" class="set-input" placeholder="0" value="${s.weight}"
              onchange="updateSetField(${exIdx}, ${sIdx}, 'weight', this.value)" />
            <input type="number" class="set-input" placeholder="0" value="${s.reps}"
              onchange="updateSetField(${exIdx}, ${sIdx}, 'reps', this.value)" />
            <button type="button" class="check-set-btn" onclick="toggleSetDone(${exIdx}, ${sIdx})" title="Tandai Selesai">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </button>
            <button type="button" class="remove-set-btn" onclick="removeSetRow(${exIdx}, ${sIdx})" title="Hapus Set">&times;</button>
          </div>
        `).join("")}

        <button type="button" class="btn btn-secondary btn-block mt-3" onclick="addSetRow(${exIdx})">+ Tambah Set</button>
      </div>
    `;
  }).join("");
}

window.updateSetField = function (exIdx, sIdx, field, val) {
  state.activeSession.items[exIdx].sets[sIdx][field] = val;
  saveState();
  document.getElementById("sessionVolumeBadge").textContent = `${calcActiveSessionVolume().toLocaleString("id-ID")} kg`;
};

window.toggleSetDone = function (exIdx, sIdx) {
  const setObj = state.activeSession.items[exIdx].sets[sIdx];
  setObj.done = !setObj.done;
  saveState();
  renderActiveWorkout();

  if (setObj.done) {
    startRestTimer(state.settings.defaultTimer || 90);
  }
};

window.addSetRow = function (exIdx) {
  const prevSets = state.activeSession.items[exIdx].sets;
  const last = prevSets[prevSets.length - 1] || { weight: "", reps: "" };
  prevSets.push({ weight: last.weight, reps: last.reps, done: false });
  saveState();
  renderActiveWorkout();
};

window.removeSetRow = function (exIdx, sIdx) {
  state.activeSession.items[exIdx].sets.splice(sIdx, 1);
  saveState();
  renderActiveWorkout();
};

window.removeExerciseFromSession = function (exIdx) {
  state.activeSession.items.splice(exIdx, 1);
  saveState();
  renderActiveWorkout();
};

/* ==================== REST TIMER ==================== */
function startRestTimer(seconds) {
  clearInterval(timerInterval);
  remainingSeconds = seconds;
  updateTimerDisplay();
  document.getElementById("restTimerBar").classList.remove("hidden");

  timerInterval = setInterval(() => {
    remainingSeconds--;
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      document.getElementById("restTimerBar").classList.add("hidden");
      playBeepAlert();
      showToast("Waktu istirahat selesai! Gas set berikutnya!");
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const secs = String(remainingSeconds % 60).padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;
}

/* ==================== FINISH WORKOUT ==================== */
document.getElementById("finishWorkoutBtn").addEventListener("click", () => {
  const sessionVol = calcActiveSessionVolume();
  if (!state.activeSession.items.length || sessionVol <= 0) {
    showToast("Centang minimal 1 set berisi beban & reps dulu!");
    return;
  }

  let newPrsInSession = 0;
  state.activeSession.items.forEach(item => {
    item.sets.forEach(s => {
      if (s.done) {
        const w = parseFloat(s.weight) || 0;
        const prevMax = state.personalRecords[item.name] || 0;
        if (w > prevMax && w > 0) {
          state.personalRecords[item.name] = w;
          newPrsInSession++;
        }
      }
    });
  });

  const record = {
    id: "wk_" + Date.now(),
    date: new Date().toISOString(),
    name: document.getElementById("workoutSessionName").value.trim() || "Latihan Gym",
    totalVolume: sessionVol,
    prEarned: newPrsInSession,
    items: JSON.parse(JSON.stringify(state.activeSession.items))
  };

  state.workouts.push(record);
  state.totalVolume += sessionVol;
  state.prCount = (state.prCount || 0) + newPrsInSession;
  state.activeSession = { name: "Sesi Latihan Baru", items: [] };

  saveState();
  renderActiveWorkout();
  renderDashboard();
  renderStats();
  switchTab("tab-home");
  showToast(`Sesi tersimpan! +${sessionVol.toLocaleString("id-ID")} kg volume`);
});

/* ==================== STATS & SVG CHARTS ==================== */
function renderStats() {
  document.getElementById("targetWeightLabel").textContent = `Target: ${state.settings.targetWeight || "--"} kg`;

  // Body Weight SVG Chart
  const bwContainer = document.getElementById("bodyweightChartContainer");
  if (state.bodyweights.length >= 2) {
    bwContainer.innerHTML = buildLineSvg(
      state.bodyweights.slice(-10).map(b => ({ label: formatDateID(b.date).slice(0, 6), val: b.weight })),
      "kg"
    );
  } else {
    bwContainer.innerHTML = `<p class="text-muted text-sm text-center">Catat minimal 2 data berat badan untuk melihat grafik.</p>`;
  }

  // Exercise Progress Dropdown & SVG Chart
  const trainedNames = [...new Set(state.workouts.flatMap(w => w.items.map(i => i.name)))];
  const exSelect = document.getElementById("statsExerciseSelect");
  exSelect.innerHTML = trainedNames.length
    ? trainedNames.map(n => `<option value="${n}">${n}</option>`).join("")
    : `<option value="">Belum ada gerakan dilatih</option>`;

  renderExerciseChart();

  // History List
  const historyList = document.getElementById("workoutHistoryList");
  if (!state.workouts.length) {
    historyList.innerHTML = `<p class="text-muted text-sm text-center">Belum ada sesi latihan tersimpan.</p>`;
  } else {
    historyList.innerHTML = [...state.workouts].reverse().map(w => `
      <div class="history-card">
        <div class="history-top">
          <span class="history-title">${w.name}</span>
          <span class="history-vol">${w.totalVolume.toLocaleString("id-ID")} kg</span>
        </div>
        <div class="history-exercises">
          ${formatDateID(w.date)} • ${w.items.map(i => i.name).join(", ")}
        </div>
      </div>
    `).join("");
  }
}

function renderExerciseChart() {
  const exName = document.getElementById("statsExerciseSelect").value;
  const container = document.getElementById("exerciseChartContainer");
  if (!exName) {
    container.innerHTML = `<p class="text-muted text-sm text-center">Belum ada riwayat latihan untuk ditampilkan.</p>`;
    return;
  }

  const points = [];
  state.workouts.forEach(w => {
    const found = w.items.find(i => i.name === exName);
    if (found) {
      const maxW = Math.max(0, ...found.sets.filter(s => s.done).map(s => parseFloat(s.weight) || 0));
      if (maxW > 0) {
        points.push({ label: formatDateID(w.date).slice(0, 6), val: maxW });
      }
    }
  });

  if (points.length < 2) {
    container.innerHTML = `<p class="text-muted text-sm text-center">Butuh minimal 2 sesi dengan beban tercatat untuk grafik.</p>`;
    return;
  }
  container.innerHTML = buildLineSvg(points.slice(-10), "kg");
}

function buildLineSvg(points, unit) {
  const width = 460;
  const height = 150;
  const padX = 28;
  const padY = 24;

  const vals = points.map(p => p.val);
  const minV = Math.min(...vals);
  const maxV = Math.max(...vals);
  const range = maxV - minV || 1;

  const coords = points.map((p, idx) => {
    const x = padX + (idx / (points.length - 1)) * (width - padX * 2);
    const y = height - padY - ((p.val - minV) / range) * (height - padY * 2);
    return { ...p, x, y };
  });

  const polylinePts = coords.map(c => `${c.x},${c.y}`).join(" ");
  const circles = coords.map(c => `
    <circle cx="${c.x}" cy="${c.y}" r="4.5" fill="var(--accent)" />
    <text x="${c.x}" y="${c.y - 9}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-main)">${c.val}${unit}</text>
    <text x="${c.x}" y="${height - 4}" text-anchor="middle" font-size="9" fill="var(--text-muted)">${c.label}</text>
  `).join("");

  return `
    <svg viewBox="0 0 ${width} ${height}">
      <polyline fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" points="${polylinePts}" />
      ${circles}
    </svg>
  `;
}

/* ==================== CALCULATORS (1RM & PLATE) ==================== */
document.getElementById("calculate1rmBtn").addEventListener("click", () => {
  const w = parseFloat(document.getElementById("calcWeightInput").value);
  const r = parseInt(document.getElementById("calcRepsInput").value, 10);
  if (!w || !r || r < 1) {
    showToast("Masukkan beban dan repetisi valid!");
    return;
  }
  // Rumus Epley
  const oneRm = r === 1 ? w : Math.round(w * (1 + r / 30));
  document.getElementById("result1rmValue").textContent = `${oneRm} kg`;

  const pcts = [90, 85, 80, 75, 70, 60];
  document.getElementById("percentage1rmGrid").innerHTML = pcts.map(p => `
    <div class="pct-chip"><strong>${p}%</strong>: ${Math.round(oneRm * (p / 100))} kg</div>
  `).join("");
});

document.getElementById("calculatePlateBtn").addEventListener("click", () => {
  const target = parseFloat(document.getElementById("plateTargetInput").value);
  const barW = parseFloat(document.getElementById("barbellWeightSelect").value);
  const visual = document.getElementById("platesVisualList");

  if (!target || target <= barW) {
    visual.innerHTML = `<span class="text-sm text-muted">Target beban harus lebih besar dari berat barbel (${barW} kg).</span>`;
    return;
  }

  let perSide = (target - barW) / 2;
  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
  const chosen = [];

  for (const pl of availablePlates) {
    while (perSide >= pl - 0.001) {
      chosen.push(pl);
      perSide -= pl;
    }
  }

  visual.innerHTML = chosen.length
    ? chosen.map(c => `<span class="plate-disc">${c} kg</span>`).join("")
    : `<span class="text-sm text-muted">Hanya barbel kosong</span>`;
});

/* ==================== NAVIGATION & EVENT BINDINGS ==================== */
function switchTab(targetId) {
  document.querySelectorAll(".tab-view").forEach(v => v.classList.remove("active"));
  document.getElementById(targetId).classList.add("active");

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.target === targetId);
  });
}

document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => switchTab(btn.dataset.target));
});

document.getElementById("themeToggleBtn").addEventListener("click", () => {
  state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
  saveState();
  applyThemeAndProgram();
});

document.getElementById("quickStartWorkoutBtn").addEventListener("click", () => {
  switchTab("tab-workout");
  renderActiveWorkout();
});

document.getElementById("workoutSessionName").addEventListener("input", (e) => {
  state.activeSession.name = e.target.value;
  saveState();
});

document.querySelectorAll("#muscleCategoryPills .pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll("#muscleCategoryPills .pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    selectedMuscleFilter = pill.dataset.muscle;
    renderMuscleFilterAndSelect();
  });
});

document.getElementById("addExerciseToSessionBtn").addEventListener("click", () => {
  const exName = document.getElementById("exerciseSelect").value;
  if (!exName) return;
  const found = state.exercises.find(e => e.name === exName);
  state.activeSession.items.push({
    name: exName,
    muscle: found ? found.muscle : "Custom",
    sets: [
      { weight: "", reps: "", done: false },
      { weight: "", reps: "", done: false },
      { weight: "", reps: "", done: false }
    ]
  });
  saveState();
  renderActiveWorkout();
  showToast(`${exName} ditambahkan`);
});

document.getElementById("saveCustomExerciseBtn").addEventListener("click", () => {
  const name = document.getElementById("customExerciseName").value.trim();
  const muscle = document.getElementById("customExerciseMuscle").value;
  if (!name) return;
  state.exercises.unshift({ name, muscle });
  document.getElementById("customExerciseName").value = "";
  saveState();
  renderMuscleFilterAndSelect();
  showToast(`Gerakan "${name}" disimpan!`);
});

// Timer controls
document.getElementById("timerMinusBtn").addEventListener("click", () => {
  remainingSeconds = Math.max(5, remainingSeconds - 15);
  updateTimerDisplay();
});
document.getElementById("timerPlusBtn").addEventListener("click", () => {
  remainingSeconds += 15;
  updateTimerDisplay();
});
document.getElementById("timerStopBtn").addEventListener("click", () => {
  clearInterval(timerInterval);
  document.getElementById("restTimerBar").classList.add("hidden");
});

// Bodyweight save
document.getElementById("saveBodyweightBtn").addEventListener("click", () => {
  const bw = parseFloat(document.getElementById("bodyweightInput").value);
  if (!bw || bw <= 0) return;
  state.bodyweights.push({ date: new Date().toISOString(), weight: bw });
  document.getElementById("bodyweightInput").value = "";
  saveState();
  renderDashboard();
  renderStats();
  showToast(`Berat badan ${bw} kg dicatat!`);
});

document.getElementById("statsExerciseSelect").addEventListener("change", renderExerciseChart);

// Settings save
document.getElementById("selectBulkingBtn").addEventListener("click", () => {
  state.settings.program = "bulking";
  applyThemeAndProgram();
});
document.getElementById("selectCuttingBtn").addEventListener("click", () => {
  state.settings.program = "cutting";
  applyThemeAndProgram();
});

document.querySelectorAll("#accentColorSwatches .swatch").forEach(sw => {
  sw.addEventListener("click", () => {
    state.settings.accent = sw.dataset.accent;
    saveState();
    applyThemeAndProgram();
  });
});

document.getElementById("saveSettingsBtn").addEventListener("click", () => {
  state.settings.userName = document.getElementById("settingUserName").value.trim() || "Atlet Gym";
  state.settings.targetWeight = parseFloat(document.getElementById("settingTargetWeight").value) || 70;
  state.settings.defaultTimer = parseInt(document.getElementById("settingDefaultTimer").value, 10) || 90;
  saveState();
  renderDashboard();
  renderStats();
  showToast("Pengaturan berhasil disimpan!");
});

// Export / Import / Reset
document.getElementById("exportDataBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ironrank-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Backup JSON diunduh!");
});

document.getElementById("importDataInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      state = { ...createInitialState(), ...imported };
      saveState();
      initAppUI();
      showToast("Data berhasil dipulihkan!");
    } catch (_) {
      showToast("File JSON tidak valid!");
    }
  };
  reader.readAsText(file);
});

document.getElementById("resetAllDataBtn").addEventListener("click", () => {
  if (confirm("Yakin ingin menghapus seluruh riwayat latihan, berat badan, dan rank?")) {
    localStorage.removeItem(STORAGE_KEY);
    state = createInitialState();
    initAppUI();
    showToast("Semua data telah direset.");
  }
});

// Modals
const calcModal = document.getElementById("calculatorModal");
document.getElementById("openCalcBtn").addEventListener("click", () => calcModal.classList.remove("hidden"));
document.getElementById("closeCalcBtn").addEventListener("click", () => calcModal.classList.add("hidden"));

document.querySelectorAll(".modal-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".modal-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const mode = tab.dataset.calc;
    document.getElementById("calcPane1rm").classList.toggle("hidden", mode !== "1rm");
    document.getElementById("calcPanePlate").classList.toggle("hidden", mode !== "plate");
  });
});

const routineModal = document.getElementById("routineModal");
document.getElementById("openCreateRoutineBtn").addEventListener("click", () => {
  const checklist = document.getElementById("routineExerciseChecklist");
  checklist.innerHTML = state.exercises.map((ex, i) => `
    <label class="checklist-item">
      <input type="checkbox" value="${ex.name}" id="rt_ex_${i}" />
      <span>${ex.name} (${ex.muscle})</span>
    </label>
  `).join("");
  routineModal.classList.remove("hidden");
});
document.getElementById("closeRoutineModalBtn").addEventListener("click", () => routineModal.classList.add("hidden"));

document.getElementById("saveNewRoutineBtn").addEventListener("click", () => {
  const name = document.getElementById("newRoutineName").value.trim();
  const checked = [...document.querySelectorAll("#routineExerciseChecklist input:checked")].map(cb => cb.value);
  if (!name || !checked.length) {
    showToast("Isi nama template dan pilih minimal 1 gerakan!");
    return;
  }
  state.routines.push({ id: "rt_" + Date.now(), name, exercises: checked });
  document.getElementById("newRoutineName").value = "";
  routineModal.classList.add("hidden");
  saveState();
  renderRoutines();
  showToast(`Template "${name}" dibuat!`);
});

// Register Service Worker for Offline PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

function initAppUI() {
  document.getElementById("settingUserName").value = state.settings.userName || "";
  document.getElementById("settingTargetWeight").value = state.settings.targetWeight || "";
  document.getElementById("settingDefaultTimer").value = state.settings.defaultTimer || 90;
  applyThemeAndProgram();
  renderMuscleFilterAndSelect();
  renderDashboard();
  renderActiveWorkout();
  renderStats();
}

initAppUI();

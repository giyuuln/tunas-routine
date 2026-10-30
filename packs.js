/* Tunas Routine — habit packs in English and Bahasa Melayu.
   A pack is a small set of habits for one part of daily life. People pick packs at the start
   (or later in Settings → Habit packs) and Tunas builds the routine from them on the phone.

   Habit fields:
     slot   which part of the day: morning | day | evening | night
     at     minutes after that part starts (optional; no time if left out)
     quest  ★ habit, worth bonus XP
   Every habit, weekly task and guide topic keeps a `pack` tag, so a pack can be removed again. */
(function () {
  const t = (en, ms) => ({ en, ms });
  const h = (id, slot, title, o) => ({ id, slot, title, ...(o || {}) });
  const w = (id, title) => ({ id, title });

  // The four parts of a day that packs fill. Same ids as the ready-made templates, so packs slot into those too.
  window.TUNAS_SLOTS = {
    morning: { title: t("Morning", "Pagi"), icon: "sun", say: [t("Morning! Small wins first.", "Selamat pagi! Mula dengan yang kecil."), t("One habit at a time.", "Satu tabiat satu masa.")] },
    day: { title: t("Daytime", "Siang"), icon: "walk", say: [t("Keep going, you're doing fine.", "Teruskan, kau okay je."), t("Water break?", "Rehat minum air?")] },
    evening: { title: t("Evening", "Petang"), icon: "heart", say: [t("Day's work done. Your time now.", "Kerja hari ini siap. Masa kau sekarang."), t("A few habits, then rest.", "Beberapa tabiat, lepas tu rehat.")] },
    night: { title: t("Night", "Malam"), icon: "moon", say: [t("Wind down. Big day tomorrow.", "Masa berehat. Esok hari baru."), t("Phone away, lights off.", "Letak phone, tutup lampu.")] }
  };

  window.TUNAS_PACK_CATS = [
    { id: "body", title: t("Body", "Badan") },
    { id: "mind", title: t("Mind", "Minda") },
    { id: "faith", title: t("Faith", "Agama") },
    { id: "grow", title: t("Study & work", "Belajar & kerja") },
    { id: "home", title: t("Home & life", "Rumah & hidup") }
  ];


  /* Workout setup: level, place and equipment → a workout plan built on the phone.
     Exercise kinds set reps and rest by level: w = weighted, bw = bodyweight reps, hold = seconds, acc = accessory.
     gear: none | band | db (dumbbells) | bar (pull-up bar) | gym. lv: levels the exercise suits. */
  const x = (id, pattern, gear, lv, kind, name, cue, o) => ({ id, pattern, gear, lv, kind, name, cue, ...(o || {}) });
  const ALL = ["new", "mid", "pro"];
  window.TUNAS_WORKOUT = {
    levels: [
      { id: "new", title: t("Newbie", "Baru mula"), desc: t("New to training, or back after a long break.", "Baru nak mula, atau kembali selepas lama berhenti.") },
      { id: "mid", title: t("Intermediate", "Pertengahan"), desc: t("Trained on and off for 6+ months.", "Pernah berlatih sekali-sekala lebih 6 bulan.") },
      { id: "pro", title: t("Regular", "Tetap"), desc: t("Train most weeks for a year or more.", "Berlatih hampir setiap minggu setahun atau lebih.") }
    ],
    places: [
      { id: "home", emoji: "🏠", title: t("Home", "Rumah") },
      { id: "gym", emoji: "🏟️", title: t("Gym", "Gim") }
    ],
    // Which place to suggest for each level, and why.
    suggest: {
      new: { place: "home", text: t("Start at home: no travel, no waiting, and bodyweight builds the basics.", "Mula di rumah: tak perlu ke mana-mana, tak perlu tunggu, dan berat badan sendiri bina asas.") },
      mid: { place: null, text: t("Either works. Home is fine with dumbbells or bands; a gym makes it easier to keep adding weight.", "Dua-dua boleh. Rumah okay kalau ada dumbel atau band; gim lebih senang untuk terus tambah berat.") },
      pro: { place: "gym", text: t("A gym lets you keep adding weight, which you'll need to keep progressing.", "Gim bagi kau terus tambah berat, yang kau perlukan untuk terus maju.") }
    },
    gear: [
      { id: "db", emoji: "🏋️", title: t("Dumbbells", "Dumbel") },
      { id: "band", emoji: "🪢", title: t("Resistance bands", "Band rintangan") },
      { id: "bar", emoji: "🚪", title: t("Pull-up bar", "Palang tarik") }
    ],
    noGearTip: t("No equipment is fine. A pair of adjustable dumbbells or a set of bands later makes home training last much longer.", "Tiada peralatan pun tak apa. Sepasang dumbel boleh laras atau satu set band nanti buat latihan di rumah lebih tahan lama."),
    plans: {
      new: { days: { "1": "full", "3": "full", "5": "full" }, mins: t("25–35 min", "25–35 minit") },
      mid: { days: { "1": "fullA", "3": "fullB", "5": "fullA" }, sets: 3, mins: t("40–50 min", "40–50 minit") },
      pro: { days: { "1": "upper", "2": "lower", "4": "upper", "5": "lower" }, sets: 3, mins: t("50–60 min", "50–60 minit") }
    },
    splits: {
      full: { name: t("Full Body", "Badan Penuh"), patterns: ["squat", "push", "pull", "hinge", "core"] },
      fullA: { name: t("Full Body A", "Badan Penuh A"), patterns: ["squat", "push", "pull", "core"] },
      fullB: { name: t("Full Body B", "Badan Penuh B"), patterns: ["hinge", "vpush", "vpull", "lunge"] },
      upper: { name: t("Upper Body", "Badan Atas"), patterns: ["push", "pull", "vpush", "vpull", "arms"] },
      lower: { name: t("Lower Body", "Badan Bawah"), patterns: ["squat", "hinge", "lunge", "core"] }
    },
    // If nothing fits a pattern with the gear at hand, use this one instead.
    fallback: { vpull: "pull", vpush: "push", lunge: "squat", arms: null },
    reps: {
      w: { new: "8–12", mid: "6–10", pro: "5–8" }, bw: { new: "6–12", mid: "10–15", pro: "12–20" },
      hold: { new: "20–30 sec", mid: "30–45 sec", pro: "45–60 sec" }, acc: { new: "10–15", mid: "10–15", pro: "10–15" }
    },
    rest: { w: { new: "90s", mid: "2 min", pro: "2–3 min" }, bw: { new: "60s", mid: "60s", pro: "75s" }, hold: { new: "45s", mid: "45s", pro: "45s" }, acc: { new: "60s", mid: "60s", pro: "60s" } },
    start: {
      new: t("a weight you can lift 15 times", "berat yang kau boleh angkat 15 kali"),
      mid: t("a weight you can lift 10 times with 2 to spare", "berat yang kau boleh angkat 10 kali dengan baki 2"),
      pro: t("your usual working weight", "berat latihan biasa kau")
    },
    // Order matters: within the same gear, earlier entries win.
    ex: [
      x("leg-press", "squat", "gym", ["new"], "w", t("Leg Press", "Tekan Kaki"), t("Feet shoulder-width, knees track over toes.", "Kaki selebar bahu, lutut ikut arah jari kaki."), { step: 5 }),
      x("back-squat", "squat", "gym", ["mid", "pro"], "w", t("Barbell Back Squat", "Cangkung Barbel"), t("Brace, sit between your heels, chest up.", "Kuatkan perut, duduk antara tumit, dada ke atas."), { step: 2.5 }),
      x("goblet-squat", "squat", "db", ALL, "w", t("Goblet Squat", "Cangkung Goblet"), t("Hold the dumbbell at your chest, 3 seconds down.", "Pegang dumbel di dada, turun 3 saat."), { step: 2 }),
      x("squat", "squat", "none", ["new", "mid"], "bw", t("Bodyweight Squat", "Cangkung"), t("Sit back like a chair, 3 seconds down.", "Duduk ke belakang macam kerusi, turun 3 saat.")),
      x("split-squat", "squat", "none", ["mid", "pro"], "bw", t("Bulgarian Split Squat", "Cangkung Pisah Bulgaria"), t("Back foot on a chair, front knee over toes.", "Kaki belakang atas kerusi, lutut depan atas jari kaki.")),

      x("machine-press", "push", "gym", ["new"], "w", t("Machine Chest Press", "Tekan Dada Mesin"), t("Shoulders down, press without locking elbows hard.", "Bahu ke bawah, tolak tanpa kunci siku kuat-kuat."), { step: 5 }),
      x("bench-press", "push", "gym", ["mid", "pro"], "w", t("Barbell Bench Press", "Tekan Bangku Barbel"), t("Feet planted, bar to mid-chest, use a spotter or safeties.", "Kaki rapat lantai, bar ke tengah dada, guna pembantu atau penahan."), { step: 2.5 }),
      x("db-press", "push", "db", ALL, "w", t("Dumbbell Floor Press", "Tekan Lantai Dumbel"), t("Lie on the floor, elbows touch down softly, press up.", "Baring di lantai, siku sentuh perlahan, tolak naik."), { step: 2 }),
      x("band-press", "push", "band", ALL, "bw", t("Band Chest Press", "Tekan Dada Band"), t("Band behind your back, press forward, slow return.", "Band di belakang, tolak ke depan, pulang perlahan.")),
      x("incline-pushup", "push", "none", ["new"], "bw", t("Incline Push-ups", "Tekan Tubi Condong"), t("Hands on a table or wall, body straight.", "Tangan atas meja atau dinding, badan lurus.")),
      x("pushup", "push", "none", ["mid", "pro"], "bw", t("Push-ups", "Tekan Tubi"), t("Chest to the floor, body straight.", "Dada ke lantai, badan lurus.")),

      x("cable-row", "pull", "gym", ALL, "w", t("Seated Cable Row", "Tarik Kabel Duduk"), t("Pull to your belly, squeeze shoulder blades.", "Tarik ke perut, kepit bilah bahu."), { step: 5 }),
      x("db-row", "pull", "db", ALL, "w", t("One-arm Dumbbell Row", "Tarik Dumbel Sebelah"), t("Hand on a chair, pull the elbow to your hip.", "Tangan atas kerusi, tarik siku ke pinggul."), { step: 2 }),
      x("band-row", "pull", "band", ALL, "bw", t("Band Row", "Tarik Band"), t("Anchor the band at chest height, pull and squeeze.", "Ikat band paras dada, tarik dan kepit.")),
      x("snow-angel", "pull", "none", ALL, "bw", t("Reverse Snow Angels", "Malaikat Salji Terbalik"), t("Face down, lift arms and sweep them slowly overhead.", "Meniarap, angkat tangan dan sapu perlahan ke atas kepala.")),

      x("lat-pulldown", "vpull", "gym", ALL, "w", t("Lat Pulldown", "Tarik Lat ke Bawah"), t("Pull the bar to your upper chest, no swinging.", "Tarik bar ke dada atas, jangan hayun."), { step: 5 }),
      x("dead-hang", "vpull", "bar", ["new"], "hold", t("Dead Hang", "Bergantung"), t("Hang with straight arms, shoulders slightly pulled down.", "Bergantung tangan lurus, bahu ditarik sedikit ke bawah."), { unit: "sec" }),
      x("neg-pullup", "vpull", "bar", ["mid"], "bw", t("Negative Pull-ups", "Tarik Naik Negatif"), t("Jump up, lower yourself over 4 seconds.", "Lompat naik, turun perlahan selama 4 saat.")),
      x("pullup", "vpull", "bar", ["pro"], "bw", t("Pull-ups", "Tarik Naik"), t("Full hang to chin over the bar.", "Dari bergantung penuh sampai dagu atas bar.")),
      x("band-pulldown", "vpull", "band", ALL, "bw", t("Band Pulldown", "Tarik Band ke Bawah"), t("Anchor the band high, pull elbows down to your sides.", "Ikat band tinggi, tarik siku ke sisi badan.")),

      x("machine-shoulder", "vpush", "gym", ["new"], "w", t("Machine Shoulder Press", "Tekan Bahu Mesin"), t("Back against the pad, press straight up.", "Belakang rapat pad, tolak lurus ke atas."), { step: 5 }),
      x("ohp", "vpush", "gym", ["mid", "pro"], "w", t("Overhead Press", "Tekan Atas Kepala"), t("Squeeze glutes, press the bar over your head.", "Kepit punggung, tolak bar ke atas kepala."), { step: 2.5 }),
      x("db-shoulder", "vpush", "db", ALL, "w", t("Dumbbell Shoulder Press", "Tekan Bahu Dumbel"), t("Seated or standing, ribs down, press up.", "Duduk atau berdiri, rusuk ke bawah, tolak naik."), { step: 2 }),
      x("band-ohp", "vpush", "band", ALL, "bw", t("Band Overhead Press", "Tekan Atas Band"), t("Stand on the band, press both hands up.", "Pijak band, tolak kedua tangan ke atas.")),
      x("pike-pushup", "vpush", "none", ["mid", "pro"], "bw", t("Pike Push-ups", "Tekan Tubi Pike"), t("Hips high, lower your head between your hands.", "Pinggul tinggi, turunkan kepala antara tangan.")),

      x("back-ext", "hinge", "gym", ["new"], "bw", t("Back Extension", "Lanjutan Belakang"), t("Hinge at the hips, squeeze glutes at the top.", "Bengkok di pinggul, kepit punggung di atas.")),
      x("rdl", "hinge", "gym", ["mid", "pro"], "w", t("Romanian Deadlift", "Angkat Mati Romania"), t("Push hips back, bar close to your legs, flat back.", "Tolak pinggul ke belakang, bar rapat kaki, belakang rata."), { step: 2.5 }),
      x("db-rdl", "hinge", "db", ALL, "w", t("Dumbbell Romanian Deadlift", "Angkat Mati Romania Dumbel"), t("Soft knees, hips back, dumbbells slide down your legs.", "Lutut lembut, pinggul ke belakang, dumbel turun rapat kaki."), { step: 2 }),
      x("band-gm", "hinge", "band", ALL, "bw", t("Band Good Morning", "Good Morning Band"), t("Band under feet and behind neck, hinge and stand tall.", "Band bawah kaki dan belakang leher, bengkok dan berdiri tegak.")),
      x("bridge", "hinge", "none", ["new"], "bw", t("Glute Bridge", "Jambatan Punggung"), t("Squeeze at the top for 1 second.", "Kepit di atas selama 1 saat.")),
      x("sl-bridge", "hinge", "none", ["mid", "pro"], "bw", t("Single-leg Glute Bridge", "Jambatan Punggung Sebelah Kaki"), t("One foot down, hips level, squeeze at the top.", "Satu kaki di lantai, pinggul rata, kepit di atas.")),

      x("db-lunge", "lunge", "db", ["mid", "pro"], "w", t("Dumbbell Reverse Lunge", "Langkah Belakang Dumbel"), t("Step back, back knee nearly touches the floor.", "Langkah ke belakang, lutut belakang hampir sentuh lantai."), { step: 2 }),
      x("lunge", "lunge", "none", ALL, "bw", t("Reverse Lunge", "Langkah Belakang"), t("Step back, front knee stays over the ankle.", "Langkah ke belakang, lutut depan atas buku lali.")),

      x("db-curl", "arms", "db", ["mid", "pro"], "acc", t("Dumbbell Curl", "Curl Dumbel"), t("Elbows by your sides, slow down.", "Siku di sisi, turun perlahan.")),
      x("cable-pushdown", "arms", "gym", ["mid", "pro"], "acc", t("Cable Triceps Pushdown", "Tolak Kabel Trisep"), t("Elbows pinned, push down until straight.", "Siku rapat, tolak ke bawah sampai lurus.")),
      x("band-curl", "arms", "band", ["mid", "pro"], "acc", t("Band Curl", "Curl Band"), t("Stand on the band, curl up, slow down.", "Pijak band, angkat, turun perlahan.")),

      x("dead-bug", "core", "none", ["new", "mid"], "bw", t("Dead Bug", "Dead Bug"), t("Lower back stays pressed to the floor.", "Belakang bawah kekal rapat ke lantai.")),
      x("plank", "core", "none", ["new", "mid"], "hold", t("Plank", "Plank"), t("Squeeze glutes, ribs down.", "Kepit punggung, rusuk ke bawah."), { unit: "sec" }),
      x("hollow", "core", "none", ["pro"], "hold", t("Hollow Hold", "Tahan Hollow"), t("Arms overhead, lower back pressed down.", "Tangan atas kepala, belakang bawah rapat lantai."), { unit: "sec" })
    ],
    say: [t("Workout time! Let's go.", "Masa senaman! Jom."), t("Log every set to catch a new PR.", "Catat setiap set untuk kejar rekod baru.")],
    planTitle: t("Your workout plan", "Pelan senaman kau"),
    planGuide: {
      new: [t("**3 days a week, full body.** Two sets each for the first 4 weeks, then three.", "**3 hari seminggu, badan penuh.** Dua set setiap satu untuk 4 minggu pertama, kemudian tiga."),
            t("**Hit the top of the rep range on every set?** Move to a harder version or add weight.", "**Capai rep maksimum setiap set?** Tukar ke versi lebih susah atau tambah berat.")],
      mid: [t("**3 days a week, two full-body days (A and B) alternating.** Three sets each.", "**3 hari seminggu, dua sesi badan penuh (A dan B) berselang.** Tiga set setiap satu."),
            t("**Add a little weight or a rep each week** while form stays clean.", "**Tambah sedikit berat atau satu rep setiap minggu** selagi teknik masih kemas.")],
      pro: [t("**4 days a week, upper and lower split.** Three hard sets per exercise.", "**4 hari seminggu, pecahan atas dan bawah.** Tiga set berat setiap latihan."),
            t("**Every 6–8 weeks, take a lighter week** to recover and keep progressing.", "**Setiap 6–8 minggu, buat seminggu ringan** untuk pulih dan terus maju.")]
    }
  };

  /* Skincare setup: skin type, number of steps and goals → morning and night habits built on the phone.
     General cosmetic care, not medical advice. Habit ids stay the same across setups so streaks and ticks carry over. */
  window.TUNAS_SKIN = {
    types: [
      { id: "oily", title: t("Oily", "Berminyak"), desc: t("Shiny all over by midday", "Berkilat seluruh muka menjelang tengah hari"),
        cleanser: t("Gel or foam", "Gel atau buih"), moist: t("Light gel", "Gel ringan"), spf: t("Gel or fluid SPF 30+", "SPF 30+ jenis gel atau cecair"),
        tip: t("**Oily skin still needs moisturiser.** Skipping it can make you shinier.", "**Kulit berminyak tetap perlu pelembap.** Tak pakai boleh buat lagi berminyak.") },
      { id: "dry", title: t("Dry", "Kering"), desc: t("Feels tight, can flake", "Rasa tegang, boleh mengelupas"),
        cleanser: t("Cream or milky; water is fine in the morning", "Krim atau susu; air pun cukup waktu pagi"), moist: t("Rich cream", "Krim pekat"), spf: t("Cream SPF 30+", "SPF 30+ jenis krim"),
        tip: t("**Moisturise on damp skin** and keep showers warm, not hot.", "**Pakai pelembap masa kulit masih lembap** dan mandi air suam, bukan panas.") },
      { id: "combo", title: t("Combination", "Kombinasi"), desc: t("Oily T-zone, dry cheeks", "Zon-T berminyak, pipi kering"),
        cleanser: t("Gentle gel", "Gel lembut"), moist: t("Light lotion; a bit extra on dry areas", "Losyen ringan; lebih sikit di kawasan kering"), spf: t("Light SPF 30+", "SPF 30+ ringan"),
        tip: t("**Treat zones differently.** Lighter products on the T-zone, more moisture on the cheeks.", "**Rawat ikut zon.** Produk ringan di zon-T, lebih lembap di pipi.") },
      { id: "normal", title: t("Normal", "Normal"), desc: t("Comfortable most days", "Selesa kebanyakan hari"),
        cleanser: t("Mild and low-foam, about 30 seconds", "Lembut dan kurang buih, lebih kurang 30 saat"), moist: t("A light lotion is enough", "Losyen ringan pun cukup"), spf: t("SPF 30+", "SPF 30+"),
        tip: t("**Keep it simple.** Normal skin mostly needs gentle cleansing and daily sunscreen.", "**Buat ringkas.** Kulit normal kebanyakannya cuma perlu cuci lembut dan pelindung matahari setiap hari.") },
      { id: "sensitive", title: t("Sensitive", "Sensitif"), desc: t("Stings or reddens easily", "Mudah pedih atau merah"),
        cleanser: t("Fragrance-free", "Tanpa pewangi"), moist: t("Fragrance-free", "Tanpa pewangi"), spf: t("Mineral SPF 30+ (zinc or titanium)", "SPF 30+ mineral (zink atau titanium)"),
        tip: t("**Fewer products, fragrance-free.** Patch test anything new for 2 days.", "**Kurang produk, tanpa pewangi.** Uji tampal produk baru selama 2 hari.") },
      { id: "unsure", title: t("Not sure", "Tak pasti"), desc: t("We'll start gentle", "Kita mula dengan lembut"),
        cleanser: t("Mild and low-foam, about 30 seconds", "Lembut dan kurang buih, lebih kurang 30 saat"), moist: t("A light lotion is enough", "Losyen ringan pun cukup"), spf: t("SPF 30+", "SPF 30+"),
        tip: t("**Find your type:** wash, wait 1 hour. Shiny all over = oily, tight = dry, shiny T-zone only = combination.", "**Kenal jenis kulit:** cuci muka, tunggu 1 jam. Berkilat semua = berminyak, tegang = kering, zon-T sahaja berkilat = kombinasi.") }
    ],
    levels: [
      { id: "basic", title: t("Basic", "Asas"), desc: t("3 steps: cleanse, moisturise, sunscreen", "3 langkah: cuci, lembapkan, pelindung matahari") },
      { id: "std", title: t("Standard", "Standard"), desc: t("Adds a serum morning and night", "Tambah serum pagi dan malam") },
      { id: "full", title: t("Full", "Lengkap"), desc: t("Adds double cleanse and treatment nights", "Tambah cuci dua kali dan malam rawatan") }
    ],
    // Which level to suggest, and why.
    suggest: {
      basic: t("New to skincare or sensitive? Start with Basic for 2 to 4 weeks, then add steps.", "Baru mula atau kulit sensitif? Mula dengan Asas selama 2 hingga 4 minggu, kemudian tambah langkah."),
      std: t("Standard adds one targeted serum. It's where most people see the best results for the effort.", "Standard tambah satu serum khusus. Paling berbaloi untuk kebanyakan orang.")
    },
    concerns: [
      { id: "acne", title: t("Breakouts", "Jerawat"), am: "nia", pm: "nia", treat: "bha",
        tip: t("**Don't pick or pop.** It leaves marks that last longer than the spot.", "**Jangan picit.** Ia tinggalkan parut lebih lama dari jerawat.") },
      { id: "spots", title: t("Dark spots", "Bintik gelap"), am: "vitc", pm: "nia", treat: "ret",
        tip: t("**Daily sunscreen does more for dark spots** than any serum.", "**Pelindung matahari setiap hari lebih berkesan untuk bintik gelap** dari mana-mana serum.") },
      { id: "dull", title: t("Dullness", "Kusam"), am: "vitc", pm: "hya", treat: "aha",
        tip: t("**Glow comes from gentle exfoliation and sleep,** not scrubbing hard.", "**Kulit berseri datang dari pengelupasan lembut dan tidur,** bukan sental kuat.") },
      { id: "dry", title: t("Dry patches", "Tompok kering"), am: "hya", pm: "hya", treat: null,
        tip: t("**Hydrating serum on damp skin,** then moisturiser to lock it in.", "**Serum pelembap pada kulit lembap,** kemudian pelembap untuk kunci.") },
      { id: "oil", title: t("Oil & pores", "Minyak & liang"), am: "nia", pm: "nia", treat: "bha",
        tip: t("**Blotting paper beats washing more.** Over-washing makes skin oilier.", "**Kertas penyerap minyak lebih baik dari cuci lebih kerap.** Terlebih cuci buat lagi berminyak.") },
      { id: "lines", title: t("Fine lines", "Garis halus"), am: "vitc", pm: "hya", treat: "ret",
        tip: t("**Sunscreen and a retinoid** are the two steps with the most evidence for fine lines.", "**Pelindung matahari dan retinoid** dua langkah yang paling terbukti untuk garis halus.") }
    ],
    serums: {
      nia: t("Niacinamide serum", "Serum niasinamida"),
      vitc: t("Vitamin C serum", "Serum vitamin C"),
      hya: t("Hydrating serum (hyaluronic acid)", "Serum pelembap (asid hialuronik)")
    },
    treats: {
      ret: { title: t("Retinoid", "Retinoid"), note: t("Pea-size, on dry skin. Start gentle; it can sting at first.", "Sebesar kacang pis, pada kulit kering. Mula yang lembut; mungkin pedih pada awalnya."), days: [1, 3, 6], soft: [3] },
      bha: { title: t("BHA exfoliant (salicylic acid)", "Pengelupas BHA (asid salisilik)"), note: t("After cleansing; skip if skin feels raw.", "Lepas cuci muka; tak payah kalau kulit rasa pedih."), days: [2, 5], soft: [5] },
      aha: { title: t("AHA exfoliant (glycolic or lactic acid)", "Pengelupas AHA (asid glikolik atau laktik)"), note: t("After cleansing; skip if skin feels raw.", "Lepas cuci muka; tak payah kalau kulit rasa pedih."), days: [2, 5], soft: [5] }
    },
    tips: [
      t("**Patch test new products** behind the ear for 2 days, and add one at a time.", "**Uji tampal produk baru** di belakang telinga selama 2 hari, dan tambah satu demi satu."),
      t("**Retinoids and exfoliants on different nights,** never together.", "**Retinoid dan pengelupas pada malam berbeza,** jangan serentak.")
    ],
    caution: t("General skincare tips, not medical advice. For painful acne, rashes or sudden changes, see a doctor or pharmacist. Pregnant or breastfeeding? Ask a doctor before using retinoids.", "Tip penjagaan kulit umum, bukan nasihat perubatan. Untuk jerawat yang sakit, ruam atau perubahan mendadak, jumpa doktor atau ahli farmasi. Hamil atau menyusu? Tanya doktor sebelum guna retinoid.")
  };

  window.TUNAS_PACKS = [
    /* ---------- Body ---------- */
    { id: "skin", cat: "body", emoji: "🧴", title: t("Skincare", "Penjagaan kulit"), desc: t("A routine for your skin type and goals, morning and night.", "Rutin ikut jenis kulit dan matlamat kau, pagi dan malam."),
      setup: "skin", // asks skin type, steps and goals, then builds the habits (see TUNAS_SKIN)
      habits: [],
      tips: [
        t("**Thin to thick:** watery products first, creams after, sunscreen last in the morning.", "**Nipis ke pekat:** produk cair dulu, krim kemudian, pelindung matahari paling akhir waktu pagi."),
        t("**Results take 4 to 8 weeks.** Keep the streak going.", "**Hasil ambil masa 4 hingga 8 minggu.** Teruskan streak.")
      ],
      guide: [
        { title: t("Skincare: how much", "Kulit: berapa banyak"), lines: [
          t("**Cleanser:** one small pump, about 30 seconds.", "**Pencuci:** satu pam kecil, lebih kurang 30 saat."),
          t("**Serum:** 2 to 3 drops on slightly damp skin.", "**Serum:** 2 hingga 3 titis pada kulit yang sedikit lembap."),
          t("**Moisturiser:** a pea-size amount.", "**Pelembap:** sebesar kacang pis."),
          t("**Sunscreen:** two finger-lengths for face and neck.", "**Pelindung matahari:** dua panjang jari untuk muka dan leher.") ] }
      ] },
    { id: "water", cat: "body", emoji: "💧", title: t("Drink water", "Minum air"), desc: t("A glass on waking and a bottle that goes everywhere.", "Segelas bila bangun dan botol yang ikut ke mana-mana."),
      habits: [
        h("wt-wake", "morning", t("Glass of water when you wake up", "Segelas air bila bangun"), { at: 0 }),
        h("wt-bottle", "day", t("Refill your water bottle", "Isi semula botol air")),
        h("wt-8", "day", t("Drink 8 glasses of water", "Minum 8 gelas air"), { quest: true }),
        h("wt-home", "evening", t("Glass of water when you get home", "Segelas air bila sampai rumah"), { at: 0 })
      ],
      tips: [t("**Keep a bottle in sight.** You drink what you can see.", "**Letak botol depan mata.** Nampak, baru minum.")] },
    { id: "sleep", cat: "body", emoji: "😴", title: t("Better sleep", "Tidur lebih baik"), desc: t("Same wake time, no late coffee, 7–8 hours.", "Bangun masa sama, tiada kopi lewat, 7–8 jam."),
      habits: [
        h("sl-wake", "morning", t("Wake up at the same time", "Bangun pada masa yang sama"), { at: 0 }),
        h("sl-coffee", "day", t("No coffee after 2pm", "Tiada kopi selepas 2 petang")),
        h("sl-dark", "night", t("Room dark and cool", "Bilik gelap dan sejuk"), { at: 50 }),
        h("sl-sleep", "night", t("Sleep on time", "Tidur ikut masa"), { at: 60, quest: true, note: t("Aim for 7–8 hours", "Sasarkan 7–8 jam") })
      ],
      tips: [t("**Same wake time, even on weekends.** Your body clock loves routine.", "**Bangun masa sama, walaupun hujung minggu.** Jam badan suka rutin.")],
      guide: [{ title: t("Sleep basics", "Asas tidur"), lines: [
        t("**Screens off 30 minutes before bed.** Bright light keeps you awake.", "**Tutup skrin 30 minit sebelum tidur.** Cahaya terang buat mata segar."),
        t("**Can't sleep after 20 minutes?** Get up, do something calm, then try again.", "**Tak boleh tidur selepas 20 minit?** Bangun, buat benda tenang, kemudian cuba lagi.") ] }] },
    { id: "move", cat: "body", emoji: "🚶", title: t("Daily movement", "Bergerak setiap hari"), desc: t("Steps, stairs, a stretch and a short walk.", "Langkah, tangga, regangan dan jalan sekejap."),
      habits: [
        h("mv-stretch", "morning", t("5 min stretch", "Regangan 5 minit"), { at: 10 }),
        h("mv-stairs", "day", t("Take the stairs", "Guna tangga")),
        h("mv-steps", "day", t("8,000 steps", "8,000 langkah"), { quest: true }),
        h("mv-walk", "evening", t("20 min walk", "Jalan 20 minit"), { at: 30 })
      ],
      tips: [t("**Every bit counts.** Three 10-minute walks equal one 30-minute walk.", "**Setiap sikit pun dikira.** Tiga kali jalan 10 minit sama macam sekali 30 minit.")] },
    { id: "workout", cat: "body", emoji: "💪", title: t("Workouts", "Senaman"), desc: t("A plan for your level, at home or the gym.", "Pelan ikut tahap kau, di rumah atau gim."),
      habits: [h("wo-stretch", "evening", t("Stretch 5 min after training", "Regangan 5 minit lepas latihan"), { at: 90 })],
      setup: "workout", // asks level, place and equipment, then builds the workouts (see TUNAS_WORKOUT)
      tips: [
        t("**Beat last week by 1 rep.** That's progress.", "**Lebih 1 rep dari minggu lepas.** Itu dah kemajuan."),
        t("**Rest days build muscle.** Don't skip them.", "**Hari rehat bina otot.** Jangan langkau.")
      ],
      guide: [{ title: t("Training basics", "Asas latihan"), lines: [
        t("**Stop 2 reps before failure** on most sets.", "**Berhenti 2 rep sebelum tak larat** untuk kebanyakan set."),
        t("**Hit the top of the rep range on every set?** Make it harder next time.", "**Capai rep maksimum setiap set?** Buat lebih susah lain kali.") ] }] },
    { id: "eat", cat: "body", emoji: "🥗", title: t("Eat well", "Makan sihat"), desc: t("Protein breakfast, more veg, fewer sweet drinks.", "Sarapan protein, lebih sayur, kurang air manis."),
      habits: [
        h("ea-bfast", "morning", t("Breakfast with protein", "Sarapan dengan protein"), { at: 30, note: t("Eggs, yogurt or tofu", "Telur, yogurt atau tauhu") }),
        h("ea-veg", "day", t("Half the plate veg at lunch", "Separuh pinggan sayur masa makan tengah hari"), { at: 0 }),
        h("ea-sugar", "day", t("No sugary drinks", "Tiada minuman manis"), { quest: true }),
        h("ea-dinner", "evening", t("Lighter dinner", "Makan malam ringan"), { at: 120, note: t("Less rice, more protein and veg", "Kurang nasi, lebih protein dan sayur") })
      ],
      tips: [t("**Cut liquid sugar first.** Teh tarik and soft drinks add up fast.", "**Kurangkan gula cecair dulu.** Teh tarik dan air bergas cepat bertambah.")] },
    { id: "groom", cat: "body", emoji: "🪥", title: t("Teeth & grooming", "Gigi & dandanan"), desc: t("Brush twice, floss at night, stay fresh.", "Berus dua kali, flos waktu malam, sentiasa segar."),
      habits: [
        h("gr-brush-am", "morning", t("Brush teeth", "Berus gigi"), { at: 10 }),
        h("gr-shower", "morning", t("Shower", "Mandi"), { at: 12 }),
        h("gr-brush-pm", "night", t("Brush teeth + floss", "Berus gigi + flos"), { at: 15, quest: true })
      ],
      weekly: [w("gr-nails", t("Trim nails", "Potong kuku"))],
      tips: [t("**Brush for 2 minutes.** Most people stop at 45 seconds.", "**Berus selama 2 minit.** Ramai berhenti pada 45 saat.")] },
    { id: "desk", cat: "body", emoji: "🖥️", title: t("Desk health", "Sihat di meja"), desc: t("Eye breaks, standing up and good posture.", "Rehat mata, berdiri dan postur yang baik."),
      habits: [
        h("dk-eyes", "day", t("20-20-20 eye break", "Rehat mata 20-20-20"), { note: t("Every 20 min, look 6 metres away for 20 seconds", "Setiap 20 minit, pandang 6 meter jauh selama 20 saat") }),
        h("dk-stand", "day", t("Stand up every hour", "Berdiri setiap jam"), { quest: true }),
        h("dk-posture", "day", t("Screen at eye level, feet flat", "Skrin paras mata, kaki rata"))
      ],
      tips: [t("**Set a quiet hourly reminder** to stand and stretch.", "**Pasang peringatan senyap setiap jam** untuk berdiri dan regang.")] },
    { id: "outdoor", cat: "body", emoji: "🌳", title: t("Fresh air", "Udara segar"), desc: t("Morning daylight and time outside.", "Cahaya pagi dan masa di luar."),
      habits: [
        h("od-sun", "morning", t("10 min of morning daylight", "10 minit cahaya pagi"), { at: 20, quest: true }),
        h("od-out", "evening", t("Step outside for a bit", "Keluar rumah sekejap"), { at: 30 })
      ],
      weekly: [w("od-park", t("Visit a park, beach or hill", "Pergi taman, pantai atau bukit"))],
      tips: [t("**Morning light helps you sleep at night.** Even on cloudy days.", "**Cahaya pagi bantu tidur malam.** Walaupun hari mendung.")] },

    /* ---------- Mind ---------- */
    { id: "morning", cat: "mind", emoji: "☀️", title: t("Morning kickstart", "Mula pagi"), desc: t("Bed made, daylight in, top 3 picked.", "Katil kemas, buka langsir, pilih 3 perkara utama."),
      habits: [
        h("mk-bed", "morning", t("Make your bed", "Kemas katil"), { at: 5 }),
        h("mk-light", "morning", t("Open the curtains", "Buka langsir"), { at: 6 }),
        h("mk-dress", "morning", t("Get dressed, even on days off", "Tukar baju, walaupun hari cuti"), { at: 25 }),
        h("mk-top3", "morning", t("Pick your top 3 for today", "Pilih 3 perkara utama hari ini"), { at: 35, quest: true })
      ],
      tips: [t("**Decide the night before.** Mornings go smoother with fewer choices.", "**Tentukan malam sebelumnya.** Pagi lebih lancar bila kurang pilihan.")] },
    { id: "winddown", cat: "mind", emoji: "🌙", title: t("Night wind-down", "Rehat malam"), desc: t("Dim lights, prepare for tomorrow, phone away.", "Malapkan lampu, sedia untuk esok, jauhkan phone."),
      habits: [
        h("wd-dim", "night", t("Dim the lights", "Malapkan lampu"), { at: 0 }),
        h("wd-prep", "night", t("Prepare for tomorrow", "Sedia untuk esok"), { at: 10, note: t("Clothes, bag, charger", "Baju, beg, pengecas") }),
        h("wd-phone", "night", t("Phone away from bed", "Jauhkan phone dari katil"), { at: 30, quest: true }),
        h("wd-read", "night", t("Read or stretch instead of scrolling", "Baca atau regang, bukan scroll"), { at: 35 })
      ],
      tips: [t("**Charge your phone outside the bedroom.** Use a cheap alarm clock.", "**Cas phone di luar bilik tidur.** Guna jam loceng murah.")] },
    { id: "calm", cat: "mind", emoji: "🧘", title: t("Calm mind", "Minda tenang"), desc: t("Breathing, a mindful pause and 3 good things.", "Pernafasan, berhenti sejenak dan 3 perkara baik."),
      habits: [
        h("cm-breathe", "morning", t("5 min of slow breathing", "5 minit pernafasan perlahan"), { at: 15, quest: true, note: t("In for 4 seconds, out for 6", "Tarik 4 saat, hembus 6 saat") }),
        h("cm-pause", "day", t("One mindful pause", "Berhenti sejenak dan sedar")),
        h("cm-good", "night", t("Note 3 good things from today", "Catat 3 perkara baik hari ini"), { at: 20 })
      ],
      guide: [{ title: t("Quick calm", "Tenang cepat"), lines: [
        t("**Box breathing:** in 4, hold 4, out 4, hold 4. Repeat 4 times.", "**Pernafasan kotak:** tarik 4, tahan 4, hembus 4, tahan 4. Ulang 4 kali."),
        t("**5-4-3-2-1:** name 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.", "**5-4-3-2-1:** sebut 5 benda kau nampak, 4 dengar, 3 rasa, 2 bau, 1 kecap."),
        t("Feeling low for weeks? Talk to someone you trust or a counsellor.", "Rasa sedih berminggu-minggu? Bercakap dengan orang yang kau percaya atau kaunselor.") ] }] },
    { id: "journal", cat: "mind", emoji: "📓", title: t("Journaling", "Menulis jurnal"), desc: t("One intention in the morning, 3 lines at night.", "Satu niat waktu pagi, 3 baris waktu malam."),
      habits: [
        h("jr-intent", "morning", t("Write one intention for today", "Tulis satu niat untuk hari ini"), { at: 20 }),
        h("jr-write", "night", t("Write 3 lines about today", "Tulis 3 baris tentang hari ini"), { at: 15, quest: true })
      ],
      weekly: [w("jr-review", t("Read back this week's notes", "Baca semula catatan minggu ini"))] },
    { id: "screen", cat: "mind", emoji: "📵", title: t("Screen balance", "Imbang masa skrin"), desc: t("Phone-free mornings and meals, check your screen time.", "Pagi dan waktu makan tanpa phone, semak masa skrin."),
      habits: [
        h("sc-morning", "morning", t("No phone for the first 30 minutes", "Tiada phone 30 minit pertama"), { quest: true }),
        h("sc-meals", "day", t("No phone while eating", "Tiada phone masa makan")),
        h("sc-check", "night", t("Check today's screen time", "Semak masa skrin hari ini"), { at: 0 })
      ],
      weekly: [w("sc-mute", t("Mute or delete one time-wasting app", "Senyapkan atau buang satu app yang buang masa"))] },
    { id: "read", cat: "mind", emoji: "📚", title: t("Reading", "Membaca"), desc: t("10 pages a day and one idea worth keeping.", "10 muka surat sehari dan satu idea untuk disimpan."),
      habits: [
        h("rd-pages", "night", t("Read 10 pages", "Baca 10 muka surat"), { at: 25, quest: true }),
        h("rd-idea", "night", t("Write down one idea you read", "Catat satu idea yang kau baca"), { at: 40 })
      ],
      weekly: [w("rd-next", t("Pick your next book", "Pilih buku seterusnya"))],
      tips: [t("**10 pages a day is about 12 books a year.**", "**10 muka surat sehari lebih kurang 12 buku setahun.**")] },

    /* ---------- Faith ---------- */
    { id: "solat", cat: "faith", emoji: "🕌", title: t("Solat", "Solat"), desc: t("The five daily prayers.", "Solat lima waktu."),
      habits: [
        h("so-subuh", "morning", t("Subuh", "Subuh")),
        h("so-zohor", "day", t("Zohor", "Zohor")),
        h("so-asar", "day", t("Asar", "Asar")),
        h("so-maghrib", "evening", t("Maghrib", "Maghrib")),
        h("so-isyak", "night", t("Isyak", "Isyak"))
      ],
      tips: [t("**Prayer times change through the year.** Check the times for your zone.", "**Waktu solat berubah sepanjang tahun.** Semak waktu untuk zon kau.")] },
    { id: "quran", cat: "faith", emoji: "📖", title: t("Quran & zikir", "Al-Quran & zikir"), desc: t("Morning and evening zikir, a page of Quran a day.", "Zikir pagi dan petang, satu muka surat Al-Quran sehari."),
      habits: [
        h("qr-zikir-am", "morning", t("Morning zikir", "Zikir pagi"), { at: 25 }),
        h("qr-zikir-pm", "evening", t("Evening zikir", "Zikir petang"), { at: 30 }),
        h("qr-read", "evening", t("Read Quran (1 page or 5 min)", "Baca Al-Quran (1 muka surat atau 5 minit)"), { at: 75, quest: true })
      ],
      weekly: [w("qr-kahfi", t("Surah Al-Kahf on Friday", "Surah Al-Kahfi hari Jumaat"))],
      tips: [t("**Small and steady beats big and rare.** One page a day finishes the Quran in under 2 years.", "**Sikit tapi berterusan lebih baik.** Satu muka surat sehari khatam dalam kurang 2 tahun.")] },

    /* ---------- Study & work ---------- */
    { id: "study", cat: "grow", emoji: "🎓", title: t("Study", "Belajar"), desc: t("Review notes daily and stay on top of deadlines.", "Ulang kaji setiap hari dan ikut tarikh akhir."),
      habits: [
        h("st-review", "evening", t("Review today's notes (30 min)", "Ulang kaji nota hari ini (30 minit)"), { at: 15, quest: true }),
        h("st-tasks", "evening", t("Check assignments and deadlines", "Semak tugasan dan tarikh akhir"), { at: 45 }),
        h("st-bag", "night", t("Pack your bag for tomorrow", "Kemas beg untuk esok"), { at: 5 })
      ],
      weekly: [w("st-plan", t("Plan the week's assignments", "Rancang tugasan minggu ini"))],
      tips: [t("**Review within 24 hours.** You'll remember twice as much.", "**Ulang kaji dalam 24 jam.** Kau akan ingat dua kali ganda.")],
      guide: [{ title: t("The 25–5 method", "Kaedah 25–5"), lines: [
        t("**Study 25 minutes,** then rest 5. After 4 rounds, rest 20.", "**Belajar 25 minit,** rehat 5. Selepas 4 pusingan, rehat 20."),
        t("**One subject per block.** Switching wastes time.", "**Satu subjek setiap blok.** Bertukar-tukar membazir masa.") ] }] },
    { id: "focus", cat: "grow", emoji: "🎯", title: t("Deep work", "Kerja fokus"), desc: t("One distraction-free focus block a day.", "Satu blok fokus tanpa gangguan sehari."),
      habits: [
        h("fc-block", "day", t("One focus block (45 min)", "Satu blok fokus (45 minit)"), { quest: true, note: t("Phone in another room, one task only", "Phone di bilik lain, satu tugasan sahaja") }),
        h("fc-inbox", "day", t("Check messages at set times, not all day", "Semak mesej pada masa tetap, bukan sepanjang hari")),
        h("fc-done", "evening", t("Write down what you finished", "Catat apa yang dah siap"), { at: 0 })
      ],
      tips: [t("**Hardest task first,** while your energy is high.", "**Tugasan paling susah dulu,** masa tenaga masih tinggi.")] },
    { id: "lang", cat: "grow", emoji: "🗣️", title: t("Learn a language", "Belajar bahasa"), desc: t("15 minutes of practice and 5 new words a day.", "15 minit latihan dan 5 perkataan baru sehari."),
      habits: [
        h("lg-words", "day", t("Learn 5 new words", "Belajar 5 perkataan baru")),
        h("lg-practice", "evening", t("15 min language practice", "Latihan bahasa 15 minit"), { at: 45, quest: true })
      ],
      weekly: [w("lg-talk", t("Talk or write to someone in that language", "Bercakap atau menulis dengan seseorang dalam bahasa itu"))] },
    { id: "code", cat: "grow", emoji: "💻", title: t("Coding practice", "Latihan coding"), desc: t("Code a little every day and keep a learning log.", "Code sikit setiap hari dan simpan log belajar."),
      habits: [
        h("cd-code", "evening", t("30 min of coding", "30 minit coding"), { at: 60, quest: true }),
        h("cd-log", "night", t("Note one thing you learned", "Catat satu benda yang kau belajar"), { at: 10 })
      ],
      weekly: [w("cd-ship", t("Finish and push one small task", "Siapkan dan push satu tugasan kecil"))],
      tips: [t("**Build small things often.** Finished beats perfect.", "**Bina benda kecil selalu.** Siap lebih baik dari sempurna.")] },
    { id: "career", cat: "grow", emoji: "💼", title: t("Career growth", "Kerjaya"), desc: t("Apply, build skills and keep your CV fresh.", "Mohon kerja, tambah kemahiran dan kemas kini resume."),
      habits: [
        h("cr-apply", "day", t("Apply to one job or opportunity", "Mohon satu kerja atau peluang"), { quest: true }),
        h("cr-skill", "evening", t("20 min on a work skill", "20 minit belajar kemahiran kerja"), { at: 90 })
      ],
      weekly: [w("cr-cv", t("Update your CV or portfolio", "Kemas kini resume atau portfolio")), w("cr-net", t("Message one person in your field", "Mesej seorang dalam bidang kau"))],
      tips: [t("**Tailor each application.** Three good ones beat twenty copy-paste ones.", "**Sesuaikan setiap permohonan.** Tiga yang bagus lebih baik dari dua puluh yang sama.")] },
    { id: "create", cat: "grow", emoji: "🎨", title: t("Creative time", "Masa kreatif"), desc: t("20 minutes to draw, write, play or make.", "20 minit untuk melukis, menulis, bermain atau mencipta."),
      habits: [h("cv-make", "evening", t("20 min of creative time", "20 minit masa kreatif"), { at: 120, quest: true, note: t("Draw, write, play music, edit", "Lukis, tulis, main muzik, edit") })],
      weekly: [w("cv-share", t("Share or save one thing you made", "Kongsi atau simpan satu hasil kau"))] },

    /* ---------- Home & life ---------- */
    { id: "cook", cat: "home", emoji: "🍳", title: t("Home cooking", "Masak di rumah"), desc: t("Cook one meal a day and plan the week.", "Masak satu hidangan sehari dan rancang minggu."),
      habits: [
        h("ck-cook", "evening", t("Cook one meal at home", "Masak satu hidangan di rumah"), { at: 60, quest: true }),
        h("ck-lunch", "night", t("Pack tomorrow's lunch", "Bungkus bekal untuk esok"), { at: 5 })
      ],
      weekly: [w("ck-plan", t("Plan meals and a grocery list", "Rancang menu dan senarai barang dapur")), w("ck-prep", t("Meal prep for the week", "Sediakan makanan untuk seminggu"))],
      tips: [t("**Cook once, eat twice.** Make double and keep half for tomorrow.", "**Masak sekali, makan dua kali.** Masak lebih dan simpan separuh untuk esok.")] },
    { id: "tidy", cat: "home", emoji: "🧹", title: t("Tidy home", "Rumah kemas"), desc: t("10 minutes a day keeps the big clean away.", "10 minit sehari, tak perlu kemas besar-besaran."),
      habits: [
        h("td-10", "evening", t("10-minute tidy", "Kemas 10 minit"), { at: 150, quest: true }),
        h("td-sink", "night", t("Clear the sink before bed", "Kosongkan sinki sebelum tidur"), { at: 0 })
      ],
      weekly: [w("td-laundry", t("Laundry", "Basuh baju")), w("td-sheets", t("Change bed sheets", "Tukar cadar")), w("td-deep", t("Deep clean one area", "Cuci menyeluruh satu kawasan"))] },
    { id: "money", cat: "home", emoji: "💰", title: t("Money habits", "Urus duit"), desc: t("Track spending, skip impulse buys, save weekly.", "Catat belanja, elak beli ikut nafsu, simpan setiap minggu."),
      habits: [
        h("mn-nobuy", "day", t("No impulse buys today", "Tiada beli ikut nafsu hari ini"), { note: t("Wait 24 hours before buying anything you didn't plan", "Tunggu 24 jam sebelum beli benda yang tak dirancang") }),
        h("mn-log", "night", t("Log today's spending", "Catat belanja hari ini"), { at: 15, quest: true })
      ],
      weekly: [w("mn-review", t("Review this week's spending", "Semak belanja minggu ini")), w("mn-save", t("Move money to savings", "Pindah duit ke simpanan"))],
      tips: [t("**Pay yourself first.** Save on payday, then spend what's left.", "**Bayar diri sendiri dulu.** Simpan masa gaji masuk, baru belanja bakinya.")] },
    { id: "family", cat: "home", emoji: "👨‍👩‍👧", title: t("Family & friends", "Keluarga & kawan"), desc: t("Stay in touch every day, not just on holidays.", "Kekal berhubung setiap hari, bukan masa cuti sahaja."),
      habits: [
        h("fm-msg", "evening", t("Message a friend or family member", "Mesej kawan atau keluarga"), { at: 60, quest: true }),
        h("fm-meal", "evening", t("One meal with others, phones away", "Makan bersama, phone diletak jauh"), { at: 120, everyOtherDay: true })
      ],
      weekly: [w("fm-call", t("Call your parents", "Telefon mak ayah")), w("fm-meet", t("Meet a friend", "Jumpa kawan"))] },
    { id: "pet", cat: "home", emoji: "🐾", title: t("Pet care", "Jaga haiwan peliharaan"), desc: t("Feeding, play time and a clean space.", "Makan, masa bermain dan tempat yang bersih."),
      habits: [
        h("pt-feed-am", "morning", t("Feed your pet", "Beri makan haiwan peliharaan"), { at: 10 }),
        h("pt-play", "evening", t("Walk or play for 15 min", "Bawa jalan atau main 15 minit"), { at: 30, quest: true }),
        h("pt-feed-pm", "evening", t("Evening feed and fresh water", "Makan petang dan air bersih"), { at: 60 })
      ],
      weekly: [w("pt-clean", t("Clean the litter box, cage or tank", "Cuci pasir, sangkar atau akuarium")), w("pt-stock", t("Check food and supplies", "Semak makanan dan barang keperluan"))] },
    { id: "plants", cat: "home", emoji: "🌱", title: t("Plant care", "Jaga pokok"), desc: t("A quick daily check and a weekly once-over.", "Semakan ringkas setiap hari dan sekali seminggu."),
      habits: [h("pl-check", "morning", t("Check the soil, water if dry", "Semak tanah, siram kalau kering"), { at: 30 })],
      weekly: [w("pl-wipe", t("Wipe leaves and turn pots", "Lap daun dan pusing pasu")), w("pl-feed", t("Add fertiliser if growing", "Tambah baja kalau sedang membesar"))],
      tips: [t("**Most plants die from too much water,** not too little. Check the soil first.", "**Kebanyakan pokok mati sebab terlebih air,** bukan kurang. Semak tanah dulu.")] },
    { id: "kind", cat: "home", emoji: "🤝", title: t("Kindness", "Berbuat baik"), desc: t("One kind act a day and giving every week.", "Satu kebaikan sehari dan bersedekah setiap minggu."),
      habits: [
        h("kd-kind", "day", t("Do one kind thing", "Buat satu kebaikan"), { quest: true }),
        h("kd-thanks", "evening", t("Thank someone properly", "Ucap terima kasih dengan ikhlas"), { at: 90 })
      ],
      weekly: [w("kd-give", t("Give or donate something", "Bersedekah atau derma sesuatu"))] }
  ];
})();

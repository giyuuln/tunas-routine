/* Tunas Routine — starter templates in English and Bahasa Melayu.
   Any {en, ms} pair is resolved to the chosen language when a template is picked.
   See README.md for the routine format. */
(function () {
  const t = (en, ms) => ({ en, ms });
  const focusWeek = (a, b, rest) => ({
    "0": { title: t("1 hour: plan the week", "1 jam: rancang minggu"), note: t("List what you want to finish this week", "Senaraikan apa nak siap minggu ini") },
    "1": a, "2": b, "3": a, "4": b,
    "5": rest || { title: t("Night off", "Malam cuti"), note: t("Rest. You earned it.", "Rehat. Kau layak.") },
    "6": { title: t("1 hour: hobby", "1 jam: hobi"), note: t("Something just for fun", "Sesuatu untuk suka-suka") }
  });
  const skinTips = [
    t("**Thin to thick:** watery products first, creams after, sunscreen last in the morning.", "**Nipis ke pekat:** produk cair dulu, krim kemudian, pelindung matahari paling akhir waktu pagi."),
    t("**Sleep matters most.** A late night shows on your face more than anything else.", "**Tidur paling penting.** Tidur lewat paling ketara pada muka."),
    t("**Workout first, game after.** Make the game your reward.", "**Senaman dulu, main game kemudian.** Jadikan game sebagai hadiah."),
    t("**Feeling sleepy at 10am?** Water and a 5-minute walk before more coffee.", "**Mengantuk pukul 10 pagi?** Minum air dan jalan 5 minit sebelum tambah kopi."),
    t("**Results take 4 to 8 weeks.** Keep the streak going.", "**Hasil ambil masa 4 hingga 8 minggu.** Teruskan streak.")
  ];
  const skinGuide = {
    title: t("Skin basics", "Asas penjagaan kulit"),
    sections: [
      { title: t("The order, every day", "Susunan setiap hari"), lines: [
        t("**Morning:** cleanser → serum → moisturizer → sunscreen", "**Pagi:** pencuci → serum → pelembap → pelindung matahari"),
        t("**Night:** cleanser → serum → moisturizer", "**Malam:** pencuci → serum → pelembap"),
        t("Watery products first, creams after, sunscreen always last in the morning.", "Produk cair dulu, krim kemudian, pelindung matahari sentiasa paling akhir waktu pagi.") ] },
      { title: t("How much to use", "Berapa banyak nak guna"), lines: [
        t("**Cleanser:** one small pump, about 30 seconds.", "**Pencuci:** satu pam kecil, lebih kurang 30 saat."),
        t("**Moisturizer:** a pea-size amount.", "**Pelembap:** sebesar kacang pis."),
        t("**Sunscreen:** two finger-lengths for face and neck.", "**Pelindung matahari:** dua panjang jari untuk muka dan leher.") ] }
    ]
  };
  const bodyweight = (name, day) => ({
    name, when: t("20–30 min", "20–30 minit"), remind: day.remind, from: day.from, to: day.to, after: day.after,
    say: [t("Workout time! Let's go.", "Masa senaman! Jom."), t("Log every set to catch a new PR.", "Catat setiap set untuk kejar rekod baru.")],
    exercises: [
      { id: "pushup", name: t("Push-ups", "Tekan tubi"), reps: "8–15", rest: "60s", cue: t("Knees down is fine. Chest to the floor, body straight.", "Lutut di lantai pun boleh. Dada ke lantai, badan lurus."), bodyweight: true },
      { id: "squat", name: t("Bodyweight Squat", "Cangkung"), reps: "12–20", rest: "60s", cue: t("Sit back like a chair, 3 seconds down.", "Duduk ke belakang macam kerusi, turun 3 saat."), bodyweight: true },
      { id: "bridge", name: t("Glute Bridge", "Jambatan punggung"), reps: "12–20", rest: "45s", cue: t("Squeeze at the top for 1 second.", "Kepit di atas selama 1 saat."), bodyweight: true },
      { id: "plank", name: t("Plank", "Plank"), reps: "30–45 sec", rest: "45s", cue: t("Squeeze glutes, ribs down.", "Kepit punggung, rusuk ke bawah."), bodyweight: true, unit: "sec" }
    ]
  });

  const worker = {
    version: 1, label: t("Worker routine", "Rutin pekerja"), name: "",
    blocks: [
      { id: "morning", remind: "06:30", title: t("Morning", "Pagi"), icon: "sun", from: "05:00", to: "09:00", range: "6:30 – 8:00 am",
        say: [t("Jom! Morning routine first.", "Jom! Rutin pagi dulu."), t("Sunscreen before you head out.", "Pakai pelindung matahari sebelum keluar.")],
        items: [
          { id: "wake", title: t("Wake up + glass of water", "Bangun + segelas air"), time: "6:30" },
          { id: "bed", title: t("Make your bed", "Kemas katil"), time: "6:35" },
          { id: "am-clean", title: t("Rinse or gentle cleanser", "Bilas atau pencuci lembut"), note: t("Pat dry, leave skin a little damp", "Tepuk kering, biar kulit sedikit lembap"), time: "6:45" },
          { id: "am-moist", title: t("Moisturizer", "Pelembap"), time: "6:47" },
          { id: "spf", title: t("Sunscreen", "Pelindung matahari"), note: t("Two finger-lengths for face and neck", "Dua panjang jari untuk muka dan leher"), time: "6:50", quest: true },
          { id: "bfast", title: t("Breakfast with protein", "Sarapan dengan protein"), note: t("Eggs, yogurt or tofu so you don't crash at 10am", "Telur, yogurt atau tauhu supaya tak lemau pukul 10 pagi"), time: "7:00" }
        ] },
      { id: "evening", remind: "17:30", title: t("After work", "Lepas kerja"), icon: "walk", from: "17:00", to: "20:00", range: "5:30 – 8:00 pm",
        say: [t("Walk time. 30 minutes je.", "Masa berjalan. 30 minit je."), t("Go before it gets dark.", "Pergi sebelum gelap.")],
        items: [
          { id: "pm-water", title: t("Drink water when you get home", "Minum air bila sampai rumah"), time: "5:30" },
          { id: "walk", title: t("30 min walk", "Jalan 30 minit"), note: t("Rinse your face after if you sweat.", "Bilas muka lepas berpeluh."), time: "6:00", quest: true, hideOnDays: [3] },
          { id: "dinner", title: t("Lighter dinner", "Makan malam ringan"), note: t("Less rice, add protein and veg", "Kurang nasi, tambah protein dan sayur"), time: "7:30" },
          { id: "nosnack", title: t("No sugary drinks or salty snacks", "Tiada minuman manis atau snek masin") }
        ] },
      { id: "focus", remind: "20:00", title: t("Focus time", "Masa fokus"), icon: "focus", from: "20:00", to: "22:00", range: "8:00 – 10:00 pm",
        items: [
          { id: "focus-hour", useFocus: true, time: "8:15", quest: true },
          { id: "free", title: t("Free time, no guilt", "Masa bebas, tanpa rasa bersalah"), time: "9:15" },
          { id: "dim", title: t("Turn screen brightness down", "Kurangkan kecerahan skrin"), time: "9:30" }
        ] },
      { id: "night", remind: "22:30", title: t("Night", "Malam"), icon: "moon", from: "22:00", to: "05:00", range: "10:30 – 11:30 pm",
        say: [t("Skincare, then sleep.", "Jaga kulit, lepas tu tidur."), t("Phone away by 11. You got this.", "Letak phone sebelum 11. Boleh!")],
        items: [
          { id: "nt-clean", title: t("Gentle cleanser", "Pencuci lembut"), note: t("Washes off sunscreen and the day's oil", "Tanggalkan pelindung matahari dan minyak"), time: "10:30" },
          { id: "nt-moist", title: t("Moisturizer", "Pelembap"), time: "10:35" },
          { id: "phone", title: t("Phone away", "Letak phone jauh"), time: "11:00" },
          { id: "sleep", title: t("Sleep", "Tidur"), note: t("Aim for 7 hours", "Sasarkan 7 jam"), time: "11:30", quest: true }
        ] }
    ],
    focus: focusWeek(
      { title: t("1 hour: learn something", "1 jam: belajar sesuatu"), note: t("A course, a book or practice", "Kursus, buku atau latihan") },
      { title: t("1 hour: side project", "1 jam: projek sampingan"), note: t("Build one small thing", "Bina satu benda kecil") }),
    workouts: {
      "3": bodyweight(t("Bodyweight Basics", "Asas Berat Badan"), { remind: "18:00", from: "18:00", to: "19:15", after: "evening" }),
      "6": bodyweight(t("Weekend Session", "Sesi Hujung Minggu"), { remind: "09:00", after: "morning" })
    },
    progression: {},
    weekly: [{ id: "pillow", title: t("Change pillowcase", "Tukar sarung bantal") }, { id: "room", title: t("Tidy your room", "Kemas bilik") }],
    away: { from: "08:30", to: "17:00", say: [t("Have a good day at work!", "Selamat bekerja!"), t("Drink water. Coffee only before 2pm.", "Minum air. Kopi sebelum 2 petang sahaja.")] },
    tips: skinTips, guide: skinGuide
  };

  const student = {
    version: 1, label: t("Student routine", "Rutin pelajar"), name: "",
    blocks: [
      { id: "morning", remind: "06:45", title: t("Morning", "Pagi"), icon: "sun", from: "05:00", to: "08:30", range: "6:45 – 8:00 am",
        say: [t("Morning! Quick routine, then class.", "Selamat pagi! Rutin ringkas, lepas tu kelas."), t("Don't forget your bag.", "Jangan lupa beg.")],
        items: [
          { id: "wake", title: t("Wake up + glass of water", "Bangun + segelas air"), time: "6:45" },
          { id: "am-clean", title: t("Wash face", "Cuci muka"), time: "6:50" },
          { id: "spf", title: t("Sunscreen", "Pelindung matahari"), time: "7:00", quest: true },
          { id: "bfast", title: t("Breakfast", "Sarapan"), note: t("Eggs, bread or oats. Not just a sweet drink.", "Telur, roti atau oat. Bukan air manis sahaja."), time: "7:10" },
          { id: "bag", title: t("Check bag and timetable", "Semak beg dan jadual"), time: "7:30" }
        ] },
      { id: "afternoon", remind: "16:00", title: t("After class", "Lepas kelas"), icon: "book", from: "14:00", to: "19:30", range: "4:00 – 7:00 pm",
        say: [t("Class done! Quick review while it's fresh.", "Kelas habis! Ulang kaji sementara masih segar."), t("30 minutes is enough.", "30 minit pun cukup.")],
        items: [
          { id: "review", title: t("Review today's notes (30 min)", "Ulang kaji nota hari ini (30 minit)"), time: "4:00", quest: true },
          { id: "tasks", title: t("Check assignments and deadlines", "Semak tugasan dan tarikh akhir"), time: "4:30" },
          { id: "move", title: t("Move for 30 min", "Bergerak 30 minit"), note: t("Walk, futsal, badminton, anything", "Jalan, futsal, badminton, apa-apa"), time: "5:30", quest: true, hideOnDays: [2, 5] },
          { id: "water", title: t("Refill your water bottle", "Isi semula botol air") }
        ] },
      { id: "study", remind: "20:30", title: t("Study time", "Masa belajar"), icon: "focus", from: "20:00", to: "23:00", range: "8:30 – 10:30 pm",
        items: [
          { id: "focus-hour", useFocus: true, time: "8:30", quest: true },
          { id: "tomorrow", title: t("Prepare for tomorrow", "Sedia untuk esok"), note: t("Clothes, bag, charger", "Baju, beg, pengecas"), time: "10:00" },
          { id: "free", title: t("Free time, no guilt", "Masa bebas, tanpa rasa bersalah"), time: "10:15" }
        ] },
      { id: "night", remind: "23:00", title: t("Night", "Malam"), icon: "moon", from: "23:00", to: "05:00", range: "11:00 pm – 12:00 am",
        say: [t("Wind down. Big day tomorrow.", "Masa berehat. Esok hari besar."), t("Phone away, lights off.", "Letak phone, tutup lampu.")],
        items: [
          { id: "nt-clean", title: t("Wash face", "Cuci muka"), time: "11:00" },
          { id: "phone", title: t("Phone away", "Letak phone jauh"), time: "11:30" },
          { id: "sleep", title: t("Sleep", "Tidur"), note: t("Aim for 7–8 hours", "Sasarkan 7–8 jam"), time: "12:00", quest: true }
        ] }
    ],
    focus: focusWeek(
      { title: t("Study block: hardest subject", "Belajar: subjek paling susah"), note: t("Phone in another room", "Letak phone di bilik lain") },
      { title: t("Study block: assignments", "Belajar: siapkan tugasan"), note: t("Finish one part fully", "Siapkan satu bahagian sepenuhnya") }),
    workouts: {
      "2": bodyweight(t("Quick Home Workout", "Senaman Ringkas di Rumah"), { remind: "17:30", from: "17:00", to: "18:30", after: "afternoon" }),
      "5": bodyweight(t("Quick Home Workout", "Senaman Ringkas di Rumah"), { remind: "17:30", from: "17:00", to: "18:30", after: "afternoon" })
    },
    progression: {},
    weekly: [
      { id: "plan", title: t("Plan the week's assignments", "Rancang tugasan minggu ini") },
      { id: "laundry", title: t("Laundry", "Basuh baju") },
      { id: "room", title: t("Tidy your room", "Kemas bilik") }
    ],
    away: { from: "08:30", to: "14:00", say: [t("Good luck in class!", "Semoga lancar di kelas!"), t("Drink water and sit in front if you can.", "Minum air dan duduk depan kalau boleh.")] },
    tips: [
      t("**Review within 24 hours.** You'll remember twice as much.", "**Ulang kaji dalam 24 jam.** Kau akan ingat dua kali ganda."),
      t("**Phone in another room** while studying. Out of sight, out of mind.", "**Letak phone di bilik lain** masa belajar. Tak nampak, tak teringat."),
      t("**Start assignments early,** even 15 minutes.", "**Mula tugasan awal,** walaupun 15 minit."),
      t("**Sleep before exams** beats an all-nighter.", "**Tidur sebelum peperiksaan** lebih baik daripada berjaga malam."),
      t("**Move every day.** It helps you focus.", "**Bergerak setiap hari.** Ia bantu kau fokus.")
    ],
    guide: {
      title: t("Study tips", "Tip belajar"),
      sections: [{ title: t("The 25–5 method", "Kaedah 25–5"), lines: [
        t("**Study 25 minutes,** then rest 5. After 4 rounds, rest 20.", "**Belajar 25 minit,** rehat 5. Selepas 4 pusingan, rehat 20."),
        t("**One subject per block.** Switching wastes time.", "**Satu subjek setiap blok.** Bertukar-tukar membazir masa.") ] }]
    }
  };

  const fitness = {
    version: 1, label: t("Fitness routine", "Rutin kecergasan"), name: "",
    blocks: [
      { id: "morning", remind: "06:30", title: t("Morning", "Pagi"), icon: "sun", from: "05:00", to: "09:00", range: "6:30 – 8:00 am",
        say: [t("Morning! Water and protein first.", "Selamat pagi! Air dan protein dulu."), t("Small wins all day.", "Kemenangan kecil sepanjang hari.")],
        items: [
          { id: "wake", title: t("Wake up + big glass of water", "Bangun + segelas besar air"), time: "6:30", quest: true },
          { id: "bfast", title: t("Protein breakfast", "Sarapan protein"), note: t("2–3 eggs, Greek yogurt or tofu", "2–3 biji telur, yogurt Greek atau tauhu"), time: "7:00", quest: true },
          { id: "spf", title: t("Sunscreen", "Pelindung matahari"), time: "7:20" }
        ] },
      { id: "day", remind: "12:30", title: t("Daytime", "Siang"), icon: "walk", from: "09:00", to: "17:30", range: t("all day", "sepanjang hari"),
        say: [t("Keep moving. Take the stairs.", "Terus bergerak. Guna tangga."), t("Water bottle on your desk.", "Botol air atas meja.")],
        items: [
          { id: "lunch", title: t("Protein + veg lunch", "Makan tengah hari protein + sayur"), note: t("Half the plate veg, less rice", "Separuh pinggan sayur, kurang nasi"), time: "1:00" },
          { id: "water2", title: t("Drink 2 litres of water", "Minum 2 liter air") },
          { id: "steps", title: t("8,000 steps", "8,000 langkah"), quest: true }
        ] },
      { id: "evening", remind: "18:00", title: t("Evening", "Petang"), icon: "heart", from: "17:30", to: "21:00", range: "6:00 – 8:30 pm",
        say: [t("Training time soon.", "Masa latihan tak lama lagi."), t("A small snack 1 hour before helps.", "Snek kecil sejam sebelum membantu.")],
        items: [
          { id: "stretch", title: t("Stretch 10 min", "Regangan 10 minit"), time: "6:00" },
          { id: "walk", title: t("30 min walk", "Jalan 30 minit"), time: "6:15", hideOnDays: [1, 3, 5] },
          { id: "dinner", title: t("Protein + veg dinner", "Makan malam protein + sayur"), time: "7:30" }
        ] },
      { id: "night", remind: "22:30", title: t("Night", "Malam"), icon: "moon", from: "21:00", to: "05:00", range: "10:30 – 11:30 pm",
        say: [t("Recovery time. Muscles grow while you sleep.", "Masa pemulihan. Otot membesar semasa tidur."), t("No late snacks.", "Tiada snek lewat malam.")],
        items: [
          { id: "nosnack", title: t("No late-night snacks", "Tiada snek lewat malam"), time: "9:30" },
          { id: "phone", title: t("Phone away", "Letak phone jauh"), time: "11:00" },
          { id: "sleep", title: t("Sleep 7–8 hours", "Tidur 7–8 jam"), time: "11:30", quest: true }
        ] }
    ],
    focus: {},
    workouts: (() => { const d = { remind: "18:30", from: "18:15", to: "19:45", after: "evening" };
      return { "1": bodyweight(t("Strength A", "Kekuatan A"), d), "3": bodyweight(t("Strength B", "Kekuatan B"), d), "5": bodyweight(t("Strength A", "Kekuatan A"), d) }; })(),
    progression: {},
    weekly: [
      { id: "photo", title: t("Progress photo (same spot, same light)", "Gambar kemajuan (tempat dan cahaya sama)") },
      { id: "prep", title: t("Meal prep for the week", "Sediakan makanan untuk seminggu") }
    ],
    away: null,
    tips: [
      t("**Protein at every meal** keeps you full and builds muscle.", "**Protein setiap kali makan** buat kenyang lama dan bina otot."),
      t("**Beat last week by 1 rep.** That's progress.", "**Lebih 1 rep dari minggu lepas.** Itu dah kemajuan."),
      t("**Liquid sugar first:** cut sweet drinks before anything else.", "**Gula cecair dulu:** kurangkan minuman manis dahulu."),
      t("**Rest days build muscle.** Don't skip them.", "**Hari rehat bina otot.** Jangan langkau."),
      t("**Track your waist and photos,** not just the scale.", "**Jejak pinggang dan gambar,** bukan timbang sahaja.")
    ],
    guide: { title: t("Training basics", "Asas latihan"), sections: [{ title: t("How hard to push", "Seberat mana nak tolak"), lines: [
      t("**Stop 2 reps before failure** on most sets.", "**Berhenti 2 rep sebelum tak larat** untuk kebanyakan set."),
      t("**Hit the top of the rep range on every set?** Make it harder next time.", "**Capai rep maksimum setiap set?** Buat lebih susah lain kali.") ] }] }
  };

  const simple = {
    version: 1, label: t("Simple routine", "Rutin ringkas"), name: "",
    blocks: [
      { id: "day", remind: "08:00", title: t("Daytime", "Siang"), icon: "sun", from: "05:00", to: "21:00", range: t("all day", "sepanjang hari"),
        say: [t("Just 5 small habits today.", "Hanya 5 tabiat kecil hari ini."), t("Start with the easiest one.", "Mula dengan yang paling senang.")],
        items: [
          { id: "water", title: t("Drink 8 glasses of water", "Minum 8 gelas air") },
          { id: "move", title: t("Move for 20 minutes", "Bergerak 20 minit"), quest: true },
          { id: "read", title: t("Read 10 pages", "Baca 10 muka surat"), quest: true },
          { id: "tidy", title: t("Tidy up for 5 minutes", "Kemas 5 minit") }
        ] },
      { id: "night", remind: "22:30", title: t("Night", "Malam"), icon: "moon", from: "21:00", to: "05:00", range: "10:30 – 11:30 pm",
        say: [t("Almost done for today.", "Hampir siap untuk hari ini."), t("Phone away, then sleep.", "Letak phone, lepas tu tidur.")],
        items: [
          { id: "nophone", title: t("No phone in bed", "Tiada phone atas katil"), quest: true },
          { id: "sleep", title: t("Sleep by 11:30", "Tidur sebelum 11:30"), time: "11:30" }
        ] }
    ],
    focus: {}, workouts: {}, progression: {},
    weekly: [{ id: "family", title: t("Call your family", "Telefon keluarga") }],
    away: null,
    tips: [
      t("**Make it tiny.** Small habits are easy to keep.", "**Buat kecil-kecil.** Tabiat kecil senang dikekalkan."),
      t("**Never miss twice.** One bad day is fine.", "**Jangan terlepas dua kali.** Satu hari teruk tak apa."),
      t("**Same time, same place.** It becomes automatic.", "**Masa sama, tempat sama.** Lama-lama jadi automatik.")
    ],
    guide: null
  };

  window.TUNAS_TEMPLATES = [
    { id: "student", icon: "book", title: t("Student", "Pelajar"), desc: t("Classes, study blocks and a quick home workout twice a week.", "Kelas, masa belajar dan senaman ringkas dua kali seminggu."), routine: student },
    { id: "worker", icon: "walk", title: t("Worker", "Pekerja"), desc: t("Morning skincare, an evening walk, focus hour and a good night's sleep.", "Penjagaan kulit pagi, jalan petang, sejam fokus dan tidur cukup."), routine: worker },
    { id: "fitness", icon: "dumb", title: t("Fitness", "Kecergasan"), desc: t("Protein, steps, three strength days and recovery.", "Protein, langkah, tiga hari latihan kekuatan dan pemulihan."), routine: fitness },
    { id: "simple", icon: "heart", title: t("Simple", "Ringkas"), desc: t("Just 6 small daily habits. Easy to start.", "Hanya 6 tabiat harian kecil. Senang untuk mula."), routine: simple }
  ];

  // Turn {en, ms} pairs into plain strings for the chosen language.
  window.resolveTemplate = function (obj, lang) {
    if (Array.isArray(obj)) return obj.map(x => window.resolveTemplate(x, lang));
    if (obj && typeof obj === "object") {
      const keys = Object.keys(obj);
      if (keys.length === 2 && "en" in obj && "ms" in obj) return obj[lang] || obj.en;
      const out = {}; keys.forEach(k => { out[k] = window.resolveTemplate(obj[k], lang); }); return out;
    }
    return obj;
  };
})();

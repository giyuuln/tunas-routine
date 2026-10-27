/*
 * Tunas starter routine.
 * This is the generic routine the app ships with. Your own routine is imported
 * from a private .json file in Settings and is saved only on your phone.
 * See README.md for the full format.
 */
window.DEFAULT_ROUTINE = {
  version: 1,
  label: "Starter routine",
  name: "Friend",
  blocks: [
    { id: "morning", remind: "06:30", title: "Morning", icon: "sun", from: "05:00", to: "09:00", range: "6:30 – 8:00 am",
      say: ["Jom! Morning routine first.", "Sunscreen before you head out."],
      items: [
        { id: "wake", title: "Wake up + glass of water", time: "6:30" },
        { id: "bed", title: "Make your bed", time: "6:35" },
        { id: "am-clean", title: "Rinse or gentle cleanser", note: "Pat dry, leave skin a little damp", time: "6:45" },
        { id: "am-moist", title: "Moisturizer", note: "Pea-size amount", time: "6:47" },
        { id: "spf", title: "Sunscreen", note: "Last step. Two finger-lengths for face and neck.", time: "6:50", quest: true },
        { id: "bfast", title: "Breakfast with protein", note: "Eggs, yogurt or tofu so you don't crash at 10am", time: "7:00" }
      ] },
    { id: "evening", remind: "17:30", title: "After work", icon: "walk", from: "17:00", to: "20:00", range: "5:30 – 8:00 pm",
      say: ["Walk time. 30 minutes je.", "Go before it gets dark."],
      items: [
        { id: "pm-water", title: "Drink water when you get home", time: "5:30" },
        { id: "walk", title: "30 min walk", note: "Rinse your face after if you sweat.", time: "6:00", quest: true, hideOnDays: [3] },
        { id: "dinner", title: "Lighter dinner", note: "Less rice, add protein and veg", time: "7:30" },
        { id: "nosnack", title: "No sugary drinks or salty snacks" }
      ] },
    { id: "focus", remind: "20:00", title: "Focus time", icon: "focus", from: "20:00", to: "22:00", range: "8:00 – 10:00 pm",
      say: ["One focus hour.", "Phone face down, one thing only."],
      items: [
        { id: "focus-hour", useFocus: true, time: "8:15", quest: true },
        { id: "free", title: "Free time, no guilt", time: "9:15" },
        { id: "dim", title: "Turn screen brightness down", time: "9:30" }
      ] },
    { id: "night", remind: "22:30", title: "Night", icon: "moon", from: "22:00", to: "05:00", range: "10:30 – 11:30 pm",
      say: ["Skincare, then sleep.", "Phone away by 11. You got this."],
      items: [
        { id: "nt-clean", title: "Gentle cleanser", note: "Washes off sunscreen and the day's oil", time: "10:30" },
        { id: "nt-moist", title: "Moisturizer", time: "10:35" },
        { id: "phone", title: "Phone away", time: "11:00" },
        { id: "sleep", title: "Sleep", note: "Aim for 7 hours", time: "11:30", quest: true }
      ] }
  ],
  hideNote: "Workout day. Your session is the dumbbell circle on the path.",
  everyOtherDayNote: "Rest day for this one. See you tomorrow.",
  focus: {
    "0": { title: "1 hour: plan the week", note: "List what you want to finish this week" },
    "1": { title: "1 hour: learn something", note: "A course, a book or practice" },
    "2": { title: "1 hour: side project", note: "Build one small thing" },
    "3": { title: "1 hour: learn something", note: "A course, a book or practice" },
    "4": { title: "1 hour: side project", note: "Build one small thing" },
    "5": { title: "Night off", note: "Rest. You earned it." },
    "6": { title: "1 hour: hobby", note: "Something just for fun" }
  },
  workouts: {
    "3": { name: "Bodyweight Basics", when: "6:00 – 6:40 pm", remind: "18:00", from: "18:00", to: "19:15", after: "evening",
      say: ["Workout time! Let's go.", "Log every set to catch a new PR."],
      exercises: [
        { id: "pushup", name: "Push-ups", reps: "8–15", rest: "60s", cue: "Knees down is fine. Chest to the floor, body straight.", bodyweight: true },
        { id: "squat", name: "Bodyweight Squat", reps: "12–20", rest: "60s", cue: "Sit back like a chair, 3 seconds down.", bodyweight: true },
        { id: "bridge", name: "Glute Bridge", reps: "12–20", rest: "45s", cue: "Squeeze at the top for 1 second.", bodyweight: true },
        { id: "plank", name: "Plank", reps: "30–45 sec", rest: "45s", cue: "Squeeze glutes, ribs down.", bodyweight: true, unit: "sec" }
      ] },
    "6": { name: "Weekend Session", when: "Anytime today", remind: "09:00", after: "morning",
      say: ["Weekend workout! Do it before games.", "Log every set to catch a new PR."],
      exercises: [
        { id: "pushup", name: "Push-ups", reps: "8–15", rest: "60s", cue: "Knees down is fine. Chest to the floor.", bodyweight: true },
        { id: "lunge", name: "Reverse Lunge", reps: "8–12 / leg", rest: "60s", cue: "Step back, front knee over your middle toe.", bodyweight: true },
        { id: "superman", name: "Superman Hold", reps: "20–30 sec", rest: "45s", cue: "Lift arms and legs, squeeze your back.", bodyweight: true, unit: "sec" },
        { id: "plank", name: "Plank", reps: "30–45 sec", rest: "45s", cue: "Squeeze glutes, ribs down.", bodyweight: true, unit: "sec" }
      ] }
  },
  progression: {},
  weekly: [
    { id: "pillow", title: "Change pillowcase" },
    { id: "room", title: "Tidy your room" }
  ],
  away: { from: "08:30", to: "17:00", say: ["Have a good day!", "Drink water. Coffee only before 2pm."] },
  tips: [
    "**Thin to thick:** watery products first, creams after, sunscreen last in the morning.",
    "**One new product at a time.** Wait 2 weeks before adding another.",
    "**Sleep matters most.** A late night shows on your face more than anything else.",
    "**Workout first, game after.** Make the game your reward.",
    "**Feeling sleepy at 10am?** Water and a 5-minute walk before more coffee.",
    "**Results take 4 to 8 weeks.** Keep the streak going."
  ],
  guide: {
    title: "Skin basics",
    sections: [
      { title: "The order, every day", lines: [
        "**Morning:** cleanser → serum → moisturizer → sunscreen",
        "**Night:** cleanser → serum → moisturizer",
        "Watery products first, creams after, and sunscreen always last in the morning."
      ] },
      { title: "How much to use", lines: [
        "**Cleanser:** one small pump, about 30 seconds.",
        "**Moisturizer:** a pea-size amount.",
        "**Sunscreen:** two finger-lengths for face and neck."
      ] }
    ]
  }
};

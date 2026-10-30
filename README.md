# Tunas Routine

A cute, gamified daily routine tracker that you can install on your phone. Tunas the sprout cheers you on while you tick off your day.

- **Today as game levels:** each part of your day (Morning, After work, Workout, Focus, Night, This week) is a level that earns up to 3 stars. Tunas stands on the level to play next.
- **XP, levels and streaks:** every tick earns XP; hit 80% of your day to keep your streak
- **Daily quests and 16 badges**
- **Workout logger:** log kg × reps per set, get "NEW PR" when you beat your best, plus a rest timer that beeps and vibrates
- **Celebration screens, sounds and haptics** when you clear a section or have a perfect day
- **History calendar:** tap any past day to see it or fix a tick you forgot
- **Phone reminders:** add each section to Google Calendar in one tap, or download an `.ics` file
- **Tick all:** finish a whole section in one tap
- **Rest days:** protect your streak when you're sick or busy (2 per month)
- **Continue button and home-screen shortcuts:** long-press the app icon for Today, Workout, Night or History
- **Routine editor:** add, rename, reorder and delete sections, habits, workouts and weekly tasks right in the app
- **Welcome screen and 4 templates:** Student, Worker, Fitness and Simple, so new users start in seconds
- **English and Bahasa Melayu:** switch anytime in Settings
- **Share button:** send the app to friends from the phone's share sheet
- **Works offline** and installs like a normal app
- **Private:** no account, no server. Everything is saved on your phone only.

## Install on your phone

Open **https://tunas.amkaz.dev** on your phone, then:

- **Android (Chrome):** tap the **⋮** menu → **Install app** (or **Add to Home screen**)
- **iPhone (Safari):** tap **Share** → **Add to Home Screen**

> **Moved from `giyuuln.github.io/tunas-routine`?** Each web address keeps its own storage, so your data doesn't follow by itself. Open the old address, tap **Download backup** on the banner, then open tunas.amkaz.dev, tap **I have a Tunas backup** and pick the file.

## Make it yours

On first open, Tunas asks your name and language, then what you want help with. Pick a few **habit packs** (30 to choose from: skincare, water, sleep, solat, study, money, pet care and more), tell it when you wake up, go to bed and work or study, and it builds your routine on the phone. Pick **Skincare** and it asks your skin type, how many steps you want (Basic, Standard or Full) and what you want to work on, then builds morning and night steps with serums and treatment nights that fit. Pick **Workouts** and it also asks your level (newbie, intermediate or regular), home or gym (with a suggestion for your level) and what equipment you have, then builds a plan from bodyweight, bands, dumbbells, a pull-up bar or gym machines. Prefer a full routine? Tap **Use a ready-made routine instead**. After that:

- **Gear → Habit packs** to add more packs or remove one (its habits, weekly tasks, tips and guide topics go; your history stays)
- **Gear → Edit routine** to change any section, habit, time, workout, weekly task, and the **Guide** tab for your own guide and daily tips
- **Gear → Start a new routine** to start over with packs or a template (your XP and streak stay)
- **Gear → Import routine file** if someone gave you a routine `.json` (or tap **Paste**)

The routine is saved in the app on your phone. **Download my routine** saves a copy, and **Download backup** saves your XP, streak and workout logs.

**Download locked backup** saves the same backup protected with a password (AES-GCM, encrypted on the phone), so it's safer to keep in cloud storage or send to yourself. If you forget the password, that file can't be opened. **Restore backup** opens both kinds and asks for the password when the file is locked.

`.gitignore` blocks `*-routine.json`, `*.private.json` and `personal/`, so personal files don't get committed by accident.

## Routine file format

The easiest way to get a routine file is **Gear → Download my routine** after editing in the app. The templates in [`templates.js`](templates.js) use the same structure, with `{ "en": …, "ms": … }` pairs for both languages.

```json
{
  "version": 1,
  "label": "My routine",
  "name": "Your name",
  "blocks": [
    {
      "id": "morning", "title": "Morning", "icon": "sun",
      "from": "05:00", "to": "08:30", "range": "6:30 – 8:00 am",
      "say": ["What Tunas says during this time", "Smaller second line"],
      "items": [
        { "id": "spf", "title": "Sunscreen", "note": "Optional detail", "time": "7:30", "quest": true }
      ]
    }
  ],
  "focus":    { "0": { "title": "1 hour: plan the week", "note": "" } },
  "workouts": { "3": { "name": "Full Body", "when": "6:15 pm", "from": "18:00", "to": "19:15", "after": "evening",
                       "exercises": [ { "id": "squat", "name": "Goblet Squat", "reps": "10–12", "rest": "90s", "cue": "3 seconds down" } ] } },
  "progression": { "squat": { "start": "10 kg", "step": 2, "max": 18 } },
  "weekly": [ { "id": "pillow", "title": "Change pillowcase" } ],
  "away": { "from": "08:30", "to": "17:30", "say": ["Good luck at work!", "Drink water."] },
  "tips": [ "**Bold** works in tips and guide lines" ],
  "guide": { "title": "Guide", "sections": [ { "title": "Section", "lines": [ "**Morning:** …" ] } ] },
  "packs": [ "skin", "water" ],
  "day": { "wake": "06:30", "sleep": "23:00", "busy": [ "08:30", "17:00" ] },
  "fitness": { "level": "mid", "place": "home", "gear": [ "db", "band" ] },
  "skin": { "type": "combo", "level": "std", "concerns": [ "acne" ] }
}
```

| Field | Meaning |
|---|---|
| `icon` | `sun`, `walk`, `focus`, `moon`, `dumb`, `cal`, `book`, `heart`, `star` |
| `from` / `to` | When the section is "now" (24h). If `to` is earlier than `from`, it runs past midnight |
| `quest: true` | A ★ habit: worth more XP and part of the daily quest |
| `everyOtherDay: true` | Shows only every second day |
| `pack` | On habits, weekly tasks, workouts and guide sections: which pack added it, so removing the pack removes it. Leave it out for your own items |
| `packs` / `day` | Packs in use, and the wake/sleep/busy hours used to place habits from new packs (see [`packs.js`](packs.js)) |
| `fitness` | Workout setup: `level` `new`/`mid`/`pro`, `place` `home`/`gym`, `gear` any of `db`, `band`, `bar`. **Gear → Habit packs → Change workout setup** rebuilds the pack's workouts; logs stay |
| `skin` | Skincare setup: `type` `oily`/`dry`/`combo`/`normal`/`sensitive`/`unsure`, `level` `basic`/`std`/`full`, `concerns` any of `acne`, `spots`, `dull`, `dry`, `oil`, `lines`. **Change skincare setup** rebuilds the pack's habits; ticks stay |
| `onDays` (habit) | Show only on these weekdays, `0` = Sunday (e.g. retinoid nights `[1, 3, 6]`) |
| `sets` (workout) | Sets per exercise (1–5). Without it: 2 sets for the first 4 weeks, then 3 |
| `tips` / `guide` | Up to 50 tips and 12 guide sections of 20 lines each |
| `hideOnDays: [3]` | Hide on these weekdays (0 = Sunday … 6 = Saturday) |
| `useFocus: true` | Title comes from the `focus` entry for today's weekday |
| `workouts` | Keyed by weekday. `after` is the section id it appears after in Today's levels |
| `bodyweight: true`, `unit: "sec"` | Exercise logs reps only (or seconds) |
| `progression` | Per-exercise start weight and how much to add when you hit the top reps |
| `remind` | Optional `"HH:MM"` on a section or workout, used for calendar reminders (defaults to `from`) |

## XP rules

| Action | XP |
|---|---|
| Habit | +10 |
| ★ habit | +20 |
| Workout done | +50 |
| All ★ habits (daily quest) | +40 |
| Perfect day | +50 |
| New personal record | +25 |
| Weekly task | +15 |

A day counts toward your streak at 80% or more, or when you mark it as a rest day. A new day starts at 4am, so late nights count for the day before.

## Translations

All interface text is in [`i18n.js`](i18n.js). To add a language, copy the `en` block, translate it, and add a button for it in `segLang()` in `app.js`.

## Develop

It's plain HTML, CSS and JavaScript, with no build step.

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

When you change app files, bump `VERSION` in `sw.js` so installed phones pick up the update.

## Privacy

Tunas has no account, no server and no tracking. Your routine, ticks, XP and workout logs are saved only in your phone's browser storage (`localStorage`), so the developer never receives or sees anyone's data. A Content-Security-Policy in `index.html` stops the app from sending data to any outside website. Use **Settings → Download backup** to keep your own copy.

## Contributing

Ideas, bug fixes, templates and translations are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first, especially the rules that keep user data on the phone.

## License

[MIT](LICENSE). You're free to use, change and share Tunas, as long as you keep the license notice.


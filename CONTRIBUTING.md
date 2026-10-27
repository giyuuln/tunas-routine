# Contributing to Tunas Routine

Thanks for wanting to make Tunas better! Bug fixes, new templates, translations and small features are all welcome.

## How to suggest a change

1. **Fork** this repo and create a branch, e.g. `fix-history-calendar`.
2. Make your change and test it (see below).
3. Open a **pull request** that explains what you changed and why. Screenshots help for anything visual.
4. The maintainer reviews it. Nothing goes live until it's merged into `main`.

Found a bug or have an idea but don't want to code? Open an **issue** instead.

## Run it locally

There's no build step. From the repo folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Use your browser's phone view (about 400px wide) to check the layout.

## Rules that keep Tunas safe

Tunas promises users that **their data never leaves their phone**. Pull requests that break this promise will not be merged.

- **No network requests with user data.** No analytics, tracking, crash reporting, ads or `fetch()` calls to outside servers.
- **No new third-party scripts or CDNs.** The app is plain HTML, CSS and JavaScript with no dependencies. The only outside resource is Google Fonts.
- **Don't loosen the Content-Security-Policy** in `index.html`. It's there so the browser blocks data from being sent anywhere, even if bad code slips in.
- **No accounts or sign-in** without a discussion in an issue first. Storing user data on a server brings legal duties under privacy laws such as Malaysia's PDPA.
- **No personal data in commits.** Never commit your own routine file (`*-routine.json`), backups (`tunas-backup-*.json`), names, emails, API keys or passwords. `.gitignore` blocks the common ones.

## Code guidelines

- **Keep both languages.** Any new text on screen goes in `i18n.js` under both `en` and `ms`. If you don't speak Bahasa Melayu, add the English text in both and say so in your pull request.
- **New templates** go in `templates.js` using `{ en, ms }` pairs.
- **Don't break saved data.** Users' routines and progress live in `localStorage` (`tunas-config`, `tunas-data-v1`). If you change their shape, make sure old data still loads.
- **Bump `VERSION` in `sw.js`** whenever you change app files, so installed phones get the update.
- **Check it on a phone-sized screen** in light and dark mode.

## Pull request checklist

- [ ] Tested on a phone-sized screen
- [ ] New text added to both `en` and `ms` in `i18n.js`
- [ ] No outside network requests, trackers or new scripts
- [ ] No personal data, keys or backup files committed
- [ ] `VERSION` bumped in `sw.js`

By contributing, you agree your contribution is released under the [MIT License](LICENSE).

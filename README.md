# lpa-agency.com

Website der **LPA Agency** (betrieben von La Partage Media LTD).
Reines HTML/CSS/JS, kein Build-Schritt, gehostet kostenlos über **GitHub Pages**.

## Aufbau

```
index.html                Startseite (alle Abschnitte)
legal-notice/index.html   → /legal-notice/
privacy-policy/index.html → /privacy-policy/
404.html                  Fehlerseite
*.html (Root)             Weiterleitungen alter Duda-URLs (z.B. /consultation, /starter, /ga1)
assets/css/style.css      einziges Stylesheet
assets/js/main.js         Menü, Karussell, Videos, Lightbox, Einblendungen
assets/fonts/             Inter (lokal, keine Google-Fonts-Anfrage)
assets/img/               Logos, Reports, Success Stories, Icons, OG-Bild, Favicon
assets/video/             Testimonial-Videos (komprimiert) + CTA-Hintergrund
CNAME                     www.lpa-agency.com
robots.txt, sitemap.xml
```

`_duda-backup/` enthält die Originaldateien der alten Duda-Seite und ist bewusst
**nicht** im Repo (siehe `.gitignore`).

## Grundsätze

- **Kein Tracking, keine Cookies, keine externen Requests.** Die Datenschutzerklärung
  sagt das wörtlich. Kein Google Font, kein CDN, kein Pixel, kein eingebettetes Video
  hinzufügen, ohne die Datenschutzerklärung anzupassen.
- **Kontakt nur per E-Mail** (info@lpa-agency.com). Keine Telefonnummer, keine Buchungslinks.
- **Keine Preise.** Alle Pakete stehen auf „Pricing on request“.

## Änderungen veröffentlichen

```bash
git add -A && git commit -m "Beschreibung" && git push
```

GitHub Pages baut die Seite in 1–2 Minuten neu.

## Lokale Vorschau

```bash
python3 -m http.server 8090
```

Dann http://localhost:8090 öffnen.

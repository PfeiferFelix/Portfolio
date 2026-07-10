# Felix Pfeifer — Portfolio

Personal portfolio website of Felix Pfeifer, frontend developer. Live at [felixpfeifer.at](https://felixpfeifer.at).

## Features

- **Bilingual**: full German/English toggle (`i18n.js`) with `data-i18n` / `data-i18n-html` / `data-i18n-placeholder` attributes driving translations
- **Why me** section with location, relocation, and remote-work availability
- **Skills** grid (Angular, TypeScript, JavaScript, HTML, CSS, REST-API, Supabase, Git, Scrum, Material Design)
- **Projects** showcase with GitHub and live-demo links:
  - [El Pollo Loco](https://github.com/PfeiferFelix/El-Pollo-Loco) — JS/HTML/CSS jump'n'run game
  - [Join](https://github.com/PfeiferFelix/Join) — JS/HTML/CSS/Firebase Kanban task manager
  - [Poke API](https://github.com/PfeiferFelix/PokeApi) — JS/HTML/CSS Pokédex using the REST PokéAPI
- **Testimonials** from colleagues
- **Contact form** with client-side validation, privacy-policy checkbox, and a PHP mail backend (`contact_form_mail.php`)
- Responsive design with mobile burger menu
- Legal notice and privacy policy pages

## Tech Stack

Plain HTML5, CSS3, and JavaScript — no frameworks or build tools. Google Fonts (Archivo, Changa One, Inter, Open Sans, Press Start 2P, Raleway, Roboto Mono, Silkscreen) loaded via CDN. Contact form submission is handled server-side by a PHP script.

## Getting Started

Static frontend — no build step required:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

> Note: the contact form (`contact_form_mail.php`) requires a PHP-enabled host to actually send mail; set the recipient address in `contact_form_mail.php`.

## Project Structure

```
├── index.html                 # Main single-page site (Why me, Skills, Projects, Contact)
├── legal-notice.html           # Legal notice
├── privacy-policy.html          # Privacy policy
├── script.js                     # Interactions: nav, mobile menu, contact form validation
├── i18n.js                        # DE/EN translation strings and language toggle
├── contact_form_mail.php           # PHP backend for the contact form
├── style.css                        # Styling
└── images/                            # Icons, skill logos, project screenshots, profile photos
```

## Contact

- Email: felix@pr-media.at
- Phone: +43 664 651 7007

## License

No license specified.

(function () {
    var translations = {
        de: {
            'nav.whyme': 'Warum ich',
            'nav.skills': 'Skills',
            'nav.projects': 'Projekte',
            'nav.contact': 'Kontakt',
            'hero.contactTab': 'Kontaktiere mich',
            'whyme.headline': 'Warum ich?',
            'whyme.text': 'Ich programmiere mit Leidenschaft und löse gerne komplexe IT-Probleme. Ich lerne laufend neue Technologien, um meine Fähigkeiten zu verbessern und mich beruflich weiterzuentwickeln. Meine Motivation ist es, effiziente Lösungen zu schaffen und innovative Software zu entwickeln.',
            'whyme.iam': 'Ich bin',
            'whyme.location': 'wohnhaft <br /> in St.Anna am Aigen',
            'whyme.relocate': 'bereit <br /> umzuziehen',
            'whyme.remote': 'offen für <br /> Remote-Arbeit',
            'whyme.talkBtn': 'Lass uns reden',
            'skills.headline': 'Meine Skills',
            'projects.headline': 'Meine Projekte',
            'projects.pollo.desc': 'Jump-and-Run-Spiel mit Wurfmechanik auf Basis eines objektorientierten Ansatzes.<br> Hilf Pepe, Münzen und Tabasco-Salsa zu finden, um gegen <br> das verrückte Huhn zu kämpfen.',
            'projects.join.desc': 'Teambasierter Kanban-Task-Manager zum Erstellen, Organisieren<br> und Zuweisen von Aufgaben. Priorisiere Workflows, verfolge den Fortschritt <br> und arbeite effizient mit deinem Team zusammen.',
            'projects.poke.desc': 'Interaktiver Pokédex, der Daten von der PokéAPI abruft.<br> Suche, filtere und entdecke Pokémon, inklusive ihrer <br> Stats, Fähigkeiten und Attacken.',
            'testimonials.headline': 'Du suchst einen Teamplayer? Das sagen meine Kollegen über mich',
            'testimonials.1.project': 'Projekt Sharkie',
            'testimonials.1.text': '’’Felix hat in Zusammenarbeit mit den Teammitgliedern Inhalte entwickelt, formatiert und geliefert. Er ist eine zuverlässige und freundliche Person.’’',
            'testimonials.2.project': 'Projekt Pollo Loco',
            'testimonials.2.text': '’’ Er ist ein vertrauenswürdiger Teamplayer und hält dem Druck von Deadlines stand. Strukturierte Arbeit und sauberer Code. ’’',
            'testimonials.3.project': 'Projekt Join',
            'testimonials.3.text': '’’ Er ist eine zuverlässige und freundliche Person. Arbeitet strukturiert und schreibt sauberen Code. Ich empfehle ihn als Kollegen. ’’',
            'contact.headline': 'Kontaktiere mich',
            'contact.intro': 'Interesse an einer Zusammenarbeit? Ich bin derzeit auf der Suche nach einer Stelle als Frontend Developer und würde gerne an einem neuen Projekt mitwirken. Melde dich gerne!',
            'contact.name.placeholder': 'Dein Name',
            'contact.email.placeholder': 'Deine E-Mail',
            'contact.message.placeholder': 'Deine Nachricht',
            'contact.privacy': 'Ich habe die <a class="legal_information_link" href="privacy-policy.html">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.',
            'contact.emailLabel': 'E-Mail: felix@pr-media.at',
            'contact.send': 'Senden',
            'footer.legal': 'Impressum',
            'footer.privacy': 'Datenschutz',
        },
        en: {
            'nav.whyme': 'Why me',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'hero.contactTab': 'Contact me',
            'whyme.headline': 'Why me?',
            'whyme.text': 'I am passionate about coding and enjoy solving complex IT problems. I continuously learn new technologies to improve my skills and grow professionally. My motivation comes from creating efficient solutions and developing innovative software.',
            'whyme.iam': 'I am',
            'whyme.location': 'located <br /> in St.Anna am Aigen',
            'whyme.relocate': 'open <br /> to relocate',
            'whyme.remote': 'open to <br /> work remote',
            'whyme.talkBtn': "Let's Talk",
            'skills.headline': 'My Skills',
            'projects.headline': 'My Projects',
            'projects.pollo.desc': 'Jump, run and throw game based on object-oriented approach.<br> Help Pepe to find coins and tabasco salsa to fight against <br> the crazy hen.',
            'projects.join.desc': 'Team-based Kanban task manager for creating, organizing,<br> and assigning tasks. Prioritize workflows, track progress, <br> and collaborate efficiently with your team.',
            'projects.poke.desc': 'Interactive Pokédex that fetches data from the PokéAPI.<br> Search, filter, and explore Pokémon, including their <br> stats, abilities, and attacks.',
            'testimonials.headline': 'Need a teamplayer? Here’s what my colleagues say about me',
            'testimonials.1.project': 'Project Sharkie',
            'testimonials.1.text': '’’Felix had to develop, format and deliver content in collaboration with the team members. He is a reliable and friendly person.’’',
            'testimonials.2.project': 'Project Pollo Loco',
            'testimonials.2.text': '’’ He is a trustworthy teamplayer and can cope with the stress of deadlines. Structured work and clear code. ’’',
            'testimonials.3.project': 'Project Join',
            'testimonials.3.text': '’’ He is a reliable and friendly person. Work in a structured way and write a clear code. I recommend him as a colleague.’’',
            'contact.headline': 'Contact me',
            'contact.intro': "Interested in working together? I'm currently looking for a position as a frontend developer and would love to contribute to a new project. Feel free to reach out!",
            'contact.name.placeholder': 'Your Name',
            'contact.email.placeholder': 'Your Email',
            'contact.message.placeholder': 'Your Message',
            'contact.privacy': 'I&rsquo;ve read the <a class="legal_information_link" href="privacy-policy.html">privacy policy</a> and agree to the processing of my data as outlined.',
            'contact.emailLabel': 'E-mail: felix@pr-media.at',
            'contact.send': 'Send',
            'footer.legal': 'Legal notice',
            'footer.privacy': 'Privacy policy',
        }
    };

    function applyTranslations(lang) {
        var t = translations[lang] || translations['de'];
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) el.textContent = t[key];
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            if (t[key] !== undefined) el.innerHTML = t[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (t[key] !== undefined) el.placeholder = t[key];
        });
        document.querySelectorAll('.lang-opt').forEach(function (opt) {
            opt.classList.toggle('lang-active', opt.getAttribute('data-lang') === lang);
        });
        document.documentElement.lang = lang;
    }

    window.setLang = function (lang) {
        localStorage.setItem('lang', lang);
        applyTranslations(lang);
    };

    window.getLang = function () {
        return localStorage.getItem('lang') || 'de';
    };

    window.i18n = {
        t: function (key) {
            var lang = window.getLang();
            var t = translations[lang] || translations['de'];
            return t[key] !== undefined ? t[key] : key;
        }
    };

    window.applyTranslations = function () {
        applyTranslations(window.getLang());
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.applyTranslations);
    } else {
        window.applyTranslations();
    }
})();

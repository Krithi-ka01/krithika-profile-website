# Krithika G. — Personal Portfolio

A responsive personal portfolio built with HTML5, CSS3 and vanilla JavaScript.

## Included sections

1. Hero and profile artwork
2. Professional Journey (employment and education only)
3. Internship experience
4. Certification and training
5. Activities and achievements
6. Skills and technologies
7. Five Pinterest-inspired favourite cards
8. Family flip cards with illustrated portraits
9. My Creative Corner — five-sketch gallery
10. Beyond the Everyday — four photographic interest cards
11. Contact details and social links

## Technologies

- HTML5
- CSS3 (Grid, Flexbox, custom properties, responsive media queries)
- Vanilla JavaScript (ES6+)
- Browser local storage for theme preference

## Folder structure

```text
krithika-profile-website/
├── index.html
├── css/
│   ├── theme.css
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── hero/
│   │   └── profile.jpg
│   ├── hobbies/
│   │   ├── sketch-01.jpg
│   │   ├── sketch-02.jpg
│   │   ├── sketch-03.jpg
│   │   ├── sketch-04.jpg
│   │   └── sketch-05.jpg
│   ├── interests/
│   │   ├── music.jpg
│   │   ├── movies.jpg
│   │   ├── food.jpg
│   │   ├── travel.jpg
│   │   ├── desserts.jpg
│   │   ├── calligraphy.jpg
│   │   ├── yoga.jpg
│   │   ├── music-cozy.jpg
│   │   └── desserts-cute.jpg
│   └── family/
│       ├── father-illustration.jpg
│       ├── mother-illustration.jpg
│       └── brother-illustration.jpg
└── README.md
```

## Run locally

1. Extract the ZIP.
2. Open the `krithika-profile-website` folder in VS Code.
3. Open the integrated terminal in that folder.
4. Run:

```bash
python -m http.server 8080 --bind 127.0.0.1
```

5. Open `http://127.0.0.1:8080` in your browser.

You can also open `index.html` directly, but the local server is recommended.

## Theme switching

Use the circular sun/moon button in the navigation bar. The light theme uses a pastel-yellow palette; the dark theme uses charcoal, warm beige and muted gold. Your selection is remembered in browser local storage.

## Gallery behaviour

The gallery contains five supplied sketch photographs in upload order. It preserves image proportions, uses the captions Anime, Fox pencil portrait, Butterfly, Chibi and Big Tusker, and does not loop. The Previous button is disabled on the first image and Next is disabled on the fifth image.

## Notes

- The butterfly sketch is temporarily used in the hero photo card. Replace `images/hero/profile.jpg` with a professional portrait later if desired.
- The contact section includes the phone number supplied for this portfolio. Confirm before publishing publicly.
- A resume link can be added once the resume PDF is supplied.
- Review family descriptions and obtain consent before publishing family details.

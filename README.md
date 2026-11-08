# Personal portfolio

A personal portfolio website for Barat Namazov, built for the SITE 1101 individual project. The site is still in progress. This repository saves the current pages so work can continue later.

## Technologies

- HTML5
- CSS3
- JavaScript
- Git and GitHub
- GitHub Pages for publishing, once the site is ready

## Website features

- **Home:** a welcome, name, short introduction, and links to the other pages. The profile photo is still a placeholder.
- **About:** a Field Notes journal. Visitors can open a timeline, pin skill and interest cards, and stamp five notes. A progress bar shows how many notes have been collected.
- **Projects:** three project cards for Breadboard and Logic Gates, Hour of Code, and Robotics. Project photos are placeholders.
- **Contact:** a page for contact details. Those details have not been added yet. The page links to the existing GitHub profile.

The shared look is the Field Notes design: a deep green header, a cream page, and small gold highlights. The layout adjusts for a wide screen and a phone.

## Folder structure

```text
personal-portfolio/
├── index.html          Home page
├── about.html          About page and field journal
├── projects.html       Projects page
├── contact.html        Contact page
├── css/
│   └── styles.css      Shared colors and layout
├── js/
│   └── about.js        Journal stamps and timeline
├── .vscode/
│   └── launch.json     Optional browser launch setting
└── README.md
```

## How to run the project

1. Open a terminal in this project folder.
2. Start a local server:

```text
python -m http.server 8080
```

3. Open [http://localhost:8080](http://localhost:8080) in a browser.
4. Leave the terminal open while you view the site. Press Ctrl+C in that terminal when you want to stop the server.

Opening `index.html` directly also works for a quick look. The local server is the more reliable way to test links between pages.

## GitHub Pages

These steps publish the site after the repository is on GitHub.

1. On GitHub, open the `personal-portfolio` repository.
2. Go to **Settings**, then **Pages**.
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder.
5. Save. GitHub will show a site address after the first deployment finishes. It usually looks like `https://SONIC012912.github.io/personal-portfolio/`.

The first deployment can take a minute. Refresh the Pages settings page if the address is not there yet.

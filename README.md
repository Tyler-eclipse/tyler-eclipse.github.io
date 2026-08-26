# Portfolio site

A single-page portfolio built with plain HTML/CSS/JS — no build step, no
framework. Free to host on GitHub Pages.

## 1. Fill in your content

**`index.html`**
- Your name (search for "Your Name" — appears in the `<title>`, hero, footer)
- Role/title, tagline, bio paragraphs
- Skills chips
- Email, LinkedIn, GitHub links in the contact section
- The résumé button links to `/resume.pdf` — either add a `resume.pdf` file
  to this folder, point it at a Google Drive/Docs link instead, or delete
  the button

**`script.js`**
- Edit the `PROJECTS` array at the top of the file. Each object is one
  project card. Field-by-field notes are in the comment above the array.

## 2. Add photos and videos

Put image/video files in the `media/` folder, then reference them by path
in the `PROJECTS` array, e.g.:

```js
image: "media/project1.jpg",
video: "media/project1.mp4",
```

You can also embed a YouTube video instead of hosting your own file — use
`youtube: "VIDEO_ID"` (the part of the URL after `v=`). If you leave
`image`/`video` blank, that project shows a placeholder frame so you can
see the layout before you have real media.

Any project can also take a `gallery` array of extra screenshot paths —
they show up as small clickable thumbnails under the main image.

## 3. Preview it locally

Just open `index.html` in a browser — no server needed. Or, for a closer-
to-production preview:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## 4. Publish with GitHub Pages (free)

Based on your GitHub username (`tyler-eclipse`):

1. Create a new repository named exactly **`tyler-eclipse.github.io`**
   (this exact name makes it your main profile site, live at the root
   domain rather than a sub-path).
2. Push these files to the repo:
   ```
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/tyler-eclipse/tyler-eclipse.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, and under "Build and
   deployment" set Source to **Deploy from a branch**, branch **main**,
   folder **/(root)**. Save.
4. Your site goes live in a minute or two at:
   **https://tyler-eclipse.github.io**

After that, any time you edit content and push again, the live site
updates automatically at the same URL — you never have to touch the repo
name or Pages settings again.

### If you'd rather not use your main username repo

Name the repo anything else (e.g. `portfolio`) and it'll be served at
`https://tyler-eclipse.github.io/portfolio` instead — same steps, just a
longer URL.

## Files

```
index.html   structure/content
style.css    styling (blueprint/schematic theme)
script.js    PROJECTS data + rendering + lightbox + video handling
media/       put your screenshots and video clips here
.nojekyll    tells GitHub Pages not to run Jekyll processing
```

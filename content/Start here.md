# Editing the VorTX website

Everything on vortx3735.org comes from the notes in this folder. You don't need to know how to code. Change a note, and the site updates after a mentor approves the change.

## Where things are

| To change | Open |
|---|---|
| Homepage text | `pages/home` |
| About, Mission, History, FAQ, Join us, Sponsor us | the matching note in `pages/` |
| Student leads | `pages/leadership` |
| Coaches and mentors | `pages/coaches-mentors` |
| A robot, its awards or its photos | its note in `robots/` (one per season) |
| A sponsor or its logo | its note in `sponsors/` |
| Blog posts | `blog/` |
| Programming notes (vortx3735.org/docs) | `docs/` |
| Links, address, calendar, contact form | `settings` |

## The grey box at the top of a note

That box holds the note's **properties** (title, date, photos and so on). The site reads them, so keep the names on the left as they are and only change the values.

## Common jobs

**Write a blog post.** Copy a note in `blog/` and rename it `YYYY-MM-DD-short-title`. Fill in the title, date, author and summary, write the post, and paste in photos. Uncheck `draft` when it's ready to go live.

**Add a new season's robot.** Copy last season's note in `robots/`, rename it with the new year and robot name, then update the year, name, game and awards. Paste the robot photo into the note, then put its file name (e.g. `assets/my-photo.jpg`) as the first item under `photos`.

**Add a sponsor.** Copy a note in `sponsors/`, change the name and website, paste the logo, and put its file name under `logo`. A lower `order` number shows the sponsor earlier. Check `hidden` to take a sponsor off the site without deleting the note.

**Photos of students.** Only add photos of students who are covered by a media release.

## Two ways to edit

**On GitHub, in the browser (easiest).** Open the note on github.com/Vortx3735/website, click the pencil icon, make the change, and click **Commit changes…** → **Propose changes**. A mentor reviews and merges it.

**In Obsidian.** Install [GitHub Desktop](https://desktop.github.com), clone `Vortx3735/website`, and open its `content` folder as a vault in Obsidian. Edit there, then in GitHub Desktop create a branch, commit, push and open a pull request.

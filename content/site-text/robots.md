---
eyebrow: "Robots / {year}"
title: "Meet {name}"
lead: "Our {year} competition robot."
description: "Meet {name}, our {year} robot, and every VorTX and Klein Bots robot since 2011."
tribute_placeholder: "Photo"
specs_heading: "Spec sheet"
view_stats: "View stats"
all_heading: "Every robot"
all_lead: "Every earlier season, newest first."
detail_awards_heading: "Awards"
detail_back: "All robots"
detail_newer: "Newer robot"
detail_older: "Older robot"
detail_current: "Current robot"
detail_eyebrow: "{year} / {game}"
no_awards: "No awards this season."
---

Wording on the Robots page and on each robot's own page. `{year}`, `{name}` and `{game}` are filled in from the robot.

- The newest robot is featured at the top of the Robots page. Older robots move into the "Every robot" list and open their own page at `/robots/<note name>/`.
- **Spec sheet**: shown for any robot whose note has a `specs` list. Add as many as you like (`drivetrain`, `top_speed`, `weight`, and so on); each key becomes a box.
- **tagline, dedication, tribute_heading**: set these in a robot's note, not here (see `Start here`).

---
eyebrow: "2027 season"
heading: "{name} in"
current_eyebrow: "Current event"
now_text: "Happening now"
current_hours: 24
timezone: "America/Chicago"
events:
  - name: "Kickoff"
    date: "2027-01-09 11:00"
    when: "Saturday, January 9, 2027, at 11:00 AM Central Time (CT)"
    current_hours: 4
  - name: "TX District Houston - Week 2"
    date: "2027-03-11 17:00"
    when: "Thursday, March 11, 2027 - Saturday, March 13, 2027"
    current_hours: 50
  - name: "TX District Space City @ Friendswood #2 - Week 6"
    date: "2027-04-09 17:00"
    when: "Friday, April 9, 2027 - Sunday, April 11, 2027"
    current_hours: 50
  - name: "FiT District Championship - Week 7"
    date: "2027-04-14 17:00"
    when: "Wednesday, April 14, 2027 - Saturday, April 17, 2027"
    current_hours: 74
---

The countdown timer on the home page. It counts down to the first event in the list. When that moment arrives it shows the event as the **current event** for `current_hours`, then moves to the next event by itself. After the last event it hides.

- **events**: up to 5, the first five by date are used. Each one has a `name` and a `date`. Add events by copying a block (two spaces, a dash, then `name`, `date` and so on) under `events:`.
  - **date**: write it like `"2027-03-12 08:00"`, read in the `timezone` below. A full date with an offset, like `"2027-01-09T12:00:00-05:00"`, also works. Keep the quotes.
  - **when** (optional): the line under the timer. Leave it out and it is written for you from the date, like "Saturday, March 12, 2027, at 8:00 AM CST".
  - **eyebrow** (optional): the small label above the title for this event. Leave it out to use the one at the top.
  - **current_hours** (optional): how long this event shows as the current event. Leave it out to use the number at the top.
  - **timezone** (optional): for an event in another time zone, like `"America/New_York"`.
- **heading**: the title above the timer. `{name}` becomes the event's name, so "Kickoff in".
- **current_eyebrow, now_text**: the wording while an event is the current event.
- **current_hours**: how many hours an event shows as the current event after its start time. Use 72 for a three-day event.
- **timezone**: the zone dates are read in unless an event says otherwise.

Example with five events:

```
events:
  - name: "Kickoff"
    date: "2027-01-09T12:00:00-05:00"
  - name: "Houston Regional"
    date: "2027-03-12 08:00"
    current_hours: 72
  - name: "Event three"
    date: "2027-03-26 08:00"
  - name: "Event four"
    date: "2027-04-09 08:00"
  - name: "Event five"
    date: "2027-04-23 08:00"
```

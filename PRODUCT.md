# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step, served by GitHub Pages from this repo (`MarcAparisiTFG/rocodrom-web`, CNAME rocodrom.com). Confirmed by Marc on 2026-11-18: keep it static but richer — separate files, a real image folder, self-hosted fonts, a proper scroll-animation engine. Deploy is `git push`.

## Users

Friends who climb at the same indoor climbing gym (rocódromo), mostly boulderers, who already have a group chat and already dare each other on the wall. They land here from a link a friend sent, on their phone, deciding whether to install the beta and bring their group.

## Product Purpose

rocodrom (internal name Rocodrom V2) is a social game for a group of friends at one climbing gym. Members take turns setting a route as a challenge (the setter must film their own top), the others get 2 lives to send it (recording a video IS the attempt), and every group runs its own monthly league. Success for this site: a visitor understands the game in seconds and joins the beta.

## Positioning

The league is won against your friends, not against the wall. Points come from showing up, beating friends and tops; grades are the group's own circuits, so a mixed-level group can compete. Every attempt is a video the group can see and contest by vote.

## Operating Context

- A group = some friends + one gym, joined by an invitation code.
- Turn rotation decides who sets the next challenge; 48 h to set or the turn passes.
- Challenge window: 1, 3, 5 or 7 days. Two modes: an existing gym route (mark start and top) or an invented boulder (mark holds on a photo).
- Lives: 2 per challenge for everyone; one extra by watching 2 ads, once per challenge, visible to the group.
- Results: top, fall, KO; flash (top on first recorded attempt) multiplies points ×1.5.
- Claims: anyone can contest a top; the group watches the video and votes.
- Crux, the mascot (a chalk bag with a chalk cloud), has skins and accessories earned by playing and shown in the shop.

## Capabilities and Constraints

- App in 8 languages: es (source of truth), en, ca, fr, de, it, pt, nl. The site keeps all 8 with auto-detect and a picker.
- Free to play. Money comes from optional rewarded ads (extra life) and optional cosmetic skins and accessories in the shop (some at 1,99 €); cosmetics never give points.
- Launch status (confirmed 2026-11-18): iOS beta open on TestFlight. Android not yet available. No App Store / Google Play listing yet.
- Vocabulary is fixed by the app glossary: grupo, escalador, rocódromo, circuito, turno, reto, setter, presa, intento, top, caída, flash, vida, liga.
- Undecided: public Android date; App Store release date.

## Brand Commitments

- Public name is lowercase **rocodrom** with a dot: `rocodrom.`
- Crux the mascot stays, drawn live in the page (ported from the Remotion animations), not as static pictures. Rules: one shape, no outlines, no gradients, shade is the same colour darker; the chalk cloud expresses the emotion.
- Calm interface: no bounces, no screen shake; drama comes from colour and Crux.

## Evidence on Hand

- Real app screens captured from a backend-free mock build of the app (sample data, the app's own free-licensed Pexels wall photos).
- Crux animations (`../animaciones/src`) and character sheet (`../mascota/`).
- TestFlight public link recorded in the app repo's `testflight.md` (https://testflight.apple.com/join/g4vX44VF), pending Marc's confirmation that it is the one to publish.
- Absent, never to be fabricated: user counts, testimonials, press, ratings, store listings, gym partnerships.

## Product Principles

1. The group is the unit: everything is said in terms of you and your friends.
2. Show the game being played rather than describing it.
3. Fairness is the hook: video is the attempt, and the group is the referee.
4. Say only what is true today (beta, iOS, free).

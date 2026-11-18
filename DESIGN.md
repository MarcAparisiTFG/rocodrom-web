---
name: rocodrom.com
description: One climbing-gym circuit, eight colour fields from white to black, printed in a single ink.
colors:
  ink: "#14171C"
  chalk: "#F4F6F8"
  c1-blanco: "#F4F6F8"
  c2-verde: "#5FBF7A"
  c3-azul: "#4F8AD9"
  c4-amarillo: "#E7B75A"
  c5-naranja: "#F08A4B"
  c6-rojo: "#DE5A55"
  c7-morado: "#9675DE"
  c8-negro: "#1E2126"
  rail-negro: "#7B828D"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(56px, 16vw, 300px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(44px, 9.4vw, 156px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 62"
  title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(30px, 3.1vw, 46px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.03em"
    fontVariation: "'wdth' 62"
  numeral:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(40px, 4.4vw, 62px)"
    fontWeight: 900
    lineHeight: 0.9
    fontVariation: "'wdth' 62"
    fontFeature: "'tnum'"
  wordmark:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "34px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 62"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.4375rem)"
    fontWeight: 450
    lineHeight: 1.4
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.35vw, 1.3125rem)"
    fontWeight: 450
    lineHeight: 1.45
  tag-value:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.38
  chip:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "0.02em"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 800
    letterSpacing: "0.12em"
    fontVariation: "'wdth' 88"
  hand:
    fontFamily: "Shantell Sans, Comic Sans MS, cursive"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.32
rounded:
  none: "0px"
  focus: "4px"
  swatch: "7px"
  sm: "8px"
  chip: "10px"
  tag: "12px"
  screen: "36px"
  device: "46px"
spacing:
  rail: "76px"
  gut: "clamp(20px, 4.4vw, 72px)"
  cut: "5vw"
  flow: "clamp(20px, 3.2vh, 34px)"
  tag-gap: "clamp(28px, 4.4vh, 48px)"
  field-top: "clamp(110px, 17vh, 190px)"
  content-max: "1480px"
components:
  tape-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chalk}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0.62em 1em 0.52em 1.05em"
  tape-action-on-negro:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0.62em 1em 0.52em 1.05em"
  tape-landmark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chalk}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "10px 22px 9px"
  tape-landmark-on-negro:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  route-tag:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    typography: "{typography.tag-value}"
    rounded: "{rounded.tag}"
    padding: "20px 26px 20px 58px"
  chip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chalk}"
    typography: "{typography.chip}"
    rounded: "{rounded.chip}"
    padding: "0 16px"
    height: "42px"
  chip-on-negro:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.chip}"
    padding: "0 16px"
    height: "42px"
  legend-rail:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chalk}"
    width: "{spacing.rail}"
  legend-square:
    rounded: "{rounded.swatch}"
    size: "24px"
  language-menu:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "6px"
  language-menu-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.sm}"
  device:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.device}"
    padding: "10px"
---

# Design System: rocodrom.com

## Overview

**Creative North Star: "Circuitos"**

The page is one gym circuit. Eight full-bleed colour fields run from white to black, the same order a climber reads the grades on the wall, and each field carries one move of the game. Everything on a field is printed in a single ink; the only paper is chalk white, and it appears as an object hung on the wall (a laminated tag, a label, a menu), never as a tint. Colour does the dramatic work that shadows, gradients and illustration do elsewhere.

The objects are gym objects. Route tags are laminated cards clipped to a hold. Actions and landmarks are strips of gaffer tape with torn ends. A fixed ink rail on the left is the circuit legend, eight squares that fill as the reader climbs. One phone stays pinned on the right while the fields change behind it and its screen swaps to the real app screen for each move. Type is a condensed black grotesque at wall scale, set against very small tag labels, with a marker hand reserved for setter notes. Fields meet on a slight diagonal, like the facets of a wall.

Motion is calm and directional: lines rise out of a mask, tags swing to rest from their clip, panel cuts settle as a field takes the screen. Everything decelerates on one exponential ease-out and nothing overshoots. The system is dense with type and colour and sparse with components: there are no cards, no icon rows and no decorative imagery. The only things allowed their own colours are the real app screens and Crux.

**Key Characteristics:**
- Eight full-bleed colour fields in fixed order, white to black, one idea per field.
- One ink on every field; chalk is paper, not paint.
- Wall-scale condensed uppercase headlines fitted to the column, against 11.5px tag labels.
- Things hung on the wall (tags, tape, phone) are tilted and cast a soft shadow; things printed on the wall are level and flat.
- Diagonal panel cuts between fields, alternating direction.
- A fixed frame (legend rail and two chips) that never moves while colour floods beneath it.

## Colors

Hold-resin colours at full bleed, each printed with one near-black ink; the palette is the app's default circuits, read in grade order.

### Primary
- **Ink** (#14171C): the only printing colour. All type on fields 1 to 7, the legend rail, tape strips, chips, the tag clip, the phone body, rules under score rows, focus rings. Also the page background behind everything.
- **Chalk** (#F4F6F8): the only paper. The first field, the face of route tags, tooltip labels and the language menu, type on ink surfaces, and all type on the black field.

### Secondary
The circuit fields. Each is a full-bleed background and nothing else: never a text colour, never a button fill, never a border on another field. The one place a field colour travels is the legend rail (its square) and the punched hole of a tag, which shows the field behind it.
- **Blanco** (#F4F6F8): field 1, the start. Same value as Chalk.
- **Verde** (#5FBF7A): field 2, setting the challenge.
- **Azul** (#4F8AD9): field 3, the attempt.
- **Amarillo** (#E7B75A): field 4, the points.
- **Naranja** (#F08A4B): field 5, the referee.
- **Rojo** (#DE5A55): field 6, the league.
- **Morado** (#9675DE): field 7, Crux.
- **Negro** (#1E2126): field 8, the top. The only field that inverts: chalk prints on it, and tape and the action strip turn chalk with ink type.

### Neutral
- **Rail Negro** (#7B828D): the stand-in for black inside the legend rail and the wordmark dot, because Negro on the ink rail is invisible. Used only there.
- **Ink at 16%** and **Chalk at 22%**: hairline dividers inside a tag and above the footer. Ink at 8% and Chalk at 12% are the hover washes in the language lists.

### Named Rules
**The One Ink Rule.** Every field prints in Ink only. Emphasis comes from size, weight and width, never from a second text colour. Measured against the build, Ink holds 4.88:1 on Rojo, 5.04:1 on Morado and 5.11:1 on Azul, the three tightest fields.

**The Chalk Is Paper Rule.** Chalk type never sits directly on fields 2 to 7 (it measures 2.1:1 to 3.4:1 there). Chalk appears on colour only as a surface carrying ink, or as type on an ink surface such as tape.

**The Field Order Rule.** The eight colours appear in circuit order and each appears once. A new section does not get a new hue; it takes the next field or shares one.

## Typography

**Display Font:** Archivo variable, set at 62% width and weight 900 (with Arial Narrow, sans-serif)
**Body Font:** Archivo variable at normal width (with system-ui, sans-serif)
**Label/Mono Font:** Archivo at 88% width for tag labels; Shantell Sans (with cursive) for handwritten setter notes

**Character:** One variable family doing two jobs by changing width: compressed and black for anything painted on the wall, normal and plain for anything you read. The marker hand is the single human voice and is used a few words at a time.

### Hierarchy
- **Display** (900, 62% width, uppercase, clamp(56px, 16vw, 300px), line-height 0.88): the opening headline only. Three lines, no wrapping within a line.
- **Headline** (900, 62% width, uppercase, clamp(44px, 9.4vw, 156px), line-height 0.88): one per field. A script then shrinks each headline so its widest line fills the text column and, on wide screens, so the block stays under a set share of viewport height (34% to 50% depending on line count); it never goes below 34px. Without scripts the size falls back to clamp(40px, 7vw, 112px), balanced.
- **Title** (900, 62% width, uppercase, clamp(30px, 3.1vw, 46px), letter-spacing 0.03em): type on tape. Landmark tape runs smaller, clamp(22px, 2.2vw, 30px) at 0.04em; the closing TOP strip runs at headline scale, clamp(64px, 9.5vw, 150px).
- **Numeral** (900, 62% width, clamp(40px, 4.4vw, 62px), line-height 0.9, tabular): point values on the score sheet.
- **Lead** (450, clamp(1.125rem, 1.5vw, 1.4375rem), line-height 1.4, max 33ch): the one sentence under the opening headline.
- **Body** (450, clamp(1.0625rem, 1.35vw, 1.3125rem), line-height 1.45, max 34ch): one short paragraph per field. Narrow measure is deliberate; it reads as a caption beside wall-scale type.
- **Tag value** (600, 16px, line-height 1.38): the right-hand column of a route tag. Score-row names use 550 at clamp(1rem, 1.25vw, 1.1875rem).
- **Label** (800, 88% width, 11.5px, letter-spacing 0.12em, uppercase): the term column of a tag and the group names on the score sheet. This is the floor; nothing in the system is set smaller except the rail's own position readout at 11px.
- **Hand** (Shantell Sans 700, 20px, line-height 1.32, rotated -2deg): a setter's note at the foot of a tag or beside the parade. A few words, lowercase, no full stop.

### Named Rules
**The Two Widths Rule.** 62% width is for the wall: headlines, tape, numerals, the wordmark. Normal width is for reading. Do not set running text condensed, and do not set a headline at normal width.

**The Fill The Panel Rule.** A headline is sized by its column, not by a step on a scale. Break it into lines by hand so every line is roughly the same length, then let the widest line reach the column edge.

**The Accent Clearance Rule.** At 0.88 line-height, uppercase accents collide with the line above. Every line is masked with 0.15em of headroom so accents are not clipped, and a line carrying an accented capital is set about 0.105em lower than the rhythm, rather than loosening line-height for the whole block.

## Layout

The page is a single vertical run of full-bleed fields. Each field is at least 112svh tall (100svh for the first and last), vertically centred, with clamp(110px, 17vh, 190px) of top padding and a deeper bottom padding that leaves room for the next field's diagonal.

Inside a field there is one text column on the left and the pinned phone on the right. The column starts after the 76px rail plus a side margin of clamp(20px, 4.4vw, 72px), which grows on very wide screens so content never exceeds 1480px. The column's width is whatever remains after the phone and 1.2 gutters. The phone is min(74vh, 700px) tall (min(62vh, 560px) between 900px and 1180px) and sits vertically centred, sticky, for the length of the first seven fields.

Vertical rhythm inside a column is viewport-relative: clamp(20px, 3.2vh, 34px) between headline, sentence and action; clamp(28px, 4.4vh, 48px) before a tag. Headline, one paragraph, one object (tag, score sheet or parade): a field never carries more than that.

Fields meet on a diagonal. Each field after the first owns a triangular wedge 5vw tall that rises into the field above; fields 3, 5 and 7 slope the opposite way to their neighbours. On scroll the wedge arrives steep (2.3 times its height) and settles to 1 as the field takes the screen.

Below 900px the rail becomes a 56px ink bar across the top with the full wordmark, and the legend becomes a strip of eight colour segments under it that grow from 5px to 8px when passed and 14px when current. The pinned phone is replaced by one tilted screenshot per field, placed after the text. Fields lose their minimum height, the cut deepens to 8vw, and headlines run at 21vw (23vw for the opening) before fitting. With reduced motion the parade becomes a static grid and the pinned phone sits slightly lower with no travel.

## Elevation & Depth

Two layers only: the wall and what hangs on it. Fields, type, tape and the rail are flat and cast nothing. Objects that physically stand off the wall (the route tag, the phone, a tooltip label, the open language menu) cast one soft, tight, downward shadow in ink. Depth between fields comes from the diagonal cuts and from colour, not from shadow.

### Shadow Vocabulary
- **Tag** (`box-shadow: 0 18px 30px -18px rgba(20, 23, 28, .55)`): a laminated tag hanging just off the wall.
- **Tag hole** (`box-shadow: inset 0 2px 3px rgba(20, 23, 28, .35)`): the punched hole, showing the field colour behind it.
- **Phone** (`box-shadow: 0 34px 60px -30px rgba(20, 23, 28, .6), 0 0 0 1.5px rgba(244, 246, 248, .12) inset`): the device, with a faint inner edge so it separates from the black field.
- **Label** (`box-shadow: 0 10px 22px -10px rgba(20, 23, 28, .5)`): the legend tooltip.
- **Menu** (`box-shadow: 0 24px 48px -20px rgba(20, 23, 28, .6)`): the open language menu.

### Named Rules
**The Hung, Not Printed Rule.** If an element is an object on the wall it gets a tilt and may get a shadow. If it is printed on the wall it gets neither. Tape is the exception that proves it: stuck flat, so tilted but shadowless.

## Shapes

Three form families, each tied to a material. Laminate has soft corners: tags and menus at 12px, chips at 10px, tooltip labels and menu rows at 8px, legend squares at 7px. Tape has no radius at all; its ends are torn, drawn with an eight-point clip path that nicks each corner by 3 to 6 percent. The phone is the only large radius (46px body, 36px screen).

Nothing hung is level. Tags sit at 1.5 to 2 degrees either way, alternating field to field; landmark tape at -3 degrees; the action strip at -1.5 degrees, straightening on hover; the hand note at -2 degrees; the closing TOP strip at 5 degrees; the mobile screenshots at 2 to 3 degrees. Headlines, paragraphs and the score sheet are always square to the page.

Lines are few and heavy: a 2px ink rule under each score row, 2.5px outlines on unfilled legend squares, 1.5px hairlines inside a tag. Field boundaries are diagonal wedges, never horizontal rules. Icons are the two inline arrows (action and SALIDA) and the language chevron, drawn as round-capped strokes in the current text colour.

## Components

### Buttons
Actions are tape, not buttons: a strip torn off the roll and stuck at an angle.
- **Shape:** no radius; torn ends by clip path; rotated -1.5 degrees.
- **Primary (action tape):** Ink strip with Chalk type in the Title style and a trailing arrow, padding 0.62em 1em 0.52em 1.05em. On the black field it inverts to a Chalk strip with Ink type. One per field at most; the build uses it twice, at the start and at the top, both for the same destination.
- **Hover / Focus:** on hover the strip straightens to 0 degrees and lifts 3px over 0.45s while the arrow slides 6px; on press it drops back. On keyboard focus the torn clip is removed so the 3px focus ring (Ink, 4px offset; Chalk on dark surfaces) is fully visible.
- **Secondary (chip):** a small laminate pill fixed top right, 42px tall, 10px radius, Ink with Chalk type at 14px/700. Lifts 2px on hover. Inverts when the black field is current. Below 900px the action chip is Chalk on the ink bar and the language chip is bare Chalk type.

### Landmark tape
The same strip without a destination of its own: SALIDA at the first seam and TOP on the last field. Ink with Chalk type, rotated -3 degrees (TOP: 5 degrees, at headline scale, arriving with a single settle from -9 degrees). It names a place on the route; it is not a section label and does not sit above headlines.

### Route tag
The laminated card clipped to the start hold; it carries the rules of one move as term and value pairs.
- **Corner Style:** 12px.
- **Background:** Chalk, with Ink type, on any field.
- **Shadow Strategy:** the Tag shadow; see Elevation & Depth.
- **Border:** none. Rows are separated by 1.5px Ink hairlines at 16%.
- **Internal Padding:** 20px 26px 20px 58px; the wide left padding holds an 18px punched hole showing the field colour and an 8px by 42px ink clip leaning 7 degrees out of the top edge.
- **Content:** two-column rows (Label, Tag value), three or four rows, optionally closed by one Hand note. Width between 360px and 460px.
- **Motion:** swings to rest from its clip point: 9 degrees of rotation and 26px of travel over 1.2s, once.

### Score sheet
The points table of the yellow field: group names in the Label style, rows of a name on the left and a Numeral on the right, each row closed by a 2px Ink rule. Max width 520px. Numerals count up once on entry and are tabular so they do not shift.

### Navigation
The legend rail: a fixed 76px Ink column holding the single-letter mark with a dot in the current field's colour, eight 24px squares, and a vertical readout of the current field and level. A square is an outline in its circuit colour until its field has been reached, then filled; the current square scales to 1.34. Hover or focus shows a Chalk label to the right with the circuit name in bold caps and what the field covers. The rail is the page's only navigation and its progress indicator at once.

### Language menu
A Chalk popover under the language chip: 12px radius, 6px padding, rows at 15px/600 with the language code in small caps at 55% opacity. Hover washes a row in Ink at 8%; the selected row is solid Ink with Chalk type. Opens with a 6px drop and fade.

### Pinned phone
An Ink body (46px radius, 10px bezel) around a 393:852 screen (36px radius) showing real app captures only. It starts tilted 6.5 degrees on the first field, straightens as the first field leaves, then leans 1.6 degrees one way or the other per field while the screen cross-fades (0.5s opacity, 0.8s settle from 4% lower and 1.02 scale). Crux stands on its top edge on the first field and fades as the climb begins.

### Crux parade
A single row of live Crux figures in different skins that travels sideways with scroll across the purple field; each responds to a tap. With reduced motion it is a static grid.

## Do's and Don'ts

### Do:
- **Do** give each new idea the next field in circuit order and print it in Ink (#14171C); on Negro, print in Chalk.
- **Do** size headlines to fill their column, in hand-broken lines of similar length, uppercase, Archivo 900 at 62% width, line-height 0.88.
- **Do** keep a field to headline, one paragraph of at most 34ch, and one object.
- **Do** put facts in a route tag as term and value rows, and numbers that matter in Numeral style on a ruled row.
- **Do** tilt anything hung on the wall by 1.5 to 3 degrees and alternate the direction field to field; keep printed type level.
- **Do** use one easing for everything, cubic-bezier(.16, 1, .3, 1), and let entrances play once.
- **Do** keep every state visible without scripts or motion: content is laid out and readable first, and animation only removes an offset.
- **Do** show the app with real captures inside the Ink device, and Crux as the live figure.

### Don't:
- **Don't** set Chalk type directly on fields 2 to 7; it fails contrast on every one of them.
- **Don't** use a field colour as a text colour, button fill or outline on another field. The legend square and the tag hole are the only places a field colour appears off its own field.
- **Don't** introduce a ninth hue or reorder the eight.
- **Don't** separate fields with a horizontal edge or a rule; they meet on the diagonal.
- **Don't** put a shadow under type, tape or a field. Shadows belong to the tag, the phone and popovers.
- **Don't** round the ends of tape or square the corners of laminate.
- **Don't** use bounce, overshoot or shake in any motion.
- **Don't** set running text at 62% width, or labels below 11.5px.

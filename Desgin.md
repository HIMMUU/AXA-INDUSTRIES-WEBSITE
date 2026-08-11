# Design System
Version 1.0

Theme:
Luxury Pink SaaS

Primary Inspiration:
https://www.dropship.io/

DO NOT COPY.
Only use layout inspiration.

Everything must be redesigned with premium pink branding.

---

# Overall Feel

Website should feel like:

- Apple
- Linear
- Arc Browser
- Raycast
- Stripe
- Vercel
- Framer

NOT corporate.

NOT bootstrap.

NOT template.

Every section should feel alive.

Every hover should have purpose.

Every animation should feel natural.

---

# Color Palette

Primary Pink

#FF2D92

Primary Hover

#FF5BB4

Primary Gradient

#FF2D92
↓

#FF66C4

Dark Background

#050505

Secondary Background

#0D0D0D

Card

#121212

Border

rgba(255,255,255,.08)

Text

Primary
#FFFFFF

Secondary
#CFCFCF

Muted
#8F8F8F

Success

#37D67A

Danger

#FF5454

Warning

#FFC857

Glow

rgba(255,45,146,.35)

---

# Typography

Font

Satoshi

Fallback

Inter

Heading

700

Body

400

Large Headline

72px

Desktop

56px

Tablet

44px

Mobile

34px

Body

18px

Small

15px

Letter spacing

-2%

Line height

1.2

---

# Layout

Container

1280px

Section spacing

140px

Mobile

80px

Grid

12 Columns

Gap

32px

Radius

24px

Card Radius

22px

Button Radius

16px

Input Radius

16px

---

# Shadows

Small

0 8px 20px rgba(0,0,0,.18)

Medium

0 20px 50px rgba(0,0,0,.30)

Large

0 35px 80px rgba(0,0,0,.45)

Glow

0 0 40px rgba(255,45,146,.28)

---

# Glass Effect

backdrop-filter

blur(16px)

background

rgba(255,255,255,.04)

border

1px solid rgba(255,255,255,.08)

---

# Navigation

Transparent

On scroll

Blur

Dark glass

Shrink

96px

↓

74px

Logo scales

100%

↓

92%

Links fade

Hover underline animation

CTA

Pink gradient button

Hover

Glow

Lift

2px

---

# Hero

Structure

Announcement pill

↓

Headline

↓

Description

↓

Buttons

↓

Dashboard Mockup

↓

Floating cards

Background

Dark radial gradient

Pink ambient glow

Animated grid

Noise overlay

---

Headline Animation

Word stagger

Each word

70ms delay

Opacity

0→1

TranslateY

40px

↓

0

Duration

800ms

Ease

spring

---

Buttons

Hover

Scale

1

↓

1.05

Glow increases

Shadow grows

Click

Scale

0.97

---

Dashboard

Float animation

Y

0

↓

-12

↓

0

Duration

6s

Infinite

Ease

easeInOut

---

Floating Cards

Rotate

-2°

↓

2°

Move

10px

Delay

Random

Loop

---

Background Gradient

Move slowly

30s

Infinite

---

Mouse Parallax

Cards

Logo

Glow

Move according to cursor

Maximum

18px

---

# Logos Section

Infinite marquee

No visible jump

Pause

Hover

Speed

Desktop

80s

Mobile

45s

Opacity

0.8

Hover

1

---

# Feature Cards

Grid

3

Desktop

2

Tablet

1

Mobile

Hover

TranslateY

-10px

Scale

1.02

Border

Pink

Shadow

Glow

Icon rotates

6°

Background

Slight gradient

---

Card Entry

Fade

+

TranslateY

40px

↓

0

Delay

80ms

---

# Dashboard Showcase

Macbook frame

Floating

Glass cards

Charts animate

Numbers count

Progress bars grow

Graphs draw

Screen reflections

Mouse tilt

Maximum

6°

---

# Tabs

Animated underline

Pink gradient

Content fades

Old

↓

New

300ms

---

# Pricing

Cards

3

Center highlighted

Scale

1.06

Pink border

Glow

Ribbon

Most Popular

Hover

Entire card lifts

Buttons animate

---

Toggle

Monthly

Yearly

Sliding pill

Spring animation

---

FAQ

Accordion

Height animation

Chevron rotates

180°

Content fades

Duration

350ms

---

Testimonials

Infinite slider

Pause

Hover

Cards scale

1.02

Avatar glow

Pink

---

CTA Section

Large gradient

Animated blobs

Floating particles

Button pulse

Every

3s

---

Footer

Simple

Dark

Columns

Social icons

Hover

Rotate

8°

Scale

1.15

---

Animations

Library

Framer Motion

Preferred

or

GSAP

Only for

complex sequences

Never use AOS.

Never use Animate.css.

---

Animation Timing

Tiny

150ms

Small

220ms

Medium

350ms

Large

700ms

Hero

900ms

---

Easing

spring

Default

Stiffness

140

Damping

18

---

Hover Rules

Every clickable element

must have

Hover

Active

Focus

Disabled

states

No dead UI.

---

Buttons

Primary

Pink Gradient

Hover

Glow

Scale

1.05

Shadow

Increase

Active

Scale

0.97

---

Inputs

Border

Gray

Focus

Pink glow

Placeholder

Muted

---

Icons

Lucide Icons

Stroke

1.75

Hover

Rotate

Scale

---

Loading States

Skeletons

Animated shimmer

Buttons

Spinner

Cards

Pulse

Charts

Draw animation

---

Scroll Animations

Intersection Observer

Threshold

20%

Never replay repeatedly.

Animate once.

---

Performance

Images

WebP

AVIF

Lazy Load

Motion

GPU accelerated

Transform only

Avoid

Layout thrashing

---

Accessibility

Contrast

WCAG AA

Keyboard navigation

Visible focus ring

Reduced motion

Support

ARIA labels

Required

---

Responsive

Desktop

1440+

Laptop

1280

Tablet

1024

Small Tablet

768

Mobile

480

Small Mobile

360

---

Background

Noise texture

Very subtle

Radial gradients

Animated pink orbs

Grid pattern

Opacity

4%

---

Cursor Effects

Large buttons

Glow follows cursor

Cards

Tiny tilt

Mouse leave

Smooth reset

---

Micro Interactions

Checkbox

Bounce

Switch

Spring

Tabs

Slide

Links

Underline grows

Cards

Border glows

Icons

Rotate

Buttons

Ripple

Badges

Pulse

Charts

Animate

Counters

Count Up

Tooltips

Fade

Dropdown

Scale + Fade

---

Images

Rounded

24px

Shadow

Large

Hover

Zoom

1.03

---

Spacing Scale

4

8

12

16

20

24

32

40

48

64

80

120

160

---

Component Rules

Never use sharp corners.

Never use plain borders.

Every component must have depth.

Every section must have breathing room.

Never overcrowd.

Never use bright blue.

Pink is the primary accent everywhere.

---

Developer Notes

Framework

Next.js 15

React 19

TailwindCSS 4

Framer Motion

Lucide React

shadcn/ui

React Hook Form

TanStack Query

Zod

TypeScript

Code Quality

Reusable components only.

No duplicated code.

Animation variants reusable.

Strict responsive design.

Pixel-perfect alignment.

Maintain 60fps animations.

No CLS.

Lighthouse Performance >95.

# GBP optimization & cutover checklist

For Atilla at A&A Flooring. Walk this top-to-bottom before flipping DNS to the new site, then revisit weekly for the first month.

## 1. Google Business Profile (GBP)

GBP outranks the website itself for "flooring near me" searches. This is the highest-leverage hour you can spend.

### Profile completeness
- [ ] Sign in at https://business.google.com → A&A Flooring listing
- [ ] **Primary category:** `Flooring contractor`
- [ ] **Secondary categories** (add all that apply):
  - Hardwood floor refinisher (if you offer refinishing)
  - Wood and laminate flooring supplier
  - Floor sanding and polishing service
  - Stair contractor
- [ ] **Description:** ~700 chars, includes "Coquitlam," "hardwood," "vinyl," "laminate," "stairs," "Lower Mainland"
- [ ] **Service area:** Add Coquitlam, Port Moody, Port Coquitlam, Burnaby, New Westminster, Vancouver, Maple Ridge, Surrey
- [ ] **Hours:** Match the hours on the new site exactly (the schema on the site reads the same source, so any mismatch is a red flag to Google)
- [ ] **Phone:** `(778) 881-3604` — must match the website footer character-for-character
- [ ] **Website:** `https://aa-flooring.ca` (no `www.`, no trailing slash)
- [ ] **Appointment URL:** `https://aa-flooring.ca/contact`

### Services
Add each as a discrete service entry with a short blurb:
- [ ] Hardwood Flooring Installation
- [ ] Vinyl & Laminate Installation
- [ ] Custom Stair Treads & Risers
- [ ] Custom Flooring Trim & Accessories
- [ ] (Optional) Hardwood Refinishing — if offered

### Photos
GBP listings with 100+ photos consistently outrank those with under 20.
- [ ] Logo (square, transparent or white background)
- [ ] Cover photo (a hero install shot — wide aspect)
- [ ] Exterior of the Coquitlam shop (3-5 angles)
- [ ] Interior of the shop / showroom
- [ ] **At least 20 project photos**, organized by type:
  - Hardwood (≥ 8)
  - Vinyl/laminate (≥ 5)
  - Stair work (≥ 5)
  - Custom trim/accessories (≥ 3)
- [ ] Team photos (Atilla + crew, with consent)
- [ ] Before/after pairs — Google explicitly surfaces these

Set a recurring reminder: upload 2-3 photos a week. GBP rewards activity.

### Posts
- [ ] Make a "Welcome / What's New" post the day the new site launches
- [ ] Post once a week thereafter. Don't overthink it — a project photo + 1 sentence is enough.

### Q&A
- [ ] Pre-seed 5-7 common questions yourself ("Do you do basements?", "Can you match existing trim?", etc.) and answer them. This blocks competitors and spammers from owning that surface.

### Reviews
- [ ] Get at least 5 new Google reviews in the first month after launch — text every recently completed customer the GBP review link
- [ ] Respond to every review (positive or negative) within 48h. Even "Thanks Sarah, glad you love it!" counts.

---

## 2. NAP consistency sweep

NAP = Name, Address, Phone. Mismatches across the web confuse Google's local algorithm. Audit and fix the following:

- [ ] **Yelp** — https://www.yelp.ca (claim if not yet)
- [ ] **YellowPages.ca**
- [ ] **HomeStars** — flooring contractors live and die here in BC
- [ ] **BBB** (Better Business Bureau) — accreditation is optional but the listing isn't
- [ ] **Houzz** — surprisingly strong for flooring searches
- [ ] **Bing Places**
- [ ] **Apple Maps** (Apple Business Connect)
- [ ] **Facebook page** (already exists at facebook.com/aa.flooring.ca)
- [ ] **Instagram bio** — link to `aa-flooring.ca`, not the old Tilda URL

For each: confirm the address is exactly `629 Smith Ave, Coquitlam, BC V3J 2W5` and the phone is `(778) 881-3604`. No "Avenue" vs "Ave" mixing — pick one and stick to it. The site uses `Ave`.

---

## 3. New site launch sequence

### Pre-flight (before DNS change)
- [ ] Production deploy live on `aa-flooring.vercel.app` and reviewed end-to-end
- [ ] Phone/email links work on mobile (test on a real phone)
- [ ] Quote form delivers a real email to `anaflooringltd@gmail.com` (not just the dashboard)
- [ ] All 16 service-city pages render with no Lorem
- [ ] At least one real project photo in `/portfolio` with before/after
- [ ] Lighthouse: Performance / SEO / Accessibility all ≥ 95 on mobile
- [ ] Schema markup validates at https://search.google.com/test/rich-results
- [ ] OG image renders correctly when the URL is shared on Slack/iMessage/Facebook

### Cutover
1. [ ] In Vercel, add the production domain `aa-flooring.ca`
2. [ ] In your DNS provider, point `A` and `AAAA` records (or `ALIAS`/`ANAME`) to Vercel
3. [ ] Wait for SSL provisioning to complete (usually < 5 min)
4. [ ] Visit `https://aa-flooring.ca` in an incognito window — verify SSL padlock
5. [ ] Tilda site goes dark (or unpublish in the Tilda dashboard)

### Post-cutover (first 24h)
- [ ] In Google Search Console (https://search.google.com/search-console):
  - [ ] Add property `https://aa-flooring.ca` if not already
  - [ ] Submit sitemap `https://aa-flooring.ca/sitemap.xml`
  - [ ] Use the URL Inspection tool on the homepage and click "Request Indexing"
- [ ] In Bing Webmaster Tools (https://www.bing.com/webmasters): same — submit sitemap
- [ ] Update GBP website URL if it changed
- [ ] Update Instagram + Facebook bio links

### First month
- [ ] Watch GSC Coverage report weekly. Any unexpected `Crawled - currently not indexed` count should stay under 5
- [ ] Check Vercel Analytics for any 404s — fix or redirect
- [ ] Add 2-3 GBP photos per week
- [ ] Aim for 5+ new Google reviews

---

## 4. Quick reference — env vars to set in Vercel

```
NEXT_PUBLIC_SITE_URL=https://aa-flooring.ca
NEXT_PUBLIC_SANITY_PROJECT_ID=<from sanity.io/manage>
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=<from resend.com>
QUOTE_RECIPIENT_EMAIL=anaflooringltd@gmail.com
QUOTE_FROM_EMAIL=quotes@aa-flooring.ca   # requires DNS verification in Resend
GOOGLE_PLACES_API_KEY=<optional, for live reviews on /reviews>
GOOGLE_PLACE_ID=<optional, lookup at https://developers.google.com/maps/documentation/places/web-service/place-id>
RECAPTCHA_SECRET_KEY=<optional, for spam protection on quote form>
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<optional, paired with above>
```

---

## 4b. Activate the quote form (one-time, takes 30 seconds)

The website's quote form posts to **Formsubmit.co**, which forwards every submission to `anaflooringltd@gmail.com`. No account, no signup, no API key.

**First-time activation:**
1. Submit a test quote on the live site (any page with a form, e.g. https://aa-flooring.ca/contact/)
2. Atilla receives an email from Formsubmit with subject "Confirm your email address"
3. Click the **Activate** button in that email
4. Done — every future submission now arrives directly in the inbox with no extra step

Until activation is complete, submissions don't reach the inbox. So do this on day one of the cutover.

---

## 5. Things the friend still needs to provide

- [ ] Logo files (SVG preferred, fallback PNG)
- [ ] Brand colour preference (current placeholder is warm cream + walnut accent)
- [ ] 20-40 high-res project photos, ideally with city tags + before/after pairs
- [ ] Brand list (manufacturers carried — e.g. Mercier, Kentwood, COREtec, Mannington)
- [ ] Confirmed business hours
- [ ] Warranty / guarantee statement (1-2 paragraphs)
- [ ] Permission to pull Google reviews (or a Place ID + API key)
- [ ] Optional: founder bio + photo for the About page

Without the photos especially, the portfolio looks empty. Get the first batch of 6-10 in before launch.

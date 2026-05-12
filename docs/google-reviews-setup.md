# Live Google Reviews — one-time setup

The homepage and `/reviews` page render whatever is in `src/data/google-reviews.json`. On every push to `main`, the GitHub Actions workflow fetches fresh reviews from Google **before** running `next build`. When the two secrets below are set, real reviews appear; without them, the site falls back to the three seeded testimonials.

**Time to set up: about 10 minutes. One-time. Free under normal traffic.**

---

## 1. Find the Place ID

The Place ID is a stable identifier for the A&A Flooring Accessories Google Business listing. It looks like `ChIJN1t_tDeuEmsRUsoyG83frY4`.

1. Go to **https://developers.google.com/maps/documentation/places/web-service/place-id**
2. Scroll to the "Place ID Finder" widget
3. Type `A&A Flooring Accessories Coquitlam` (or the address `629 Smith Ave, Coquitlam`)
4. Click the listing in the dropdown
5. Copy the Place ID shown on the marker (starts with `ChIJ`)

Keep that string handy.

## 2. Create a Google Cloud project + API key

1. Go to **https://console.cloud.google.com/**
2. Sign in with the Google account that owns the GBP listing (`anaflooringltd@gmail.com`)
3. Top bar → project dropdown → **New Project** → name it `aa-flooring-site` → Create
4. Once created, make sure that project is selected in the top bar
5. In the search bar at the top, type **Places API (New)** and click it
6. Click **Enable**
7. Left sidebar → **APIs & Services** → **Credentials**
8. Click **+ Create Credentials** → **API key**
9. Copy the API key shown (also keep it handy)
10. Click the just-created key → **Edit API key**
    - Under "API restrictions" → **Restrict key** → check **Places API (New)** only
    - Click **Save**

Google gives all new accounts a **$200/month credit** for Maps Platform usage. The site rebuilds once per push (a few times a week at most) and each rebuild costs one Places Details call (about $0.017). The free credit covers ~11,000 calls. You will not be charged.

## 3. Add the two GitHub secrets

1. Go to https://github.com/dimoobraznii1986/aa-flooring/settings/secrets/actions
2. Click **New repository secret**
3. Name: `GOOGLE_PLACES_API_KEY` · Value: paste the API key · **Add secret**
4. Click **New repository secret** again
5. Name: `GOOGLE_PLACE_ID` · Value: paste the Place ID (the `ChIJ...` string) · **Add secret**

## 4. Trigger a rebuild

Either push any commit to `main`, or go to the **Actions** tab → **Deploy to GitHub Pages** workflow → **Run workflow** button.

Within ~2 minutes the live site shows:
- A "Customer reviews" section on the homepage with the 3 most-recent Google reviews
- The overall rating ("4.9 on Google") with the total rating count
- The full `/reviews` page populated with up to 5 Google reviews (Places API hard cap)

## 5. Verifying

After the workflow completes, check the deploy log for a line like:

```
[google-reviews] wrote 5 review(s) (overall rating 4.9 from 47 ratings) → src/data/google-reviews.json
```

If you see `GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set — skipping`, one of the secrets is missing or misnamed.

---

## Notes

- **The Places API returns up to 5 reviews.** Google's terms forbid storing more or making them permanent. The build re-fetches every push, so this is fine — and the cache is rebuilt fresh each deploy.
- **No PII is logged.** The script only writes review text, author display name, and the public author-photo URL.
- **If the API call fails**, the build does not break — the script logs the error and the previous JSON (or empty fallback) is used.
- **To refresh manually without a push**, go to the Actions tab and click "Run workflow" on the Deploy job. Or set the env vars locally and run `node scripts/fetch-google-reviews.mjs` — but the result won't deploy unless committed.

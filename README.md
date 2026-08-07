# CloudSavings — Cloudways Affiliate Site (Starter Build)

Production-ready static site starter, structured for GitHub Pages. Built as plain HTML/CSS/JS (no build step required) so it deploys as-is. This README covers site architecture, what's included, what you still need to fill in, and every technical-SEO item from the brief (IndexNow, Search Console, sitemap strategy, structured data, AI-search optimization, roadmap).

Your Cloudways referral link (`https://www.cloudways.com/en/?id=2192727`) is wired into every CTA, the homepage, and the promo-code page, and is disclosed — not called an "official coupon" — per FTC/Google guidance.

---

## 1. What's in this build

```
/
├── index.html                        Homepage
├── robots.txt
├── sitemap.xml
├── manifest.json
├── README.md                         (this file)
├── content-roadmap.md                100-page topical roadmap + keyword map
├── .github/workflows/indexnow.yml    Auto-ping Bing/IndexNow on publish
├── assets/
│   ├── css/style.css                 Full design system (single stylesheet)
│   ├── js/main.js                    Mobile nav + copy-to-clipboard
│   └── img/favicon.svg
├── cloudways/
│   ├── promo-code/index.html         Pillar/money page (heaviest internal linking)
│   ├── pricing/index.html            Pricing table, hub for the pricing cluster
│   ├── login/index.html              Navigational intent
│   ├── wordpress/index.html          WordPress/WooCommerce cluster page
│   ├── vs-hostinger/index.html       Comparison page (template for other "vs" pages)
│   └── free-trial/index.html
├── blog/
│   ├── index.html                    Blog hub
│   └── cloudways-review/index.html   Full review — reusable article template
├── about/index.html                  E-E-A-T: who writes this, methodology
├── contact/index.html
├── affiliate-disclosure/index.html   FTC-style disclosure, explains referral ID
├── editorial-policy/index.html       Fact-checking / no-fake-reviews policy
└── privacy-policy/index.html         Placeholder — needs legal review
```

10 live pages instead of the full 100 were built out as **real, launch-ready templates** — one per page type in the brief (pillar, hub, comparison, cluster, blog article, trust pages). `content-roadmap.md` gives you the full 100-page plan with keyword mapping so you (or a writer) can produce the rest against a consistent structure. This is a deliberate scoping choice: 100 genuinely good pages isn't something to mass-generate in one pass without becoming thin/templated content, which would work against your rankings, not for them.

---

## 2. Site architecture (topical silo)

```
Home
├── /cloudways/ (hub — pricing page currently serves this role)
│   ├── promo-code/        ← money page, most internal links point here
│   ├── pricing/
│   ├── login/
│   ├── wordpress/
│   │     └── (future: woocommerce/, migration/, staging/, performance/)
│   ├── vs-hostinger/
│   │     └── (future: vs-digitalocean/, vs-vultr/, vs-aws/, vs-google-cloud/)
│   └── free-trial/
├── /blog/  (supporting cluster content, dated articles)
│   └── cloudways-review/
├── /about/, /contact/, /editorial-policy/, /affiliate-disclosure/, /privacy-policy/
```

**Internal linking rules applied throughout:**
- Every page links up to its parent hub (breadcrumbs) and back to Home.
- Every page links sideways to 2–4 related cluster pages ("Related" section).
- **`/cloudways/promo-code/` receives a contextual link from every other page** (nav bar CTA, homepage hero + terminal widget, footer, and inline mentions on pricing/comparison/WordPress/free-trial pages) — this is what should make it the strongest page on the site, per the brief.
- Footer repeats the full primary nav sitewide (consistent PageRank flow + crawlability).
- Comparison and blog pages link back into the pricing and promo-code pages as the natural "next step."

---

## 3. Deploying to GitHub Pages

1. Create a new GitHub repo, push everything in this folder to the root of the `main` branch (or `/docs` if you prefer — adjust Pages settings accordingly).
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
3. If using a custom domain, add a `CNAME` file at the root containing just your domain, and configure DNS (A records to GitHub's IPs, or a CNAME record if using a subdomain).
4. **This build is already configured for `https://rafi10merch-alt.github.io/cloudways-promo-code/`** — every internal link, the canonical/og URLs, `manifest.json`, `robots.txt`, `sitemap.xml`, and the IndexNow workflow's `HOST`/`BASE_PATH` variables are set to that repo's project-page path. If you ever rename the repo to exactly `rafi10merch-alt.github.io` (making it a user page served at the domain root instead of a subpath), you'll need to strip the `/cloudways-promo-code` prefix from all of the above.

GitHub Pages serves everything over HTTPS automatically once a domain is configured — no separate SSL step needed.

---

## 4. IndexNow (Bing + partners) on GitHub Pages

1. Generate a key: any random hex string, e.g. `openssl rand -hex 16`.
2. Create a file at your site root named `<that-key>.txt` containing just the key itself (this proves ownership to IndexNow).
3. In your GitHub repo: Settings → Secrets and variables → Actions → New repository secret named `INDEXNOW_KEY`, value = the same key.
4. The included `.github/workflows/indexnow.yml` pings `api.indexnow.org` with any changed HTML files on every push to `main`. Edit the `HOST` value in that file to your real domain first.
5. **Cloudflare Worker alternative** (if you front GitHub Pages with Cloudflare): write a Worker bound to a cron trigger or a webhook route that POSTs the same JSON payload to `https://api.indexnow.org/indexnow`; this avoids depending on GitHub Actions entirely and lets you fire on Cloudflare cache-purge events instead.
6. Submit your key file URL once in Bing Webmaster Tools (see below) to confirm the association.

---

## 5. Google Search Console

1. Property type: use a **Domain property** if you can verify via DNS (covers all subdomains/protocols); otherwise a URL-prefix property with an HTML file or meta-tag verification works fine on GitHub Pages.
2. Submit `https://yourdomain.com/sitemap.xml` under Sitemaps.
3. **Coverage**: watch for "Discovered — not indexed" on new cluster pages; usually resolves once internal links from the promo-code/pricing hubs reach them (already wired in this build).
4. **Performance**: filter by query to find which secondary keywords (e.g. "cloudways $100 credit," "cloudways premium vs standard") are already getting impressions — turn those into blog cluster pages first, since they're proven demand.
5. **URL Inspection**: use "Request indexing" only for genuinely new/updated pages, not as a blanket habit.
6. **Core Web Vitals** report: field data takes ~28 days to populate after launch; use PageSpeed Insights / Lighthouse for lab data in the meantime (see §9).

---

## 6. Bing Webmaster Tools

1. Add your site (you can import directly from Google Search Console to save re-verifying).
2. Submit the same `sitemap.xml`.
3. Confirm your IndexNow key file is reachable at `/​<key>.txt`.
4. Bing Copilot draws heavily on Bing's index plus Bing's own answer-snippet extraction — clean heading structure, FAQ schema, and concise direct-answer opening sentences (as used on the promo-code and pricing pages) help here.

---

## 7. Structured data included

- **Organization** + **WebSite** with `SearchAction` — homepage.
- **BreadcrumbList** — every inner page.
- **FAQPage** — promo-code page (matches the visible `<details>` FAQ exactly; don't let these drift out of sync, Google penalizes mismatched FAQ schema).
- **Article** — blog review page, with `datePublished`/`dateModified` and an `author` object (E-E-A-T signal).
- Add **Review**/aggregate rating schema **only** if you implement genuine, verifiable user reviews — the brief explicitly rules out fabricated ratings, and so does this build.

---

## 8. AI search optimization (AI Overviews, Copilot, Perplexity, etc.)

Applied across the built pages:
- Each pillar/cluster page opens with a **direct, quotable answer** in the first 1–2 sentences before elaborating (e.g. promo-code page: "Cloudways doesn't run a public...").
- FAQ sections use literal question phrasing matching real search queries, each answered in a self-contained paragraph (extractable without surrounding context).
- Entities are named explicitly and consistently (Cloudways, DigitalOcean, Vultr, AWS, Google Cloud, Hostinger, WooCommerce, Redis, Breeze) rather than referred to vaguely — this is what lets AI answer engines and Google's entity graph associate your page with the topic.
- Claims about pricing/specs are hedged with "confirm on the provider's current pricing page" rather than stated as permanent fact — this is both good practice for AI-summarization accuracy and protects you from stale-data complaints.

---

## 9. Page speed & Core Web Vitals

Already in this build:
- Single stylesheet, no framework/JS bundle, no render-blocking scripts (script tag is at end of body).
- System font fallbacks specified alongside the Google Fonts imports so text renders immediately (avoids invisible-text flash contributing to CLS).
- No layout-shifting ad slots or lazy-loaded above-the-fold content.

Before launch, still do:
- Convert any real screenshots/photos you add to WebP/AVIF and set explicit `width`/`height` attributes (prevents CLS).
- Add `loading="lazy"` to any below-the-fold `<img>` tags you add.
- Consider self-hosting the Google Fonts files (via `font-display: swap`, already achievable by adding that to `@font-face` if you self-host) to shave a DNS/connection hop — currently using the Google Fonts CDN for simplicity.
- Run Lighthouse/PageSpeed Insights after adding real images and fix whatever it flags; targets: **LCP < 2.5s, CLS < 0.1, INP < 200ms**.

---

## 10. Accessibility (WCAG)

Already in this build: skip-to-content link, visible focus states (`:focus-visible`), semantic heading order, `aria-label`s on nav regions, `aria-current="page"` on breadcrumbs, `aria-expanded` on the mobile menu toggle, `prefers-reduced-motion` respected, color contrast chosen at AA level for body text on both light and navy backgrounds. Still worth a manual pass with a screen reader and the axe DevTools extension once real content/images are finalized.

---

## 11. Security headers

GitHub Pages doesn't let you set custom HTTP headers directly. Two options:
- **Cloudflare in front of GitHub Pages** (free tier): add Transform Rules or a Worker to inject `Content-Security-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-Content-Type-Options: nosniff`.
- **Netlify/Vercel instead of raw GitHub Pages** if you want header control natively via a `_headers` file, while keeping the repo on GitHub.

---

## 12. Analytics

Add one of: Google Analytics 4, Plausible, or Microsoft Clarity (session recordings pair well with Clarity specifically for a conversion-focused affiliate page). Wire up both Google Search Console and Bing Webmaster Tools regardless of which analytics tool you pick — this build doesn't include a tracking snippet by default so you can choose without ripping one out later.

---

## 13. Link building (white-hat only, per brief)

- Original research: run and publish real uptime/response-time monitoring on your own Cloudways instance over a few months — this is genuinely linkable data nobody else has.
- Digital PR: pitch the Cloudways vs Hostinger real-cost breakdown to hosting-comparison roundups and dev-tool newsletters.
- Resource-page outreach: many "best WordPress hosts" resource lists accept suggestions — pitch the review page once it has real testing behind it.
- Guest posts on legitimate web-dev/agency blogs, linking back to the WordPress or pricing cluster page contextually.
- Do **not**: PBNs, paid link placements without `rel="sponsored"`, link exchanges at scale, or comment/forum spam — all against Google's spam policies and would put this whole build at risk.

---

## 14. Honesty guardrails already built in (don't remove)

- No fabricated reviews, ratings, or testimonials anywhere.
- The referral link is labeled "referral link," never "promo code" or "coupon," in every place it's described in prose.
- Pricing figures are marked as estimates with a pointer to check the live Cloudways pricing page.
- The affiliate disclosure appears both sitewide (footer) and inline on the two pages closest to the CTA (homepage, promo-code page).

If you later get an actual Cloudways-issued discount code (as opposed to referral credit), update the promo-code page's copy and FAQ schema together — don't let them drift out of sync.

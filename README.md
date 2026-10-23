# Verifi website

Static recreation of [the original Verifi Wix website](https://markoueis.wixsite.com/verifi), hosted on GitHub Pages. Final domain: **getverifi.ca**.

## Local development

Requires Node.js 22 or newer. No dependencies or installation are needed.

```sh
npm run dev
npm run check
npm run build
```

Open http://127.0.0.1:4173. The build writes only public website files to `dist/`.

## Deployment

Pushes to `main` run `.github/workflows/pages.yml`, check and build the site, then deploy `dist/` to GitHub Pages. In repository Settings → Pages, the build source must be **GitHub Actions**.

All asset paths are relative so the site works both at the GitHub Pages repository URL and at the custom domain. The canonical URL, sitemap, and social metadata use the final domain.

## Custom domain cutover

DNS was hosted at Wix (`ns0.wixdns.net` / `ns1.wixdns.net`) when checked on 2026-10-23. Configure **getverifi.ca** under repository Settings → Pages → Custom domain, then replace the Wix apex A records with:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | verixa.github.io |

Remove conflicting apex A/AAAA records and the old `www` record. Keep mail (MX), email authentication (TXT), and other unrelated records unchanged. If using IPv6, use GitHub's four documented AAAA records. After DNS propagation and GitHub certificate issuance, enable **Enforce HTTPS** in Pages settings.

GitHub Actions deployments do not use a CNAME file; the custom domain is set in repository Pages settings. See [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Demo requests

The form is intentionally a **preview only**: it performs validation and explains that nothing was sent or saved. It does not transmit data, use local storage, or pretend a request was received. The email link is `info@getverifi.ca`, matching the displayed address on the original site (whose underlying link incorrectly used another address).

To activate requests, replace the submit handler in `app.js` with a form service integration (for example, Formspree) or a serverless endpoint and update the disclosure and button text in `index.html`. GitHub Pages cannot run server-side email code. Keep any private mail API credentials on the server.

## Content and assets

The original logo, dashboard screenshot, office photo, video posters, Canada flag, and four MP4s were migrated from the Wix page's public `static.wixstatic.com` / `video.wixstatic.com` assets. They are served locally; the website does not load Wix scripts or widgets. Raleway is self-hosted with its SIL Open Font License in `assets/Raleway-OFL.txt`. Original product copy, pricing, and the visible customer testimonial were retained with minor grammar and formatting corrections. Chat and template Wix social links were omitted. The layout adapts to mobile, and reduced-motion preferences pause the background video.

The logo, product images, videos, copy, and customer testimonial remain the property of their respective owners; no new license to those assets is granted by this repository.

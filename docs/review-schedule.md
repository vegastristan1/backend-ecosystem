# Review schedule

Every guide is re-reviewed every **6 months**, measured from its `lastReviewed` field (approved in [decisions.md](decisions.md): a published guide whose `lastReviewed` is older than six months drops back to `review` status).

## What a review covers

- **Content** — re-read the guide against its sources; fix outdated claims, tool names, and examples.
- **Sources** — open every source link; confirm it still resolves and is still official documentation or a vendor blog.
- **Record it** — set `lastReviewed` to today's date in the guide file (`src/content/<guide>.ts`).

## Checking what is due

```sh
npm run reviews
```

This reads `lastReviewed` from every guide registered in `src/content/guides.ts`, applies the 6-month cadence, and prints `on track` or `OVERDUE` per guide. It exits non-zero when any review is overdue, so it can gate CI later. Set `REVIEWS_TODAY=2027-05-01` to preview a future date.

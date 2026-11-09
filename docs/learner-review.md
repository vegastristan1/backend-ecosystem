# Learner review script (Phase 6)

For each learner (~15 minutes). Watch, don't help. Record where they hesitate,
misread, or say "I don't get it" — those notes feed TODO Phase 6 items 5–7.

## Setup

- Send them to the deployed site or `npm run preview` locally.
- No briefing beyond: "This is a learning site about backend systems. Please
  think aloud as you use it."

## Task 1 — Find and understand (maps to success criteria 1, 4)

> "You've heard Redis can make repeated reads faster. Find the guide for that
  and tell me in your own words what it does and when you'd use it."

Watch for: do they use Search with that phrasing? Do they land on
**Caching with Redis**? Can they say the concept (caching) comes before the
tool (Redis)?

## Task 2 — Trace the request (success criteria 2, 3)

> "Start at the home page and follow one order request through the system.
  After each step, tell me what that part is doing."

Watch for: do they find "Start the journey" and the step controls? Can they
explain what happens on a **cache hit vs a cache miss** when they reach the
cache step? Do they click into a guide from the flow?

## Task 3 — Decide what to learn next (success criteria 5, 6)

> "You've just finished the caching guide. What would you read next, and why
  does it come after caching?"

Watch for: do they see Related guides / Learn next, and can they justify the
order (e.g. "database, because the cache sits in front of it")?

## Record for each learner

- Completed each task? Y/N — where did they pause or backtrack?
- Their own words for: reverse proxy, cache hit/miss, database's role.
- Any link, term, or diagram they skipped or distrusted.
- One thing they'd change.

## Afterwards

- Enter findings as dated lines in the Obsidian project note.
- Phase 6 item 7 = fix the highest-impact issues found here.

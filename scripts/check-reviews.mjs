// Reports when each guide's 6-month review (content + sources) is due.
// Source of truth: lastReviewed in the guide files registered in src/content/guides.ts.
// REVIEWS_TODAY overrides the clock so the overdue path can be self-checked.
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const MONTHS = 6
const today = process.env.REVIEWS_TODAY
  ? new Date(process.env.REVIEWS_TODAY + 'T23:59:59')
  : new Date()

const guidesTs = readFileSync(join(root, 'src/content/guides.ts'), 'utf8')
const files = [...guidesTs.matchAll(/from '\.\/(\w+)'/g)]
  .map((match) => match[1])
  .filter((name) => name !== 'types')

function nextDue(lastReviewed) {
  const [y, m, d] = lastReviewed.split('-').map(Number)
  // End of the due day: a guide is on track through its due date.
  return new Date(y, m - 1 + MONTHS, d, 23, 59, 59)
}

function iso(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

console.log(`Review schedule (${MONTHS}-month cadence) as of ${iso(today)}`)
let overdue = 0
for (const file of files) {
  const src = readFileSync(join(root, `src/content/${file}.ts`), 'utf8')
  const name = src.match(/\bname: '([^']+)'/)?.[1]
  const status = src.match(/\bstatus: '([^']+)'/)?.[1]
  const lastReviewed = src.match(/\blastReviewed: '([^']+)'/)?.[1]
  if (!name || !lastReviewed) {
    console.log(`SKIP    ${file}: missing ${!name ? 'name' : 'lastReviewed'}`)
    continue
  }
  const due = nextDue(lastReviewed)
  const isOverdue = today > due
  if (isOverdue) overdue++
  console.log(
    `${isOverdue ? 'OVERDUE' : 'on track'}  ${name} — last reviewed ${lastReviewed}, next due ${iso(due)} (status: ${status})`,
  )
}
process.exit(overdue > 0 ? 1 : 0)

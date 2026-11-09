import type { Guide } from './types'

// Every whitespace-separated term must appear somewhere in the guide's
// searchable fields, so "make repeated reads faster" narrows instead of guessing.
export function searchGuides(guides: Guide[], query: string): Guide[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return []

  return guides.filter((guide) => {
    const haystack = [
      guide.name,
      guide.category,
      guide.concept,
      guide.problemSolved,
      ...guide.tags,
      ...guide.aliases,
      ...guide.searchProblems,
    ]
      .join(' ')
      .toLowerCase()

    return tokens.every((token) => haystack.includes(token))
  })
}

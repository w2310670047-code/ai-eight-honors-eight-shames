// ai-eight-honors-eight-shames: registers this repository's own SKILL.md as a
// DSH skill, so `dsh plugin add` installs it without a hand-copied skills
// directory.
//
// The skill body is the repository's SKILL.md — there is no second copy to keep
// in sync, and no description duplicated here. Frontmatter is read with `yaml`,
// the same reader `@deepseek-ai/dsh-skill-filesystem` uses, so quoted and
// folded scalars are interpreted identically to local skill discovery.
//
// The registration is owned by this plugin's Fiber: `ctx.skills.register()`
// files into the calling context's layer and returns an effect disposer, so
// stop/uninstall withdraws the skill with no residue.
//
// @module ai-eight-honors-eight-shames
import { readFileSync } from 'node:fs'
import { parse } from 'yaml'

const name = 'ai-eight-honors-eight-shames'
const inject = ['skills']

/** The shipped skill file; an assembly fact of this package, never user config. */
const SKILL_FILE = new URL('../SKILL.md', import.meta.url)

/**
 * Locate the closing `---` line of a frontmatter block. A `---` inside the
 * Markdown body (a horizontal rule) must not end the block, so lines are
 * compared whole, exactly as the shipped filesystem provider does.
 * @param raw - the full skill file text.
 * @param start - index of the first character after the opening `---` line.
 * @returns the closing line's start and the body's start, or undefined.
 */
function findClosingFrontmatter(raw, start) {
  let lineStart = start
  while (lineStart <= raw.length) {
    const nextNewline = raw.indexOf('\n', lineStart)
    const lineEnd = nextNewline < 0 ? raw.length : nextNewline
    if (raw.slice(lineStart, lineEnd).replace(/\r$/, '') === '---') {
      return { start: lineStart, bodyStart: nextNewline < 0 ? raw.length : nextNewline + 1 }
    }
    if (nextNewline < 0) return undefined
    lineStart = nextNewline + 1
  }
  return undefined
}

/**
 * Split a skill file into its frontmatter block and Markdown body.
 * @param raw - the full skill file text.
 * @returns the frontmatter text and body, or undefined when unclosed.
 */
function splitFrontmatter(raw) {
  const firstLineEnd = raw.indexOf('\n')
  if (firstLineEnd < 0) return undefined
  if (raw.slice(0, firstLineEnd).replace(/\r$/, '') !== '---') return undefined
  const closing = findClosingFrontmatter(raw, firstLineEnd + 1)
  if (closing === undefined) return undefined
  return { frontmatter: raw.slice(firstLineEnd + 1, closing.start), body: raw.slice(closing.bodyStart) }
}

/** Register the skill in this repository's SKILL.md on `ctx.skills`. */
function apply(ctx) {
  const raw = readFileSync(SKILL_FILE, 'utf8')
  const split = splitFrontmatter(raw)
  if (split === undefined) throw new Error(`${name}: SKILL.md has no closed frontmatter block`)
  const meta = parse(split.frontmatter)
  if (typeof meta !== 'object' || meta === null || Array.isArray(meta)) {
    throw new Error(`${name}: SKILL.md frontmatter is not a mapping`)
  }
  ctx.skills.register({
    name: meta.name,
    description: meta.description,
    whenToUse: meta.whenToUse,
    content: split.body.trim(),
    source: 'custom',
    invocation: { modelInvocable: true, userInvocable: true },
  })
}

export { apply, inject, name }

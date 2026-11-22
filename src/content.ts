// Every fact on the page comes from Tollgate's README, CONTRACT.md, and docs/principles.md.
export const REPO = 'https://github.com/tollgate-ai/tollgate'
export const blob = (path: string) => `${REPO}/blob/main/${path}`

export const INSTALL = [
  '/plugin marketplace add tollgate-ai/tollgate',
  '/plugin install tollgate@tollgate-ai',
  '/tollgate:init',
]

export const NEEDS = ['Claude Code', 'Python 3.11 or later', 'git', 'pre-commit', 'Docker, for the default isolation']

export const COMMANDS = [
  ['/tollgate:init', 'Sets up a project: the settings, this machine\'s key, your owner key, and the checks before each commit.'],
  ['/tollgate:analyze', 'Reads the project and reports how it is built, with a citation for each finding. It changes no file.'],
  ['/tollgate:task', 'Starts a task from your request. It runs in the background.'],
  ['/tollgate:status', 'Shows two short lists: Done, and Still to do.'],
  ['/tollgate:merge', 'Lists the ready changes and merges one. For tiers 3 and 4, you sign the approval with your SSH key.'],
  ['/tollgate:inbox', 'Lists the questions that wait for you, across projects, and records your answer.'],
  ['/tollgate:retro', "Shows a finished task's numbers and at most 3 lessons."],
  ['/tollgate:home', 'Keeps many projects in one git repository on your machine, with the rules they share.'],
  ['/tollgate:docs', 'Writes docs, comments, and commit messages in plain words.'],
  ['/tollgate:diagram', 'Draws a diagram as an SVG file, in light and dark.'],
] as const

// The 8 groups of rules, numbered as on the how-it-works picture. 18 rules in all.
export const RULE_GROUPS = [
  { n: 1, title: 'Plan first', rules: [
    'An analyst reads the project first. Each finding cites the code, or is marked assumed.',
    'Fresh reviewers check the plan before any code exists, for up to 4 rounds.',
    'A question the plan cannot settle waits for the advisor before the plan is locked.',
    'A large request starts with the base, then one thin path, then one feature at a time.',
    'Each ticket has a checklist. A must-have item cannot fail.',
  ] },
  { n: 2, title: 'Tests first', rules: [
    'One test for each must-have item, locked before any code. The AI cannot change them.',
  ] },
  { n: 3, title: 'Build from the best try', rules: [
    'Below 70%, the AI gets the reasons and tries again from its best try so far.',
  ] },
  { n: 4, title: 'The gate judges', rules: [
    'A program with no AI checks every try. The AI never grades its own work.',
    'The score is the share of checklist items that pass. 70% passes.',
    'A failed must-have item fails the try, whatever the score.',
    'From tier 2, a reviewer reads each change, and at the end the whole task. A finding must point to a line in the change.',
    'Only the gate says done.',
  ] },
  { n: 5, title: 'Stop when stuck', rules: [
    'After 3 tries, or the same failure twice, the advisor decides: a second AI, or you.',
    'The advisor also decides at each checkpoint: after the plan and after the whole task, by default.',
  ] },
  { n: 6, title: 'Risk sets the checks', rules: [
    'The files a change touches give it a tier from 1 to 4. You merge tiers 3 and 4.',
  ] },
  { n: 7, title: 'Mistakes become rules', rules: [
    'At most 3 lessons a task become stricter rules. Rules never get looser.',
  ] },
  { n: 8, title: 'Always', rules: [
    'Code enforces every rule. A rule that is only in a prompt does not count.',
    'Plain words, for people.',
    'Docs move with the code, in the same change.',
  ] },
] as const

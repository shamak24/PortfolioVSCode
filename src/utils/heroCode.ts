import type { Profile } from '@/types/portfolio'

export type CodeTokenType = 'kw' | 'fn' | 'str' | 'prop' | 'amber' | 'com'

export interface CodeToken {
  type: CodeTokenType
  text: string
}

export interface CodeLine {
  tokens: CodeToken[]
}

function str(text: string): CodeToken {
  return { type: 'str', text }
}

function prop(text: string): CodeToken {
  return { type: 'prop', text }
}

function kw(text: string): CodeToken {
  return { type: 'kw', text }
}

function fn(text: string): CodeToken {
  return { type: 'fn', text }
}

function amber(text: string): CodeToken {
  return { type: 'amber', text }
}

function com(text: string): CodeToken {
  return { type: 'com', text }
}

function focusList(profile: Profile, quote: '"' | "'"): CodeToken[] {
  const items = profile.focus.map((f) => str(`${quote}${f}${quote}`))
  const result: CodeToken[] = []
  items.forEach((item, i) => {
    if (i > 0) result.push({ type: 'prop', text: ', ' })
    result.push(item)
  })
  return result
}

export function generateHeroCode(profile: Profile, languageId: string): CodeLine[] {
  const { name, role, available } = profile

  switch (languageId) {
    case 'ts':
      return [
        {
          tokens: [
            kw('const'),
            { type: 'prop', text: ' ' },
            prop('developer'),
            { type: 'prop', text: ' = {' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('name'),
            { type: 'prop', text: ': ' },
            str(`"${name}"`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('role'),
            { type: 'prop', text: ': ' },
            str(`"${role}"`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('focus'),
            { type: 'prop', text: ': [' },
            ...focusList(profile, '"'),
            { type: 'prop', text: '],' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('available'),
            { type: 'prop', text: ': ' },
            amber(String(available)),
            { type: 'prop', text: ',' },
          ],
        },
        { tokens: [{ type: 'prop', text: '};' }] },
      ]

    case 'js':
      return [
        { tokens: [com('// developer.js')] },
        {
          tokens: [
            kw('const'),
            { type: 'prop', text: ' ' },
            prop('developer'),
            { type: 'prop', text: ' = {' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('name'),
            { type: 'prop', text: ': ' },
            str(`'${name}'`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('role'),
            { type: 'prop', text: ': ' },
            str(`'${role}'`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('focus'),
            { type: 'prop', text: ': [' },
            ...focusList(profile, "'"),
            { type: 'prop', text: '],' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('available'),
            { type: 'prop', text: ': ' },
            amber(String(available)),
            { type: 'prop', text: ',' },
          ],
        },
        { tokens: [{ type: 'prop', text: '};' }] },
      ]

    case 'py':
      return [
        {
          tokens: [
            prop('developer'),
            { type: 'prop', text: ' = {' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            str('"name"'),
            { type: 'prop', text: ': ' },
            str(`"${name}"`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            str('"role"'),
            { type: 'prop', text: ': ' },
            str(`"${role}"`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            str('"focus"'),
            { type: 'prop', text: ': [' },
            ...focusList(profile, '"'),
            { type: 'prop', text: '],' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            str('"available"'),
            { type: 'prop', text: ': ' },
            amber(available ? 'True' : 'False'),
            { type: 'prop', text: ',' },
          ],
        },
        { tokens: [{ type: 'prop', text: '}' }] },
      ]

    case 'go':
      return [
        {
          tokens: [
            kw('var'),
            { type: 'prop', text: ' ' },
            prop('developer'),
            { type: 'prop', text: ' = ' },
            fn('Developer'),
            { type: 'prop', text: '{' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('Name'),
            { type: 'prop', text: ':    ' },
            str(`"${name}"`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('Role'),
            { type: 'prop', text: ':    ' },
            str(`"${role}"`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('Focus'),
            { type: 'prop', text: ':   []' },
            fn('string'),
            { type: 'prop', text: '{' },
            ...focusList(profile, '"'),
            { type: 'prop', text: '},' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('Available'),
            { type: 'prop', text: ': ' },
            amber(String(available)),
            { type: 'prop', text: ',' },
          ],
        },
        { tokens: [{ type: 'prop', text: '}' }] },
      ]

    case 'rs':
      return [
        {
          tokens: [
            kw('let'),
            { type: 'prop', text: ' ' },
            prop('developer'),
            { type: 'prop', text: ' = ' },
            fn('Developer'),
            { type: 'prop', text: ' {' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('name'),
            { type: 'prop', text: ': ' },
            str(`"${name}"`),
            { type: 'prop', text: '.' },
            fn('to_string'),
            { type: 'prop', text: '(),' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('role'),
            { type: 'prop', text: ': ' },
            str(`"${role}"`),
            { type: 'prop', text: '.' },
            fn('to_string'),
            { type: 'prop', text: '(),' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('focus'),
            { type: 'prop', text: ': ' },
            kw('vec!'),
            { type: 'prop', text: '[' },
            ...focusList(profile, '"'),
            { type: 'prop', text: '],' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            prop('available'),
            { type: 'prop', text: ': ' },
            amber(String(available)),
            { type: 'prop', text: ',' },
          ],
        },
        { tokens: [{ type: 'prop', text: '};' }] },
      ]

    case 'java':
      return [
        {
          tokens: [
            kw('var'),
            { type: 'prop', text: ' ' },
            prop('developer'),
            { type: 'prop', text: ' = ' },
            kw('new'),
            { type: 'prop', text: ' ' },
            fn('Developer'),
            { type: 'prop', text: '(' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            str(`"${name}"`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            str(`"${role}"`),
            { type: 'prop', text: ',' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            fn('List'),
            { type: 'prop', text: '.' },
            fn('of'),
            { type: 'prop', text: '(' },
            ...focusList(profile, '"'),
            { type: 'prop', text: '),' },
          ],
        },
        {
          tokens: [
            { type: 'prop', text: '  ' },
            amber(String(available)),
          ],
        },
        { tokens: [{ type: 'prop', text: ');' }] },
      ]

    default:
      return generateHeroCode(profile, 'ts')
  }
}

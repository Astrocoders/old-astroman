import * as git from '../git'

test('getRepoNameFromUrl should handle http urls', () => {
  expect(
    git.getRepoNameFromUrl('https://github.com/astroc0der/astro-rn-chat.git')
  ).toBe('astro-rn-chat')
})



test('getRepoNameFromUrl should handle git ssh urls', () => {
  expect(
    git.getRepoNameFromUrl('git@github.com:astroc0der/astro-rn-chat.git')
  ).toBe('astro-rn-chat')
})

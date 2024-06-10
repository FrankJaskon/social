import { passwordRegex } from './auth'

const validStrings = [
  'sPassword1!',
  'Secret123!',
  'HelloWorld123!',
  'Test12345!',
  'sAbcdEfgh123!',
  'StrongP@ssw0rd',
  'ComplexP@ssw0rd!',
  'SecureP@ssw0rd123',
  'P@ssw0rd!123',
  '1234AbCdEfG!',
  '1Password!A',
  'A1B2C3D4!s',
  '1a2#b3c4d5E',
  'P@ssw0rd!$',
  'AbcdEfgh123!$',
  'S3cureP@ssw0rd!',
  'P@ssw0rd1!',
  'Passw0rd!!',
  'P@ss!1234',
  'Test@1234',
  'sS3cretP@ss!',
  'H3ll0W0rld!',
  'P@ssw0rd123!',
  '1234AbCdEfG!$',
  'A1B2Csaf3D4!$',
  '1a2b3c4d5E$',
  'P@ssw0rd!@',
  'AbcdEfgh123!@',
  'S3cureP@ssw0rd!@',
  'P@ssw0rd1!$',
  'Passw0rd!!@',
  'P@ss!1234@',
  'Test@1234!',
  'S3cretP@ss!@',
  'H3ll0W0rld!$',
  'sP@ssw0rd123!@',
  '1234AbCdEfG!@',
  'A1B2Csf3D4!@',
  '1a2b3c4d5E@',
  'P@ssw0rd!#',
  'AbcdEfgh123!#',
  'S3cureP@ssw0rd!#',
  'sP@ssw0rd1!#',
  'Passw0rd!!#',
  'P@ss!1234#',
  'Test@1234#',
  'S3cretP@ss!#',
  'H3ll0W0rld!#',
  'P@ssw0rd123!#',
]

const invalidStrings = [
  '1234AbCdEfGы!$',
  'A1B2C№3D4!$',
  '1a2b3c4d5E$в',
  'password',
  '123456',
  'abcdef',
  'ABCD',
  'P@ss\\',
  'Test',
  'SecurePassword',
  'lowercaseletters',
  'UPPERCASELETTERS',
  '12345d',
  '!!!!!!',
  '@@@@@@',
  '$$$$$$',
  '%%%%%%%%',
  '&&&&&&&&',
  '********',
  '////////',
  '::::::::',
  ';;;;;;;;',
  '========',
  '????????',
  '!!!!!!!!!!',
  '**********',
  '----------',
  '__________',
  '++++++++++',
  '~~~~~~~~~~',
  '{{{{{{{{{{',
  '}}}}}}}}}}',
  '[[[[[[[[[[',
  ']]]]]]]]]]',
  '(((((((((((',
  ')))))))))))',
  '//////////',
  '0000000000',
  '1111111111',
  '2222222222',
  '3333333333',
  '4444444444',
  '5555555555',
  '6666666666',
  '7777777777',
  '8888888888',
  '9999999999',
]

const numbers = '0123456789'
const bigLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const smallLetters = 'abcdefghijklmnopqrstuvwxyz'
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

const generateValidRandomString = () => {
  const length = Math.floor(Math.random() * 57) + 4
  const randomString = []

  randomString.push(numbers[Math.floor(Math.random() * numbers.length)])
  randomString.push(bigLetters[Math.floor(Math.random() * bigLetters.length)])
  randomString.push(smallLetters[Math.floor(Math.random() * smallLetters.length)])
  randomString.push(symbols[Math.floor(Math.random() * symbols.length)])

  for (let i = 4; i < length; i++) {
    const category = Math.floor(Math.random() * 4)

    switch (category) {
      case 0:
        randomString.push(numbers[Math.floor(Math.random() * numbers.length)])
        break
      case 1:
        randomString.push(bigLetters[Math.floor(Math.random() * bigLetters.length)])
        break
      case 2:
        randomString.push(smallLetters[Math.floor(Math.random() * smallLetters.length)])
        break
      case 3:
        randomString.push(symbols[Math.floor(Math.random() * symbols.length)])
        break
    }
  }

  return randomString.join('')
}

const getRandomSubset = (arr: string[], count: number) => {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random())

  return shuffled.slice(0, count)
}

const generateInvalidRandomString = () => {
  const length = Math.floor(Math.random() * 57) + 4
  const categories = [numbers, bigLetters, smallLetters, symbols]
  const usedCategories = getRandomSubset(categories, Math.floor(Math.random() * 3) + 1)

  const randomString = []

  usedCategories.forEach(category => {
    const char = category[Math.floor(Math.random() * category.length)]

    randomString.push(char)
  })

  for (let i = usedCategories.length; i < length; i++) {
    const category = usedCategories[Math.floor(Math.random() * usedCategories.length)]
    const char = category[Math.floor(Math.random() * category.length)]

    randomString.push(char)
  }

  return randomString.join('')
}

const randomInvalidStrings = new Array(50).fill(0).map(() => generateInvalidRandomString())

const randomValidStrings = new Array(50).fill(0).map(() => generateValidRandomString())

describe('Regular Expression Test', () => {
  validStrings.forEach((string: string) => {
    it(`${string} should match`, () => {
      expect(string).toMatch(passwordRegex)
    })
  })

  invalidStrings.forEach((string: string) => {
    it(`${string} should not match`, () => {
      expect(string).not.toMatch(passwordRegex)
    })
  })

  randomValidStrings.forEach((string: string) => {
    it(`${string} should match`, () => {
      expect(string).toMatch(passwordRegex)
    })
  })

  randomInvalidStrings.forEach((string: string) => {
    it(`${string} should not match`, () => {
      expect(string).not.toMatch(passwordRegex)
    })
  })
})

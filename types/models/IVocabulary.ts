export interface IVocabulary {
  word: string
  translation: string
  proficiencyLevel: number
  timesTested: number
  libraryId: string
  userId: string
  testFormat: ITestFormat[]
}

export interface ITestFormat {
  firstLetter: string
  lastLetter: string
  middleDash: number
}
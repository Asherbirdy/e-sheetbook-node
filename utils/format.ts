/* eslint-disable prefer-const */
import { IVocabulary } from '../types'

export const proficiencyLevelMethod = (lib: IVocabulary[]) => {
  const sumOfLevels = lib.reduce(
    (acc: number, cur: IVocabulary) => acc + cur.proficiencyLevel,
    0
  )
  const averageLevel = parseFloat((sumOfLevels / lib.length).toFixed(1))
  return averageLevel
}

export const getRandomSubarray = (arr: any[], size: number) => {
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - size,
    temp,
    index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[ index ]
    shuffled[ index ] = shuffled[ i ]
    shuffled[ i ] = temp
  }
  return shuffled.slice(min)
}
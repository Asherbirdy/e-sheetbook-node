import { IUser } from './IUser'

export interface ILibrary {
  userId: IUser
  title: string
  averageLevel: number
  librarySize: number
  onQuiz: boolean
}
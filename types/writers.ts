import IUser from 'types/user'

export default interface IWriter {
  id: number
  author: IUser
  jwt: string
}

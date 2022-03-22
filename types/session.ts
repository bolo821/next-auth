import IUser from 'types/user'

export default interface ISession {
  id: number
  user: IUser
  jwt: string
  expires: string
}

import IUser from './user'

export default interface IFeed {
  id: string
  body: string
  author: IUser
  created_at: string
}

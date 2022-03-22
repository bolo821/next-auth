export default interface iToken {
  id: number
  email: string
  name: string
  picture: string
  context: string
  login_date: Date
  is_active: boolean
  jwt: string
}

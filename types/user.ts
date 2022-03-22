export default interface User {
  id: number
  username: string
  email: string
  password: string
  provider: string
  role: string
  refreshToken: string
  accessToken: string
  accessTokenExpires: string
  confirmed: boolean
  blocked: boolean
  jwt: string
}

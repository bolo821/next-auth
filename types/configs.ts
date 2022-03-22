export type StationeersAccessibility = 'public' | 'private' | 'whiteliste'

export default interface Config {
  id: number
  maintenance: boolean
  users_count: number
  stationeers_players_count: number
  stationeers_online: boolean
  stationeers_accessibility: StationeersAccessibility
}

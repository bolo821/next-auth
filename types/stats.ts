export type StatsType = 'visitors' | 'youtube_clicks' | 'twitter_click' | 'twitch_clicks'

export default interface Config {
  id: number
  visitors: number
  youtube_clicks: number
  twitter_clicks: number
  twitch_clicks: number
  disboard_clicks: number
  discord_classement_clicks: number
  stationeers_clicks: number
  stationeers_reviews_clicks: number
  yt_subscribers: number
  twitter_subscribers: number
  twitch_subscribers: number
  discord_users: number
  github_profile_clicks: number
}

export default interface PageProps {
  id: number
  title: string
  slug: string
  data: Record<string, unknown>
  is_enabled: boolean
}

import axios from 'axios'
import PageProps from 'types/pages'

type Props = {
  pages: PageProps[]
  pathname: string
  locale: 'fr' | 'en'
}

export const getPage = (props: Props): PageProps => {
  try {
    let locale = props.locale
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('locale')) localStorage.setItem('locale', 'fr')
      locale = localStorage.getItem('locale')
    }
    const page = props.pages.data.filter(p =>
      p.attributes.slug === props.pathname
      && p.attributes.is_enabled
      && p.attributes.locale === locale
    )?.[0]
    
    if (!page) throw new Error(`Unable to retrieve page data from ${props.pathname} with ${locale} locale`)
    
    return page
  } catch (error) {
    throw new Error(error)
  }
}

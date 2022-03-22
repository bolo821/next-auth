import { useEffect } from 'react'
import { userService } from '../services'

export const redirectLoggedUser = () => {
  useEffect(() => {
    if (userService.userValue) router.push('/')
  }, [])
}

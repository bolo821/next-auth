import { Flex, useColorMode } from '@chakra-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Item, Typography } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import axios from 'axios'
import getVisitorsCount from '../../helpers/getVisitorsCount'

const useStyles = makeStyles((theme) => ({
  footer: {
    width: `100%`,
    position: 'relative',
    overflow: 'hidden',
    padding: '2em 0 '
  },
  link: {
    fontSize: '1.25em',
    '&:hover': {
      color: theme.palette.info.main
    }
  },
  copyright: {
    fontSize: '1em',
    '&:hover': {
      color: theme.palette.info.main
    }
  },
  madeBy: {
    fontSize: '1em',
  }
}))

const saveGithubProfileClick = (): void => {
  axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`).then(statsResponse => {
    const { data } = statsResponse
    const { attributes } = data.data
    axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`, {
      data: {
        github_profile_clicks: attributes.github_profile_clicks + 1,
      }
    })
  })
  
  return undefined
}

const Footer = ({ visitors }) => {
  const router = useRouter()
  const classes = useStyles()
  const { colorMode } = useColorMode()
  const color = { light: 'gray.800', dark: 'gray.100' }
  let visitorsTexts = ''
  if (visitors && visitors > 0) visitorsTexts = `・ ${visitors} visiteurs`
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundColor: colorMode === 'light' ? '#E2E8F0' : '#222629',
        color: colorMode === 'light' ? '#222629' : '#E2E8F0',
    }}
    >
      <Container maxWidth="lg" style={{
        width: `100%`,
        position: 'relative',
        overflow: 'hidden',
        padding: '2em 0 ',
      }}>
        <div className="row">
          <div className="col-8">
            <Typography className={classes.copyright} component={'a'}
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://universe-travel.eu"
            >
              &copy; 2022 <b>Universe * Travel</b> {visitorsTexts}
            </Typography>
          </div>
          <div className="col-4">
            <Typography>
              Made by <b>
              <a href="https://github.com/Sorok-Dva" target="_blank"
                 onClick={ saveGithubProfileClick }
              >Сорок два
              </a></b> with
              <FontAwesomeIcon icon={faHeart} style={{ marginLeft: '5px', marginRight: '5px', color: '#c82b3b' }} />
              in Paris
            </Typography>
          </div>
        </div>
      </Container>
    </Flex>
  )
}

export default Footer

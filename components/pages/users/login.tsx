import { Box, Text } from '@chakra-ui/core'
import axios from 'axios'
import { Formik, Field, Form, FormikHelpers, Label } from 'formik'
import validationHandler from '../../../helpers/validationHelper'
import { requestHelper } from '../../../helpers/requestHelper'
import { userLoginSchema } from '../../../schemas/User'
import { Alert } from '../../../components/common'
import { alertService } from '../../../services'

interface Values {
  username: string
  password: string
}

const validateForm = (values, pageProps) => {
  const errors = validationHandler(values, 'Users', userLoginSchema)
  document.getElementById('formError').style.display = 'none'
  let validUsername = () => {
    document.getElementById('identifier').className = 'form-control is-valid'
    document.getElementById('usernameError').style.display = 'none'
  }
  let validPassword = () => {
    document.getElementById('password').className = 'form-control is-valid'
    document.getElementById('passwordError').style.display = 'none'
  }
  
  validUsername()
  validPassword()
  
  if (errors) {
    let usernameError = true
    let passwordError = true
    if (errors.length === 0) {
      usernameError = false
      passwordError = false
      validUsername()
      validPassword()
    } else {
      usernameError = errors.find(e => e.message.includes('"identifier"'))
      passwordError = errors.find(e => e.message.includes('"password"'))
    }
    if (usernameError) {
      document.getElementById('identifier').className = 'form-control is-invalid'
      document.getElementById('usernameError').style.display = 'block'
      document.getElementById('usernameTextError').innerHTML = usernameError
    } else validUsername()
    
    if (passwordError) {
      document.getElementById('password').className = 'form-control is-invalid'
      document.getElementById('passwordError').style.display = 'block'
      document.getElementById('passwordTextError').innerHTML = passwordError
    } else validPassword()
  } else {
    requestHelper.post('/auth/local', values, pageProps).then(response => {
      console.log('received session:', response)
    }).catch(error => {
      if (error.full_error) {
        console.log(document.getElementById('identifier'))
        console.log(document.getElementById('password'))
        console.log(document.getElementById('formError'))
        document.getElementById('identifier').className = 'form-control is-invalid'
        document.getElementById('password').className = 'form-control is-invalid'
        document.getElementById('formError').style.display = 'block'
        document.getElementById('formErrors').innerHTML = error.title
      } else {
        alertService.error('Une erreur est survenue avec le serveur')
      }
      console.log('login error', error, typeof error)
    })
  }
}

export default function LoginForm(props) {
  return (
    <div className="p-3">
      <h1 className="display-6 mb-3">Login</h1>
      <Formik initialValues={ { identifier: '', password: '' } }
        onSubmit={ (
          values: Values,
          {setSubmitting, resetForm}: FormikHelpers<Values>
        ) => {
          setSubmitting(true)
          validateForm(values, props)
          setSubmitting(false)
        } }
      >
        <Form>
          <Box className="alert-danger" display="none" id="formError" mb="15px">
            <Text p={2} id="formErrors">error</Text>
          </Box>
          
          <div className="mb-3">
            <Field className="form-control" id="identifier" name="identifier" placeholder="Email" type="email" required={true} />
            <Box className="alert-danger" display="none" id="usernameError">
              <Text p={2} id="usernameTextError">error</Text>
            </Box>
          </div>
          
          <div className="mb-3">
            <Field className="form-control" id="password" name="password" placeholder="Password" type="password" required={true} />
            <Box className="alert-danger" display="none" id="passwordError">
              <Text p={2} id="passwordTextError">error</Text>
            </Box>
          </div>
          
          <div className="mb-3">
            <button id="submitButton" className="btn btn-primary" type="submit">Connexion</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

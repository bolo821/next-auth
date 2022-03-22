import {
  Box,
  Button,
  Divider,
  ErrorMessage,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faEye, faStar } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Formik, Field, Form, FormikHelpers, Label } from 'formik'

import '@fortawesome/fontawesome-svg-core/styles.css'
import axios from 'axios'
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
})

const CreateStationeersReportPageComponent = () => {
  const containerMinWidth: string = '70rem'
  const containerPadding: string = '1rem'
  const { colorMode } = useColorMode()
  const bgColor = { light: 'white', dark: 'gray.800' }
  const color = { light: 'gray.800', dark: 'gray.100' }
  
  return (
    <Box
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      width={containerMinWidth}
      shadow="lg"
      rounded="lg"
      w={[350, 500, 750]}
      className="container-fluid p-3"
    >
      <Stack>
        <Flex
          justifyContent="center"
          alignItems="center"
          color={color[colorMode]}
          padding={containerPadding}
        >
          <Stack spacing={4} maxW="xl" mb="auto" mx="auto">
            <Formik
              initialValues={{
                name: '',
                email: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                // same shape as initial values
                console.log(values);
              }}
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
          </Stack>
        </Flex>
      </Stack>
    </Box>
  )
}

export default CreateStationeersReportPageComponent

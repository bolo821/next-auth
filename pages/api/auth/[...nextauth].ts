import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const options = {
  providers: [
    CredentialsProvider({
      name: 'local',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'Password' },
      },
      authorize: async ({ email, password }) => {
        let res = null;
        try {
          res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
            identifier: email,
            password: password,
          });
          // In tis catch block, you can do error handling. Page broken often occurs because you are not providing an appropriate format data.
          // For example, let's say you are returning a data { name: 'xxx', age: '11' } when you had a success result.
          // Then in the case failed(in catch block), you need to return the same format data like { name: null, age: null }.
          // Or in the part where you use the result, you can check if the return data is null.
          // Error occurs when you are trying to access 'name' field of null data.

          // In the catch block, I returned null and in line 33, checked if the data is null.
        } catch(err) {
          res = null;
        }

        // If res is null, we will return null because accessing 'data' field of null will occur an error.
        let authenticated = res ? res.data : null;
        
        if (authenticated) {
          return {
            id: authenticated.user.id,
            name: authenticated.user.username,
            email: authenticated.user.email,
            jwt: authenticated.jwt,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    strategy: 'jwt'
  },
  debug: false,
  callbacks: {
    async session({ session, token, user }) {
      session.jwt = token.jwt
      session.id = token.id
      
      return session
    },
    async jwt({ token, user, account }) {
      const isSignIn = !!user

      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.id;
      }
        
      return token;
    }
  }
}

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)

export default Auth

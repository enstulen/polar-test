import NextAuth, { NextAuthOptions } from 'next-auth'

const defaultHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

const headers = (accessToken: string) => {
  return {
    ...defaultHeaders(),
    Authorization: `Bearer ${accessToken}`,
  }
}

const registerUser = async (accessToken: string, userId: string) => {
  const inputBody = {
    'member-id': userId,
  }

  return fetch('https://www.polaraccesslink.com/v3/users', {
    method: 'POST',
    body: JSON.stringify(inputBody),
    headers: headers(accessToken),
  })
}

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    {
      id: 'polar',
      name: 'Polar',
      type: 'oauth',
      authorization: {
        url: 'https://flow.polar.com/oauth2/authorization',
        params: {
          client_id: process.env.POLAR_CLIENT_ID,
          response_type: 'code',
          scope: 'accesslink.read_all',
          redirect_uri: `${process.env.BASE_URL}/api/auth/callback/polar`,
        },
      },
      token: 'https://polarremote.com/v2/oauth2/token',
      clientId: process.env.POLAR_CLIENT_ID,
      clientSecret: process.env.POLAR_CLIENT_SECRET,
      userinfo: {
        async request(context) {
          if (context?.tokens?.access_token && context?.tokens?.x_user_id) {
            await registerUser(
              context.tokens.access_token,
              context.tokens.x_user_id as string
            )

            const userInfo = await fetch(
              `https://www.polaraccesslink.com/v3/users/${context.tokens.x_user_id}`,
              {
                method: 'GET',
                headers: headers(context.tokens.access_token),
              }
            )

            const data = await userInfo.json()
            return data
          } else return null
        },
      },
      profile(profile) {
        return {
          id: profile['polar-user-id'],
          name: profile['first-name'] + ' ' + profile['last-name'],
        }
      },
    },
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

## Getting Started

## Environment variables

Duplicate `.env.example` to a `.env.local` file and fill in the environment variables

| Environment variable | Description                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| NEXTAUTH_SECRET      | Used to encrypt the NextAuth.js JWT, and to hash email verification tokens.                       |
| POLAR_CLIENT_ID      | Client id for the Polar Application. Create a client here: https://admin.polaraccesslink.com/     |
| POLAR_CLIENT_SECRET  | Client secret for the Polar Application. Create a client here: https://admin.polaraccesslink.com/ |
| BASEURL              | Base url for the application. Set to http://localhost:3000                                        |

## Running the application

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Building the application

```
yarn build
yarn start
```

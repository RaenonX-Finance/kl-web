# kl-ui

UI of KL services.

## Usage

### Install dependencies

```shell
yarn install
```

### Start the dev server

The application should host at `http://localhost:3000`, or subsequent port if `3000` is occupied.

```shell
yarn run start
```

## Environment Variables

`NEXTAUTH_SECRET`: Random string that encrypts the message of `next-auth`. 
This should have the same value as `FASTAPI_AUTH_SECRET` in [kl-api-account].

`NEXTAUTH_URL`: Has to be set according to `next-auth` specs. 
Should be the host of the current application like `http://localhost:3000`.

`NEXTAUTH_CLIENT_ID`: OAuth2 client ID for authorization in [kl-api-account].

`NEXTAUTH_CLIENT_SECRET`: OAuth2 client secret for authorization in [kl-api-account].

`NEXT_PUBLIC_HOST_URL`: Should be the same as `NEXTAUTH_URL`.

`NEXT_PUBLIC_ACCOUNT_API_URL`: KL Account REST API URL.
Should be something like `http://localhost:8000`.

`NEXT_PUBLIC_PX_API_URL`: KL Px REST API URL.
Should be something like `http://localhost:5999`.

`NEXT_PUBLIC_ACCOUNT_SOCKET_URL`: KL Account socket URL.
Should be something like `ws://localhost:8000/`.

`NEXT_PUBLIC_DATA_SOCKET_URL`: KL Px socket URL.
Should be something like `ws://localhost:5999/`.

`NEW_RELIC_LICENSE_KEY`: New Relic license key.

[kl-api-account]: https://github.com/RaenonX-Finance/kl-api-account

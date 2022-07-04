# kl-site-front

UI of [kl-site-back](https://github.com/RaenonX-Finance/kl-site-back).

## Usage

### Install dependencies

```shell
npm install
```

### Start the dev server

The application should host at `http://localhost:3000`, or subsequent port if `3000` is occupied.

```shell
npm run start
```

## Environment Variables

`NEXT_PUBLIC_DATA_SOURCE_ACTUAL`: Determines if the website should use the production backend as the data source.
> `0` or `1`

`NEXTAUTH_SECRET`: Random string that encrypts the message of `next-auth`. 
This should have the same value as `FASTAPI_AUTH_SECRET`.

`NEXTAUTH_URL`: Has to be set according to `next-auth` specs.

`NEXTAUTH_URL_TOKEN`: URL to get the access token.

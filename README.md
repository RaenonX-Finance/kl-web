# kl-web

Clustered web apps for KL services.

## Required setup

Local Redis instance at `localhost:6379`.

## Required files

### `kl-ui`

#### `.env`

All variables are required besides `NEW_RELIC_*`.

`NEXTAUTH_SECRET`: Secret used by `next-auth`. 
Needs to be the same as `FASTAPI_AUTH_SECRET` of Account API.

`NEXTAUTH_URL`: Website host name. Required by `next-auth`.

`NEXTAUTH_CLIENT_ID`: OAuth Client ID used for authentication. Set up from account API.

`NEXTAUTH_CLIENT_SECRET`: OAuth Client secret used for authentication. Set up from account API.

`NEXT_PUBLIC_HOST_URL`: Should be the same as `NEXTAUTH_URL`.

`NEXT_PUBLIC_ACCOUNT_SOCKET_URL`: Account socket URL. Can be either `wss://` or `https://`.

`NEXT_PUBLIC_ACCOUNT_API_URL`: Account REST API URL. Should NOT end with slash `/`.

`NEXT_PUBLIC_PX_SOCKET_URL`: Px socket URL. Can be either `wss://` or `https://`.

`NEXT_PUBLIC_PX_API_URL`: Account REST API URL. Should NOT end with slash `/`.

`NEXT_PUBLIC_INFO_SOCKET_URL`: Info socket URL. Can be either `wss://` or `https://`.

`NEXT_PUBLIC_INFO_API_URL`: Info REST API URL. Should NOT end with slash `/`.

`NEW_RELIC_LICENSE_KEY`: New Relic license key.

`NEW_RELIC_APP_NAME`: New Relic app name.

#### `./public/js/newRelicBrowser.{Prod|Dev}.js`

Grab from New Relic One using `Browser` and manually install it.

### `kl-api-*`

These variables are required for both `kl-api-px` and `kl-api-info`.

`KL_API_ALLOWED_ORIGINS`: CORS allowed origins. Use comma `,` to split multiple origins.
Should NOT end with slash `/`; should have protocol included.

`KL_API_MONGO_URI`: MongoDB connection string.

`KL_API_ACCOUNT_URL`: URL to account API.

### `kl-api-px`

#### `./env`

All variables are required besides `NEW_RELIC_*`.

> Variables of `kl-api-*` are also required.

`NEW_RELIC_LICENSE_KEY`: New Relic license key.

`KL_PX_API_HOST`: API listening host.

`KL_PX_API_PORT_REST`: REST API listening port.

`KL_PX_API_PORT_GRPC`: gRPC service port.

`KL_PX_API_LOGGING_DIR`: App logging directory.

`KL_PX_REQUEST_LIMIT`: Maximum count of data to get for `/px-init`.

### `kl-api-info`

#### `./env`

All variables are required besides `NEW_RELIC_*`.

> Variables of `kl-api-*` are also required.

`NEW_RELIC_LICENSE_KEY`: New Relic license key.

`KL_INFO_API_HOST`: API listening host.

`KL_INFO_API_PORT_REST`: REST API listening port.

`KL_INFO_API_LOGGING_DIR`: App logging directory.

## Usage

### Install dependencies

```shell
yarn install
```

### Start the dev server

The processes listed below are executable:
- `kl-ui`
- `kl-api-px`
- `kl-api-info`

Run the command below in the corresponding `package.json` to start the dev server:

```shell
yarn run dev
```

> For example, to run the dev server of `kl-api-px`, 
> run `yarn run dev` from `kl-api-px/package.json`.

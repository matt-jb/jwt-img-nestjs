# jwt-img-nestjs

## Setup

Just clone the repository and install dependencies with `npm install`.

You will also need a valid `.env` file. For starters, you can just rename the `.env.example` provided in the repository.

**IMPORTANT:** In order to successfully run the full flow locally, you will need a valid API key for [imgBB](https://imgbb.com/). Fortunately, creating an account and obtaining an API key literally takes seconds. Just pop that bad boy to your `.env` file and you're ready to go.

If you don't feel like installing this service, you can just take it for a spin using a [live demo](https://jwt-img-nestjs-production.up.railway.app).

## Valid login data

```
{
  "username": "user"
  "password: "password"
}
```

## Routes

### POST /auth/login

#### Request body

```
username!: string
password!: string
```

#### Response example

```
{
  "access_token": "eyJhbGciOaJIUzI1NiIsInR5c..."
}
```

**NOTE**: The token is valid for 10 minutes.

### GET /users/me

Request body is not needed, but in order for this route to work, you will need to provide a valid `Authorization` header, e.g.:

```bash
$ curl https://jwt-img-nestjs-production.up.railway.app/users/me -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
```

#### Response example

```
{
  "id": 1,
  "name": "user",
  "loggedInAt": "2023-12-05 20:46:16"
}
```

### POST /image/upload

Request body is not needed, but in order for this route to work, you will need to provide a valid `Authorization` header, same as in the previous route.

You will also need to provide an image. You can easily do it with Postman (or any equivalent):

1. In the new request window, go to Headers tab. Make sure that the `Authorization` header is attached.
2. In the Body tab, pick the `form-data` data type.
3. Below the data type, type in the correct key, which is `file`. The value is the image you can provide.

#### Image restrictions:

- Size: up to 4 MB
- Supported file types: jpg, jpeg, png
- Any image with a size lower than 256 px will not be scaled up.

#### Response example

```
{
  "message":  "Image successfully uploaded",
  "downloadUrl":  "https://i.ibb.co/FqZdmCV/d2f8c1450e04.jpg",
  "deleteUrl":  "https://ibb.co/k6bP5v1/c3e59df4464ca85fe96f18779677bf17",
  "expirationTime":  "10 minutes"
}
```

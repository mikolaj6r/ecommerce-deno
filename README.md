# e-commerce shop example

## Tech stack
- Deno
- MongoDB

## Documentation

### Requirements
#### Software
- Deno (> v1.1.0)
- Make

#### Env
| NAME | DESC |
| ---- | ---- |
| DB_URI | url to connect with Mongo database |
| CLIENT_ID | PayU client_id |
| CLIENT_SECRET | PayU client_secret |
| MAIL_API_KEY | Sendgrid api_key |
| EMAIL | Email authorized in sendgrid, will be used as author of emails |


### Scripts
In the project directory, you can run:

#### `make`

It runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.

#### Database
The database used is MongoDB.<br />
It stores two collections:
1) Products
```typescript
interface Product {
    name: string,
    price: number,
    image: string
}
```

2) Checkouts (should be renamed to Orders)
```typescript
interface Checkout {
    type: string,
    price: number,
    status: string,
    firstname: string,
    lastname: string,
    address: string,
    postal: string,
    email: string,
    phone: number
}
```

### Project structure
The app is made in the server-side rendered approach. <br />
The main file is 'mod.ts' - it setups the whole server and imports functional parts:
- `controllers` contains controllers that handle requests that matches router paths
- `middleware`  contains server middlewares (functions that handle requests)
- `models` contains interfaces used in the database
- `public` contains client-side resources like css or js
- `routes` defines routing in the app
- `services` contains services like email, payu, product, checkout used by other components
- `views` contains server-side rendered views, uses Nunjucks as templating engine.
<br />
The project contains any custom css. Instead Tailwind framework is used to add styling.



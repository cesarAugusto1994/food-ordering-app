# Food App Ordering

Food App(built w/ Expo)

I was seriously working on this project then I quit because I've been way too busy and cannot keep working on it;
It's a WIP of an Uber-like(or any other food ordering app) that joins the customer and the producer interface in the same app!

# Workflow

## Customer Interface
  In this current version: 
  - The customer can sign-in via Google or Facebook(provided by Expo)
  - Order food(feature not complete): This takes a displayed food, and send your order request to the producer. Depending on which graphql service you use(such as AppSync) you can get subscriptions working well on this part
  - See all orders and their status
  - Consult their profile
   
## Producer Interface
 In this current version:
 - The customer can sign-in via Google or Facebook(provided by Expo)
 - The producer can CRUD(create, read, update & delete) food
 - Accept or refuse orders
 - Consult their profile
 
This project uses: 
  - Expo(React Native)
  - Apollo
  - GraphQL 
  - Prisma(graphql backend)
  - Formik
  
# Lauching the project

Make sure you have expo installed in your machine

1. Installing deps: 

```sh
  npm install
```

2. Running the bundler:

```sh
  npm start
```

3. Lauching the app

```sh
  npm run ios
```


For Expo Google & Facebook sign-in, pls checkout their docs.

Once again, this was a side lazy project!

  

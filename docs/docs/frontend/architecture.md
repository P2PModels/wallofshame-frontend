# Frontend Architecture

## Architecture

---

## Detailed stack

---

## Tech stack discussion

### ¿Microfrontends?

| **Pros**                    | **Cons**     |
| --------------------------- | ------------ |
| Team scalability            | Complexity   |
| Strategic vs Tactical focus | No standards |
| Reusability                 |              |

Source: [Micro-Frontends: What, why and how by Jack Herrington](https://www.youtube.com/watch?v=w58aZjACETQ)

Steps to implement:

-   Site audit for MFE
-   Build requirements'
-   Choose "Buy or Build"

[Solid-js example](https://www.youtube.com/watch?v=s_Fs4AXsTnA)

### ¿Redux or not?

There are several ways to implement a react webapp, different architectures and tech stacks to handle the client state. Redux its a very common library used to handle the app state through the combination of the following patters: a store and a reducer. It is a powerful architecture but since we are prototyping it may not provide the desired flexibility. ([GraphQL & Redux](https://medium.com/nerd-for-tech/how-to-use-graphql-with-redux-50ad20ec051f))

### The Provider pattern

Another way to manage the app state is through the use of Context from the react library. A react context creates an immutable object that can be updated through the createContext function. It also has a provider and a consumer interface. The provider sets the state of the context, it can be placed in any part of the component tree but only the child components can make use of the consumer interface ([useContext hook](https://daveceddia.com/usecontext-hook/)) to get the context. A great review of this pattern can be found in the article [React Architecture: The React Provider Pattern by Morten Barklund](https://mortenbarklund.com/blog/react-architecture-provider-pattern/)

---

# Frontend Architecture

## Detailed stack

---

## Architecture

---

## Tech stack discussion

### ¿Redux or not?

There are several ways to implement a react webapp, different architectures and tech stacks to handle the client state. Redux its a very common library used to handle the app state through the combination of the following patters: a store and a reducer. It is a powerfull architecture but since we are prototyping it may not provide the desired flexibility. ([GraphQL & Redux](https://medium.com/nerd-for-tech/how-to-use-graphql-with-redux-50ad20ec051f))

### The Provider pattern

An other way to manage the app state is through the use of Context from the react library. A react context creates an inmutable object that can be updated through the createContext function. It also has a provider and a cosumer interface. The provider sets the state of the context, it can be placed in any part of the component tree but only the child components can make use of the consumer interface ([useContext hook](https://daveceddia.com/usecontext-hook/)) to get the context. A great review of this pattern can be found in the article [React Architecture: The React Provider Pattern by Morten Barklund](https://mortenbarklund.com/blog/react-architecture-provider-pattern/)

---





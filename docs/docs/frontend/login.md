# Login

The login architecture of the prototype is based in [this example from the official react-router-dom library](https://codesandbox.io/s/beautiful-voice-lnhek?from-embed=&file=/example.js:3668-3690). It implements a provider pattern to handle the authentication state.

## Login process

1. Fill login form: the user access the _/login_ page and fills the username and password.
2. Login mutation: the client sends a GraphQL mutation to the backend:
    1. Incorrect credentials: the user is asked to change the email or password, step 1.
    2. Correct credentials: the backend responds wtih the _user_ info and authorization _token_ (login resolver in the backend repo). This info is stored in _sessionStorage_ through the _useAuth_ hook (_./src/providers/Auth_), this implementation is based on this [guide of "How To Add Login Authentication to React Applications"](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications) .
3. Redirect: once the user has sucessfully logged in she is redirected to the _issue-badge_ page.

## Private routes

In order to generate a private space for users in the app, the implementation of a PrivateRoute component from [this example from the official react-router-dom library](https://codesandbox.io/s/beautiful-voice-lnhek?from-embed=&file=/example.js:3668-3690) as been applied. 
      
If a user tries to access a private area such as _/issue-badge_) the _<PrivateRoute\>_ component will redirect her to the login page. The checking process tries to access the _user_ info in the _sessionStorage_, if it doesn't exists the redirection is done through the use of [useLocation](https://reactrouter.com/web/api/Hooks/uselocation) and [useHistory](https://reactrouter.com/web/api/Hooks/usehistory) hooks from react-router library. More info in: _./src/components/PrivateRoute.js_.
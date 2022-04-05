# Login

The login architecture of the prototype is based in [this example from the official react-router-dom library](https://codesandbox.io/s/beautiful-voice-lnhek?from-embed=&file=/example.js:3668-3690). It implements a provider pattern to handle the authentication state.

## Login process

1. Fill login form: the user access the _/login_ page and fills the username and password.
2. Login mutation: the client sends a GraphQL mutation to the backend:
    1. Incorrect credentials: the user is asked to change the email or password, step 1.
    2. Correct credentials: the backend responds wtih the _user_ info and authorization _token_ (login resolver in the backend repo). This info is stored in _sessionStorage_ through the _useAuth_ hook (_./src/providers/Auth_), this implementation is based on this [guide of "How To Add Login Authentication to React Applications"](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications) .
3. Redirect: once the user has sucessfully logged in she is redirected to the _issue-badge_ page.

## Onboarding:

To highlight only one of the buttons, we use Button.js and we place a span for Joyride in the button with that text

To only show the tour he first time, we use the prop run and a callback function
When I usea disableBeacon on every step, we have no beacon but it obligues us to follow every step ¿?
Thus, the solution was to not render the close button of the onboarding, as we have the skip button which does the same. When you clicked the close button, a beacon appeared and I was not able to take it away.

[ok]Localstorage: problema = dar valor inicial solo una vez


Already done:
1. No beacon (the red dot)
2. 4 step only appears in the report button
3. The tour only renders the first time. However, if you refresh the page, it will appear again.


[ok] Map: in order to change the icon, we place a new icon called punteroMapa in the file config.json instead of the smart-logo.

Post-Reunión:

[ok] Onboarding: names are changed to spanish

Retry button: 
we use error to see if an error occurred in sendReport
we create a new retry button and show it when when an error occurs, not showing the end one
we do both with a hook called retry which is set to true when we 



usamos un infodialog que solo se mostrará una vez por cada retry, esto lo hacemos mediante open={showInfoDialogRetry && error}
de esta manera, cada vez que pulsamos el botón de reintentar, showInfoDialogRetry se pondrá a cierto por si vuelve a haber error.
[quité el setend]
setActiveStep(0) lo he quitado porque una vez sales al volver se pone solo a 0, y si lo ponía hacía rerender infinito

[ok] Retry button + [ok] infoDialog
     -> [] cuando pulsas enter se envía el formulario, por lo que si daba error sale

[ok] El done of onboarding changed to notDone

[ok]Sticky in CardList:

modaltitle change css to be sticky and top 0


[ok] Cambiar coordenadas de Barcelona 
    -> [ ] no centrado mapa
[ok] Daba error en casos reportados porque si la descripción estaba vacía y la región no petaba
[ok] Hacer sticky título y cross: he metido el título en un grid con className para que tenga fondo blanco. Para solucionar lo de que pasaban por arriba cambié el padding del container


import { Route, Redirect } from 'react-router'
import useAuth from '../providers/Auth/use'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({ children, ...other }) {
    let auth = useAuth()
    return (
        <Route
            {...other}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }, // Set history state to redirect once logged in
                        }}
                    />
                )
            }
        />
    )
}

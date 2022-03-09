# Users

## Queries

**allUsers() => <User\> [ ]**

Get all users from db, only admin users.

**userById( id: <String\> ) => <User\>**

Get user from db by id.

**me() => <User\>**

Get my user info from db. It uses the session token to extract id and query the db.

## Mutations

**signup( email: <String\>, password: <String\> ) => <AuthPayload\>**

Create a user record in the db.

**login( email: <String\>, password: <String\> ) => <AuthPayload\>**

Login.

**logout() => <User.connected>**

Logout.

**setAdmin( id: <String\> ) => <User\>**

Set user role to admin.

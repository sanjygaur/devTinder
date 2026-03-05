#DevTinder APIs
## AuthRouter::
-- POST /signup
-- POST /login
-- POST /logout

## ProfileRouter::
-- GET /profile/view
-- PATCH /profile /Edit
--PATCH /profile/ password / forgot PasswordAPI

## ConnectionRequestRouter::
-- POST /request / send /status /:UserId


-- POST / request /review / accepted /:requestId
-- POST / request /review / rejected /:requestId


UserRouter::
-- GET /user/ Connections
-- GET /user /requests /received /:requestId
-- GET /feed - gets you the profile of other users on platform



status: ignore ,interested ,accepted ,rejected
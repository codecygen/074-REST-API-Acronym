# Development Environment
- App is running on Node.js. For this app, MongoDB is used. Initial "acronym" collection is automatically created with entries upon starting the server for the first time.

- After installing the dependencies, start the server in development environment. If no environmental values are set, server will be running on port 3000.

## Requests
Following requests can be done to get the acronyms as a JSON response.

### GET Request
- localhost:3000/acronym?page=2&limit=3
- Query parameters can be conducted which are "page" and "limit" along with their numerical values for paginated result.

### POST Request
- localhost:3000/acronym
- POST request can be completed with "acronym" and "definition" keys along with their relevant value pairs.

### PATCH Request
- localhost:3000/acronym/:acronymID
- PATCH request can be completed with specified "acronymID". The request can be completed with "acronym" and/or "definition" keys along with their updated value pairs.

### DELETE Request
- localhost:3000/acronym/:acronymID
- DELETE request can be completed with specified "acronymID". The specified "acronymID" will be deleted from the database.
# getOut

## Features
* Search for sights
* Bookings
* Campsite Info
* Trips

### Bonus Features
* reviews
* Messaging other users

## Database
https://drawsql.app/getout/diagrams/getout#

## Routes
### API Endpoints
1. Blueprint: 'users', url_prefix = "/api/users"
    * GET /:id - Get all user info
    * POST / - Create new user
    * PUT /:id - Edit user info
    * DELETE /:id - Delete user
2. Blueprint: 'trips', url_prefix = "/api/trips"
    * GET / - get all trips
    * GET /:id - get one trip
    * PUT /:id - edit one trip
    * POST / - post a new trip
    * DELETE /:id - delete one trip
3. Blueprint: 'sites', url_prefix = "/api/sites"
    * GET / - get all sites
    * GET /:id - get singular site

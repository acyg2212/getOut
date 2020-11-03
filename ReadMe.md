# getOut

## Features
* Search for sights
* Bookings
* Campsite Info
* Reviews

### Bonus Features
* Messaging
* Host Profiles

## Database
https://drawsql.app/getout/diagrams/getout#

## Routes
### API Endpoints
1. Blueprint: 'users', url_prefix = "/api/users"
    * GET /:id - Get all user info
    * POST / - Create new user
    * PUT /:id - Edit user info
    * DELETE /:id - Delete user
2. Blueprint: 'reservations', url_prefix = "/api/reservations"
    * GET / - get all reservations
    * GET /:id - get one reservation
    * PUT /:id - edit one reservation
    * POST / - post a new reservation
    * DELETE /:id - delete one reservation
3. Blueprint: 'sites', url_prefix = "/api/sites"
    * GET / - get all sites
    * GET /:id - get singular site

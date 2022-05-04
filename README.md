# Happy houR API

### Erd

![alt text](/Project-4-ERD.jpg)

## Technologies
- Mongoose
- Express
- Axios
- Google Places API

## Installation Instructions
- Fork and clone this
- Run npm install to to install all necessary packages
- Get an api key for the google places api


## Route Tables

### Establishment Authentication

| Verb   | URI Pattern            | Controller Action |
|--------|------------------------|-------------------|
| POST   | `establishment/sign-up`             | `users signup`    |
| POST   | `establishment/sign-in`             | `users signin`    |
| PATCH  | `establishment/change-password` | `users changepw`  |
| DELETE | `establishment/sign-out`        | `users signout`   |

### Guest Authentication

| Verb   | URI Pattern            | Controller Action |
|--------|------------------------|-------------------|
| POST   | `guest/sign-up`             | `users signup`    |
| POST   | `guest/sign-in`             | `users signin`    |
| PATCH  | `guest/change-password` | `users changepw`  |
| DELETE | `guest/sign-out`        | `users signout`   |

### Hapy hours

| Verb   | URI Pattern            | Controller Action |
|--------|------------------------|-------------------|
| POST   | `/happy-hours`             | `create happy hour`    |
| GET   | `/happy-hours`             | `index of all happy hours`    |
| GET   | `/happy-hours/mine`             | `index of  user's happy hours`    |
| GET   | `/happy-hours/favorites`             | `index of user's favorited happy hours`    |
| GET   | `/happy-hours/index/:city`             | `index of happy hours in a city`    |
| GET   | `/happy-hours/index/:city/:tag`             | `index of happy hours in a city with a tag`    |
| GET   | `/happy-hours/:happyHourId`             | `show a happy hour`    |
| PATCH  | `/happy-hours/:happyHourId` | `update happy hour`  |
| DELETE | `/happy-hours/:happyHourId`        | `delete happy hour`   |

### Tags

| Verb   | URI Pattern            | Controller Action |
|--------|------------------------|-------------------|
| POST   | `/tags/:happyHourId`             | `add tag to happy hour`    |
| DELETE | `/tags/:happyHourId/:tagId`        | `remove tag from happy hour`   |

### Comments

| Verb   | URI Pattern            | Controller Action |
|--------|------------------------|-------------------|
| POST   | `/comments/:happyHourId`             | `add comment to happy hour`    |
| DELETE | `/comments/:happyHourId/:commentId`        | `remove comment from happy hour`   |

### Favorites

| Verb   | URI Pattern            | Controller Action |
|--------|------------------------|-------------------|
| POST   | `/favorites/:happyHourId`             | `add happy hour to user's favorites`    |
| DELETE | `/favorites/:happyHourId`        | `remove happy hour from user's favorites`   |

### Places

| Verb   | URI Pattern            | Controller Action |
|--------|------------------------|-------------------|
| GET   | `/places/:placeName/:apiKey`             | `get info from google places API`    |



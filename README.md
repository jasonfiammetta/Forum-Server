# Forum App Server

An Express.js API for a forum app using MongoDB and Mongoose.

I have created an app where Users can talk to each other by posting on a Forum.

# Deployed Sites

[Client](https://jasonfiammetta.github.io/Forum-Client/), repo hosted at [Client Repo](https://github.com/jasonfiammetta/Forum-Client)   
[Server](sheltered-crag-25267.herokuapp.com), repo hosted here

## Technologies Used

JavaScript
Node
Express
Mongoose/MongoDB

## Structure

This backend server uses Express.js to handle routing for incoming user, forum, and post requests.
The server responds with data on forums to the public, but will only create, edit, or destroy forums when authenticated users perform these actions.

## Wireframe

[Entity Relationship Diagram](images/erd.png)

### API

API documentation.

Example curl scripts are included in [`curl-scripts`](curl-scripts).

#### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/users`               | `users#show`      |
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/log-in`              | `users#login`     |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/log-out/`            | `users#logout`    |
| DELETE | `/delete-account`      | `users#deleteac`  |

#### Forum
| Verb   | URI Pattern            | Controller#Action    |
|--------|------------------------|----------------------|
| GET    | `/forums`              | `forums#show`        |
| GET    | `/forums/:id`          | `forums#showone`     |
| POST   | `/forums`              | `forums#create`      |
| PATCH  | `/forums/:id`          | `forums#changetitle` |
| DELETE | `/forums/:id`          | `forums#delete`      |

#### Post
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/forums/:id/post`     | `posts#create`    |

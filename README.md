# Forum App Server

An Express.js API for a forum app using MongoDB and Mongoose.

## Goals

I want to create an app where Users can talk to each other by posting on a Forum.

Users can log in with a secure password, and can log out manually, or exit the page.
Users can send messages to a forum and read messages from a forum.
Users can delete their accounts.
Users can edit their own posts.
Users can see the posts of others.
Users can create new forum boards.

## Structure

Structure of the app.


### API

API documentation.

Example curl scripts are included in [`curl-scripts`](curl-scripts).

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/log-in`             | `users#login`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/log-out/`        | `users#logout`   |

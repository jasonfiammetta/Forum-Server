#!/bin/bash

API="http://localhost:4741"
URL_PATH="/log-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo

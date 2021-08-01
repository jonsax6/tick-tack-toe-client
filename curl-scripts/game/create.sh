# TOKEN="6f2c0f0c325229fbbbef8e37b97759e3" sh curl-scripts/game/create.sh

# don't use a password you use for any real websites!
curl "https://tic-tac-toe-api-development.herokuapp.com/games" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{}'

echo

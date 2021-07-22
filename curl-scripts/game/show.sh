# TOKEN="ac47a9f33e765b5d9f8db45d1645bfe1" ID="60f57ce227b22b00176e6c9f" sh curl-scripts/game/show.sh

# don't use a password you use for any real websites!
curl "https://tic-tac-toe-api-development.herokuapp.com/games/${ID}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}"

echo

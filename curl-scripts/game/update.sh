# TOKEN="6f2c0f0c325229fbbbef8e37b97759e3" INDEX="0" VALUE="X" sh curl-scripts/game/update.sh

# don't use a password you use for any real websites!
curl "https://tic-tac-toe-api-development.herokuapp.com/games/60f2f1a2c0af3300174bdf4b" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "game": {
      "cell": {
        "index": "'"${INDEX}"'",
        "value": "'"${VALUE}"'"
      },
      "over": false
    }
  }'

echo

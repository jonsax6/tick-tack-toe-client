# TOKEN="ca561399b5c5f3392b0e7b1365bc2719" sh curl-scripts/auth/sign-out.sh

curl "https://tic-tac-toe-api-development.herokuapp.com/sign-out" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}"

echo

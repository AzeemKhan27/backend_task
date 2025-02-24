Follow these commands for run the code:

docker-compose up --build
docker exec -it mongo mongosh receiver_db --eval "db.users.find().pretty()"
docker exec -it mongo mongosh receiver_db --eval "db.processed_users.find().pretty()"

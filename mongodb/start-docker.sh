docker run \
-p 27017:27017 \
--rm \
-d \
--name biubiubiu \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=password \
-e MONGO_INITDB_DATABASE=test \
-v $(pwd)/mongodb/init:/docker-entrypoint-initdb.d \
mongo

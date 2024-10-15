cd ./calculator && cp .env.example .env && cd ..
cd ./evaluator && cp .env.example .env && cd ..
docker network create calculator-network
docker-compose -f ./evaluator/docker-compose.yaml up -d && docker-compose -f ./calculator/docker-compose.yaml up -d

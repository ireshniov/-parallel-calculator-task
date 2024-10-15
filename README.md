#### Prerequisites
* node >18
* docker-compose

#### Start
Will setup and start calculator & evaluator services
```shell
npm run start
```

#### Evaluation

```shell
curl --location '127.0.0.1:8080/evaluate' \
--header 'Content-Type: application/json' \
--data '{
    "expression": "(1-1)*2+3*(1-3+4)+10/2"
}'
```

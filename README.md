#### Prerequisites
* node >18
* docker-compose

#### Start
Setup and start calculator and evaluator services in shared network
```shell
sh start.sh
```

#### Evaluation

```shell
curl --location '127.0.0.1:8080/evaluate' \
--header 'Content-Type: application/json' \
--data '{
    "expression": "(1-1)*2+3*(1-3+4)+10/2"
}'
```

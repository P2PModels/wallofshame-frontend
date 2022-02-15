# Deployment workflow

## Containers

This project has been containerized using Docker. Learn about it in the following tutorial (in spanish) [DOCKER 2021 - De NOVATO a PRO! (CURSO COMPLETO)](https://www.youtube.com/watch?v=CV_Uf3Dq-EU)

## Deploying the project

The first step for deploying our prototype to the production environment is to build the source code for each service (users and blockchain):

```
$ npm run build
```

Then build the docker images and start the containers:

```
$ docker-compose up --build
```

## Database initialization

Each microservice has its own db. The control mecanism to decide wheter to remove the db and seed it again or not is a flag file located in the working directory of the container, under _./init_flag/_. This file is persistent through a docker volume mapped to the same path of the project.

!!! warning "Initialize the database"
    To completly remove the database and seed it again  remove the _flag.txt_ file. This process can't be restored.


## Network and exposed ports

Four services are defined:

-   api_gateway: GraphQL Schema Stitching API gateway.
-   users_service: GraphQL API for users management.
-   blockchain_service: GraphQL API for badges management.
-   db: database service, hosts two databases (blockchain and users) for each of the microservices.

All services are connected through the _main_ network and connect with each other with the networ alias.

The only port exposed to the host is the API gateway endpoint located in port 4000.

!!! warning "API Gateway dependencies"
    The API Gateway has to wait until the microservices are ready. In order to do that the "wait-on" library has been used to listen to the microservice tcp ports and wait until all of them are ready. Trying to verify if the service is ready through an HTTP call from the _wait-on_ library will result in an error since a GraphQL endpoint returns 400 error if no proper body is provided.
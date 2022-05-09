# Deployment workflow

## What is a deployment workflow?

For us, the deployment workflow is <b>the process that involves all the steps needed to take our local prototype to the production server</b>. This process can be more or less automatized being the Continuos Delivery/Continous Integration (CD/CI) paradigm our main reference and horizon. Nevertheless this is a research prototype and therefore the dynamic nature of the developments make CD/CI a very complex and stability dependant (we change web server configs all the time) approach, thats why we dont implement 100% automatic deployment.

## What is our deployment workflow?

Our workflow includes the following steps:
    1. Containerize micro-services
    2. Configure the multi-container app
    3. Manual deployment and web server configuration

### Containerize micro-services

First we start by <b>containerizing each individual micro-service</b> from our application. One of the main reason to containerize an app or service is to reduce deployment errors related to dependecies, e.g. different OS's, different node versions or any other library from our local machine to the production server. Another important reason is that it also helps with security concerns since our app won't be able to change configurations outside its container. So the first task to tuckle is to develope a script to <b>automatize building</b>. In this project we use Docker to containerize our services, in Docker, build scripts are written in Dockerfiles. Here is an example of a script we use for the users and cases services:

```Dockerfile
FROM node:12-alpine

WORKDIR /app
COPY . .

RUN npm install --production
RUN npm run build

EXPOSE $PORT

CMD ["/bin/sh", "./scripts/init_container.sh"]

```
What this code does is:

- "FROM node:12-alpine": loads an image of alpine OS with node v12 installed.
- "WORKDIR /app": sets the /app directory as the working directory inside the container. This is used in case we enter the container console.
- "COPY . .": copies all files from the current directory into the working directory.
- "RUN npm install --production": installs all dependencies optimized for production.
- "RUN npm run build": cleans and generates the prisma client.
- "EXPOSE $PORT": exposes the port assigned by the environment variable PORT to the current network (will be the docker-compose network).
- "CMD ["/bin/sh", "./scripts/init_container.sh"]": runs the <em>in_container.sh</em> script, a script to allow database reset and start the service.

In order to test your container you can run:
 
```bash
docker build -t my_service:latest .
docker container start my_service:latest
```

If you want to learn about Docker in spanish check the following tutorial: [DOCKER 2021 - De NOVATO a PRO! (CURSO COMPLETO)](https://www.youtube.com/watch?v=CV_Uf3Dq-EU)

### Configure the multi-container app


## Containers


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

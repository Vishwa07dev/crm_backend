# CRM App backend [ Session 6 ]
## _Learning the development of RESTful APIs for backend_ 

This code base contains logic/structure  for creating the Restful APIs for the CRM app
## Features
* Call the Notification service everytime a new ticket is created, to send email to the reporter and assignee
* Call the Notification service everytime a ticket is updated, to send email to all the stakeholders


More details around this can be found [here](https://docs.google.com/document/d/1x866VrSsjchFf7dhD7U2zYLbzj-tt34STWuDMMyL6Uc/edit?usp=sharing) 

## How is the code organized in this repo ?
The whole repo is divided into multiple branches. Each branch contains code for a specific concept. For example _session1_ has the code base for user registration and login . Each branch is built on the top of the previous branch

## Prerequisite
- Understanding of Node.js
- Understanding of Async Await
- Mongo DB locally installed and running

## Tech
- Node.js
- Mongodb


## Installation

this app requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

Before starting the server please ensure 
1. mongodb server is locally installed and running on the default port
2. Ensure that notifcation service is up and running. More details on the steps of running that application can be found here : https://github.com/Vishwa07dev/NotificationService

```sh
cd crm_backend
npm install
npm run devStart
```

## Development

Want to improve? Great!
Make the changes and raise a PR. Reach out to me over kankvish@gmail.com

# Daily-planner
Full-stack application for single-user task management solution.


## Prerequisites
This documentation assumes the user uses Windows and has the following programs installed and tied to their PATH:
- Node.js
- npm
- Maven
- MongoDB
- Java 8

## First-time Setup
Run `build.sh` to be taken through the initial setup for the app to start.
- Webpage runs on localhost:3000
- API runs on localhost:8080
- Mongo runs on localhost:27017

### Known defects
- Time zones are not synced between UI and Back-end, causing a 5 hour discrepancy
- API day difference calculation can be improved

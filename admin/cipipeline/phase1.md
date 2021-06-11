# Pipeline Status

Our pipeline file is located in .github/workflows folder.

This is what we currently have for our CI/CD Pipeline. Each developer will have their own branch that they will update. 
Then they can create a pull request to have their code merged into either the front end or back end branch. 
There will be checks that need to be passed before merging into these branches. Finally at the end, pull requests can be made to merge into the main branch.


## GitHub Actions
- We will use this for automating most of our testing and code styling checks. We can configure it in the pipeline.yml file
- GitHub Actions runs when there is a push to the following branches: front-end_drop, back-end_drop, and ci-cd-pipeline-1. 
- It also runs on pull requests to the branches front-end_drop, back-end_drop, and main.


## Generate JSDocs
- JSDocs helps with formatting. We run this in GitHub Actions at the beginning
- It is running and working


## JEST
- JEST is for creating unit tests for our JavaScript files. We will run this with GitHub Actions.
- Working in GitHub Actions
- Need to write tests


## ES Lint
- ESLint is for checking code style.
- In progress: Currently working, but may encounter problems later
- May need to configure


## Puppeteer
- Puppeteer is used for JavaScript End to End Testing
- In Planning / Progress
- Still need to write tests

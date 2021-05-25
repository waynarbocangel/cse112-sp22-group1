# Pipeline Status

Our pipeline file is located in .github/workflows folder.

GitHub Actions and pipeline runs when there is a push to the following branches: front-end_drop, back-end_drop, and ci-cd-pipeline-1. It also runs on pull requests to the branches front-end_drop, back-end_drop, and main.


## GitHub Actions
- We will use this for automating most of our testing and code styling checks. We can configure it in the pipeline.yml file


## Generate JSDocs
- JSDocs helps with formatting. We run this in GitHub Actions at the beginning
- Currently working


## JEST
- JEST is for creating unit tests for our JavaScript files. We will run this with GitHub Actions.
- Working in GitHub Actions
- Need to write tests


## ES Lint
- ESLint is for checking code style.
- In progress
- May need to configure


## Puppeteer
- Puppeteer is used for JavaScript End to End Testing
- In Planning / Progress
- Still need to write tests

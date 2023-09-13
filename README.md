# Nimo Market - Cryptocurrencies Tracker

This project serves as Nimo Industries' code test, primarily designed to monitor cryptocurrency prices using data retrieved from the [CoinGecko](https://www.coingecko.com/) website via its [public API](https://www.coingecko.com/en/api/documentation).

The website has been deployed by **Vercel**. The link can be found at `About` section of repo.


## Install Node.js & npm

In order to run `Nimo Market` crypto currencies tracker, you have to install following components. If you already installed required components, please check support version and process to next section.

- The preferred version of `node` is version `v16.. and later`.

- The preferred version of `node` is version `v9.. and later`.

- If you don't have `node` and `npm` installed, click link below to install `node` and `npm`.

- [Download NODE and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

- After installation, open any `command line` and type in `node -v` and `npm -v` to check installed version of node.



## Run Application

- When first running this application, you need to run `npm install` command first to install required packages needed to run the application. If the installation showing errors, please run `npm install --force` to install the packages. Sometimes the installation fails due to compatibility issues.
- After installed all packages, simply run `npm start` to run the React.js application and the frontend application will be run on localhost with specific path of the port.
- The default port path is http://localhost:3000/



## Known Issues

- The landing page's table may become stacked during loading, which could be a result of the API request being blocked due to a high frequency of requests. We recommend trying again later.

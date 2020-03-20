We want the most recent file in the folder at https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports

## Setup
- clone the git repository
- use node version manager
  - `nvm install 12.16.1` and `nvm use`
- `npm install` to get all the node modules
- adjust app variables in settings.js as needed for your deployment
- use a tool like [PM2](https://github.com/Unitech/pm2) or [Forever](https://github.com/foreverjs/forever) to keep the application up and running on your server even after a reboot, server downtime, etc.
- `pm2 start app.js` or something like `pm2 start app.js --name="csse_3016" --interpreter=/home/ubuntu/.nvm/versions/node/v12.16.1/bin/node`
const settings = require('./settings.js');
const fs = require('fs');
const path = require('path');

const needle = require('needle');
const moment = require('moment');
const express = require('express');
const app = express();

const outputFile = path.join(__dirname,'public',settings.app.outputFile);

app.use(express.static(path.join(__dirname, 'public')))
app.listen(settings.app.port, () => console.log('app listening on port ' + settings.app.port));

var lastUploaded = '';


async function dataGrab() {
    const j = 8; // we'll check up to the last 7 days
    for (let i = 0; i < j; i++) {
      var myDate = moment().subtract(i, 'days').format(settings.app.fileNameFormat);
      var myUrl = settings.app.baseUrl + myDate + settings.app.fileExtension;
      
      if (lastUploaded === myDate) {
        console.log("Looks like we've aready fetched for " + myDate);
        i = i+j;
      } else {
        await needle('get', myUrl)
          .then(function(response) {
            if (response.statusCode === 200) {
              console.log('statusCode:', response.statusCode);
              lastUploaded = myDate;
              if (fs.existsSync(outputFile)) {
                fs.unlinkSync(outputFile);
              }
              fs.writeFileSync(outputFile, response.body);
              console.log("Found " + myDate + settings.app.fileExtension + " and wrote to " + outputFile);
              i = i+j;
            } else {
              console.log('statusCode:', response.statusCode);
              console.log('Did not find ' + myDate + settings.app.fileExtension);
            }
          })
          .catch(function(err) {
            console.log(err)
            console.log('Something went wrong!')
          })
      }
    }
    
}

// initialize...
dataGrab();
// and set to run every 20 minutes...
var CronJob = require('cron').CronJob;
new CronJob('0 */20 * * * *', function() {
  dataGrab()
}, null, true, 'America/New_York').start();
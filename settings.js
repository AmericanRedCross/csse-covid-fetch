var settings = {}

settings.app = {
	port: 3016,
  baseUrl: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/',
  fileNameFormat: 'MM-DD-YYYY',
  fileExtension: '.csv',
  outputFile: 'data.csv'
}

module.exports = settings;
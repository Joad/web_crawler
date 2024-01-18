const { argv } = require('node:process')
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')
async function main() {
	if (argv.length != 3) {
		console.log('Exactly one argument required')
		return
	}

	const baseURL = argv[2]
	console.log(`Crawler starting at: ${baseURL}`)
	const result = await crawlPage(baseURL, baseURL, {})
	printReport(result)
}

main()
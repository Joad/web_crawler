function printReport(pages) {
	const sortedPages = sortPages(pages)
	console.log('---------- Report starting ----------')
	for (const [page, count] of sortedPages) {
		console.log(`Found ${count} internal links to ${page}`)
	}
}

function sortPages(pages) {
	const sortedPages = Object.entries(pages)
	sortedPages.sort((a, b) => b[1] - a[1])
	return sortedPages
}

module.exports = {
	printReport,
	sortPages
}
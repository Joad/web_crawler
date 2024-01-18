const { JSDOM } = require('jsdom')
function normalizeURL(url) {
	const urlObj = new URL(url)
	const pathname = urlObj.pathname ? urlObj.pathname.slice(0, -1) : ''
	return `${urlObj.hostname}${pathname}`
}

function getURLsFromHTML(html, baseURL) {
	const dom = new JSDOM(html)
	const links = dom.window.document.querySelectorAll('a')
	const urls = []
	for (const { href } of links) {
		if (href.startsWith('/')) {
			urls.push(`${baseURL}${href}`)
		} else {
			urls.push(href)
		}
	}
	return urls
}

async function crawlPage(baseURL, currentURL, pages) {
	const base = new URL(baseURL)
	const current = new URL(currentURL)
	if (base.hostname !== current.hostname) {
		return pages
	}

	const normalized = normalizeURL(currentURL)
	if (normalized in pages) {
		pages[normalized]++
		return pages
	}

	if (currentURL === baseURL) {
		pages[normalized] = 0
	} else {
		pages[normalized] = 1
	}


	try {
		console.log(`Fetching: ${currentURL}`)
		const response = await fetch(currentURL)
		if (response.status != 200) {
			console.log('Error retrieving site')
			return pages
		}

		if (!response.headers.get('Content-Type').includes('text/html')) {
			console.log('Did not receive html')
			return pages
		}

		html = await response.text()
		const urls = getURLsFromHTML(html, baseURL)
		for (const url of urls) {
			await crawlPage(baseURL, url, pages)
		}
		return pages
	} catch (err) {
		console.log(`Error retrieving page: ${err.message}`)
		return pages
	}
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage
}
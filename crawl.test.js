const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('removes the protocal', () => {
	expect(normalizeURL('http://example.com')).toBe('example.com')
})

test('removes the last slash', () => {
	expect(normalizeURL('http://example.com/path/')).toBe('example.com/path')
})

test('lowercases capitals in hostname', () => {
	expect(normalizeURL('https://Example.com/path/')).toBe('example.com/path')
})

test('gets a url from html', () => {
	const urls = getURLsFromHTML(`
		<html>
			<body>
				<a href="https://example.com/path/">example</a>
			</body>
		</html>
	`, 'https://example.com')
	expect(urls).toEqual(['https://example.com/path/'])
})

test('adds the base url to relative links', () => {
	const urls = getURLsFromHTML(`
		<html>
			<body>
				<a href="/path/">example</a>
			</body>
		</html>
	`, 'https://example.com')
	expect(urls).toEqual(['https://example.com/path/'])
})

test('finds multiple urls', () => {
	const urls = getURLsFromHTML(`
		<html>
			<body>
				<a href="https://example.com/path1/">example</a>
				<p>Link in a paragraph to: <a href="/path2/">example</a></p>
				<a href="https://example.com/path3">example</a>
			</body>
		</html>
	`, 'https://example.com')
	expect(urls).toEqual(['https://example.com/path1/', 'https://example.com/path2/', 'https://example.com/path3'])
})

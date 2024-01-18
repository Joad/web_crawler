const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sorts some pages', () => {
	const pages = {
		test1: 10,
		test2: 5,
		test3: 6,
		test4: 15,
		test5: 7
	}
	const result = sortPages(pages)
	const expected = [
		['test4', 15],
		['test1', 10],
		['test5', 7],
		['test3', 6],
		['test2', 5]
	]
	expect(result).toEqual(expected)
})

test('sort no pages', () => {
	const pages = {}
	const result = sortPages(pages)
	const expected = []
	expect(result).toEqual(expected)
})
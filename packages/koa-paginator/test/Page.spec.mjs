import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Paginator from '../src/index.mjs';

describe('::Page', function () {
	it('should create a page.', function () {
		new Paginator.Page();
	});

	describe('.total', function () {
		it('should get total.', function () {
			const page = new Paginator.Page();

			assert.equal(page.total, 0);
		});

		it('should throw if bad total.', function () {
			const page = new Paginator.Page();

			assert.throws(() => page.total = -1, {
				name: 'TypeError',
				message: 'Invalid ".total", one "integer >= 0" expected.',
			});
		});

		it('should set total.', function () {
			const page = new Paginator.Page();

			page.total = 10;
			assert.equal(page.total, 10);
		});
	});

	describe('.size', function () {
		it('should get size', function () {
			const page = new Paginator.Page();

			assert.equal(page.size, 10);
		});

		it('should throw if bad size.', function () {
			const page = new Paginator.Page();

			assert.throws(() => page.size = -1, {
				name: 'TypeError',
				message: 'Invalid ".size", one "integer >= 1" expected.',
			});
		});

		it('should set size.', function () {
			const page = new Paginator.Page();

			page.size = 20;
			assert.equal(page.size, 20);
		});
	});

	describe('.length', function () {
		it('should .length === .size', function () {
			const page = new Paginator.Page();

			assert.equal(page.length, page.size);
		});
	});

	describe('.number', function () {
		it('should get number.', function () {
			const page = new Paginator.Page();

			assert.equal(page.number, 0);
		});

		it('should throw if bad number.', function () {
			const page = new Paginator.Page();

			assert.throws(() => page.number = -1, {
				name: 'TypeError',
				message: 'Invalid ".number", one "integer >= 0" expected.',
			});
		});

		it('should set number.', function () {
			const page = new Paginator.Page();

			page.number = 1;
			assert.equal(page.number, 1);
		});
	});

	describe('.list', function () {
		it('should get list.', function () {
			const page = new Paginator.Page();

			assert.deepEqual(page.list, []);
		});

		it('should throw if bad list.', function () {
			const page = new Paginator.Page();

			assert.throws(() => page.list = null, {
				name: 'TypeError',
				message: 'Invalid ".list", one "array" expected.',
			});
		});

		it('should throw if bad list length.', function () {
			const page = new Paginator.Page();

			assert.throws(() => page.list = new Array(11).fill(null), {
				name: 'Error',
				message: 'List length(11) MUST NOT > size(10)',
			});
		});

		it('should set list.', function () {
			const page = new Paginator.Page();

			page.list = [null, null, null];
			assert.deepEqual(page.list, [null, null, null]);
		});
	});

	describe('.start', function () {
		it('should get start.', function () {
			const page = new Paginator.Page();

			assert.equal(page.start, 0);
			page.number = 2;
			assert.equal(page.start, 20);
		});
	});

	describe('.end', function () {
		it('should get end.', function () {
			const page = new Paginator.Page();

			assert.equal(page.end, 10);
			page.number = 2;
			assert.equal(page.end, 30);
		});
	});

	describe('.filter', function () {
		it('should set/get filter.', function () {
			const page = new Paginator.Page();

			assert.equal(page.filter, null);
			page.filter = {};
			assert.deepEqual(page.filter, {});
		});
	});

	describe('.toJSON()', function () {
		it('should get a json.', function () {
			const page = new Paginator.Page();
			const json = JSON.parse(JSON.stringify(page));

			assert.deepEqual(json, {
				size: 10,
				number: 0,
				total: 0,
				list: [],
				filter: null,
			});
		});
	});
});

import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Paginator from '../src/index.mjs';

describe('::Slice', function () {
	it('should create a slice query.', function () {
		new Paginator.Slice();
	});


	describe('.index', function () {
		it('should get index.', function () {
			const slice = new Paginator.Slice();

			assert.equal(slice.index, 0);
		});

		it('should throw if bad index.', function () {
			assert.throws(() => new Paginator.Slice().index = -1, {
				name: 'TypeError',
				message: 'Invalid ".index", one "integer >= 0" expected.',
			});
		});

		it('should set a new index.', function () {
			const slice = new Paginator.Slice();

			slice.index = 1;
			assert.equal(slice.index, 1);
		});
	});

	describe('.length', function () {
		it('should get length.', function () {
			assert.equal(new Paginator.Slice().length, 0);
		});

		it('should throw if bad length.', function () {
			assert.throws(() => new Paginator.Slice().length = -1, {
				name: 'TypeError',
				message: 'Invalid ".length", one "integer >= 0" expected.',
			});
		});

		it('should set a new length.', function () {
			const slice = new Paginator.Slice();

			slice.length = 1;
			assert.equal(slice.length, 1);
		});
	});

	describe('.start', function () {
		it('should be ".index" as .start.', function () {
			const slice = new Paginator.Slice();

			slice.index = 2;
			assert.equal(slice.index, 2);
			assert.equal(slice.start, 2);
		});
	});

	describe('.end', function () {
		it('should be index + length.', function () {
			const slice = new Paginator.Slice();

			slice.index = 2;
			slice.length = 3;
			assert.equal(slice.index, 2);
			assert.equal(slice.end, 5);
		});
	});

	describe('.toJSON()', function () {
		const slice = new Paginator.Slice();
		const json = JSON.parse(JSON.stringify(slice));

		assert.deepEqual(json, {
			index: 0,
			length: 0,
			total: 0,
			list: [],
			filter: null,
		});
	});
});

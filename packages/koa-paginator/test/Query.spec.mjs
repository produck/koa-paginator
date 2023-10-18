import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import { Query } from '../src/Query.mjs';

describe('::Slice', function () {
	it('should .length === 0', function () {
		const query = new Query();

		assert.equal(query.length, 0);
	});
});

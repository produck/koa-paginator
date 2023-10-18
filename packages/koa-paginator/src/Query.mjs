export class Query {
	#total = 0;

	get total() {
		return this.#total;
	}

	set total(value) {
		if (!Number.isInteger(value) || value < 0) {
			throw new TypeError('Invalid ".total", one "integer >= 0" expected.');
		}

		this.#total = value;
	}

	filter = null;

	#list = [];

	get list() {
		return [...this.#list];
	}

	set list(value) {
		if (!Array.isArray(value)) {
			throw new TypeError('Invalid ".list", one "array" expected.');
		}

		if (value.length > this.length) {
			throw new Error(`List length(${value.length}) MUST NOT > size(${this.length})`);
		}

		this.#list.splice(0);
		this.#list.push(...value);
	}

	constructor() {
		Object.seal(this);
	}

	get length() {
		return 0;
	}
}

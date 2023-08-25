export class Page {
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

	#size = 10;

	get size() {
		return this.#size;
	}

	set size(value) {
		if (!Number.isInteger(value) || value < 1) {
			throw new TypeError('Invalid ".size", one "integer >= 1" expected.');
		}

		this.#size = value;
		this.#list = [];
	}

	#number = 0;

	get number() {
		return this.#number;
	}

	set number(value) {
		if (!Number.isInteger(value) || value < 0) {
			throw new TypeError('Invalid ".number", one "integer >= 0" expected.');
		}

		this.#number = value;
	}

	#list = [];

	get list() {
		return [...this.#list];
	}

	set list(value) {
		if (!Array.isArray(value)) {
			throw new TypeError('Invalid ".list", one "array" expected.');
		}

		if (value.length > this.#size) {
			throw new Error(`List length(${value.length}) MUST NOT larger then size(${this.#size})`);
		}

		this.#list.splice(0);
		this.#list.push(...value);
	}

	get start() {
		return this.#number * this.#size;
	}

	get end() {
		return this.start + this.#size;
	}

	filter = null;

	toJSON() {
		const { size, number, total, list, filter } = this;

		return { size, number, total, list, filter };
	}

	constructor() {
		Object.seal(this);
	}
}

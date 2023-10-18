import { Query } from './Query.mjs';

export class Page extends Query {
	get length() {
		return this.size;
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
		this.list = [];
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

	get start() {
		return this.#number * this.#size;
	}

	get end() {
		return this.start + this.#size;
	}

	toJSON() {
		const { size, number, total, list, filter } = this;

		return { size, number, total, list, filter };
	}
}

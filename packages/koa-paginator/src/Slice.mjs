import { Query } from './Query.mjs';

export class Slice extends Query {
	#index = 0;

	get index() {
		return this.#index;
	}

	set index(value) {
		if (!Number.isInteger(value) || value < 0) {
			throw new TypeError('Invalid ".index", one "integer >= 0" expected.');
		}

		this.#index = value;
	}

	#length = 0;

	get length() {
		return this.#length;
	}

	set length(value) {
		if (!Number.isInteger(value) || value < 0) {
			throw new TypeError('Invalid ".length", one "integer >= 0" expected.');
		}

		this.#length = value;
		this.list = [];
	}

	get start() {
		return this.#index;
	}

	get end() {
		return this.#index + this.#length;
	}

	toJSON() {
		const { index, length, total, list, filter } = this;

		return { index, length, total, list, filter };
	}
}

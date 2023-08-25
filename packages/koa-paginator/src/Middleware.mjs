import { Page } from './Page.mjs';

export const Middleware = function KoaPaginatorMiddleware(init, onError = () => {}) {
	if (typeof init !== 'function') {
		throw new TypeError('Invalid "init", one "function" expected.');
	}

	if (typeof onError !== 'function') {
		throw new TypeError('Invalid "onError", one "function" expected.');
	}

	return async function handlePagination(ctx, next) {
		const page = new Page();

		try {
			await init(ctx, page);
		} catch (error) {
			onError(error);

			return ctx.throw(400, 'Bad page data.');
		}

		ctx.page = page;

		return next();
	};
};

import { Page } from './Page.mjs';
import { Slice } from './Slice.mjs';

function KoaPaginatorMiddlewareProvider(Query, key) {
	return function KoaPaginatorMiddleware(init, onError = () => {}) {
		if (typeof init !== 'function') {
			throw new TypeError('Invalid "init", one "function" expected.');
		}

		if (typeof onError !== 'function') {
			throw new TypeError('Invalid "onError", one "function" expected.');
		}

		return async function handlePagination(ctx, next) {
			const query = new Query();

			try {
				await init(ctx, query);
			} catch (error) {
				onError(error);

				return ctx.throw(400, 'Bad page data.');
			}

			ctx[key] = query;

			return next();
		};
	};
}

const PageMiddleware = KoaPaginatorMiddlewareProvider(Page, 'page');
const SliceMiddleware = KoaPaginatorMiddlewareProvider(Slice, 'slice');

export {
	PageMiddleware as Page,
	SliceMiddleware as Slice,
};

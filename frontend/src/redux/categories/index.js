import {
	getUpdatedFilter,
	getProductsSorted,
	getProductsFiltered,
	getAppliedFilters
} from './helpers';

const initialState = {
	initialProducts: [],
	filteredProducts: [],
	filter: {
		tags: {
			priceRange: {
				'0-99': false,
				'100-199': false,
				'200-299': false,
				'300-399': false,
				'400-499': false,
			},
		},
		query: '',
		sort: {
			sortBy: 'price',
			sortType: 'asc'
		}
	},
	pagination: {
		paginatedProducts: [],
		curPage: 1,
		totalPages: 1,
		filteredPages: 1,
		countPerPage: 5,		
		countCurrent: 5,
	}
}

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case 'categories/initProducts': {
			const products = action.payload;
			const totalPages = Math.ceil(products.length / 5);			 

			const start = 0;
			const end = state.pagination.countPerPage;

			return {
				...state,
				initialProducts: products,
				filteredProducts: products,
				pagination: {
					...state.pagination,
					totalPages,
					filteredPages: totalPages,
					curPage: 1,
					paginatedProducts: products.slice(start, end)
				}
			}
		};
		case 'categories/toggleFilter': {
			const updatedFilter = getUpdatedFilter(state.filter, action.payload);
			const updatedProducts = getProductsFiltered(state.initialProducts, updatedFilter);

			const filteredPages = Math.ceil(updatedProducts.length / state.pagination.countPerPage)
			const curPage = 1;
			const start = 0, end = state.pagination.countPerPage;
			const paginatedProducts = updatedProducts.slice(start, end);

			return {
				...state,
				filter: updatedFilter,
				filteredProducts: updatedProducts,
				pagination: {
					...state.pagination,
					paginatedProducts,
					filteredPages,
					curPage
				}
			}
		};
		case 'categories/applySort': {						

			const sortedProducts = getProductsSorted([...state.filteredProducts], action.payload);

			const filteredPages = Math.ceil(sortedProducts.length / state.pagination.countPerPage)
			const curPage = 1;
			const start = 0, end = state.pagination.countPerPage;
			const paginatedProducts = sortedProducts.slice(start, end);

			return {
				...state,
				filter: {
					...state.filter,
					sort: action.payload
				},
				pagination: {
					...state.pagination,
					paginatedProducts,
					curPage,
					filteredPages
				},
				filteredProducts: sortedProducts
			}
		};
		case 'categories/setSearch': {
			const searchQuery = action.payload;

			return {
				...state,
				filter: {
					...state.filter,
					query: searchQuery
				},				
			}
		}
		case 'categories/setPage' : {
			const offset = action.payload.offset;
			
			const curPage = Math.max(state.pagination.curPage + offset, 1);
			const perPage = state.pagination.countPerPage;
			
			const [start, end] = [perPage * (curPage - 1), curPage * perPage]
			
			const paginatedProducts = state.filteredProducts.slice(start, end);

			return {
				...state,
				pagination: {
					...state.pagination,
					curPage,
					paginatedProducts,

				}
			}
		};
		case 'categories/setExactPage' : {
			const page = action.payload.page;
			
			const curPage = page;
			const perPage = state.pagination.countPerPage;
			
			const [start, end] = [perPage * (curPage - 1), curPage * perPage]
			
			const paginatedProducts = state.filteredProducts.slice(start, end);

			return {
				...state,
				pagination: {
					...state.pagination,
					curPage,
					paginatedProducts,					
				}
			}
		};
		default: return state;
	}	
}

export default reducer;
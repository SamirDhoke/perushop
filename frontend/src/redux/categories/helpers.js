export const getAppliedFilters = filters => {
	const trueKeys = {
		priceRange: []
	}

	const { priceRange } = filters;

	for (let range in priceRange) {
		if ( priceRange[range] ) { 
			trueKeys.priceRange.push(range)
		}
	}

	return trueKeys;
}

export const getUpdatedFilter = (filter, filterTag) => {
	const selectedFilter = filterTag.filter;
	const filterValue = filterTag.value;

	return {
		...filter,
		tags: {
			...filter.tags,
			[selectedFilter]: {
				...filter.tags[selectedFilter],
				[filterValue]: ! filter.tags[selectedFilter][filterValue]
			}
		}
	}
}

export const getProductsFiltered = (products, filter) => {
	
	const appliedFilters = getAppliedFilters(filter.tags);
	const filterKeys = Object.keys(appliedFilters);

	const updatedProducts = products.filter(product => {
		return filterKeys.every(filterKey => {
			if (!appliedFilters[filterKey].length) {
				return true;
			}

			if (filterKey === 'priceRange') {
				return appliedFilters[filterKey].some(range => {
					const [min, max] = range.split('-').map(n => Number(n));
					return product.price <= max && product.price >= min;
				})
			}

			return appliedFilters[filterKey].includes(product[filterKey]);
		})
	});

	return updatedProducts;
}

const sortAscByField = (arr, field) => {
		
	const compareFunc = (a, b) => {
		if ( a[field] < b[field] ) {
			return -1;
		} else {
			return 1;
		}
	};

	return arr.sort(compareFunc);
}

const sortDescByField = (arr, field) => {

	const compareFunc = (a, b) => {
		if ( b[field] > a[field] ) {
			return 1;
		} else {
			return -1;
		}
	};

	return arr.sort(compareFunc);
}

export const getProductsSorted = (products, sort) => {
	console.log('Inside sorting function', sort)

	let sortedProducts;

	if (sort.sortType === 'A-Z') {
		sortedProducts = sortAscByField(products, sort.sortBy.toLowerCase())
	} else {
		sortedProducts = sortDescByField(products, sort.sortBy.toLowerCase())
	}

	return sortedProducts;
}
import React from 'react';
import { connect } from 'react-redux';

import ProductList from './ProductList';

const Pagination = props => {
	const { pagination } = props;
	const { setNextPage, setExactPage } = props;
	const { curPage, filteredPages, paginatedProducts } = pagination;

	const handlePaginateNext = () => {
		setNextPage(1);
	}

	const handlePaginatePrev = () => {
		setNextPage(-1);
	}

	const handlePaginateExact = (e) => {
		const page = Number(e.target.dataset.page);
		setExactPage(page);
	}	

	return (
		<div className="flex flex-col">
			<div>
				<ProductList products={paginatedProducts} />
			</div>

			<div className="nav flex px-2 mt-8 self-center items-center gap-2">
				<button 
					onClick={handlePaginatePrev}
					className="border-2 border-green-200 rounded-md px-2 py-1 w-fit"
					disabled={curPage <= 1}
					>Prev</button>

				<ul className="flex mx-4 gap-1">
					{
						Array(filteredPages).fill(0).map(( _, index ) => (
								<li 
									key={index + 1} 
									className={`border-2 border-green-400 rounded-md px-2 py-1 ${(index + 1) === curPage ? 'bg-green-400' : ''}`}																
								>
									<button
										onClick={handlePaginateExact}
										data-page={`${index + 1}`}
									>
										{ index + 1 }
									</button>									
								</li>
							)
						)
					}
				</ul>

				<button 
					onClick={handlePaginateNext}
					className="border-2 border-green-200 rounded-md px-2 py-1 w-fit"
					disabled={curPage >= filteredPages}
					>Next</button>
			</div>			
		</div>
	)
}

const mapStateToProps = state => ({
	pagination: state.categories.pagination
})

const mapDispatchToProps = dispatch => ({
	setNextPage: (offset) => dispatch({ type: 'categories/setPage', payload: { offset } }),
	setExactPage: (page) => dispatch({ type: 'categories/setExactPage', payload: { page } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
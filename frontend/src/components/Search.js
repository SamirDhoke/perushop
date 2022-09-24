import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SearchTogglableBasic = props => {
	const { searchQeury, setSearchQuery, history } = props;

	const [open, setOpen] = React.useState(false);

	const toggleOpen = () => setOpen(!open);

	const handleSearchSubmit = e => {
		e.preventDefault();

		const searchQuery = e.target.children[0].value;

		setSearchQuery(searchQuery);

		history.push('/search');
	}

	return (		
		<form 
			onSubmit={handleSearchSubmit} 
			className="w-full relative flex flex-col justify-center items-center h-8 rounded-full overflow-hidden"
			>
			<input 
				className={`${open ? '' : 'hidden'} w-full absolute z-0 border-2 rounded-full h-full p-2`}
				placeholder="search..."				
			/>
			<button type="button" onClick={toggleOpen} className="inline-block self-end z-20 mx-2">
				<SearchIcon className="h-4 w-4"/>
			</button>
		</form>	
	)
}

const SearchStaticBasic = props => {
	const { setSearchQuery, history } = props;

	const handleSearchSubmit = e => {
		e.preventDefault();
		
		const searchQuery = e.target.children[0].value;

		setSearchQuery(searchQuery);

		history.push('/search');
	}

	return (
		<span>
			<form onSubmit={handleSearchSubmit}>
				<input 
					className="bg-gray-50 dark:bg-gray-700 appearance-none rounded-full px-4 py-1"
					placeholder="search..."					
					/>
			</form>						
		</span>
	)
}

const mapDispatchToProps = dispatch => ({
	setSearchQuery: (text) => dispatch({ type: 'categories/setSearch', payload: text })
});

export const SearchTogglable = connect(null, mapDispatchToProps)( withRouter(SearchTogglableBasic) );
export const SearchStatic  = connect(null, mapDispatchToProps)( withRouter(SearchStaticBasic) );
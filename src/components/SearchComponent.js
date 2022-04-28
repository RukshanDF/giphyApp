import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import useDebounce from '../customHooks/useDebounce';

const { Search } = Input;

const SearchComponent = (props) => {
	const { setPagination, placeholder, value, loading, pagination } = props;
	const [search, setSearch] = useState('');
	const debouncedSearchTerm = useDebounce(search, 500);

	useEffect(() => {
		if (search !== '') {
			setPagination({
				...pagination,
				searchText: debouncedSearchTerm.trim(),
				offset: 0,
			});
		}
	}, [debouncedSearchTerm]);

	return (
		<Search
			placeholder={placeholder}
			onChange={(evt) => setSearch(evt.target.value ? evt.target.value : ' ')}
			loading={loading && debouncedSearchTerm}
			defaultValue={value.searchText}
			disabled={loading && value.searchText}
		/>
	);
};

export default SearchComponent;

export const SearchPageQueryValues = (queries) => {
	let query = '';
	queries.forEach(
		(data) => (query += `${data.key}=${data?.value?.toString().trim()}`)
	);

	return query;
};

export const ParamsObject = (pagination) => [
	{
		key: 'searchText',
		value: pagination.searchText,
	},
	{ key: '&offset', value: pagination.offset },
	{ key: '&limit', value: pagination.limit },
];

export const DefaultPagination = (params) => {
	return {
		searchText: params.get('searchText') ? params.get('searchText') : '',
		offset: params.get('offset') ? params.get('offset') : '0',
		limit: params.get('limit') ? params.get('limit') : '10',
	};
};

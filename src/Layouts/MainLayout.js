import { GiphyFetch } from '@giphy/js-fetch-api';
import { Col, Empty, Image, Pagination, Row, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
	DefaultPagination,
	ParamsObject,
	SearchPageQueryValues,
} from '../common-functions/common-functions';
import SearchComponent from '../components/SearchComponent';

function MainLayout() {
	const history = useHistory();
	const location = useLocation();
	let params = new URLSearchParams(location.search);
	const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);
	const [results, setResults] = useState([]);
	const [noData, setNoData] = useState(false);
	const [pagination, setPagination] = useState(DefaultPagination(params));

	useEffect(() => {
		apiCall();
	}, [pagination]);

	const SearchPagination = (query) => {
		history.push(`${location.pathname}?${query}`);
	};

	const apiCall = async () => {
		setResults();
		setNoData(false);
		try {
			SearchPagination(SearchPageQueryValues(ParamsObject(pagination)));
			const respond = await giphy.search(pagination?.searchText, pagination);
			setResults(respond);
		} catch (err) {
			message.error('Error loading results');
			setNoData(true);
		}
	};

	return (
		<div>
			<Row align='center'>
				<Col span={6}>
					<h1 className='align_center font_color'>GIF World</h1>
				</Col>
			</Row>
			<Row align='center'>
				<Col span={6}>
					<SearchComponent
						placeholder='Search'
						setPagination={setPagination}
						pagination={pagination}
						value={pagination}
						loading={
							(results?.data && results?.data[0]) || noData ? false : true
						}
					/>
				</Col>
			</Row>

			<Row align='center' className='main_window'>
				{results?.data && results?.data[0] ? (
					results?.data?.map((item) => (
						<Col
							xl={6}
							lg={8}
							md={12}
							sm={24}
							xs={24}
							key={item.id}
							className='image_layout'>
							<Image className='image' src={item.images.downsized_large.url} />
						</Col>
					))
				) : !pagination?.searchText || noData ? (
					<Row align='center'>
						<Col className='vertical_align'>
							<Empty />
						</Col>
					</Row>
				) : (
					<Row align='center'>
						<Col className='vertical_align'>
							<Spin size='large' />
						</Col>
					</Row>
				)}
			</Row>
			<Row align='center' className='padding_bottom'>
				<Col>
					<Pagination
						showSizeChanger
						pageSize={pagination.limit}
						defaultCurrent={1}
						current={
							results?.pagination?.offset / results?.pagination?.count + 1
						}
						total={results?.pagination?.total_count}
						onChange={(page, pageSize) => {
							console.log(page);
							setPagination({
								...pagination,
								offset: page === 0 ? 0 : pageSize * page - pageSize,
								limit: pageSize,
							});
						}}
						onShowSizeChange={(current, size) => {
							setPagination({ ...pagination, limit: size });
						}}
					/>
				</Col>
			</Row>
		</div>
	);
}

export default MainLayout;

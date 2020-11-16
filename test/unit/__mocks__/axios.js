const mock = {
	post: jest.fn(() => Promise.resolve({
		data: {
			code: 0,
			msg: 'success',
			result: {}
		}
	}))
};
export default mock
// const mockData = {
// 	data: {
// 		code: 0,
// 		msg: 'success',
// 		result: {}
// 	}
// };
// jest.mock('axios', () => ({
// 	post: jest.fn(() => {
// 		promise.resolve(mockData)
// 	})
// }));
// import axios from 'axios';

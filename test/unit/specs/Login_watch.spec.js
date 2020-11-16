import Login from '@/components/Login';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

describe('Login_watch.vue', () => {
	let spy,
		wrapper;
	beforeEach(() => {
		wrapper = mount(Login);
		spy = jest.spyOn(console, 'log')
	});
	afterEach(() => {
		wrapper.destroy();
		spy.mockClear()
	});
	test('test watch fullHeight', () => {
		wrapper.vm.fullHeight = 100;
		wrapper.vm.$nextTick(() => {
			expect(spy).toBeCalled();
		})
	})
	test('test watch fullWidth', () => {
		wrapper.vm.fullWidth = 100;
		wrapper.vm.$nextTick(() => {
			expect(spy).toBeCalled();
		})
	})
})

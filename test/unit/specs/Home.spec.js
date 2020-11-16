import Home from '@/components/Home';
import { mount , createLocalVue} from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';

Vue.use(ElementUI);

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('Home.vue', () => {
	test('quit method has been called', () => {
		const wrapper = mount(Home, {
				stubs: ['router-link', 'router-view'],
				localVue,
				router
			});
		// 创建mock函数
		const mockFn1 = jest.fn();
		// 设置 Wrapper vm 的方法并强制更新。
		wrapper.setMethods({
			quit: mockFn1
		});
		wrapper.find('.quitBtn').trigger('click');
		Vue.nextTick().then(() => {
			// submit has been called
			expect(mockFn).toBeCalled();
			// 回调次数
			expect(mockFn).toHaveBeenCalledTimes(1);
		});
	});
})

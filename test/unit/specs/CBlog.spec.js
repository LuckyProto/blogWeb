import axios from '../__mocks__/axios';
import CBlog from '@/components/CBlog';
import { mount, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

describe('CBlog.vue', () => {
	beforeEach(() => {
		axios.post.mockClear();
	})
	test('test props', () => {
		const wrapper = mount(CBlog, {
			propsData: {
				item: {
					comment_count: 0,
					content: 'hello',
					gmt_create: null,
					html_content: 'hello',
					html_summary: "<p>vue中使用mavon-editor</p>↵",
					id: 12,
					name: "vue中使用'mavon-editor'",
					summary: "vue中使用mavon-editor",
					t_blogger_id: 2,
					t_blogtype_id: 5,
					t_comment_id: 1,
					t_label_id: 37,
					view_count: 37
				}
			}
		});
		expect(wrapper.props().item.name).toBe("vue中使用'mavon-editor'")
		// wrapper.find('.showBtn').trigger('click');
	});
})

import axios from '../__mocks__/axios';
import Login from '@/components/Login';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

describe('Login.vue', () => {
	beforeEach(() => {
		axios.post.mockClear();
	})
  test('只有用户名， 提示 请输入密码', () => {
    const wrapper = mount(Login, {
      data() {
        return {
          form: {
            username: 'wu.hc',
          },
        };
      },
    });
    wrapper.find('#loginBtn').trigger('click');
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.el-form-item__error').length).toBe(1);
      expect(wrapper.findAll('.el-form-item__error').at(0).text()).toBe('请输入密码');
    });
  });
  test('只有密码， 提示 请输入用户名', () => {
    const wrapper = mount(Login, {
      data() {
        return {
          form: {
            password: '111',
          },
        };
      },
    });
    wrapper.find('#loginBtn').trigger('click');
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.el-form-item__error').length).toBe(1);
      expect(wrapper.findAll('.el-form-item__error').at(0).text()).toBe('请输入用户名');
    });
  });
  test('未输入用户名和密码， 提示 请输入用户名 请输入密码', () => {
    const wrapper = mount(Login);
    wrapper.find('#loginBtn').trigger('click');
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.el-form-item__error').length).toBe(2);
      expect(wrapper.findAll('.el-form-item__error').at(0).text()).toBe('请输入用户名');
      expect(wrapper.findAll('.el-form-item__error').at(1).text()).toBe('请输入密码');
    });
  });

  test('submit method has been called', async () => {
    const wrapper = mount(Login, {
      data() {
        return {
          user_login_method: 'user_login', // 登录
          form: {
            username: 'wu.hc',
            password: '123456',
          },
        };
      },
    });
	// 创建mock函数
	const mockFn = jest.fn();
	// 设置 Wrapper vm 的方法并强制更新。
	wrapper.setMethods({
		submit: mockFn,
	});
    await wrapper.find('#loginBtn').trigger('click');
    // submit has been called
    expect(mockFn).toBeCalled();
	// 回调次数
	expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('axios.post had been called', async () => {
	  const wrapper = mount(Login, {
		  data() {
			  return {
				  user_login_method: 'user_login', // 登录
				  form: {
					  username: 'wu.hc',
					  password: '123456',
				  },
			  };
		  },
	  });
	  // const URL = 'https://yesno.wtf/api';
	  await wrapper.find('#loginBtn').trigger('click');
	  expect(axios.post).toBeCalled();
  })

  test('测试jest.fn()返回固定值', () => {
  	const mockFn = jest.fn().mockReturnValue(1);
    expect(mockFn()).toBe(1);
  });

  test('测试jest.fn()内部实现', () => {
  	const mockFn = jest.fn((num1, num2) => num1 * num2);
	  expect(mockFn(10, 10)).toBe(100);
  });

  test('测试jest.fn()返回promise', async () => {
  	const mockFn = jest.fn().mockResolvedValue('default');
  	const result = await mockFn();

  	// 断言 mockfn 通过 await 执行后返回default
	  expect(result).toBe('default');
	  // 断言mockfn 返回 promise
	  expect(Object.prototype.toString.call(mockFn())).toBe('[object Promise]');
  });
});


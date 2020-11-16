<template>
    <div class="submit-page"  v-bind:style="{height: fullHeight + 'px'}">
<!--        <div>-->
<!--            <img src="../../assets/login-bg.jpg" v-bind:style="{height: fullHeight + 'px', width: fullWidth + 'px'}">-->
<!--        </div>-->
        <div class="submit-content">
            <el-form :label-position="labelPosition" label-width="80px" :model="form" :rules="rules" ref="form" class="submit-form">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" class="username" autofocus></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" @keyup.enter.native="submit('form')" class="password"></el-input>
                </el-form-item>
                <el-form-item>
<!--                    <el-button @click.native="register('form')" class="loginBtn" id="registerBtn">注册</el-button>-->
                    <el-button @click.native="submit('form')" class="loginBtn" id="loginBtn">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../assets/js/request';

export default {
  name: 'Login',
  data() {
    return {
      user_register_method: 'user_register', // 注册
      user_login_method: 'user_login', // 登录
      fullHeight: document.documentElement.clientHeight,
      fullWidth: document.documentElement.clientWidth,
      labelPosition: 'right',
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submit(formName) {
      const self = this;
      const param = {
        username: this.form.username,
        password: this.form.password,
      };
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const result = await fetchData('user', self.user_login_method, param);
          if (result.code === 0) {
            self.$router.push('/home');
          } else {
            alert(result.msg);
          }
        } else {
          return false;
        }
      });
    },
    // 注册
    register(formName) {
      const self = this;
      const param = {
        username: this.form.username,
        password: this.form.password,
      };
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const result = await fetchData('user', self.user_register_method, param);
          if (result.code === 0) {
            alert(result.msg);
          } else {
            alert(result.msg);
          }
        } else {
          return false;
        }
      });
    },
	//
	printNewValue(value) {
    	console.log(value)
	}
  },
  mounted() {
    const self = this;
    window.onresize = () => (() => {
      self.fullHeight = document.documentElement.clientHeight;
      self.fullWidth = document.documentElement.clientWidth;
    })();
  },
  watch: {
    fullHeight(val) {
      if (!this.timer) {
      	this.printNewValue(val)
        this.fullHeight = val;
        this.timer = true;
        const that = this;
        setTimeout(() => {
          that.timer = false;
        }, 400);
      }
    },
    fullWidth(val) {
      if (!this.timer) {
        this.fullWidth = val;
		this.printNewValue(val)
        this.timer = true;
        const that = this;
        setTimeout(() => {
          that.timer = false;
        }, 400);
      }
    },
  },
};
</script>

<style>
    .submit-page{
        position: relative;
        width: 100%;
        overflow: hidden;
        background-color: #fff;
    }
    .submit-content{
        position: absolute;
        top: 10%;
        right: 30%;
        width: 80%;
        margin: 100px auto;
        min-width: 100px;
        max-width: 300px;
    }
</style>

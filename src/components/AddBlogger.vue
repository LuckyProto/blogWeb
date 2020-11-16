<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="博主姓名" prop="username">
                <el-col :span="15">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="博主密码" prop="password">
                <el-col :span="15">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item size="large">
                <el-col :span="20">
                    <el-button type="primary" @click.native="save('ruleForm')" v-if="ruleForm.id">修改</el-button>
                    <el-button type="primary" @click.native="submit('ruleForm')" v-if="!ruleForm.id">立即创建</el-button>
                    <el-button type="primary" @click="cancle">取消</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { fetchData } from '../assets/js/request';

export default {
  name: 'AddBlogger',
  data() {
    return {
      blogger_add_method: 'blogger_add',
      blogger_update_method: 'blogger_update',
      ruleForm: {
        id: null,
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入博主姓名', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入博主密码', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 5000 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submit(formName) {
      const self = this;
      const param = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
      };
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await fetchData('blogger', self.blogger_add_method, param);
          if (result.code === 0) {
            alert(result.msg);
            self.$router.push('/home/blogger');
          } else {
            alert(result.msg);
          }
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$router.push('/home/blogger');
    },
    save(formName) {
      const self = this;
      const param = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
      };
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await fetchData('blogger', self.blogger_update_method, param);
          if (result.code === 0) {
            alert(result.msg);
            self.$router.push('/home/blogger');
          } else {
            alert(result.msg);
          }
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.ruleForm = this.$route.query;
  },
};
</script>

<style scoped>

</style>

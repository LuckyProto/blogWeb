<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="name">
                <el-col :span="15">
                    <el-input v-model="ruleForm.name"></el-input>
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
  name: 'AddType',
  data() {
    return {
      type_add_method: 'type_add',
      type_update_method: 'type_update',
      ruleForm: {
        id: null,
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submit(formName) {
      const self = this;
      const param = {
        name: this.ruleForm.name,
      };
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await fetchData('type', self.type_add_method, param);
          if (result.code === 0) {
            alert(result.msg);
            self.$router.push('/home/type');
          } else {
            alert(result.msg);
          }
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$router.push('/home/type');
    },
    save(formName) {
      const self = this;
      const param = this.ruleForm;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await fetchData('type', self.type_update_method, param);
          if (result.code === 0) {
            alert(result.msg);
            self.$router.push('/home/type');
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

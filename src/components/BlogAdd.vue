<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="博客名称" prop="name">
                <el-col :span="15">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="所属分类" prop="t_blogtype_id">
                <el-col :span="8">
                    <el-select v-model="ruleForm.t_blogtype_id" placeholder="请选择">
                        <el-option
                            v-for="item in types"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="博客简介" prop="summary">
                <el-col :span="18">
                    <div>
                        <mavon-editor
                            v-model="ruleForm.summary"
                            @change="changeSummary"/>
                    </div>
                </el-col>
            </el-form-item>
            <el-form-item label="博客内容" prop="content">
                <el-col :span="18">
                    <div>
                        <mavon-editor
                            v-model="ruleForm.content"
                            ref="md"
                            @imgAdd="imgAdd"
                            @imgDel="imgDel"
                            @change="changeMarkDown"/>
                    </div>
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
import { commonUrl, fetchData } from '../assets/js/request';

export default {
  name: 'AddBlog',
  data() {
    return {
      // 请求接口
      type_query_methodName: 'type_query',
      blog_add_method: 'blog_add',
      blog_update_method: 'blog_update',
      // update_pic_method: 'update_pic_methodName',
      uploadImg_method: 'uploadImg',
      deleteImg_method: 'deleteImg',
      id: null,
      ruleForm: {
        id: null,
        name: '',
        summary: '', // 简介
        html_summary: '', // 前端回显
        html_content: '', // 前端回显
        content: '', // 后台修改用
        t_blogtype_id: '', // 所属分类
      },
      rules: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入博客内容', trigger: 'blur' },
          { min: 1, max: 5000, message: '长度在 1 到 5000 个字符', trigger: 'blur' },
        ],
        t_blogtype_id: [
          { required: true, message: '请选择所属类型', trigger: 'change' },
        ],
      },
      types: [], // 类型
    };
  },
  methods: {
    submit(formName) {
      const self = this;
      const param = {
        name: this.ruleForm.name,
        summary: this.ruleForm.summary,
        html_summary: this.ruleForm.html_summary,
        content: this.ruleForm.content,
        html_content: this.ruleForm.html_content,
        t_blogtype_id: this.ruleForm.t_blogtype_id,
      };
      console.log(param);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await fetchData('blog', self.blog_add_method, param);
          if (result.code === 0) {
            alert(result.msg);
            self.$router.push('/home/blog');
          } else {
            alert(result.msg);
          }
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$router.push('/home/blog');
    },
    save(formName) {
      const self = this;
      const param = {
        id: this.ruleForm.id,
        name: this.ruleForm.name,
        summary: this.ruleForm.summary,
        html_summary: this.ruleForm.html_summary,
        content: this.ruleForm.content,
        html_content: this.ruleForm.html_content,
        t_blogtype_id: this.ruleForm.t_blogtype_id,
      };
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await fetchData('blog', self.blog_update_method, param);
          if (result.code === 0) {
            alert(result.msg);
            self.$router.push('/home/blog');
          } else {
            alert(result.msg);
          }
        } else {
          return false;
        }
      });
    },
    changeSummary(value, render) {
      this.ruleForm.summary = value;
      this.ruleForm.html_summary = render;
    },
    changeMarkDown(value, render) {
      this.ruleForm.content = value;
      this.ruleForm.html_content = render;
    },
    imgAdd(pos, $file) {
      console.log(pos);
      const self = this;
      this.$axios({
        url: `${commonUrl}img`,
        method: 'post',
		  // eslint-disable-next-line no-underscore-dangle
		  data: { methodName: self.uploadImg_method, miniurl: $file.miniurl, name: $file._name },
        headers: { 'Content-Type': 'application/json' },
      }).then((data) => {
        console.log(data);
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        self.$refs.md.$img2Url(pos, data.data.result);
        // self.img_file[pos] = data.data.link
      });
    },
    imgDel(pos) {
      const self = this;
      console.log(pos);
      this.$axios({
        url: `${commonUrl}img`,
        method: 'post',
        // eslint-disable-next-line no-underscore-dangle
        data: { methodName: self.deleteImg_method, miniurl: pos[1].miniurl, name: pos[1]._name },
        headers: { 'Content-Type': 'application/json' },
      }).then((data) => {
        console.log(data);
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        // self.$refs.md.$img2Url(pos[1], data.data.result)
      });
    },
    type_query() {
      const self = this;
      const param = {
        page_num: 1,
        page_size: 10,
        name: '',
      };
      fetchData('type', this.type_query_methodName, param).then((data) => {
        self.types = data.result.data.list;
        // self.tableDataCount = data.result.data.total_count
      });
    },
  },
  mounted() {
    this.ruleForm = this.$route.query;
    this.type_query();
  },
};
</script>

<style scoped>
    .markdown-body .highlight pre, .markdown-body pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #000000 !important;
        border-radius: 3px;
    }
</style>

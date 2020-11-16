<template>
    <div>
        <el-container>
            <el-header>
                <router-link to="/" class="index">MyBlog</router-link>
                <router-link to="Login" class="login">登录</router-link>
            </el-header>
            <el-container :style="{height: (fullHeight-120) + 'px'}">
                <el-aside width="160px">
                    <div class="type">
<div v-for="item in typeData" v-bind:key="item.id" class="type-item" @click="blog_quey_type(item)">
{{item.name}}</div>
                    </div>
                </el-aside>
                <el-main>
                    <div v-for="item in tableData" v-bind:key="item.id">
                        <CBlog v-bind:item="item"></CBlog>
                    </div>
					<div class="pagination">
						<el-pagination
							v-if="isBlog"
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page=page_num
							:page-sizes="[5, 10]"
							:page-size= page_size
							layout="total, sizes, prev, pager, next, jumper"
							:total=tableDataCount>
						</el-pagination>
					</div>
                </el-main>
                <el-aside width="200px">
                    <div class="label">
                        <div v-for="item in tableData_label" v-bind:key="item.id" class="type-item" @click="blog_quey_label(item)">{{item.name}}</div>
                    </div>
                </el-aside>
            </el-container>
            <el-footer>
                <img src="../assets/images/beian.png" alt=""><span>冀ICP备19021227号</span>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import { fetchData } from '../assets/js/request';
import CBlog from './CBlog';

export default {
  name: 'Index',
  components: {
    CBlog,
  },
  data() {
    return {
      // 请求接口
		blog_query_bs_methodName: 'blog_query_bs',
		// 分类
      type_query_methodName: 'type_query',
      // 博客
      blog_query_methodName: 'blog_query',
      // label request method
      label_query_methodName: 'label_query',
      fullHeight: document.documentElement.clientHeight,
      // condition
      formInline: {
        name: '',
      },
      // 表格所需数据
		isBlog: true, // 首先显示blog
      tableData: null,
      tableDataCount: undefined,
      // 分类所需数据
      typeData: null,
      typeDataCount: undefined,
      // 标签所需数据
      tableData_label: null,
      tableDataCount_label: undefined,
      // 分页条所需数据
      page_num: 1,
      page_size: 5,
    };
  },
  methods: {
    // 标签查询
    label_query() {
      const self = this;
      const param = {
        page_num: this.page_num,
        page_size: this.page_size,
        name: '',
      };
      fetchData('label', this.label_query_methodName, param).then((data) => {
        self.tableData_label = data.result.data.list;
        self.tableDataCount_label = data.result.data.total_count;
      });
    },
    // 分类查询
    type_query() {
      const self = this;
      const param = {
        page_num: 1,
        page_size: 100,
        name: '',
      };
      fetchData('type', this.type_query_methodName, param).then((data) => {
        self.typeData = data.result.data.list;
        self.typeDataCount = data.result.data.total_count;
      });
    },
    // 博客查询
    blog_query() {
      const self = this;
      const param = {
        page_num: this.page_num,
        page_size: this.page_size,
        name: this.formInline.name,
      };
      fetchData('blog', this.blog_query_methodName, param).then((data) => {
        self.tableData = data.result.data.list;
        self.tableDataCount = data.result.data.total_count;
      });
    },
	  handleSizeChange(val) {
		  const self = this;
		  const param = {
			  page_num: this.page_num,
			  page_size: `${val}`,
			  name: this.formInline.name,
		  };
		  fetchData('blog', this.blog_query_methodName, param).then((data) => {
			  self.tableData = data.result.data.list;
			  self.tableDataCount = data.result.data.total_count;
		  });
	  },
	  handleCurrentChange(val) {
		  const self = this;
		  const param = {
			  page_num: `${val}`,
			  page_size: this.page_size,
			  name: this.formInline.name,
		  };
		  fetchData('blog', this.blog_query_methodName, param).then((data) => {
			  self.tableData = data.result.data.list;
			  self.tableDataCount = data.result.data.total_count;
		  });
	  },
    blog_quey_type(item) {
      const self = this;
		const param = {
        page_num: this.page_num,
        page_size: this.page_size,
        name: this.formInline.name,
        t_blogtype_id: item.id,
      };
      fetchData('blog', this.blog_query_methodName, param).then((data) => {
        self.tableData = data.result.data.list;
        self.tableDataCount = data.result.data.total_count;
      });
    },
    blog_quey_label(item) {
      const self = this;
      const param = {
        page_num: this.page_num,
        page_size: this.page_size,
        name: this.formInline.name,
        t_label_id: item.id,
      };
      fetchData('blog', this.blog_query_methodName, param).then((data) => {
        self.tableData = data.result.data.list;
        self.tableDataCount = data.result.data.total_count;
      });
    },
  },
  mounted() {
    // 标签查询
    this.label_query();
    // 分类条目查询
    this.type_query();
    // 查询博客
    this.blog_query();
    // 分类查询
    // height
    const self = this;
    window.onresize = () => (() => {
      self.fullHeight = document.documentElement.clientHeight;
    })();
    // fetchData('comm', this.label_query_methodName, {id: 1}).then(function (data) {
    //     // self.tableData_label = data.result.data.list
    //     // self.tableDataCount_label = data.result.data.total_count
    // })
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-header, .el-footer {
        background-color: #ffffff;
        line-height: 60px;
        padding: 0px;
    }
    .el-header{
        border-bottom:1px solid #cccccc;
    }
    .el-footer {
        border-top:1px solid #cccccc;
    }
    .el-aside {
        padding-top: 40px;
        background-color: #ffffff;
    }

    .type{
        line-height: 1.5;
        font-size: 18px;
        color: #333333;
    }
    .label{
        line-height: 1.5;
        font-size: 18px;
        color: #333333;
    }
    .type-item{
        text-align: center;
        color: #333;
        line-height: 30px;
        cursor: pointer;
    }
    .el-main {
        padding-top: 40px;
        background-color: #FFFFFF;
        color: #333;
    }

    .index {
        display: inline-block;
        width: 120px;
        margin-left: 30px;
        float: left;
        text-align: center;
        color: #E4705F;
        font-weight: 700;
        font-size: 24px;
    }

    .login {
        display: inline-block;
        float: right;
        width: 51px;
        height: 30px;
        margin-right: 60px;
        margin-top:13px;
        line-height: 30px;
        text-align: center;
        color: #E4705F;
        font-size: 14px;
        border-radius: 20px;
        border: 1px solid #E4705F;
    }
    img{
        position: relative;
        top: 4px;
        left: -4px;
    }
</style>

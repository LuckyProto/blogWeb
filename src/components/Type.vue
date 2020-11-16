<template>
    <div>
        <div class="menu-name">
            分类信息
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="分类名称">
                <el-input v-model="formInline.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="type_query">查询</el-button>
                <router-link to="/home/addType" class="my-add-button">增加</router-link>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="id"
                label="编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="标签名称"
                width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fetchData } from '../assets/js/request';

export default {
  name: 'Type',
  data() {
    return {
      // 请求接口
      type_query_methodName: 'type_query',
      type_delete_methodName: 'type_delete',
      type_find_methodName: 'type_find',
      // condition
      formInline: {
        name: '',
      },
      // 表格所需数据
      tableData: null,
      tableDataCount: undefined,
      // 分页条所需数据
      page_num: 1,
      page_size: 5,
    };
  },
  methods: {
    type_query() {
      const self = this;
      const param = {
        page_num: this.page_num,
        page_size: this.page_size,
        name: this.formInline.name,
      };
      fetchData('type', this.type_query_methodName, param).then((data) => {
        self.tableData = data.result.data.list;
        self.tableDataCount = data.result.data.total_count;
      });
    },
    handleEdit(index, row) {
      const self = this;
      const param = {
        id: row.id,
      };
      fetchData('type', this.type_find_methodName, param).then((data) => {
        // self.tableData = data.result.data.list
        // self.tableDataCount = data.result.data.total_count
        if (data.code === 0) {
          self.$router.push({ path: '/home/addType', query: data.result });
        }
      });
    },
    handleDelete(index, row) {
      const self = this;
      if (confirm('确定删除吗?')) {
        const param = {
          id: row.id,
        };
        fetchData('type', this.type_delete_methodName, param).then((data) => {
          // self.tableData = data.result.data.list
          // self.tableDataCount = data.result.data.total_count
          if (data.code === 0) {
            alert('删除成功');
            self.type_query();
          } else {
            alert('删除失败');
          }
        });
      }
    },
  },
  mounted() {
    this.type_query();
  },
};
</script>

<style scoped>
    .menu-name{
        height: 40px;
        line-height: 40px;
        text-align: left;
    }
    .demo-form-inline{
        line-height: 40px;
        text-align: left;
    }
    .my-add-button{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #FFF;
        border: 1px solid #DCDFE6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
    }
</style>

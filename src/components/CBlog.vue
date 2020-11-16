<template>
    <div>
        <div class="name" @click="showContent">
            {{item.name}}
        </div>
        <div class="tip">
            <span>作者:{{item.t_blogger_id}}</span><span>访问量:{{item.view_count}}</span><span>评论数量:{{item.comment_count}}</span>
        </div>
        <!--        <div class="summary abstract" v-html="item.html_summary" v-if="!flag"></div>-->
        <mavon-editor class="pad" v-html="item.html_content" v-if="flag"/>
        <el-button  @click="showContent" v-if="flag" round class="showBtn">收起</el-button>
    </div>
</template>

<script>
import { fetchData } from '../assets/js/request';

export default {
  name: 'CBlog',
  data() {
    return {
      // change view count
      update_blog_view_count_methodName: 'update_blog_view_count',
      flag: 0,
    };
  },
  props: {
    item: null,
  },
  methods: {
    showContent() {
      this.flag = !this.flag;
      const param = {
        id: this.item.id,
        view_count: this.item.view_count,
      };
      fetchData('blog', this.update_blog_view_count_methodName, param).then((data) => {

      });
    },
  },
};
</script>

<style scoped>
    .com-blog{
        position: relative;
        width: 100%;
        margin: 0 0 15px;
        padding: 15px 2px 20px 0;
        border-bottom: 1px solid #cccccc;
        word-wrap: break-word;
    }
    .pad{
        padding: 20px 60px 20px 70px;
        margin-bottom: 30px;
    }
    .name{
        width:66%;
        display: inline-block;
        height: 36px;
        line-height: 36px;
        font-size: 18px;
        color: #333333;
        font-weight: 700;
        cursor: pointer;
        text-align: left;
    }
    .name:visited{
        color: #969696;
    }
    .tip{
        display: inline-block;
    }
    span{
        /*float: left;*/
        margin-right: 32px;
    }
    .abstract{
        margin: 0 0 8px;
        font-size: 16px;
        line-height: 24px;
        /*text-align: left;*/
        color: #666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow:hidden;/*超出部分隐藏*/
    }
</style>

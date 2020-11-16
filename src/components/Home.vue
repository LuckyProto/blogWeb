<template>
    <div>
        <el-container>
            <el-header>
                <span class="header-left">我的博客后台管理系统</span>
                <el-button class="quitBtn" @click="quit">退出</el-button>
            </el-header>
            <el-container :style="{height: (fullHeight-60) + 'px'}">
                <el-aside width="150px">
                    <router-link to="/home/label" class="menu">标签管理</router-link>
                    <router-link to="/home/type" class="menu">分类管理</router-link>
                    <router-link to="/home/blog" class="menu">博客管理</router-link>
                    <router-link to="/home/blogger" class="menu">博主管理</router-link>
                    <router-link to="/home/comment" class="menu">评论管理</router-link>
                    <router-link to="/home/user" class="menu">用户管理</router-link>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      fullHeight: document.documentElement.clientHeight,
    };
  },
  methods: {
    quit() {
      this.$router.push('/');
    },
  },
  mounted() {
    // height
    const self = this;
    window.onresize = () => (() => {
      self.fullHeight = document.documentElement.clientHeight;
    })();
  },
};
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #57AAFC;
        color: #FFFFFF;
        line-height: 60px;
        padding: 0px;
    }

    .header-left{
        display: inline-block;
        width: 80%;
    }
    .quitBtn{
        border: none;
        margin: 0;
        padding: 0;
        /*outline-style: none;*/
        font-size: 14px;
        color: white;
        background-color: #57AAFC;
    }
    .el-aside {
        background-color: #57AAFC;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #FFF;
        color: #333;
        text-align: center;
        /*line-height: 160px;*/
    }
    .menu{
        display: block;
        height: 60px;
        line-height: 60px;
        color: #ffffff;
        cusor: point;
    }
</style>

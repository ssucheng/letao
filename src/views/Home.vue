<!-- 首页 -->
<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="usermsg">
          <div class="avatar">
            <img
              src="../assets/1.gif"
              alt=""
            >
          </div>
          <p>苏成</p>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo "
          @open="handleOpen"
          @close="handleClose"
          background-color="#2f4050"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse='collapse'
          :router='true'
        >
          <el-menu-item index="user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="categories1">一级分类管理</el-menu-item>
              <el-menu-item index="categories2">二级分类管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="Product">
            <i class="el-icon-document"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- collapse:是否水平折叠收起菜单 -->
          <a
            href="javascrip:;"
            @click='collapse=!collapse'
            class="myicon myicon-menu toggle-btn"
          ></a>
          <div>
            <span class="welcome">欢迎你!苏成</span>
            <el-button
              type="primary"
              @click="logout"
              size="mini"
            >退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 退出确认弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="homedialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>确定要退出登录</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="homedialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="exitLogin"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { exitRoot } from '@/api'
export default {
  data () {
    return {
      collapse: false,
      homedialogVisible: false
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 点击退出的操作
    logout () {
      // 显示弹框
      this.homedialogVisible = true
    },
    // 退出弹窗函数
    exitLogin () {
      this.homedialogVisible = false
      exitRoot().then(res => {
        if (res.success === true) {
          this.$router.push({name: 'Login'})
        } else {
          this.$message.error('退出失败')
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.home {
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-header{
    border-bottom: 1px solid pink;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #2f4050;
    .usermsg {
      width: 100%;
      box-sizing: border-box;
      height: 200px;
      background-color: #243443;
      padding-top: 30px;
      color: #a9b0c2;
      text-align: center;
      > p {
        line-height: 50px;
      }
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #888;
        margin: 0 auto;
        color: pink;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
  .el-header {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    span {
      color: #666;
      padding-right: 15px;
    }
    .toggle-btn {
      font-size: 36px;
      color: #6a8eaf;
    }
  }
}
</style>

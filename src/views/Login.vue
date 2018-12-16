<template>
    <div class="login">
       <div class="contentlogin">
           <img src="../assets/1.gif" alt="" class="loginPhoto">
            <el-form  :rules="rules" ref="loginform" :model="loginform" style="width:500px" class="elForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginform.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginform.password"  type="password"></el-input>
            </el-form-item>
            <el-button type="primary" class="loginBtn" @click="loginGet('loginform')">登录</el-button>
        </el-form>
       </div>
    </div>
</template>
<script>
import {loginList} from '@/api'
export default{
  data () {
    return {
      loginform: {
        username: 'root',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  methods: {
    loginGet (ref) {
      // 判断表单信息填写与否 填写成功才可以登录
      this.$refs[ref].validate((valid) => {
        // 如果填写了 valid会变成bool类型
        if (valid) {
          loginList(this.loginform).then(res => {
            if (res.success) {
              this.$router.push({name: 'Home'})
            } else {
              this.$message.error('账号密码错误')
            }
          })
        } else {
          this.$message.error('请输入账户密码')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.login{

    position:fixed;
    width: 100%;
    height: 100%;
    background-color: black;
    .contentlogin{
        position: relative;
        left: 0;
        top:0;
        width:700px;
        height:320px;
        margin:200px auto;
        padding:50px 10px;
        background-color: white;
        .loginPhoto{
             position: relative;
             top:-48px;
            left: 50%;
            width: 160px;
            height: 160px;
            margin-left: -80px;
            margin-top: -80px;
            box-sizing: border-box;
            border-radius: 50%;
            border: 10px solid #fff;
            box-shadow: 0 1px 5px #ccc;
            overflow: hidden;
        }
        .elForm{

            margin:auto;
        }
        .loginBtn{
            margin-top:10px;
            width:100%;
        }

    }
}
</style>

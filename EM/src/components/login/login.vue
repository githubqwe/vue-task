<template>
  <div class="login">
    <div class="box">
      <h3>用户登录</h3>
      <el-form
        :model="ruleForm2"
        status-icon
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules2"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="ruleForm2.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm2.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" id="mybtn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        username: "",
        password: ""
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password:[
             { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //   发请求获取登录数据
    login() {
      this.$refs.ruleForm2.validate(async valid => {
        if (valid) {
          var res = await this.$http.post("/login", {
            username: this.ruleForm2.username,
            password: this.ruleForm2.password
          });
          var { data, meta } = res.data;
          if (meta.status === 200) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$router.push('/home')
          } else {
            this.$message.error("登录失败");
          }
        } else {
          this.$message.error("参数错误");
        }
      });
    }
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background: #2c3742;
  position: relative;
}
.box {
  position: absolute;
  padding: 40px;
  background: #fff;
  width: 500px;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.box #mybtn {
  width: 100%;
}
h3 {
  text-align: left;
}
</style>

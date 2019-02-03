<template>
  <el-row>
    <el-col :span="8">
      <img src="@/assets/images/logo.png" alt="" />
    </el-col>
    <el-col :span="12">
      <div class="text">电商后台管理系统</div>
    </el-col>
    <el-col class="logout" :span="4">
      <a href="#" @click.prevent="out">退出</a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    out() {
      window.localStorage.removeItem("token");
      this.$message({
        message:'退出成功',
        type:'success'
      })
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.text {
  font-size: 24px;
  color: #fff;
  text-align: center;
}
.logout {
  text-align: right;
}
.logout a {
  text-decoration: none;
  color: #fff;
}
.logout a:hover {
  color: red;
}
</style>

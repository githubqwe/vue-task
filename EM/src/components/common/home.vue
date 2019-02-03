<template>
  <el-container>
    <el-header>
      <!-- 头部 -->
      <headers />
    </el-header>

    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏 -->
        <side />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headers from "@/layout/headers.vue";
import side from "@/layout/side.vue";
export default {
  components: {
    headers,
    side
  },
  beforeMount() {
    if (!window.localStorage.getItem("token")) {
      this.$message.error('请登录')
      this.$router.push("/login");
      return;
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-container {
  height: 100%;
}
</style>

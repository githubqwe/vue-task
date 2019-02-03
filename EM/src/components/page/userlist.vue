<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row id="ipt">
      <el-col :span="8">
        <!-- 输入框 -->
        <el-input
          placeholder="请输入内容"
          v-model="search"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <!-- 按钮 -->
      <el-col :span="16">
        &nbsp;&nbsp;<el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="username" label="姓名">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" > </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width='200'>
        <template slot-scope="scope"
          >
          <!-- 编辑 -->
          <el-button type="primary" icon="el-icon-edit" plain size='mini'></el-button> 
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" plain size='mini'></el-button>
          <!-- 分配 -->
          <el-button type="success" icon="el-icon-check" plain size='mini'></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  methods: {
    async getUserAll() {
      var res = await this.$http.request({
        url: `/users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        methods: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { data, meta } = res.data;
      if (meta.status === 200) {
        this.tableData = data.users;
      } else {
        this.$message.error(meta.msg);
      }
      console.log(res);
    }
  },
  data() {
    return {
      search: "",
      tableData: [],
      pagenum: 1,
      pagesize: 5,
      value2: true
    };
  },
  mounted() {
    this.getUserAll();
  }
};
</script>

<style>
#ipt {
  margin-top: 10px;
}
</style>

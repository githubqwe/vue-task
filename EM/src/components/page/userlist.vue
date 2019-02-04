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
          <el-button slot="append" icon="el-icon-search" @click='addUse'></el-button>
        </el-input>
      </el-col>
      <!-- 按钮 -->
      <el-col :span="16">
        &nbsp;&nbsp;<el-button type="success" plain @click="add"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <!-- 开关 -->
          <el-switch
            @change="state(scope.row.id, scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
          ></el-button>
          <!-- 分配 -->
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 弹框 -->
    <el-dialog title="收货地址" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="ruleForm2"
        status-icon
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
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
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.number="ruleForm2.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model.number="ruleForm2.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="tijiao">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  methods: {
    // 添加用户
    add() {
      this.dialogVisible = true;
    },
    // 获取用户列表
    async getUserAll() {
      var res = await this.$http.request({
        url: `/users?query=${this.search}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        methods: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { data, meta } = res.data;
      if (meta.status === 200) {
        this.tableData = data.users;
        this.total = data.total;
        //  console.log(data);
      } else {
        this.$message.error(meta.msg);
      }
    },
    handleSizeChange(value) {
      this.pagesize = value;
      this.getUserAll();
    },
    handleCurrentChange(value) {
      this.pagenum = value;
      this.getUserAll();
    },
    // 状态开关
    async state(id, state) {
      var res = await this.$http.request({
        url: `users/${id}/state/${state}`,
        method: "put"
      });
      var { meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 提交用户
    async tijiao() {
      this.dialogVisible = false;
      var res = await this.$http.post("/users", this.ruleForm2);
      var { data, meta } = res.data;
      if (meta.status === 201) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
        this.getUserAll();
      } else {
        this.$message.error(meta.msg);
      }
      // console.log(res)
      this.ruleForm2 = {};
    },
    // 取消
    qx() {
      this.dialogVisible = false;
      this.ruleForm2 = {};
    },
    // 搜索用户
    addUse(){
      this.getUserAll()
    }
  },
  data() {
    return {
      ruleForm2: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      dialogVisible: false, // 弹框隐藏与显示
      search: "",
      tableData: [],
      pagenum: 1,
      pagesize: 5,
      // 总页数
      total: 0,
      // 当前页数
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

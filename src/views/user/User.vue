<template>
  <div class="user">
    <el-card class="box-card" style="margin-top:30px">
      <template>
        <el-table
          :data="userList"
          border
          style="width: 100%"
          :cell-style="cellStyle"
          :header-cell-style="headStyle"

        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="600"
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话"
            width="1000"
          >
          </el-table-column>
          <el-table-column
            prop="isDelete"
            label="状态"
          >
          <template slot-scope="scope">
              <span>{{scope.row.isDelete | levelFormart}}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                v-show="!point"
                type="success"
                @click="open(scope.row)"
              >启用</el-button>
              <el-button
                v-show="point"
                type="danger"
                @click="close(scope.row)"
              >禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页部分 -->
      <div class="" style="margin-top:30px">
        显示第1到第 {{total}}条记录，总共{{total}}条记录
      </div>
    </el-card>
  </div>
</template>
<script>
import { getUser, updateUser } from '@/api'
export default {
  data () {
    return {
      total: '',
      point: true,
      userList: [],
      userForm: {
        id: '',
        isDelete: ''
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    //   cell的样式
    cellStyle ({row, column, rowIndex, columnIndex}) {
      return 'text-align:center'
    },
    // header的样式
    headStyle ({row, rowIndex}) {
      return 'text-align:center'
    },
    //   请求用户数据
    init () {
      getUser({ page: 1, pageSize: 5 }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.userList = res.data.rows
          this.total = res.data.total
        }
      })
    },
    open (value) {
      this.point = !this.point
      console.log(value)
      updateUser({ id: value.id, isDelete: 1 }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success('启用成功')
          this.init()
        }
      })
    },
    close (value) {
      this.point = !this.point
      //   console.log(value)
      //   this.isDelete = !(value.isDelete)
      updateUser({ id: value.id, isDelete: 0 }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success('禁用成功')
          this.init()
        }
      })
    },
    // 页脚分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  filters: {
    levelFormart (value) {
      if (value === 0) {
        return '已禁用'
      } else if (value === 1) {
        return '启用'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

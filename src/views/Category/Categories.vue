<template>
  <div class="categories">
    <el-button
      type="success"
      @click="categorydialogVisible = !categorydialogVisible"
    >添加分类</el-button>
    <el-card
      class="box-card"
      style="margin-top:30px"
    >
      <template>
        <el-table
          :data="categoriesList"
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
            prop="id"
            label="分类编号"
          >
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="分类名称"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页部分 -->
      <div
        class=""
        style="margin-top:30px"
      >
        显示第1到第 {{total}}条记录，总共{{total}}条记录
      </div>
      <!-- 弹窗部分 -->
      <el-dialog
        title="提示"
        :visible.sync="categorydialogVisible"
        width="30%"
      >
        <el-input v-model="input" placeholder="请输入分类"></el-input>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="categorydialogVisible = false">关闭</el-button>
          <el-button
            type="primary"
            @click="addBtnCategory"
          >保存</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getCategory, addCategory } from '@/api'
export default {
  data () {
    return {
      input: '',
      categorydialogVisible: false,
      total: '',
      categoriesList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    //   添加分类
    addBtnCategory () {
      this.categorydialogVisible = false
      addCategory({categoryName: this.input}).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.$message.success('添加分类成功')
          this.init()
        } else {
          this.$message.error('添加分类失败')
        }
      })
    },
    //   cell的样式
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center'
    },
    // header的样式
    headStyle ({ row, rowIndex }) {
      return 'text-align:center'
    },
    init () {
      getCategory({ page: 1, pageSize: 10 }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.categoriesList = res.data.rows
          this.total = res.data.total
        } else {
          this.$message.error('数据请求失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

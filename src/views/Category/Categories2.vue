<template>
    <div class="categories2">
          <el-button type="success">添加品牌</el-button>
        <el-card class="box-card" style="margin-top:30px">
      <template>
        <el-table
          :data="categories2List"
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
            label="品牌编号"

          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌名称"

          >
          </el-table-column>
           <el-table-column
            prop="brandLogo"
            label="品牌logo"

          >
          <template slot-scope="scope">
              <img :src="'http://127.0.0.1:3000/'+scope.row.brandLogo" alt="">
          </template>
          </el-table-column>
           <el-table-column
            prop="categoryName"
            label="所属分类"

          >
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
import {getTwoCategory} from '@/api'
export default {
  data () {
    return {
      total: '',
      categories2List: []
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
    init () {
      getTwoCategory({page: 1, pageSize: 10}).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.categories2List = res.data.rows
          this.total = res.data.total
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

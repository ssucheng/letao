<template>
    <div class="product">
          <el-button type="success">添加商品</el-button>
        <el-card class="box-card" style="margin-top:30px">
      <template>
        <el-table
          :data="productList"
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
            prop="proName"
            label="商品名称"
            width="1100"

          >
          </el-table-column>
           <el-table-column
            prop="proDesc"
            label="商品描述"

          >
          </el-table-column>
           <el-table-column
            prop="num"
            label="商品库存"

          >
          </el-table-column>
           <el-table-column
            prop="size"
            label="商品尺寸"

          >
          </el-table-column>
           <el-table-column
            prop="statu"
            label="是否下架"

          >
          <template slot-scope="scope">
              <span>{{scope.row.statu | levelFormart}}</span>
          </template>
          </el-table-column>
           <el-table-column
            prop=""
            label="操作"

          >
          <template slot-scope="scope">
              <el-button type="danger">下架</el-button>
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
import {getProduct} from '@/api'
export default{
  data () {
    return {
      total: '',
      productList: []
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
      getProduct({page: 1, pageSize: 10}).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.productList = res.data.rows
          this.total = res.data.total
        }
      })
    }
  },
  filters: {
    levelFormart (value) {
      if (value === 1) {
        return '已上架商品'
      } else if (value === 0) {
        return '商品已下架'
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

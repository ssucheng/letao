<template>
  <div class="categories2">
    <el-button
      type="success"
      @click="category2dialogVisible = !category2dialogVisible"
    >添加品牌</el-button>
    <el-card
      class="box-card"
      style="margin-top:30px"
    >
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
              <img
                :src="'http://127.0.0.1:3000/'+scope.row.brandLogo"
                alt=""
              >
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
      <div
        class=""
        style="margin-top:30px"
      >
        显示第1到第 {{total}}条记录，总共{{total}}条记录
      </div>
      <!-- 添加弹窗部分 -->
      <el-dialog
        title="提示"
        :visible.sync="category2dialogVisible"
        width="30%"
      >
        <el-form
          ref="form"
          :model="categoryForm"
          label-width="80px"
        >
          <el-form-item label="品牌名称">
            <el-input v-model="categoryForm.brandName"></el-input>
          </el-form-item>
          <el-form-item label="请选择分类">
            <template>
              <el-select
                v-model="categoryForm.categoryId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in nameList"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:3000/category/addSecondCategoryPic"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handSuccess"
              :with-credentials="true"
              list-type="picture"
              name="pic1"
            >
              <el-button
                size="small"
                type="primary"
              >点击上传
              </el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="category2dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addBtnCategory2"
          >保存</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getTwoCategory, addCategory2, getCategory } from '@/api'
export default {
  data () {
    return {
      category2dialogVisible: false,
      total: '',
      categories2List: [],
      nameList: [],
      value: '',
      categoryForm: {
        categoryId: '',
        brandName: '',
        brandLogo: '',
        hot: 1
      }
    }
  },
  mounted () {
    this.init()
    getCategory({ page: 1, pageSize: 100 }).then(res => {
      this.nameList = res.data.rows
      console.log(this.categoryId)
    })
  },
  methods: {
    //   添加分类方法
    addBtnCategory2 () {
      addCategory2(this.categoryForm).then(res => {
        if (res.status === 200) {
          this.$message.success('上传成功')
          this.init()
        }
      })
    },
    // 上传图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handSuccess (response) {
      console.log(response)
      this.categoryForm.brandLogo = response.picAddr
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
      getTwoCategory({ page: 1, pageSize: 10 }).then(res => {
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

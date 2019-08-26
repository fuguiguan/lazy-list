<template>
    <div class="search">
        <el-form :inline="true" :model="formInline" ref="addForm">
            <el-form-item label="标题" prop="searchText">
                <el-input @input="inputChange" placeholder="请输入要搜索的标题" style="width:400px" v-model="searchText"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="info" v-on:click="handleQueryClick">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="showAddItem" type="primary">添加</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="delSelectItems" type="danger">批量删除</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="新建项目" :visible.sync="showAddItemDialog" center width="40%">
            <el-form :model="formDate" :rules="rules">
                <!-- <el-form-item label="图片" prop="addPicture">
                    <el-upload list-type="picture-card">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="地址" prop="url">
                    <el-input placeholder="请输入图片链接地址" style="width:60%" clearable v-model="formDate.url"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input placeholder="请输入标题" style="width:60%" clearable v-model="formDate.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input placeholder="请输入描述内容" style="width:60%" v-model="formDate.desc" type="textarea" resize="none" rows="4"></el-input>
                </el-form-item>
            </el-form>
            <footer class="footer">
                <el-button v-on:click="addItem" size="small" type="primary" plain>立即添加</el-button>
                <el-button @click="cancel" size="small" type="danger" plain>取消</el-button>
            </footer>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        var chechUrl = (rule, value, callback) => {
            let pattern = /^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/
            if(value=='') {
                callback(new Error('地址格式不正确'))
            }
        };
        return {
            formInline: {},
            searchText: '',
            showAddItemDialog: false,
            formDate: {
                url: '',
                title: '',
                desc: ''
            },
            rules: {
                searchText: [
                    { required: true, message: '请输入搜索内容', trigger: 'blur' },
                    { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: '请输入项目标题', trigger: 'blur' },
                    { min: 1, max: 12, message: '长度在 1 到 12个字符', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请输入项目的描述', trigger: 'blur' },
                    { min: 1, max: 150, message: '长度在 10 到 150 个字符', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入图片地址', trigger: 'blur' },
                    { validator: chechUrl, trigger: blur }
                ]
            }
        }
    },
    methods: {
        showAddItem() {
            this.showAddItemDialog = true
        },
        addItem() {
            this.$refs['addForm'].validate(valid => {
                if(valid) {
                    this.$emit('addItem',this.formDate)
                }
            })
             this.showAddItemDialog = false
        },
        cancel() {
            this.showAddItemDialog = false
        },
        delSelectItems() {
            this.$message({
                message: '该功能暂未开发',
                type: 'warn'
            })
            this.$emit('delSelectItems')
        },
        handleQueryClick() {
            if(this.searchText) {
                this.$emit('queryItems',this.searchText)
            }
            else {
                this.$message({
                message: '查询的内容不能为空',
                type: 'error'
            })
            }
        },
        inputChange() {
            this.searchText ? '': this.$emit('queryItems',this.searchText)
        }
    }
}
</script>   
<style scoped>
    .search {
        margin-top: 50px;
    }
    .footer {
        display: flex;
        display: -webkit-flex;
        display: -ms-flexbox;
        justify-content: center;  
    }
</style>



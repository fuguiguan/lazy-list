<template>
    <div class="item">
        <div class="picture">
            <el-image :src="item_url" fit="fill" style="width:100%;height:100%"/>
            <!-- <el-upload action="#">
                <el-button v-show="showImgBtn" @click="changeImg" class="imgBtn" size="small" type="primary" plain>更换图片</el-button>
            </el-upload> -->
            <el-button v-show="showImgBtn" @click="changeImg" class="imgBtn" size="small" type="primary" plain>更换图片</el-button>
        </div>
        <div class="info">
            <div class="item-title">
                <h6 v-if="showTitle">{{item_title}}</h6>
                <el-input v-else type="text" size="small" v-model="item_title" class="title-input" show-word-limit clearable minlength="1" maxlength="16" required></el-input>
            </div>
            <div class="item-desc">
                <p v-if="showDesc">{{item_desc}}</p>
                <el-input v-else type="textarea" rows="3" resize="none" show-word-limit v-model="item_desc" class="desc-input" clearable minlength="1" maxlength="120"></el-input>
            </div>
        </div>
        <div class="btns">
                <el-button v-if="showEdit" @click="edit" type="primary" size="mini">编辑</el-button>
                <el-button v-else v-on:click="save" type="success" size="mini">保存</el-button>
                <el-button v-on:click="delItem" type="danger" size="mini">删除</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: '',
        url: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showImgBtn: false,
            showTitle: true,
            showDesc: true,
            showEdit: true,
            item_id: this.id,
            item_url: this.url,
            item_title: this.title,
            item_desc: this.desc
        }
    },
    methods: {
        edit() {
            this.showTitle = false
            this.showDesc = false
            this.showImgBtn = true
            this.showEdit = false
        },
        save() {
            this.showTitle = true
            this.showDesc = true
            this.showImgBtn = false 
            this.showEdit = true
            this.$emit('savaItem')
            this.$message({
                message: '保存成功！',
                type: 'success'
            })
        },
        changeImg() {
            this.$prompt('请输新图片的地址', '更换图片', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/,
                inputErrorMessage: '图片地址格式不正确'
                }).then(({ value }) => {
                    this.item_url = value
                this.$message({
                    type: 'success',
                    message: '更换图片成功'
                })
                this.showImgBtn = false
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
                });
        },
        delItem() {
            if(!this.showEdit) {
                this.$message({
                    message: '请先保存项目',
                    type: 'error'
                })
            }
            if(this.showEdit) {
                this.$emit('delItem')
            }
        }
    }
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}
.item {
    height: 300px;
    width: 250px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 25px;
    transition: box-shadow 0.8s,margin-top 0.5s;
    -webkit-transition:box-shadow 0.8s,margin-top 0.5s;
    -ms-transition: box-shadow 0.8s,margin-top 0.5s;
}
.item:hover {
    box-shadow:0 3px 2px 3px #ccc;
	margin-top: -10px;
}
.picture {
    position: relative;
    width: 250px;
    height: 145px;
}
.info {
    width: 250px;
    height: 120px;
}
.item-title {
    width: 250px;
    height: 20px;
    margin-bottom: 5px;
}
.title-input {
    display: block;
    width: 100%;
    height: 100%;
    background-color: blanchedalmond;
    z-index: 10;
}
.item-desc {
    width: 250px;
    height: 90px;
}
.desc-input {
    display: block;
}
.item-title h6 {
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    padding: 5px 0;
    text-align: center;
    height: 100%;
}
.item-desc p {
    box-sizing: border-box;
    text-indent: 28px;
    height: 100%;
    padding: 5px 10px;
    text-align: left;
    font-size: 14px;
    line-height: 14px;
    overflow: hidden;
}
.imgBtn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
}
.btns {
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;
    justify-content: center;
}
</style>



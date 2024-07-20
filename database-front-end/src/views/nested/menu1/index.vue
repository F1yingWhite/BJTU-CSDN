<template>
    <div :gutter="20" class="app-container" type="flex" align="middle">
      <div :xs="24" :sm="24" :md="10" :lg="9" :xl="8" style="margin-bottom: 10px" align="middle">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <h3>个人信息</h3>
            </span>
          </div>
          <div>
            <div style="text-align: center">
              <div class="el-upload">
                <myUpload v-model="showDialog" :modelValue.sync="imagecropperShow" @crop-success="cropSuccess" />
                <img :src="currentAvatar || Avatar" title="点击上传头像" class="avater" @click="toggleShow"
                  style="width:100px; height:100px; border-radius:50%; ">
              </div>
              <div class="user-info">
                <li>
                  <div style="height: 100%;">
                    <i class="el-icon-user" /> 登录账号
                    <div class="user-right">{{ user.username }}</div> <!--user.id-->
                  </div>
                </li>

                <li>
                  <div style="height: 100%;">
                    <i class="el-icon-picture-outline-round" /> 用户昵称
                    <div class="user-right">{{ user.nickname }}</div> <!-- user.username -->
                  </div>
                </li>

                <li>
                  <div style="height: 100%;">
                    <i class="el-icon-s-promotion" /> 邮箱
                    <div class="user-right">{{ user.email || 'xxxxxx@12.com' }}</div> <!--//user.phoneNumber-->
                  </div>
                </li>

                <li>
                  <div style="height: 100%;">
                    <i class="el-icon-s-order" /> 注册时间
                    <div class="user-right">{{ user.reg_time ? user.reg_time : '0000:00:00' }}</div>
                  </div>
                </li>

                <li>
                  <div style="height: 100%;">
                    <i class="el-icon-s-custom" /> ID
                    <div class="user-right">{{ user.id }}</div> <!--//user.phoneNumber-->
                  </div>
                </li>

              </div>
              <div>
                <el-button type="primary" icon="el-icon-edit" style="margin-top:20px" @click="changeDiage"></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
       <!-- email对话框 -->
    <el-dialog title="修改邮箱" :visible.sync="showDialog_change" @close="closeDialog">
      <el-input v-model="newPickName" placeholder="请输入新的昵称(不改可不填)"></el-input>
      <el-input v-model="newEmail" placeholder="请输入新的邮箱地址(不改可不填)"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateEmail">确认</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
const qiniu = require('qiniu-js');
import { getUploadToken } from '@/api/upload.js';
import { getInfo } from '@/api/user'
import avatar from '../../../assets/images/avatar.png'
import { changeface } from '@/api/user';
import {altInform} from '@/api/user'
import vue from 'vue'
// import user from 'mock/user';


export default {
  name: 'Center',
  components: { myUpload },
  async created() {
    const res = await getInfo()
    console.log(res)
    this.user = res.data
    console.log(this.user)
  },
  data() {
    return {
      showDialog_change: false, // 控制对话框显示与隐藏
      newEmail: '', // 存储新邮箱地址的数据属性
      showDialog: false,
      imagecropperShow: false,
      user: getInfo(),
      Avatar: vue.prototype.$avatar || avatar,
      currentAvatar: '',
      newPickName: ''

    }
  },
  methods: {
    //获取随机名字
    generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    },


    // 点击头像打开上传窗口
    toggleShow() {
      console.log('toggleShow')
      this.showDialog = !this.showDialog
      this.imagecropperShow = !this.imagecropperShow
      console.log(this.showDialog)
    },

    cropSuccess(imageData) {
      console.log('cropSuccess')
      const formatMatch = imageData.match(/^data:image\/(\w+);base64,/);
      if (formatMatch) {
        const imageFormat = formatMatch[1];
        console.log("图片格式:", imageFormat);

        const binaryImage = atob(imageData.split(",")[1]);
        const uint8Array = new Uint8Array(binaryImage.length);
        for (let i = 0; i < binaryImage.length; i++) {
          uint8Array[i] = binaryImage.charCodeAt(i);
        }

        const blob = new Blob([uint8Array]);
        const promise = getUploadToken();
        let token = '';

        promise.then((data) => {
          console.log(data)
          token = data.data.message;

          //生成随机名字
          let imageName = this.generateRandomString(6);
          imageName = imageName + '.' + imageFormat

          const file = new File([blob], imageName, { type: 'image/' + imageFormat });

          const putExtra = {};
          const config = { region: qiniu.region.z2 };
          const observable = qiniu.upload(file, file.name, token, putExtra, config)
          let that = this;
          const observer = {        //监听
            next(res) {
              // ...
            },
            error(err) {
              // ...
            },
            complete(res) {
              // ...
              // that.Avatar = 'http://rw9rukta6.hn-bkt.clouddn.com/'+ res.key;
              that.currentAvatar = 'http://rw9rukta6.hn-bkt.clouddn.com/' + res.key;
              console.log(that.currentAvatar)
              const userface = that.currentAvatar
              vue.prototype.$avatar = userface
              console.log(userface)
              changeface({ userface }).then(res => {
                console.log('successfully');
              }).catch(err => {
                console.log(err);
              });
            }
          }
          const subscription = observable.subscribe(observer) // 上传开始

        }).catch((error) => {
          console.log(error);
        })
      } else {
        console.error("无法获取图片格式");
      }
    },
    changeDiage(){
      this.showDialog_change = !this.showDialog_change;
    },
    closeDialog(){
      this.showDialog_change = false;
    },
    updateEmail(){
      // 获取输入的值
      console.log(this.user)
      const username = this.user['username'];
      const nickname = this.newPickName ? this.newPickName : this.user['nickname'];
      const email = this.newEmail ? this.newEmail : this.user['email'];
      const id = this.user['id'];
      const reg_time = this.user['reg_time'];
      const userface = this.user['userface'];
      const enabled = this.user['enabled'];
      console.log(username,nickname,email,id,reg_time,userface,enabled)
      this.showDialog_change = false;
      altInform({username, nickname, email, id, reg_time, userface, enabled }).then(res=>{
        console.log('successfully');
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>


<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.app-container {
  background-size: 100% 100%;
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
  bottom: 100%;

}

.user-info {
  padding-left: 0;
  list-style: none;
  li {
    border-bottom: 1px solid #f0f3f4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right {
    width: 250px;
    float: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: right;
  }
}
</style>

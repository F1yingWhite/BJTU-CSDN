<!-- <template>
  <div class="app-container">
<el-row :gutter="20">
      <el-col
          :xs="24"
          :sm="24"
          :md="10"
          :lg="9"
          :xl="8"
          style="margin-bottom: 10px"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><h3>个人信息</h3></span>
          </div>
          <div>
          <div style="text-align: center">
            <div class="el-upload">
              <myUpload
                  v-model="showDialog"
                  :headers="headers"
                  :url="baseApi+'/api/user/updateAvatar'"
                  @crop-upload-success="cropUploadSuccess"
              />
              <img
                :src="
                // user.avatarUrl
                //   ? baseApi + '/file/'+user.avatarUrl
                Avatar
                "
                title="点击上传头像"
                class="avater"
                @clik="toggleShow"
              >
            </div>
            <ui class="user-info">
              <li>
                <div style="height: 100%;">
                  <i class="el-icon-user"/> 登录账号
                  <div class="user-right">{{ }}</div>   //user.id 
                </div>
              </li>

              <li>
                  <div style="height: 100%;">
                    <i class="el-icon-picture-outline-round"/> 用户昵称
                    <div class="user-right">{{  }}</div>  //user.username
                  </div>
                </li>

                <li>
                  <div style="height: 100%;">
                    <i class="el-icon-phone"/> 电话号码
                    <div class="user-right">{{ }}</div>  //user.phoneNumber 
                  </div>
                </li>

            </ui>
          </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<el-alert :closable="false" title="基本信息">-->
<!--&lt;!&ndash;      <router-view />&ndash;&gt;-->
<!--</el-alert>-->
<!-- <script>
  import myUpload from 'vue-image-crop-upload'
  import {mapGetters} from 'vuex'
  import {getToken} from '@/utils/auth'
  import store from '@/store'
  import Avatar from '../../../../assets/images/avatar.png'
  export default {
    name: 'Center',
  components: {myUpload},
  data() {
    return {
    showDialog: false,
  Avatar: Avatar,
  headers: {
    'Authorization': getToken()
      },
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'baseApi'
    ])
  },

  methods: {
    // 点击头像打开上传窗口
    toggleShow() {
    this.showDialog = !this.showDialog
  },
  // 上传成功后重新载入信息
  cropUploadSuccess(jsonData, field) {
    store.dispatch('getInfo').then(() => { })
  },
  }
}
</script>  -->
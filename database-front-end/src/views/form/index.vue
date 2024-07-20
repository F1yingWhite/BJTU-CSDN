<template>
  <div class="app-container">
    <div class="container1">
      <vue-particles color="#eee" :particleOpacity="0.5" :particlesNumber="75" shapeType="circle" :particleSize="4"
        linesColor="#eee" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2"
        :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
      </vue-particles>
    </div>
    <el-form label-width="120px">
      <el-form-item label="博客名称">
        <input v-model="form.title" class="input-style" />
      </el-form-item>
      <el-form-item label="博客分类">
        <el-radio-group v-model="form.catgory" @change="updateCid">
          <el-radio label="Vue22" name="type">Vue22</el-radio>
          <el-radio label="人生感悟" name="type">人生感悟</el-radio>
          <el-radio label="JavaEE" name="type">JavaEE</el-radio>
          <el-radio label="Git" name="type">Git</el-radio>
          <el-radio label="Linux" name="type">Linux</el-radio>
          <el-radio label="MongoDB" name="type">MongoDB</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否匿名">
        <el-radio-group v-model="form.whetherNiming">
          <el-radio label="0" name="type">匿名</el-radio>
          <el-radio label="1" name="type">不匿名</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="博客提要">
        <input ref="text" v-model="form.summary" class="input-style" style="width: 800px;" />
      </el-form-item>
      <el-form-item label="博客内容">
        <quill-editor ref="text" v-model="form.html_content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="!isFormComplete">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//npm install mavon-editor --s
//npm i vue-quill-editor -–save要下这个哦
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { send } from '@/api/form'
import { parseTime } from '@/utils/index'
import axios from "axios"
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from '@/store'
const currentTime = parseTime(Date.now(), '{y}-{m}-{d} {h}:{i}:{s}')

Vue.use(mavonEditor);
export default {

  computed: {
    isFormComplete () {
      return this.form.title && this.form.whetherNiming && this.form.html_content && this.form.summary
        && this.form.catgory && store.getters.enable != 3;
    },
    ...mapGetters([
      'sname'
    ])
  },
  data () {
    return {
      form: {
        title: '',
        user_name: this.sname,
        cid: '',
        catgory: '',
        whetherNiming: '',
        publish_date: currentTime,
        edit_date: currentTime,
        md_content: 'hyx',
        html_content: '',
        summary: '',
        state: '1',
        collect: '0',
        xihuan: '0',
        view: '0',
        pageView: '0',
      }
    }
  },
  components: {
    quillEditor
  },
  mounted () {
    this.$nextTick(() => {
      const quillInstance = this.$refs.text.quill; // 获取Quill实例
      const editorElement = quillInstance.getModule("toolbar").container;
      const contentElement = quillInstance.container.firstChild;
      contentElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // 设置编辑器内容区域的背景颜色为半透明的黑色
      editorElement.style.backgroundColor = "rgba(0, 0, 0)";
      editorElement.style.color = "white"; // 设置编辑器工具栏的颜色
      contentElement.style.color = "white"; // 设置编辑器内容区域的颜色
    });
    this.$nextTick(() => {
      const inputElement = this.$refs.text.$refs.input.$el;
      inputElement.style.backgroundColor = "transparent";
      inputElement.style.color = "white";
    });
  },
  methods: {
    onSubmit () {
      // if (this.form.user_name == undefined)
      // {
      //   this.$message.warning('请重新登入');
      //   return;
      // }
      // this.$store.dispatch('user/send', this.form).then(() => {
      //   // 处理成功的响应
      //   this.$message('Article sent successfully!')
      //   this.form = {
      //     title: '',
      //     user: this.$userName,
      //     cid: '',
      //     state: '',
      //     publish_date: currentTime,
      //     md_content: ''
      //   };
      // }).catch(() => {
      //   // 处理错误的响应
      //   this.$message.error('Failed to send article')
      // })
      this.form.user_name = this.sname
      this.form.md_content = this.form.html_content
      // console.log(this.form.xihuan)
      // console.log(this.form.user_name)
      send(this.form).then(response => {
        // 处理成功的响应
        this.$message('Article sent successfully!')
        this.form = {
          title: '',
          user_name: this.sname,
          cid: '',
          catgory: '',
          whetherNiming: '',
          publish_date: currentTime,
          edit_date: currentTime,
          md_content: 'hyx',
          html_content: '',
          summary: '',
          state: '1',
          catgory: '',
          collect: '0',
          xihuan: '0',
          view: '0',
          pageView: '0',

        };
      }).catch(error => {
        // 处理错误的响应
        this.$message.error('Failed to send article')
      })
    },
    updateCid () {
      if (this.form.catgory === 'Vue22')
      {
        this.form.cid = '56';
      } else if (this.form.catgory === '人生感悟')
      {
        this.form.cid = '58';
      } else if (this.form.catgory === 'JavaEE')
      {
        this.form.cid = '60';
      }
      else if (this.form.catgory === 'Git')
      {
        this.form.cid = '61';
      }
      else if (this.form.catgory === 'Linux')
      {
        this.form.cid = '62';
      }
      else if (this.form.catgory === 'MongoDB')
      {
        this.form.cid = '64';
      }
    },
    onCancel () {
      console.log(this.form.xihuan)
      console.log(this.form.whetherNiming)
      // console.log(this.form.user)
      this.form = {
        title: '',
        user_name: this.sname,
        cid: '',
        catgory: '',
        whetherNiming: '',
        publish_date: currentTime,
        edit_date: currentTime,
        md_content: 'hyx',
        html_content: '',
        summary: '',
        state: '1',
        catgory: '',
        collect: '0',
        xihuan: '0',
        view: '0',
        pageView: '0',

      };
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>
<style scoped>
.line {
  text-align: center;
}

.app-container {
  width: 100%;
  min-height: 1000px;
  height: auto;
  overflow: hidden;
  background-size: 100% 100%;
  background-image: url(../../assets/background/pp.jpg);
  /* background-size: 100%;
  background-image: url(../../assets/background/c1.png); */
}

.input-style {
  background: transparent;
  color: white;
  width: 600px;
  height: 40px;
  transition: border-color 0.3s;
  border: 1px solid white;
  border-radius: 8px;
}

.input-style:hover {
  border-color: white;
}

.input-style:focus {
  border-color: white;
  border-width: 2px;
  outline: none;
}

.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}


.container1 {
  height: 100px;
}
</style>

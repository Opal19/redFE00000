<template>
  <div class="container blog-wrapper">
    <main-header navsel="back"></main-header>
    <h1>สร้างfish</h1>
    <form v-on:submit.prevent = "createfish">
      <p>
        <label class="control-label">ชื่อปลา: </label>
        <input type="text" v-model="fish.namefish" class="form-control">        
      </p>
      <p>
        <label class="control-label">ประเภทปลา :</label>
        <input type="text" v-model="fish.typefish" class="form-control">
      </p>
      <p>
        <label class="control-label">price :</label>
        <input type="text" v-model="fish.price" class="form-control">
      </p>
      <p>
        <label class="control-label">สถานะ :</label>
        <input type="text" v-model="fish.status" class="form-control">
      </p>
      <p>
        รูปสินค้า 
      </p>
      <transition name="fade">
        <div class="thumbnail-pic" v-if="fish.thumbnail != 'null'">
          <img class="img-thumbnail" :src="BASE_URL+fish.thumbnail" alt="thumbnail">
        </div>
      </transition>
      <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <!-- <p v-if="isInitial || isSuccess"> -->
            <p v-if="isInitial">
              ลากไฟล์ของคุณมาที่นี่เพื่อเริ่มต้น<br> หรือคลิกเพื่อเรียกดู
            </p>
            <p v-if="isSaving">
              กำลังอัปโหลด {{ fileCount }} ไฟล์...
            </p>   
            <p v-if="isSuccess">
              อัปโหลดสำเร็จ
            </p>            
        </div>
      </form>
      <div>
        <transition-group tag="ul" name="fade" class="pictures">        
          <li v-for="picture in pictures" v-bind:key="picture.id">              
            <img class="img-thumbnail" style="margin-bottom:5px;" :src="BASE_URL+picture.name" alt="picture image">              
            <br />  
            <button class="btn btn-xs btn-info" v-on:click.prevent="useThumbnail(picture.name)">รูปขนาดย่อ</button>
            <button class="btn btn-xs btn-danger" v-on:click.prevent="delFile(picture)">ลบ</button>
          </li>        
        </transition-group>
        <div class="clearfix"></div>
      </div>  
       
      <p>
        <button class="btn btn-success" type="submit">สร้างfish</button>
        <button class="btn btn-default" type="button" v-on:click="navigateTo('/fishs')">กลับ</button>
      </p> 
    </form>   
    <br>    
  </div>
</template>
<script>
import FishService from '@/services/FishService'
import VueCkeditor from "vue-ckeditor2"
import UploadService from '@/services/UploadService'
import {mapState} from 'vuex'
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3
export default {
  mounted () {
    if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'        
      })
    }
  },
  data () {
    return {
      fish: {
        namefish: '',
        typefish :'',
        thumbnail: 'null',
        pictures: [],
        price : '',
        status: ''
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"]
        ],
        height: 300
      },
      // upload data
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,      
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",      
      uploadedFileNames:[],
      pictures: [],
      pictureIndex: 0,
    }
  },
  methods: {// upload
    navigateTo (route) {
      this.$router.push(route)
    },
    useThumbnail (filename) {     
      console.log(filename) 
      this.fish.thumbnail = filename
    },
    async delFile (material){
      let result = confirm("Want to delete?")
      if (result) {
        let dataJSON = {
          "filename":material.name
        }
        await UploadService.delete(dataJSON)      
        for (var i=0;i<this.pictures.length;i++){
          if(this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1)
            this.materialIndex--
            break
          }
        }    
      } 
    },
    wait(ms) {
      return x => {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
      };
    },    
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      // this.uploadedFiles = []
      this.uploadError = null   
      this.uploadedFileNames = []
    },
    async save(formData) {
      // upload data to the server
      try {
        this.currentStatus = STATUS_SAVING
        await UploadService.upload(formData)
        this.currentStatus = STATUS_SUCCESS
        // update image uploaded display
        let pictureJSON = []
        this.uploadedFileNames.forEach(uploadFilename => {
          let found = false;
          for(let i=0;i<this.pictures.length;i++){
            if(this.pictures[i].name == uploadFilename){            
              found = true            
              break
            }            
          }
          if(!found){
            this.pictureIndex++
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename
            }
            this.pictures.push(pictureJSON) 
          }  
        })
      } catch (error) {
        console.log(error)
        this.currentStatus = STATUS_FAILED
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      // save it
      this.save(formData);
    },
    clearUploadResult: function(){            
      setTimeout(() => this.reset(), 5000);
    },
    async createfish () {
      this.fish.pictures = JSON.stringify(this.pictures)
      try {
        await FishService.post(this.fish)
        this.$router.push({
          name: 'fishs'
        })
      } catch (err) {
        console.log(err)
      }
    },
    onBlur (editor) {
      console.log(editor);
    },
    onFocus (editor) {
      console.log(editor);
    },
  },
  components: { 
    VueCkeditor 
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  created () {
    this.reset(),
    this.config.toolbar = [
      {
        name: "document",
        items: [
          "Source",
          "-",
          "Save",
          "NewPage",
          "Preview",
          "Print",
          "-",
          "Templates"
        ]
      },
      {
        name: "clipboard",
        items: [
          "Cut",
          "Copy",
          "Paste",
          "PasteText",
          "PasteFromWord",
          "-",
          "Undo",
          "Redo"
        ]
      },
      {
        name: "editing",
        items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
      },
      {
        name: "forms",
        items: [
          "Form",
          "Checkbox",
          "Radio",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField"
        ]
      },
      "/",
      {
        name: "basicstyles",
        items: [
          "Bold",
          "Italic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
          "-",
          "CopyFormatting",
          "RemoveFormat"
        ]
      },
      {
        name: "paragraph",
        items: [
          "NumberedList",
          "BulletedList",
          "-",
          "Outdent",
          "Indent",
          "-",
          "Blockquote",
          "CreateDiv",
          "-",
          "JustifyLeft",
          "JustifyCenter",
          "JustifyRight",
          "JustifyBlock",
          "-",
          "BidiLtr",
          "BidiRtl",
          "Language"
        ]
      },
      { name: "links", items: ["Link", "Unlink", "Anchor"] },
      {
        name: "insert",
        items: [
          "Image",
          "Flash",
          "Table",
          "HorizontalRule",
          "Smiley",
          "SpecialChar",
          "PageBreak",
          "Iframe",
          "InsertPre"
        ]
      },
      "/",
      { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
      { name: "colors", items: ["TextColor", "BGColor"] },
      { name: "tools", items: ["Maximize", "ShowBlocks"] },
      { name: "about", items: ["About"] }
    ]
  }
}
</script>
<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki; /* when mouse over to the drop zone, change color
    */
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
/* thumbnail */
.thumbnail-pic img{
 width:200px;
}
</style>
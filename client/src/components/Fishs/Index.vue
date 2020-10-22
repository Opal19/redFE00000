<template>
    <div>
        <div class="blog-header">
 <h2>ส่วนจัดการสินค้า</h2>
 <div>
 <form>
 <input type="text" v-model="search" placeholder="Search">
 </form>
</div>
 <div>
 <button v-on:click="navigateTo('/fish/create')">create
fish</button>
 <strong> จํานวน fish: </strong> {{fishs.length}}</div>
 <br>
 </div>

 <div v-if="fishs.length === 0" class="empty-blog">
 *** ไม่มีข้อมูล***
 </div>

 <div v-for="fish in fishs" v-bind:key="fish.id" class="blog-list">
 <!-- <p>id: {{ blog.id }}</p> -->
 <div class="blog-pic">
 <transition name="fade">
 <div class="thumbnail-pic" v-if="fsih.thumbnail != 'null'">
 <img :src="BASE_URL+fsih.thumbnail" alt="thumbnail">
 </div>
 </transition>
 </div>

 <h3>{{ fsih.namefish }}</h3>
 <p><strong>typefish:</strong> {{ fsih.type }}</p>
 <p><strong>status:</strong> {{ fsih.status }}</p>
 <p><strong>Create:</strong> {{ fsih.createdAt }}</p>
 <!-- <p>status: {{ blog.status }}</p> -->
 <p>
 <button class="btn btn-outline-primary" v-on:click="navigateTo('/fsih/'+ fsih.id)">ดู blog</button>
 <button v-on:click="navigateTo('/fsih/edit/'+ fsih.id)">แกไข้ blog</button>
 <button v-on:click="deleteBlog(fsih)">ลบข้อมูล</button>
 </p>
 </div>

 <div class="clearfix"></div>
 </div>

</template>
<script>
    import FishService from '@/services/FishService'
    import _ from 'lodash'
    export default {
        data () {
            return {
                search: '',
                products: [],
                BASE_URL: "http://localhost:8081/assets/uploads/",
                pictures: [],
            }
            
        },
        watch: {
                search: _.debounce(async function (value) {
                const route = {
                    name: 'fishs'
                }
                if(this.search !== '') {
                    route.query = {
                        search: this.search
                    }
                }

                console.log('search: ' + this.search)
                this.$router.push(route)
                }, 700),

                '$route.query.search': {
                    immediate: true,
                    async handler (value) {
                        this.fishs = (await FishService.index(value)).data
                    }
                }
            },
        async created () {
            this.fishs = (await FishService.index()).data
        },
        methods: {
            logout () {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setBlog', null)
                this.$router.push({
                    name: 'login'
                })
            },
            navigateTo (route) {
                this.$router.push(route)
            },
            async deleteBlog (fish) {
                let result = confirm("Want to delete?")
                if (result) {
                    try {
                        await FishService.delete(fish)
                        this.refreshData()
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            async refreshData() {
                this.fishs = (await FishService.index()).data
            }
        }
    }
</script>
<style scoped>
.empty-blog {
 width: 100%;
 text-align: center;
 padding:10px;
 background:darksalmon;
 color:white;
}
/* thumbnail */
.thumbnail-pic img{
 width: 200px;
 padding: 5px 10px 0px 0px;
}
.blog-info {
 float: left;
}
.blog-pic {
 float: left;
}
.clearfix {
 clear: both;
}
.blog-list {
 border:solid 1px #dfdfdf;
 margin-bottom: 10px;
 max-width: 900px;
 margin-left: auto;
 margin-right: auto;
 padding: 5px;
 box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
}
.blog-header {
 max-width: 900px;
 margin-left: auto;
 margin-right: auto;
}
</style>
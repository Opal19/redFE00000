<template>
    <div>
        <h1>Show Blog</h1>
        <p>id: {{ fish.id }}</p>
        <p>namefish: {{ fish.namefish }}</p>
        <p>typefish: {{ fish.typefish }}</p>
        <p>price: {{ fish.price }}</p>
        <p>status: {{ fish.status }}</p>
        <p>
        <button v-on:click="navigateTo('/fish/edit/'+ fish.id)">แก้ไข
        blog</button>
        <button v-on:click="navigateTo('/fishs')">กลับ </button>
        </p>
    </div>
</template>
<script>
    import FishService from '@/services/FishService'
    export default {
        data () {
            return {
                fish: null
            }
        },
        async created () {
            try {
                let fishId = this.$route.params.fishId
                this.fish = (await FishService.show(fishId)).data
            } catch (error) {
                console.log (error)
            }
        },
        methods : {
            navigateTo (route) {
                this.$router.push(route)
            },
        }
    }
</script>
<style scoped>
</style>
<template>
    <div>
        <h1>รายละเอียดสุนัข</h1>
        <p>id: {{ product.id }}</p>
        <p>ชื่อสุนัข: {{ product.name }}</p>
        <p>ประเภท: {{ product.taste }}</p>
        <p>price: {{ product.price }}</p>
        <p>status: {{ product.status }}</p>
        <p>
        <button class="btn btn-outline-primary" v-on:click="navigateTo('/products')">กลับ </button>
        </p>
    </div>
</template>
<script>
    import ProductService from '@/services/ProductService'
    export default {
        data () {
            return {
                product: null
            }
        },
        async created () {
            try {
                let productId = this.$route.params.productId
                this.product = (await ProductService.show(productId)).data
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
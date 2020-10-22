<template>
    <div>
        <h1>Edit product</h1>
        <form v-on:submit.prevent = "editproduct">
            <p>ชื่อสุนัข: <input type="text" v-model="product.name"></p>
            <p>ประเภทสุนัข: <input type="text" v-model="product.taste"></p>
            <p>price: <input type="text" v-model="product.price"></p>
            <p>status: <input type="text" v-model="product.status"></p>
            <p>
            <button class="btn btn-outline-secondary" type="submit">update product</button>
            <button class="btn btn-outline-primary" v-on:click="navigateTo('/products')">กลับ</button>
            </p>
        </form>
    </div>
</template>
<script>
import ProductService from '@/services/ProductService'
import VueCkeditor from "vue-ckeditor2"

export default {
    components: { VueCkeditor },
    data () {
        return {
            product: {
                name: '',
                tast : '',
                thumbnail: 'null',
                pictures: 'null',
                price: '',
                status: ''
            },
            config: {
                toolbar: [
                    ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
                ],
                height: 300
            },
        }
    },
    methods: {
        async editproduct () {
            try {
                await ProductService.put(this.product)
                this.$router.push({
                    name: 'products'
                })
            } catch (err) {
                console.log(err)
            }
        }

    },
    async created () {
        try {
            let productId = this.$route.params.productId
            this.product = (await ProductService.show(productId)).data
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
                { name: "styles", items: ["Styles", "Format", "Font", "FontSize"]
                },
                { name: "colors", items: ["TextColor", "BGColor"] },
                { name: "tools", items: ["Maximize", "ShowBlocks"] },
                { name: "about", items: ["About"] }
            ]
        } catch (error) {
            console.log (error)
        }
    },
    onBlur (editor) {
        console.log(editor);
    },
    onFocus (editor) {
        console.log(editor);
    },


}
</script>
<style scoped>
</style>
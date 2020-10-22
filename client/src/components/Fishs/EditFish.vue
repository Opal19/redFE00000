<template>
    <div>
        <h1>Edit fish</h1>
        <form v-on:submit.prevent = "editfish">
            <p>namefish: <input type="text" v-model="fish.namefish"></p>
            <p>typefish: <input type="text" v-model="fish.typefish"></p>
            <p>price: <input type="text" v-model="fish.price"></p>
            <p>status: <input type="text" v-model="fish.status"></p>
            <p>
            <button type="submit">update fish</button>
            <button v-on:click="navigateTo('/fishs')">กลับ</button>
            </p>
        </form>
    </div>
</template>
<script>
import FishService from '@/services/FishService'
import VueCkeditor from "vue-ckeditor2"

export default {
    components: { VueCkeditor },
    data () {
        return {
            fish: {
                namefish: '',
                typefish : '',
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
        async editfish () {
            try {
                await FishService.put(this.fish)
                this.$router.push({
                    name: 'fishs'
                })
            } catch (err) {
                console.log(err)
            }
        }

    },
    async created () {
        try {
            let fishId = this.$route.params.fishId
            this.fish = (await FishService.show(fishId)).data
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
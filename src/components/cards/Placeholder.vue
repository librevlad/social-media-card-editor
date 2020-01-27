<template>
    <div class="placeholder" :style="placeholderStyle">
        <i v-show="!src" class="fa fa-image placeholder-icon"></i>
        <span v-show="!src" class="placeholder-text">Image Preview</span>
    </div>
</template>

<script>
    export default {
        props: {
            src: {},
            placeholder: {
                default: "https://anyimage.io/img/PreviewImage.jpg"
            },
            moveArrow: {
                default: "https://anyimage.io/img/novaposhta.png"
            },
        },
        data() {
            return {
                loadedSrc: '',
                placeholderImage: this.placeholder,
                moveArrowImage: this.moveArrow,
            };
        },
        mounted() {
            this.loadedSrc = '';

            if ( !this.src ) {
                return;
            }
            let i = new Image();
            i.src = this.src;
            i.onload = () => {
                this.loadedSrc = this.src;
                i = false;
            };

        },
        watch: {
            xrc() {
                let i = new Image();
                i.src = this.xrc;
                i.onload = () => {
                    this.loadedSrc = this.xrc;
                    i = false;
                };
            },
        },
        computed: {
            xrc() {
                return this.src;
            },
            placeholderStyle() {
                if ( this.loadedSrc ) {
                    return 'background-image: url("' + this.loadedSrc + '")';
                }
                // return 'background-image: url("' + this.placeholderImage + '")';
                return ' ';
            }
        },
        methods: {}
    };
</script>


<style lang="scss" scoped>

    .placeholder {
        background-image: url('https://anyimage.io/img/PreviewImage.jpg');

        @apply absolute top-0 flex flex-col items-center justify-center w-full h-full bg-cover bg-center;

        &.move-arrow {
            background-size: 15%;
            background-image: url('https://anyimage.io/img/novaposhta.png');
            background-color: rgba(0, 0, 0, 0.2);
            background-repeat: no-repeat;
            pointer-events: none;

            .placeholder-icon, .placeholder-text {
                display: none;
            }
        }

        .placeholder-icon {
            font-size: 50px;
            color: #fff;
        }

        .placeholder-text {
            font-size: 16px;
            color: #fff;
        }
    }

</style>

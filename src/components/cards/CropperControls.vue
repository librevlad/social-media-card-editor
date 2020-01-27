<template>
    <div class="cropper-controls-wrapper">
        <i @click="cropperEventHub.$emit( 'rotate-by',-90 )"
           class="fa fa-undo-alt icon icon-rotate-left rotate-ccw-btn text-gray-600 text-xs"></i>
        <div class="slider-wrapper">
            <i class="fa fa-image text-gray-700" v-show="width > 400"></i>
            <input type="range" :min="minZoom" max="300" step="1" v-model="zoom"
                   @input="zoomChange" @change="zoomChange"/>
            <i class="fa fa-lg fa-image text-gray-700" v-show="width > 400"></i>
        </div>
        <i @click="cropperEventHub.$emit( 'rotate-by', 90 )"
           class="fa fa-redo-alt icon icon-rotate-right rotate-cw-btn text-gray-600 text-xs"></i>
    </div>
</template>
<script>
    export default {
        props: {},

        inject: ['cropperEventHub'],

        data() {
            return {
                minZoom: 1,
                zoom: 1,
                width: 0,
            };
        },

        created() {
            this.cropperEventHub.$on( 'min-zoom-change', ( e ) => {
                this.minZoom = e * 100;
            } );

            this.cropperEventHub.$on( 'zoom-change', ( e ) => {
                this.zoom = e * 100;
            } );
        },
        mounted() {
            this.width = $( this.$el ).width();

            let elementResizeDetectorMaker = require( "element-resize-detector" );
            let erd = elementResizeDetectorMaker( { strategy: "scroll" } );

            erd.listenTo( this.$el, () => {
                this.width = $( this.$el ).width();
            } );
        },
        methods: {
            zoomChange() {
                this.cropperEventHub.$emit( 'zoom-slider-input', this.zoom / 100 );
            }
        }
    };
</script>
<style lang="scss" scoped>

    .cropper-controls-wrapper {
        display: flex;
        justify-content: center;
        align-self: center;
        width: 100%;
        max-width: 504px;

        .rotate-cw-btn, .rotate-ccw-btn {
            cursor: pointer;
        }

        i {
            padding: 15px;
        }

        .slider-wrapper {
            width: 100%;
            display: flex;

            > * {
                vertical-align: top;
            }

            > i.fa {
                overflow: hidden;
                display: none;

                @media screen and (min-width: 600px) {
                    display: block;
                    vertical-align: middle;
                }
            }

            input[type=range] {
                flex: 1;
            }
        }
    }
</style>

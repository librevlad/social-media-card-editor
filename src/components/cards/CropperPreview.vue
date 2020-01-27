<template>
    <div style="height: 100%; position:relative" class="cropper-preview-image"
         @mouseleave="mouseIsOverPlaceholder=false" @mouseover="mouseIsOverPlaceholder=true">
        <svg v-if="src" style="height: 100%" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <image image-rendering="optimizeQuality" :width="width" :height="height"
                   :xlink:href="src" :transform="transformAttribute" :style="{ transform: transformCss }"
                   @drag.stop @dragstart.stop @dragend.stop @dragleave.stop @dragover.stop @dragenter.stop @drop.stop
                   @touchstart.prevent="moveStart" @touchmove.prevent="move" @touchend.prevent="moving=false"
                   @touchcancel.prevent="moving=false" @mousedown.prevent="moveStart" @mousemove.prevent="move"
                   @mouseup.prevent="moving=false" @mouseout.prevent="moving=false"></image>
        </svg>
        <placeholder v-else></placeholder>
        <placeholder class="move-arrow" v-show="!mouseIsOverPlaceholder && showMoveArrow && !!src"></placeholder>
    </div>
</template>
<script>

    import Placeholder from './Placeholder';

    export default {

        components: { Placeholder },
        inject: [
            'cropperEventHub',
        ],

        props: {
            src: {},
            showMoveArrow: {},
            width: {},
            height: {},
        },

        data() {
            return {

                mouseIsOverPlaceholder: 0,
                moving: false,

                minZoom: 1,
                stateBeforeMove: { x: 0, y: 0, },

                supportsTouch: document.hasOwnProperty( "ontouchstart" ),

                previewState: {
                    zoom: 1,
                    offset: {
                        x: 0,
                        y: 0,
                        extra_x: 0,
                        extra_y: 0,
                    },
                    rotationAngle: 0,
                },

                /*
                * That little preview box containing the visible part of the image
                * */
                preview: {
                    width: 1,
                    height: 1,
                },
            };
        },

        computed: {
            transformCss() {
                return `
                translate(${ this.previewState.offset.x + this.previewState.offset.extra_x }px,
                ${ this.previewState.offset.y + this.previewState.offset.extra_y }px)
                rotate(${ this.previewState.rotationAngle }deg)
                scale(${ this.previewState.zoom })`;
            },
            transformAttribute() {
                return `
                translate(${ this.previewState.offset.x + this.previewState.offset.extra_x }
                 ${ this.previewState.offset.y + this.previewState.offset.extra_y })
                 rotate(${ this.previewState.rotationAngle })
                 scale(${ this.previewState.zoom })`;
            },
            canvas() {
                return {
                    width: ([0, 180].includes( this.previewState.rotationAngle )) ? this.width : this.height,
                    height: ([0, 180].includes( this.previewState.rotationAngle )) ? this.height : this.width,
                };
            }
        },

        mounted() {
            this.preview.height = $( this.$el ).height();
            this.preview.width = $( this.$el ).width();
            this.previewState.rotationAngle = 0;
            this.applyRotationAngle( 0 );

            this.cropperEventHub.$on( 'rotate-by', angle => this.applyRotationAngle( this.previewState.rotationAngle + angle ) );
            this.cropperEventHub.$on( 'zoom-slider-input', e => this.setScale( e ) );

            this.previewState.imageAppliedTimes += !!this.src;

        },
        methods: {
            export() {
                return this.previewState;
            },
            import( previewState ) {
                this.applyRotationAngle( previewState.rotationAngle ? previewState.rotationAngle : 0 );
                this.recalculateScaleAndMinZoom();
                let zoom = previewState.zoom ? previewState.zoom : this.minZoom;
                let offset = previewState.offset ? previewState.offset : { x: 0, y: 0, extra_x: 0, extra_y: 0 };
                this.setScale( zoom );
                this.applyOffset( offset );
                this.cropperEventHub.$emit( 'zoom-change', this.previewState.zoom );
                this.cropperEventHub.$emit( 'min-zoom-change', this.minZoom );
                this.previewState.imageAppliedTimes = previewState.imageAppliedTimes;
            },

            moveStart( e ) {
                this.offsetChangedTimes++;
                if ( document.hasOwnProperty( "ontouchstart" ) && !e.targetTouches ) {
                    return false;
                }
                let et = e.targetTouches ? e.targetTouches[ 0 ] : e;
                this.moving = true;
                this.stateBeforeMove = { x: et.screenX, y: et.screenY, };
            },

            move( e ) {
                if ( !this.moving || (document.hasOwnProperty( "ontouchstart" ) && !e.targetTouches) ) {
                    return false;
                }

                let event = e.targetTouches ? e.targetTouches[ 0 ] : e;

                let zoomedCanvas = {
                    width: this.previewState.zoom * this.canvas.width,
                    height: this.previewState.zoom * this.canvas.height
                };

                let r = {
                    x: Math.min( event.screenX - this.stateBeforeMove.x + this.previewState.offset.x, 0 ),
                    y: Math.min( event.screenY - this.stateBeforeMove.y + this.previewState.offset.y, 0 )
                };

                // prevent dragging outside preview area
                if ( this.preview.width - r.x > zoomedCanvas.width ) {
                    r.x = -(zoomedCanvas.width - this.preview.width);
                }
                if ( this.preview.height - r.y > zoomedCanvas.height ) {
                    r.y = -(zoomedCanvas.height - this.preview.height);
                }

                this.$emit( 'offsetChange' );

                // remember current state
                this.applyOffset( r );
                this.stateBeforeMove = { x: event.screenX, y: event.screenY };
            },

            recalculateScaleAndMinZoom() {
                this.previewState.zoom = this.minZoom = Math.max( (this.preview.width / this.canvas.width), (this.preview.height / this.canvas.height) );
                this.cropperEventHub.$emit( 'zoom-change', this.previewState.zoom );
                this.cropperEventHub.$emit( 'min-zoom-change', this.minZoom );
            },

            normalizeRotationAngle( angle ) {
                let newAngle = angle % 360;
                return (newAngle < 0) ? newAngle + 360 : newAngle;
            },

            applyRotationAngle( angle ) {
                this.previewState.rotationAngle = this.normalizeRotationAngle( angle );
                return this.applyPreviewState();
            },

            applyOffset( offset ) {
                Object.assign( this.previewState.offset, offset );
            },

            setScale( newScale ) {
                newScale = parseFloat( newScale );
                let scaleChange = newScale / this.previewState.zoom;

                let maxX = this.canvas.width * newScale - this.preview.width;
                let maxY = this.canvas.height * newScale - this.preview.height;

                this.previewState.offset.x = this.previewState.offset.x * scaleChange;
                this.previewState.offset.x = -this.previewState.offset.x > maxX ? -maxX : this.previewState.offset.x;

                this.previewState.offset.y = this.previewState.offset.y * scaleChange;
                this.previewState.offset.y = -this.previewState.offset.y > maxY ? -maxY : this.previewState.offset.y;

                this.previewState.zoom = newScale;

                this.previewState.offset.extra_x = 0;
                this.previewState.offset.extra_y = 0;

                this.adjustOffsetForRotationAngle();

            },

            applyPreviewState() {
                this.applyOffset( { x: 0, y: 0, extra_x: 0, extra_y: 0 } );
                this.recalculateScaleAndMinZoom();
                this.adjustOffsetForRotationAngle();
            },

            adjustOffsetForRotationAngle() {
                if ( this.previewState.rotationAngle == 90 ) {
                    this.previewState.offset.extra_x = this.height * this.previewState.zoom;
                    this.previewState.offset.extra_y = 0;
                }

                if ( this.previewState.rotationAngle == 180 ) {
                    this.previewState.offset.extra_x = this.width * this.previewState.zoom;
                    this.previewState.offset.extra_y = this.height * this.previewState.zoom;
                }

                if ( this.previewState.rotationAngle == 270 ) {
                    this.previewState.offset.extra_x = 0;
                    this.previewState.offset.extra_y = this.width * this.previewState.zoom;
                }

            }

        }
    };
</script>

<template>
    <div class="social-card">
        <div class="image-area">
            <slot></slot>
        </div>
        <div class="summary">
            <div class="summary-title-container">
                <div class="summary-title">{{ computedTitle }}
                    <div class="title-dots" v-if="displayTitleDots">...</div>
                </div>
            </div>
            <div class="summary-description-container">
                <div class="summary-description">{{ (this.description.length > this.computedDescription.length) ?
                    computedDescription.substring(0,computedDescription.length-3) : computedDescription
                    }}
                </div>
                <div class="description-dots" v-if="displayDescriptionDots">...</div>
            </div>
            <div class="summary-url" v-text="url"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'description', 'url'],

        mounted() {
            this.computedTitle = this.title;
            this.computedDescription = this.description;
        },
        data() {
            return {
                displayTitleDots: false,
                displayDescriptionDots: false,
                computedTitle: "",
                computedDescription: "",
            };
        },
        watch: {
            title: {
                immediate: true,
                handler: function ( v ) {
                    this.recalculatedTitle();
                }
            },
            description: {
                immediate: true,
                handler: function ( v ) {
                    this.recalculatedTitle();
                }
            },
        },
        methods: {

            showDescriptionDots() {
                var summaryDescriptionContainerHeight =
                    $( this.$el ).find( ".summary-description-container" ).height();
                var summaryDescriptionHeight = $( this.$el ).find( ".summary-description" ).height();
                var showDots = (summaryDescriptionContainerHeight > 0) && (summaryDescriptionHeight > summaryDescriptionContainerHeight);
                this.displayDescriptionDots = showDots;
            },
            showTitleDots() {
                var summaryTitleContainerHeight = $( this.$el ).find( ".summary-title-container" ).height();
                var summaryTitleHeight = $( this.$el ).find( ".summary-title" ).height();
                var showDots = summaryTitleHeight > summaryTitleContainerHeight;
                this.displayTitleDots = showDots;
            },

            recalculatedTitle( v ) {

                this.computedTitle = this.title;
                this.computedDescription = this.description;

                var linesTakenByTitle = $( this.$el ).find( ".summary-title" ).height() / 22;

                var linesAvailableForDescription = 0;

                if ( linesTakenByTitle == 1 ) {
                    linesAvailableForDescription = 3;
                } else if ( linesTakenByTitle == 2 ) {
                    linesAvailableForDescription = 2;
                }
                $( this.$el ).find( ".summary-description-container" ).css( 'max-height', linesAvailableForDescription * 16 );
                this.showTitleDots();
                this.showDescriptionDots();
                if ( !v ) {
                    setTimeout( () => {
                        this.recalculatedTitle( true );
                    }, 50 );
                }

            }

        },


    }; </script>

<style scoped lang="scss">

    .social-card {
        /**
        +2px for border?
         */
        width: 494px;
        background: rgba(0, 177, 187, 0.1);
        border-radius: 0px;
        border: 1px solid #e1e8ed;
        position: relative;
        font-family: Helvetica;

        .img, .image-area {
            width: 492px;
            height: 276px;
        }

        .summary-title-container {
            overflow: hidden;
            position: relative;
            max-height: 66px;

            .title-dots {
                position: absolute;
                bottom: 0;
                right: 0;
                background: white;
                display: inline-block;
            }
        }

        .summary-description-container {
            overflow: hidden;
            position: relative;
            max-height: 48px;

            .description-dots {
                position: absolute;
                bottom: 0;
                right: 0;
                background: white;
                display: inline-block;
            }
        }

        .summary {
            width: 492px;
            background: #fff;
            padding: 10px 12px;
            font-size: 12px;
            font-family: Georgia, Serif;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            flex: 3;

            .summary-title {
                color: #1d2129;
                font-size: 18px;
                margin: 0 0 5px 0px;
                font-weight: 500;
                line-height: 22px;
                word-wrap: break-word;

            }

            .summary-description {
                font-family: Helvetica, Arial, Sans-Serif;
                font-size: 12px;
                line-height: 16px;
                max-height: 80px;
                color: #4b4f56;
                word-wrap: break-word;
            }

            .summary-url {
                text-transform: uppercase;
                color: #90949c;
                font-family: Helvetica, Arial, sans-serif;
                font-size: 11px;
                line-height: 6px;
                margin-top: 11px;
            }

        }
    }

</style>

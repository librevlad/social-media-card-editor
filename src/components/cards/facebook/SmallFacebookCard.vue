<template>
    <div class="social-card">
        <div class="image-area">
            <slot></slot>
        </div>
        <div class="summary">
            <div class="summary-title" v-text="title"></div>
            <div class="summary-description-container">
                <div class="summary-description">{{ (this.description.length > this.computedDescription.length) ?
                    computedDescription.substring(0,computedDescription.length-3) : computedDescription
                    }}
                </div>
                <div class="dots" v-if="displayDots">...</div>
            </div>
            <div class="summary-url" v-text="url"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'description', 'url'],

        mounted() {
            // this.recalculatedDescription();
            this.computedDescription = this.description;
        },

        watch: {
            title: {
                immediate: true,
                handler: function ( v ) {
                    this.recalculatedDescription();
                }
            },
            description: {
                immediate: true,
                handler: function ( v ) {
                    this.recalculatedDescription();
                }
            },
        },

        methods: {

            showDots() {
                var summaryDescriptionContainerHeight = $( this.$el ).find( ".summary-description-container" ).height();
                var summaryDescriptionHeight = $( this.$el ).find( ".summary-description" ).height();
                var showDots = (summaryDescriptionContainerHeight > 0) && (summaryDescriptionHeight > summaryDescriptionContainerHeight);
                this.displayDots = showDots;
            },

            recalculatedDescription( v ) {
                this.computedDescription = this.description;

                var linesTakenByTitle = $( this.$el ).find( ".summary-title" ).height() / 22;
                var linesAvailableForDescription = 5 - linesTakenByTitle;

                $( this.$el ).find( ".summary-description-container" ).css( 'max-height', linesAvailableForDescription * 16 );

                this.showDots();

                if ( !v ) {
                    setTimeout( () => {
                        this.recalculatedDescription( true );
                    }, 50 );
                }

            }
        },

        data() {
            return {
                displayDots: false,
                trimDescriptionInterval: false,
                computedDescription: "",
            };
        },


    }; </script>

<style scoped lang="scss">

    .social-card {
        display: flex;
        flex-direction: row;
        width: 100%;
        background: rgba(0, 177, 187, 0.1);
        border: 1px solid #e1e8ed;
        position: relative;
        overflow: hidden;

        width: 492px;
        border-radius: 0px;

        .image-area {
            width: 158px;
            height: 158px;
        }

        .summary {
            min-width: 334px;
            flex: 3;
            padding: 10px 12px;
            word-wrap: break-word;

            display: flex;
            flex-direction: column;
            align-items: stretch;
            /*overflow: hidden;*/

            background: #fff;
            font-size: 12px;

            border-left: 1px solid rgba(0, 0, 0, 0.1);

            .summary-title {
                font-size: 18px;
                color: #1d2129;
                max-height: 110px;
                font-weight: 500;
                /*white-space: nowrap;*/
                /*overflow: hidden;*/
                text-overflow: ellipsis;
                margin-bottom: 5px;
                font-family: Georgia, serif;
                line-height: 22px;
                word-wrap: break-word;
            }

            .summary-description-container {
                overflow: hidden;
                position: relative;

                .dots {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background: white;
                    display: inline-block;
                }
            }

            .summary-description {
                overflow: hidden;
                /*text-overflow: ellipsis;*/

                word-wrap: break-word;
                max-height: 64px;
                font-family: Helvetica, Arial, sans-serif;
                font-size: 12px;
                line-height: 16px;
                color: #1d2129;
            }

            .summary-url {
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 5px;
                color: #90949c;

                text-transform: uppercase;
                bottom: 13px;
                left: 170px;
                position: absolute;
                right: 0;
                color: #90949c;
                font-family: Helvetica, Arial, sans-serif;
                font-size: 11px;
                line-height: 11px;

            }

        }

    }
</style>

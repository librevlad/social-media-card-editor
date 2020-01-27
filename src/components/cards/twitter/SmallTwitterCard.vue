<template>
    <div class="social-card">
        <div class="image-area">
            <slot></slot>
        </div>
        <div class="summary">
            <div class="summary-title" v-text="title"></div>
            <div class="summary-description" v-text="description"></div>
            <div class="summary-url" v-text="url"></div>
        </div>
    </div>
</template>

<script> export default { props: ['title', 'description', 'url'] }; </script>

<style scoped lang="scss">

    .social-card {
        display: flex;
        background: rgba(0, 177, 187, 0.1);
        border-radius: 5.88px;
        border: 1px solid #e1e8ed;
        position: relative;

        flex-direction: row;

        max-width: 506px;
        min-width: 506px;
        width: auto;

        .image-area, svg, .placeholder {
            border-radius: 5.88px 0 0 5.88px !important;
        }

        .image-area {
            min-width: 125px;
            width: 125px;
            height: 125px;
        }

        .summary {
            width: 100%;
            background: #fff;
            color: black;
            padding: 10.5px;
            border-radius: 0 0 5.88px 5.88px;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            line-height: 1.3em;
            border-left: 1px solid rgba(0, 0, 0, 0.1);

            overflow: hidden;
            display: flex;
            align-items: stretch;
            flex-direction: column;

            .summary-description {
                margin-top: 4.48px;
            }

            .summary-url {
                color: #8899a6;
                margin-top: 4.527px;
                word-wrap: break-word;
            }

            .summary-title {
                font-weight: bold;
                max-height: 18.2px;
                /*white-space: nowrap;*/
                font-size: 14px;
                margin-bottom: 2.1px;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                line-height: 18.2px;

                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-kerning: normal;
                text-rendering: optimizeLegibility;
            }
        }
    }
</style>

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
        background: rgba(0, 177, 187, 0.1);
        border-radius: 5px;
        border: 1px solid #e1e8ed;
        position: relative;
        overflow: hidden;
        width: 505.94px;

        .image-area {
            width: 505.94px;
            height: 253.97px;
            border-radius: 5px 5px 0 0;
        }

        .summary {
            width: 505.94px;
            padding: 15.5px 15px 10.5px 15px;
            background: #fff;
            border-radius: 0 0 5px 5px;
            color: black;
            border-top: 1px solid rgba(0, 0, 0, 0.1);

            .summary-title {
                font-weight: bold;
                margin-bottom: 2.1px;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                line-height: 18.2px;
                max-height: 18.2px;
                font-size: 14px;
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

            }

            .summary-description {
                display: inline;
                margin-top: 4.48px;
                font-size: 14px;
                line-height: 18.2px;
                max-height: 36.4px;
            }

            .summary-url {
                color: #8899a6;
                margin-top: 4.48px;
                font-size: 14px;
                line-height: 18.2px;
                max-height: 18.2px;
                text-transform: lowercase;
            }
        }

    }
</style>

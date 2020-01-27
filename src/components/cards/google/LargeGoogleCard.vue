<template>
    <div class="social-card">
        <div class="summary">
            <div class="summary-title">{{ title.substr( 0, 130 ) }}<span v-if="title.length>130">...</span></div>

            <div class="image-area">
                <slot></slot>
            </div>

            <div class="summary-url" v-text="url"></div>
        </div>
    </div>
</template>

<script> export default { props: ['title', 'description', 'url'] }; </script>

<style scoped lang="scss">

    .social-card {
        width: 530px;
        box-sizing: border-box;
        border: 1px solid #e1e8ed;
        position: relative;
        overflow: hidden;

        .summary {
            background: #fff;
            /*padding: 14px 0px;*/
            .summary-url {
                background: rgba(0, 0, 0, 0.54);
                color: white;
                border-radius: 3px;
                padding: 3px;
                font-size: 12px;
                font-weight: 400;
                width: auto;
                display: block;
                position: absolute;
                bottom: 20px;
                left: 20px;
                z-index: 20;
                font-family: Roboto, RobotoDraft, Helvetica, Arial, Sans-Serif;
            }

            .summary-title {
                color: #3d3d3d;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 20px;
                margin: 16px 16px;
                font-weight: 300;
                font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
                line-height: 28px;
                display: block;
                max-height: 56px;
                max-width: 498px;

            }
        }

        .image-area, .placeholder {
            width: 530px;
            height: 264px;
        }
    }
</style>

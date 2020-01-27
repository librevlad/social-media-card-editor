<template>
    <div class="social-card">
        <div class="image-area">
            <slot></slot>
        </div>
        <div class="summary">
            <div class="summary-title">{{ title.substr( 0, 70 ) }}<span v-if="title.length>70">...</span></div>
            <div class="summary-url" v-text="url"></div>
        </div>
    </div>
</template>

<script> export default { props: ['title', 'description', 'url'] }; </script>

<style scoped lang="scss">

    .social-card {
        width: 522px;
        background: rgba(0, 177, 187, 0.1);
        border-radius: 3px;
        border: 1px solid #e1e8ed;
        position: relative;

        .image-area {
            width: 520px;
            height: 271.95px;
        }

        .summary {
            width: 520px;
            background: #fff;
            padding: 8px 12px;
            border-radius: 0 0 5px 5px;
            border-top: 1px solid #e1e8ed;

            .summary-url {
                color: rgba(0, 0, 0, .6);
                font-size: 12px;
                line-height: 16px;
                font-weight: 400;
                font-family: -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell, Droid Sans, Lucida Grande, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Emoji, Segoe UI Symbol, Hiragino Kaku Gothic Pro, Meiryo, Hiragino Sans GB W3, Noto Naskh Arabic, Droid Arabic Naskh, Geeza Pro, Simplified Arabic, Noto Sans Thai, Thonburi, Dokchampa, Droid Sans Thai, Droid Sans Fallback, '.SFNSDisplay-Regular', Heiti SC, Microsoft Yahei;
            }

            .summary-title {
                color: rgba(0, 0, 0, .9);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
                line-height: 20px;
                font-weight: 600;
                font-family: -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell, Droid Sans, Lucida Grande, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Emoji, Segoe UI Symbol, Hiragino Kaku Gothic Pro, Meiryo, Hiragino Sans GB W3, Noto Naskh Arabic, Droid Arabic Naskh, Geeza Pro, Simplified Arabic, Noto Sans Thai, Thonburi, Dokchampa, Droid Sans Thai, Droid Sans Fallback, '.SFNSDisplay-Regular', Heiti SC, Microsoft Yahei;
            }

        }
    }
</style>

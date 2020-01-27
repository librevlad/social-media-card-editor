<template>
    <div class="social-card">
        <div class="image-area">
            <slot></slot>
        </div>
        <div class="summary">
            <div class="summary-title">{{ title.substr( 0, 70 )
                }}<span v-if="title.length>70" style="display:block">...</span></div>
            <div class="summary-url">{{ url }}</div>
        </div>
    </div>
</template>

<script> export default { props: ['title', 'description', 'url'] }; </script>

<style scoped lang="scss">

    .social-card {
        display: flex;
        flex-direction: row;
        width: 520px;
        background: white;
        border-radius: 2px;
        border: 1px solid #e1e8ed;
        position: relative;
        padding: 8px;
        overflow: hidden;

        .image-area, .placeholder {
            width: 138px;
            height: 72px;
        }

        .summary {
            overflow: hidden;
            background: #fff;
            padding: 8px 0 8px 8px;
            border-radius: 0 0 2px 2px;

            flex: 3;
            display: flex;
            justify-content: center;
            flex-direction: column;

            .summary-url {
                font-size: 12px;
                line-height: 16px;
                max-height: 16px;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.6);
                font-family: -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell, Droid Sans, Lucida Grande, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Emoji, Segoe UI Symbol, Hiragino Kaku Gothic Pro, Meiryo, Hiragino Sans GB W3, Noto Naskh Arabic, Droid Arabic Naskh, Geeza Pro, Simplified Arabic, Noto Sans Thai, Thonburi, Dokchampa, Droid Sans Thai, Droid Sans Fallback, '.SFNSDisplay-Regular', Heiti SC, Microsoft Yahei;
            }

            .summary-title {
                color: rgba(0, 0, 0, 0.85);
                max-height: 40px;
                white-space: nowrap;
                overflow: hidden;
                font-size: 14px;
                font-weight: 600;
                font-family: -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell, Droid Sans, Lucida Grande, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Emoji, Segoe UI Symbol, Hiragino Kaku Gothic Pro, Meiryo, Hiragino Sans GB W3, Noto Naskh Arabic, Droid Arabic Naskh, Geeza Pro, Simplified Arabic, Noto Sans Thai, Thonburi, Dokchampa, Droid Sans Thai, Droid Sans Fallback, '.SFNSDisplay-Regular', Heiti SC, Microsoft Yahei;
                line-height: 20px;
            }

        }

    }
</style>

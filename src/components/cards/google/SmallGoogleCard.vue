<template>
    <div class="social-card">
        <div class="image-area">
            <slot></slot>
        </div>
        <div class="summary">
            <div class="summary-title">{{ title }}</div>
            <div class="summary-url">{{ url }}</div>
        </div>
    </div>
</template>

<script> export default { props: ['title', 'description', 'url'] }; </script>

<style scoped lang="scss">

    .social-card {
        display: flex;
        flex-direction: row;
        width: 530px;
        background: white;
        border: 1px solid rgb(238, 238, 238);
        padding: 15px;
        position: relative;
        overflow: hidden;

        .image-area {
            width: 110px;
            height: 110px;
        }

        .summary {
            flex: 3;
            background: #fff;
            padding: 0px 0 14px 14px;

            overflow: hidden;

            .summary-url {
                font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
                font-size: 14px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.54);
                font-size: 14px;
                font-weight: 500;
            }

            .summary-title {
                font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
                color: rgba(0, 0, 0, 0.87);
                max-height: 48px;
                /*white-space: nowrap;*/
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 20px;
                margin-bottom: 8px;
                font-weight: 300;
                line-height: 24px;
                display: -webkit-box;
            }
        }
    }
</style>

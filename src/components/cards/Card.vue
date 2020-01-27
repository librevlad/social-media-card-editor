<template>
    <component :is="currentComponent" :title="finalTitle" :description="finalDescription" :url="finalUrl">
        <slot></slot>
    </component>
</template>

<script>
    export default {
        props: {
            title: {},
            description: {},
            url: {},
            network: { required: true },
            size: { required: true },
        },
        computed: {
            currentComponent() {
                return this.size + '-' + this.network + '-card';
            },
            finalTitle() {
                return !!this.title ? this.title : 'Your title';
            },
            finalDescription() {
                return !!this.description ? this.description : 'Your description';
            },
            finalUrl() {
                return !!this.url ? this.url : 'anyimage.io';
            }
        }
    };
</script>

<style lang="scss">

    .social-card {
        width: 100%;
        backface-visibility: hidden;

        .image-area {
            cursor: move;
            overflow: hidden;
        }

        .summary {
            overflow: hidden;
            text-overflow: ellipsis;

            .summary-description {
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

</style>

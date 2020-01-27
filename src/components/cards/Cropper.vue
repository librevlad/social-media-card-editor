<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
    export default {

        provide() {
            return {
                src: this.src,
                cropperEventHub: this.cropperEventHub,
            };
        },

        props: {
            src: {
                required: true
            }
        },
        data() {
            return {
                cropperEventHub: new Vue()
            };
        },
    };
</script>

export default {

    props: {
        maxScale: {
            default: 1,
        }
    },

    render( createElement ) {
        return createElement( 'div', this.$slots.default );
    },

    data() {
        return {};
    },

    mounted() {
        let elementResizeDetectorMaker = require( "element-resize-detector" );
        let erd = elementResizeDetectorMaker( { strategy: "scroll" } );

        erd.listenTo( this.$el, () => {
            let scale = Math.min(
                $( this.$el ).width() / $( this.$slots.default[ 0 ].elm ).outerWidth(),
                this.maxScale
            ).toFixed( 2 );


            let bigHeight = $( this.$slots.default[ 0 ].elm ).outerHeight();
            let smallHeight = bigHeight * scale;

            let marginBottom = bigHeight - smallHeight;

            $( this.$el ).css( {
                transformOrigin: 'left top',
                transform: `scale(${ scale })`,
                marginBottom: -marginBottom + 'px',
            } );
        } );

    },
    methods: {}
};

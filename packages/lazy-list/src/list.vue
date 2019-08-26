<template>
    <div class="list">
        <transition-group name="list-fade" tag="div">
            <div v-if="!loading" key="item">
                <slot name="item"></slot>
            </div>
            <div v-else key="skeleton">
                <slot name="skeleton"></slot>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: 'List',
    props: {

    },
    data() {
        return {
            loading: true,
            io: null
        }
    },
    mounted() {
        this.io = new IntersectionObserver( entries => {
            entries.forEach( entry => {
                if(entry.isIntersecting || entry.intersectionRatio) {
                    if(this.loading) {
                        this.loading = false
                    }
                    this.io.unobserve(this.$el)
                }
            })
        })
        this.io.observe(this.$el)
    },
    beforeDestroy() {
        if(this.io) {
            this.io.disconnect()
        }
    }

    
}
</script>

<style scoped>
    .list-fade-enter-active, .list-fade-leave-active {
        transition: opacity 0.2s;
    }
    .list-fade-enter-to, .list-fade-leave-to {
        opacity: 0;
    }
</style>
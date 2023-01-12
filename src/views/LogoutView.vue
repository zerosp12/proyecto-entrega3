<template>
    <div>
        <LoadingSpinner />
    </div>
</template>
<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { mapMutations } from 'vuex'

export default ({
    name: 'LogoutView',
    components: {
        LoadingSpinner
    },
    created() {
        this.setLogout();
        window.location.href = '/'
    },
    methods: {
        ...mapMutations('usuarios', ['setLogout']),
    }
})
</script>

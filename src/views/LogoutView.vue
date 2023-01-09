<template>
    <div>
        <LoadingSpinner />
    </div>
</template>
<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default ({
    name: 'LogoutView',
    components: {
        LoadingSpinner
    },
    created() {
        localStorage.isLogin = Boolean(false)
        window.location.href = '/'
    }
})
</script>

<script setup lang="ts">

import {computed} from "vue";

const props = defineProps({
    options: {
        type: Array,
        default: () => [],
        required: true
    },
    userName: {
        type: String,
        default: '',
        required: true
    }
})

const nameParsed = computed(() => {
    return props.userName.split('')[0].toUpperCase()
})
</script>

<template>
    <main class="container-dropdown">
        <el-dropdown placement="top-start">
            <el-avatar class="container-dropdown_avatar">
                <span class="container-dropdown_avatar_text">
                    {{ nameParsed }}
                </span>
            </el-avatar>
            <template #dropdown>
                <el-dropdown-menu >
                    <el-dropdown-item
                        v-for="(option, index) in options"
                        :key="index"
                        @click="option.action"
                    >
                        {{ option.name }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </main>
</template>

<style scoped lang="scss">
.container-dropdown {
    width: 100%;

    &_avatar {
        width: 60px;
        height: 60px;
        background-color: $title-color;
        cursor: pointer;

        &_text {
            font-size: 30px;
        }
    }
}
</style>
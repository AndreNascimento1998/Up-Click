<script lang="ts" setup>

const props = defineProps<{
   text: string
}>()
</script>

<template>
    <el-tooltip placement="top">
        <template #content>
            <span style="font-size: 18px">{{props.text}}</span>
        </template>
        <slot/>
    </el-tooltip>
</template>

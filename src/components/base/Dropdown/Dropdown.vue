<script setup lang="ts">
import { computed } from 'vue'
import ITaskList from "@/types/ITaskList.ts"

interface OptionInterface {
    name: string
    action: (item: ITaskList | undefined | null | string | number) => void
}

const props = defineProps<{
    options: OptionInterface[]
    text: string | undefined
    rounded?: boolean
    item?: ITaskList
    disabled?: boolean
}>()

const textParsed = computed(() => {
    if (props.text) {
        return props.text.split('')[0].toUpperCase()
    }
    return ''
})
</script>

<template>
    <main class="container-dropdown">
        <el-dropdown :disabled="props.disabled" placement="top-start">
            <el-avatar v-if="props.rounded" class="container-dropdown_avatar">
                <span class="container-dropdown_avatar_text">
                    {{ textParsed }}
                </span>
            </el-avatar>
            <el-button v-else type="primary">
                {{ text }}
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        v-for="(option, index) in props.options"
                        :key="index"
                        @click="option.action(props.item)"
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
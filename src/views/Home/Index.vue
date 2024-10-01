<script lang="ts" setup>
import Header from "@/views/Header/Index.vue";
import Button from "@/components/base/Button/Button.vue";
import ListIcon from "@/assets/icons/Home/ListIcon.vue";
</script>

<template>
    <main class="container-home">
        <Header />
        <section class="container-home_section-home">
            <article class="container-home_section-home_header">
                <div class="container-home_section-home_header_text-list">
                    <ListIcon style="align-self: center"/>
                    <span>Lista</span>
                </div>
                <div><Button text="Adicionar Tarefa +" outlined comfortable /></div>
            </article>
        </section>
    </main>
</template>

<style lang="scss">
.container-home {

    &_section-home {
        padding: 1rem;

        @media (min-width: $xl) {
            padding: 2rem 10rem;
        }

        &_header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &_text-list {
                font-size: 28px;
                display: flex;
                gap: 4px;
            }
        }
    }
}
</style>
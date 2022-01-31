<script>
    import { onDestroy, onMount } from "svelte";

    let frame;
    let picker;

    onMount(async () => {
        const EmojiPicker = (await import("../../static/js/picker.js")).default;

        picker = new EmojiPicker(frame);
    });

    onDestroy(() => {
        picker?.close();
    });
</script>

<div class="soon">
    <h1 class="title is-2">Soon...</h1>
    <iframe src="/external/picker" title="Emoji Picker" width="280" height="365" bind:this={frame} />
</div>

<style>
    h1 {
        color: var(--text-color);
        font-weight: 600 !important;
    }

    .soon {
        margin-top: 100px;
        text-align: center;
    }
</style>

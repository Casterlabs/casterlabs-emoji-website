<script>
    import TextSnippet from "../components/TextSnippet.svelte";
    import { onDestroy, onMount } from "svelte";

    const backgroundEmojis = ["📍", "🃏", "🏠", "🚲", "🔔", "😎", "⭐", "😡", "🌈", "😇", "☔", "🚀", "⚡", "🤖", "🔥", "✨", "🎉", "🔮", "💔", "💦"];

    let emojiProvider = "noto-emoji";

    let frame;
    let picker;

    let pickedEmoji = null;

    onMount(async () => {
        const EmojiPicker = (await import("../../static/js/picker.js")).default;

        picker = new EmojiPicker(frame);

        picker.on("input", (emoji) => {
            pickedEmoji = emoji;
        });
    });

    onDestroy(() => {
        picker?.close();
    });
</script>

<div id="emoji-background">
    <div
        style="
            --size: 256px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(0, min(100%/2, max(var(--size), 100%/50))));
            grid-template-rows: auto;
            grid-column-gap: 50px;
            grid-row-gap: 50px;
            justify-content: center;
        "
    >
        {#each backgroundEmojis as emoji}
            <div style="font-size: calc(var(--size) / 2); text-align: center; width: var(--size); max-width: 100%">
                <TextSnippet {emojiProvider}>{emoji}</TextSnippet>
            </div>
        {/each}
    </div>
</div>

<div id="actual-content" class="container is-max-desktop">
    <section style="margin-top: 6em;">
        <!-- Speech about how the Emoji ecosystem is fragmented due to dying support. -->
        <h1 class="title">
            <TextSnippet {emojiProvider}>Emoji for everyone 🎉</TextSnippet>
        </h1>
        We've developed a free emoji system that helps bridge the gap between different devices while still giving you, the developer, enough flexibility to make the most of emoji.

        <br />
        <br />

        View the <a href="https://documenter.getpostman.com/view/11546462/UVe9S9qm" target="_blank">postman docs</a> to see how you can use the api.
        <br />
        Emoji picker docs coming soon.

        <br />
        <br />
        <br />
        <br />
        <br />
    </section>

    <!-- Want to try it? -->
    <section class="has-text-centered">
        <div class="columns" style="margin: 25px;">
            <div class="column" style="margin-top: 30px;">
                {#if pickedEmoji}
                    <div id="emoji-viewer">
                        {#if pickedEmoji.variation.assets[emojiProvider].svgUrl || pickedEmoji.variation.assets[emojiProvider].pngUrl}
                            <img src={pickedEmoji.variation.assets[emojiProvider].svgUrl || pickedEmoji.variation.assets[emojiProvider].pngUrl} alt="Emoji" />
                        {/if}

                        <h1 class="title is-3">{pickedEmoji.emoji.name}</h1>
                        <h2 class="subtitle is-6">Since Emoji {pickedEmoji.variation.since}</h2>

                        <span style="font-size: .8em; position: absolute; transform: translate(-95px, 10px);">Tap to copy -></span>
                        <button
                            class="button"
                            style="width: 75px; text-align: center;"
                            title="Click to copy"
                            on:click={() => {
                                navigator.clipboard.writeText(pickedEmoji.variation.sequence);
                            }}
                        >
                            {pickedEmoji.variation.sequence}
                        </button>

                        <br />
                        <br />

                        {#if pickedEmoji.variation.assets[emojiProvider].svgUrl}
                            <a href={pickedEmoji.variation.assets[emojiProvider].svgUrl} target="_blank" class="button is-primary"> SVG </a>
                        {/if}
                        {#if pickedEmoji.variation.assets[emojiProvider].pngUrl}
                            <a href={pickedEmoji.variation.assets[emojiProvider].pngUrl} target="_blank" class="button is-primary"> PNG </a>
                        {/if}
                    </div>
                {:else}
                    <h1 class="title is-2">Pick an emoji...</h1>
                    <h2 class="subtitle is-5">(try right clicking or hold tap to change the skin color)</h2>
                    <br />
                    <br />
                    <br />
                {/if}
            </div>
            <div class="column is-narrow">
                <iframe src={"/external/picker?emojiProvider=" + emojiProvider} title="Emoji Picker" width="280" height="365" bind:this={frame} />

                <br />

                <div class="select is-small">
                    <select bind:value={emojiProvider}>
                        <option value="twemoji">Twemoji</option>
                        <option value="noto-emoji">Noto Emoji</option>
                        <option value="openmoji">Openmoji</option>
                        <option value="sensa-emoji">Sensa Emoji</option>
                    </select>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
    #emoji-background {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0.45;
    }

    section {
        margin: 20px;
    }

    h1 {
        color: var(--text-color);
        font-weight: 600 !important;
    }

    #emoji-viewer img {
        object-fit: fill;
        min-width: 96px;
        max-width: 18%;
        max-height: 15%;
    }
</style>

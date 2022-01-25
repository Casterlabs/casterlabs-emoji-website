<div class="body-container">
    <div id="body-content" class="container is-max-desktop">
        <slot />
    </div>
</div>

<div class="header-container">
    <div id="header-content" class="container is-max-desktop">Header :D</div>
</div>

<style>
    :root {
        --header-size: 75px;
    }

    .header-container {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        height: var(--header-size);
    }

    #header-content {
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 255, 0.1);
    }

    .body-container {
        position: absolute;
        top: var(--header-size);
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
    }

    @media only screen and (max-width: 768px) {
        .body-container {
            top: 0;
        }
    }

    #body-content {
        background-color: rgb(255, 0, 0, 0.1);
    }
</style>

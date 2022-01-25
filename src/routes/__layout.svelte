<div id="body-content">
    <slot />
</div>

<div id="header">Header :D</div>

<style>
    :root {
        --header-size: 75px;
    }

    #header {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        height: var(--header-size);
        background-color: rgb(0, 0, 255, 0.1);
    }

    #body-content {
        position: absolute;
        top: var(--header-size);
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
    }

    @media only screen and (max-width: 768px) {
        #body-content {
            top: 0;
        }
    }
</style>

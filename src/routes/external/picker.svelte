<script>
    import { onMount } from "svelte";
    import createConsole from "../../components/console-helper.mjs";

    const EMOJI_PROVIDER = "noto-emoji";

    const console = createConsole("EmojiPicker");

    let currentCategoryId = "smileys-and-emotion";
    let currentCategoryName = "Smileys & Emotion";
    let categories = [];

    onMount(async () => {
        console.debug("Mounted!");

        const listOfCategoryNames = await jsonApiRequest("https://api.casterlabs.co/v3/emojis/categories");
        console.debug("Categories:", listOfCategoryNames);

        for (const category of listOfCategoryNames) {
            const categoryInfo = await jsonApiRequest(`https://api.casterlabs.co/v3/emojis/category/${category}`);
            console.debug("Category:", categoryInfo);

            categories.push(categoryInfo);
            categories = categories; // Trick svelte.
        }
    });

    async function jsonApiRequest(url) {
        const response = await fetch(url);
        const json = await response.json();

        return json;
    }

    function switchCategory(category) {
        currentCategoryId = category;

        document.querySelector(`#category-${category}`).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function onScroll({ target }) {
        const scrollTop = target.scrollTop;
        const categoryElements = document.querySelectorAll(".emoji-category");

        let scrolledCategoryId;
        let scrolledCategoryName;

        for (const categoryElement of categoryElements) {
            const categoryNameElement = categoryElement.querySelector(".category-name");
            let offset = categoryElement.offsetTop;

            if (!categoryNameElement.classList.contains("sticky-category-title")) {
                offset += categoryNameElement.offsetHeight;
            }

            if (scrollTop >= offset) {
                scrolledCategoryId = categoryElement.getAttribute("data-category-id");
                scrolledCategoryName = categoryNameElement.innerText;
            }
        }

        if (scrolledCategoryId) {
            if (currentCategoryId != scrolledCategoryId) {
                currentCategoryId = scrolledCategoryId;
                currentCategoryName = scrolledCategoryName;
                console.log("Scrolled into view:", currentCategoryId);
            }
        }
    }
</script>

<svelte:head>
    <title>Emoji Picker</title>
</svelte:head>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="picker-container">
    <div id="emojis" on:scroll={onScroll}>
        {#each categories as category}
            <div data-category-id={category.id} class="emoji-category">
                <span
                    id="category-{category.id}"
                    class="
                        category-name 
                        {currentCategoryId == category.id ? 'sticky-category-title' : ''}
                    "
                >
                    {category.name}
                </span>
                {#each category.emojis as emoji}
                    <a on:click={() => console.log(emoji)}>
                        <img
                            src={emoji.variations[0].assets[EMOJI_PROVIDER].svgUrl}
                            alt=""
                            title={emoji.identifier}
                            class="emoji"
                            onerror="this.parentElement.style.display = 'none'"
                        />
                    </a>
                {/each}
            </div>
        {/each}
    </div>

    <div id="categories">
        <div class="categories-container">
            <!-- https://api.casterlabs.co/v3/emojis/categories -->

            <a class={currentCategoryId == "smileys-and-emotion" ? "selected" : ""} on:click={() => switchCategory("smileys-and-emotion")} title="Smileys & Emotion">
                <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <circle cx="36" cy="36" r="23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                        <ellipse cx="28.5684" cy="30.818" rx="3" ry="5.4038" />
                        <ellipse cx="43.4316" cy="30.8216" rx="3" ry="5.4038" />
                        <path
                            fill="none"
                            stroke="#000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M50.595,41.64a11.5554,11.5554,0,0,1-.87,4.49c-12.49,3.03-25.43.34-27.49-.13a11.4347,11.4347,0,0,1-.83-4.36h.11s14.8,3.59,28.89.07Z"
                        />
                        <path
                            fill="none"
                            stroke="#000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M49.7251,46.13c-1.79,4.27-6.35,7.23-13.69,7.23-7.41,0-12.03-3.03-13.8-7.36C24.2951,46.47,37.235,49.16,49.7251,46.13Z"
                        />
                    </g>
                </svg>
            </a>

            <a class={currentCategoryId == "people-and-body" ? "selected" : ""} on:click={() => switchCategory("people-and-body")} title="People & Body">
                <svg id="emoji" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M18.6575,19.2409 c-0.9683-1.6927-3.1256-2.2799-4.8183-1.3115c-1.6927,0.9684-2.2799,3.1256-1.3115,4.8183 c0.1552,0.2714,0.3458,0.5209,0.5667,0.742l11.5324,15.0998l2.6883,3.3878l-7.8906-10.3314 c-0.9683-1.6927-3.1256-2.2799-4.8183-1.3115s-2.2799,3.1256-1.3115,4.8183c0.1552,0.2714,0.3458,0.5209,0.5667,0.7421 L21.752,46.226l6.2707,7.899c5.467,6.2731,14.5147,5.9306,20.7863,0.465c3.6045-3.1684,5.9226-7.5482,6.5154-12.3105 c0.3858-4.2326,0.807-15.301,0.807-15.301c-0.1826-2.6008-3.1353-4.5234-3.5158-3.1802l-4.8939,9.7575l-3.3657-4.2224 l3.3657,4.2224l-3.3657-4.2224L30.8909,12.1248c-0.9683-1.6927-3.1256-2.2799-4.8183-1.3115s-2.2799,3.1256-1.3115,4.8183 c0.1552,0.2714,0.3458,0.5209,0.5667,0.742l4.2488,5.5631L36,30.4167L22.581,12.7366c-0.9683-1.6927-3.1256-2.2799-4.8183-1.3115 s-2.2799,3.1256-1.3116,4.8183c0.1552,0.2714,0.3458,0.5209,0.5667,0.7421L31.6894,36"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M11.6726,42.8719c0,2.5663,1.747,4.6428,3.9059,4.6428"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M7.0614,42.4369c0,5.5959,3.8094,10.1241,8.5171,10.1241"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M45.2619,21.2377c0-2.5663-1.747-4.6428-3.9059-4.6428"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M49.8731,21.6727c0-5.5959-3.8094-10.1241-8.5171-10.1241"
                        />
                    </g>
                </svg>
            </a>

            <a class={currentCategoryId == "animals-and-nature" ? "selected" : ""} on:click={() => switchCategory("animals-and-nature")} title="Animals & Nature">
                <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M58.4549,37.7826C60.2229,40.1443,65,44.4647,64.5,54.0208"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M32.5,41.8854c0,0,8.4783,6.7823,0,18.7647"
                        />
                        <polyline
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            points="24.809,19.1338 10.25,11.75 21.1747,23.995"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M35.1962,30.8696c0.5489,8.3555-9.3225,9.703-11.954,10.3347c-0.3325,0.0798-0.6318,0.25-0.8736,0.4919l-2.2227,2.2227 c-0.3494,0.3494-0.8234,0.5458-1.3176,0.5458h-3.5121c-1.203,0-2.2711-0.7698-2.6515-1.9111l-0.531-1.5931 c-0.258-0.774-0.1649-1.6222,0.2549-2.3218l8.7862-14.6436l4.7238-4.7238l-2.1151-6.9054c0,0,7.8026-0.6987,8.4135,5.3308 c0,0,16.9281,2.4418,10.5531,19.383c0,0-1.625,5.9489,2.375,11.1846"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M30.9167,14.0208c0,0,22.2444-4.0208,19.9583,19.9583"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M49.9187,23.155c0,0,14.7665,6.5865,5.4563,22.22c0,0-5.375,6.5625,0.625,13.6042"
                        />
                        <circle cx="24.4167" cy="28.9304" r="2" fill="#000000" stroke="none" />
                    </g>
                </svg>
            </a>

            <a class={currentCategoryId == "food-and-drink" ? "selected" : ""} on:click={() => switchCategory("food-and-drink")} title="Food & Drink">
                <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <g id="line-2">
                            <polyline
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                points="35.046 20.733 35.046 15.272 30.702 10.929"
                            />
                            <path
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M57.3335,25.7657c3.6482,4.9493,4.3968,13.296,1.4093,21.1329-3.8569,10.1286-12.4875,15.573-19.2735,12.1633a10.24,10.24,0,0,1-1.3942-.849,3.7126,3.7126,0,0,0-4.3311-.0009,10.27,10.27,0,0,1-1.396.85c-6.7971,3.41-15.4276-2.0347-19.2846-12.1633-3.8569-10.1174-1.4756-21.0845,5.31-24.4942a10.42,10.42,0,0,1,9.838.4919s.0559.0336.1677.09a16.8628,16.8628,0,0,0,7.0878,1.9564,13.2712,13.2712,0,0,0,2.2487-.2145,18.6342,18.6342,0,0,0,2.126-.4632"
                            />
                            <path
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M48.0445,17.3947c3.9562,1.3292,6.8444,5.8193,6.8444,5.8193s-5.0135,1.8354-8.97.5062c-3.9508-1.3274-6.8444-5.8193-6.8444-5.8193S44.0937,16.0673,48.0445,17.3947Z"
                            />
                        </g>
                    </g>
                </svg>
            </a>

            <a class={currentCategoryId == "travel-and-places" ? "selected" : ""} on:click={() => switchCategory("travel-and-places")} title="Travel & Places">
                <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <rect
                            x="5"
                            y="17"
                            width="62"
                            height="38"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M28.5,30.5c-0.0417,0.5833-1.667,2.5858-2.0833,2.875c-0.8682,0.603-1.2071,0.3266-1.9635,0.9219 c-0.4794,0.3773-1.0785,0.7807-1.8125,0.9219C22.2344,35.2969,22.4141,34.913,21.5,35.5c-0.5092,0.327-0.0571,0.6789,0,1 c0.0768,0.4317,0.1342,0.1715,1,1c0.452,0.4326,0.4924,0.8181,1,1c0.3173,0.1137,0.5479,0.0514,1,0 c0.9479-0.1077,0.5264,0.8266,1,1c1.0892,0.3987,0.9965,1.8323,2,2c0.4053,0.0677,0.5508-0.1443,1,0 c0.4112,0.1322,0.8831,0.5008,1,1c0.1539,0.6575-0.3718,1.2692-1,2c-0.5081,0.5911-0.6024,0.5-1,1c-0.5312,0.668-0.389,0.8636-1,2 c-0.6184,1.1502-0.9584,1.3113-1,2c-0.0174,0.288-0.0008,0.9691,0,1c0.0175,0.6949,0.0562,0.7867,0,1 c-0.1307,0.497-1.14,0.9323-1.5208,0.875c-0.7496-0.1127-0.7361-2.703-0.7708-3.1042C23.138,48.4607,23.47,48.0078,23.5,47.5 c0.1037-1.7568,0.397-2.3016,0-3c-0.2533-0.4456-0.3871-0.2493-1-1c-0.3461-0.4239-0.8704-1.0816-1-2 c-0.0817-0.5785,0.089-0.582,0-1c-0.1652-0.7754-0.8085-1.0257-2-2c-0.7351-0.6011-1.3871-1.1342-2-2 c-0.3185-0.4499-0.7692-1.0865-1-2c-0.3038-1.2024,0.1487-1.3986,0-3c-0.0335-0.3607-0.1795-1.676-1-3 c-0.3483-0.5621-0.5937-0.9457-1-1c-0.7745-0.1035-1.1901,1.1152-2,1c-0.484-0.0689-0.8581-0.5785-1-1 c-0.0379-0.1126-0.1763-0.5437,0-1c0.0977-0.2529,0.3985-0.5019,1-1c0.6138-0.5083,0.9223-0.7672,1-1 c0.1463-0.4386-0.1174-0.595,0-1c0.2008-0.693,1.2649-1.2436,2-1c0.4223,0.1399,0.3312,0.4078,1,1c0.3247,0.2875,1.0264,0.8266,2,1 c0.4917,0.0876,0.7375,0.1313,1,0c0.6467-0.3236,0.3375-1.1808,1-2c0.6094-0.7535,1.5995-0.929,2-1 c0.9901-0.1755,1.1254,0.2006,2,0c0.9399-0.2156,0.9128-0.6796,2-1c0.4761-0.1403,1.3149-0.3876,2,0 c0.6168,0.3489,0.535,0.8878,1,1c0.649,0.1567,0.967-0.855,2-1c0.7887-0.1107,1.7269,0.3212,2,1c0.1356,0.3369,0.0721,0.6473,0,1 c-0.2177,1.0653-0.7955,1.1298-1,2c-0.2223,0.9456,0.2539,1.1749,0,2c-0.1667,0.5417-0.5,0.375-1.0312,0.8125 C31.2256,27.5127,31.1667,27.8333,30.5,28.5c-0.3333,0.3333-0.6794,0.6544-1,1C28.7693,30.2876,28.6527,30.3473,28.5,30.5"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M34.5,35.5c-0.2327-0.2965-1.2282-1.826-1-2c0.2819-0.2149,0.7809,0.2076,1,0c0.1816-0.1721-0.1166-0.5043,0-1 c0.1124-0.4781,0.5564-0.8775,1-1c0.528-0.1458,0.897,0.1447,1,0c0.1982-0.2786-1.2375-1.2621-1-2c0.1473-0.4577,0.8035-0.4017,1-1 c0.1321-0.402-0.1271-0.5401,0-1c0.1285-0.4649,0.5373-0.8448,1-1c0.1315-0.0441,0.5717-0.1918,1,0 c0.5418,0.2426,0.4575,0.7571,1,1c0.3049,0.1365,0.6951,0.1365,1,0c0.5414-0.2424,0.4828-0.7669,1-1 c0.3427-0.1544,0.5131,0.0106,1,0c1.1173-0.0243,1.9392-0.9311,2-1c0.5035-0.571,0.2483-0.7995,1-2 c0.4014-0.6411,0.6646-0.8799,1-1c0.0953-0.0341,0.5557-0.1989,1,0c0.5393,0.2415,0.4849,0.7637,1,1 c0.2668,0.1224,0.4404,0.0553,1,0c0.0712-0.007,0.7141-0.0047,2,0c1.9053,0.0069,1.8204,0.0439,2,0c1.0108-0.247,0.9913-0.7535,2-1 c0.6976-0.1705,0.6827,0.0772,2,0c1.1978-0.0702,1.7747-0.3081,2,0c0.0859,0.1175,0.021,0.1781,0,1 c-0.0085,0.3348,0.2708,0.6502,0.276,1.0417c0.0115,0.8917,0.0431,0.8352-0.0051,0.9583 c-0.2075,0.5292-0.3616,0.6588-0.6042,1.1875c-0.0905,0.1972-0.1193,0.2741-0.0833,1.0208 c0.0529,1.097,0.3557,0.8476,0.4167,1.7917c0.0475,0.7382,0.1251,0.8865,0,1c-0.3363,0.3052-2.1732-0.2637-2.5833-1.125 c-0.4311-0.9051-0.1221-1.6729-0.4167-1.875c-0.4045-0.2775-2.2332,1.1258-2.5,2.0156c-0.0528,0.1761-0.2842,0.4526,0.5781,1.2344 c0.8716,0.7902,1.2485,1.0843,1.3281,1.1562c0.4844,0.4375,1.0081,1.028,0.5938,1.5938c-0.5568,0.7599-1.6156,0.316-2,1 c-0.3447,0.6132,0.3857,1.1847,0,2c-0.1112,0.235-0.4075,0.49-1,1c-0.6594,0.5675-0.9046,0.6509-1,1 c-0.1277,0.4673,0.1847,0.7829,0,1c-0.2369,0.2786-0.9667,0.0125-1,0c-1.2899-0.4836-1.342-1.9702-2-2 c-0.7889-0.0357-1.2216,2.0781-2,2c-0.1748-0.0175-0.4498-0.345-1-1c-0.5292-0.6301-0.6418-0.8616-1-1 c-0.4581-0.1771-0.8913-0.0369-1,0c-0.1805,0.0613-0.5032,0.2216-1,1c-0.7071,1.1079-0.4384,1.3954-1,2 c-0.4762,0.5127-0.858,0.509-1,1c-0.0302,0.1043-0.0201,0.4028,0,1c0.0207,0.6139,0.0304,0.9225,0,1 c-0.2084,0.5314-0.762,0.4707-1,1c-0.1635,0.3635,0.0261,0.5513,0,1c-0.0602,1.034-1.1898,2.148-2,2 c-0.322-0.0588-0.548-0.3726-1-1c-0.4-0.5552-0.8285-1.15-1-2c-0.1846-0.9149,0.1535-1.0103,0-2c-0.0778-0.5019-0.2532-1.6321-1-2 c-0.7166-0.353-1.2454,0.3476-2,0c-0.7025-0.3236-1.0231-1.2894-1-2c0.0247-0.7592,0.4439-1.2926,1-2 C33.9357,35.9457,34.1536,35.6685,34.5,35.5"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M54.5,44.5c-1.1801,0.5793-1.7441,0.4529-2,1c-0.1985,0.4245-0.0394,0.8859,0,1c0.2429,0.7039,0.925,0.9719,1,1 c0.8638,0.3235,1.3389-0.3545,2,0c0.5044,0.2705,0.4256,0.7713,1,1c0.3162,0.1259,0.5969,0.0764,1,0 c0.6927-0.1313,1.5826-0.3001,2-1c0.2991-0.5014,0.1975-1.0104,0-2c-0.1533-0.7682-0.3549-1.7781-1-2 c-0.1257-0.0432-0.1378-0.0117-1,0c-0.7313,0.0099-0.8063-0.0117-1,0C55.7349,43.5462,55.5956,43.9622,54.5,44.5z"
                        />
                    </g>
                </svg>
            </a>

            <a class={currentCategoryId == "activities" ? "selected" : ""} on:click={() => switchCategory("activities")} title="Activities">
                <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <polyline
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            points="50.6626,45.6395 50.8308,45.8076 28.9606,55.1086 7.0904,64.4096 16.3914,42.5394 25.6923,20.6692"
                        />
                        <polyline
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            points="25.801,20.7779 38.2616,33.2384 50.6626,45.6395"
                        />
                        <line
                            x1="25.6923"
                            x2="25.801"
                            y1="20.6692"
                            y2="20.7779"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M46.4905,7.3671c0.2347,0.4487,0.4027,0.943,0.4897,1.473c0.451,2.7473-1.447,5.4141-4.2392,5.9565"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M42.9327,14.7763c-0.5049,0.0384-1.0133,0.1573-1.509,0.364c-2.5697,1.0713-3.828,4.093-2.8105,6.7492"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M61.7928,26.7168c-0.0987,0.4967-0.2778,0.987-0.5425,1.4544c-1.372,2.4225-4.5229,3.309-7.0378,1.98"
                        />
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M54.3745,30.2558c-0.4173-0.2868-0.8878-0.513-1.4036-0.663c-2.6733-0.7775-5.5486,0.7867-6.4223,3.4936"
                        />
                    </g>
                </svg>
            </a>

            <a class={currentCategoryId == "objects" ? "selected" : ""} on:click={() => switchCategory("objects")} title="Objects">
                <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M43.203,23.3918" />
                        <line
                            x1="47.4338"
                            x2="55.2191"
                            y1="27.2143"
                            y2="31.4279"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <line
                            x1="24.0277"
                            x2="34.665"
                            y1="14.5462"
                            y2="20.3035"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <circle
                            cx="22.2675"
                            cy="13.5691"
                            r="2"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M43.203,23.3918" />
                        <rect
                            x="12.2227"
                            y="31.7767"
                            width="47.7448"
                            height="28.5707"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <line
                            x1="16.5455"
                            x2="55.1183"
                            y1="52.2367"
                            y2="52.2367"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <line
                            x1="16.5455"
                            x2="55.1183"
                            y1="56.2367"
                            y2="56.2367"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <rect
                            x="16.6237"
                            y="36.2793"
                            width="38.5954"
                            height="11.5044"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <circle
                            cx="22.4906"
                            cy="41.9848"
                            r="2"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <polyline
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            points="12.2227,26.9462 12.2227,23.7932 59.9675,23.7932 59.9675,26.9462"
                        />
                        <line
                            x1="38.2935"
                            x2="38.2935"
                            y1="41.6974"
                            y2="42.3642"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <line
                            x1="42.2935"
                            x2="42.2935"
                            y1="41.6974"
                            y2="42.3642"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                        <line
                            x1="46.2935"
                            x2="46.2935"
                            y1="41.6974"
                            y2="42.3642"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                        />
                    </g>
                </svg>
            </a>

            <a class={currentCategoryId == "symbols" ? "selected" : ""} on:click={() => switchCategory("symbols")} title="Symbols">
                <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M59.0349,60H12.9651 C12.4343,60,12,59.5657,12,59.0349V12.9651C12,12.4343,12.4343,12,12.9651,12h46.0698C59.5657,12,60,12.4343,60,12.9651v46.0698 C60,59.5657,59.5657,60,59.0349,60z"
                        />
                        <polygon
                            fill="#000000"
                            stroke="none"
                            points="23.4414,27.0479 27.9258,27.0479 27.9258,34.2231 29.6763,34.2231 29.6763,27.0479 34.1602,27.0479 34.1602,25.2622 23.4414,25.2622"
                        />
                        <rect x="23.4414" y="21.7764" width="10.7188" height="1.769" fill="#000000" stroke="none" />
                        <path
                            fill="#000000"
                            stroke="none"
                            d="M33.2461,44.165l0.0146-0.2642h-1.665l-0.0098,0.2397c-0.0391,0.9561-0.2207,1.5845-0.627,2.1655 l-2.5195-3.0054l0.8701-0.6021c0.8765-0.6035,1.2847-1.2803,1.2847-2.1299c0-1.5815-1.1738-2.6865-2.8545-2.6865 c-1.7578,0-2.939,1.0728-2.939,2.6699c0,1.1372,0.748,2.0034,1.2437,2.5771c-1.1489,0.7559-2.3726,1.7046-2.3726,3.3896 c0,2.2075,1.4878,3.5791,3.8828,3.5791c1.8452,0,2.8398-0.8608,3.3198-1.2788l0.9751,1.1772h2.2236l-2.0107-2.3994 C32.7852,46.7524,33.1611,45.6616,33.2461,44.165z M27.7397,39.397c0.7007,0,1.1899,0.4893,1.1899,1.1895 c0,0.5713-0.4194,0.9341-0.8726,1.2412l-0.5688,0.3857c-0.6113-0.7153-0.9219-1.1665-0.9219-1.6445 C26.5664,39.8569,27.0269,39.397,27.7397,39.397z M26.9961,44.2192l2.8418,3.3779c-0.7246,0.6455-1.4077,0.9209-2.2832,0.9209 c-1.2563,0-2.1685-0.855-2.1685-2.0332C25.3862,45.335,26.2041,44.7676,26.9961,44.2192z"
                        />
                        <path
                            fill="#000000"
                            stroke="none"
                            d="M46.0811,43.5381c-1.3115,0-2.2275,1.0493-2.2275,2.5513v1.6978c0,1.5024,0.916,2.5518,2.2275,2.5518 c1.3125,0,2.2285-1.0493,2.2285-2.5518v-1.6978C48.3096,44.5874,47.3936,43.5381,46.0811,43.5381z M46.7217,46.1401v1.5967 c0,0.959-0.4658,0.959-0.6406,0.959s-0.6396,0-0.6396-0.959v-1.5967c0-0.9595,0.4648-0.9595,0.6396-0.9595 C46.2393,45.1807,46.7217,45.1807,46.7217,46.1401z"
                        />
                        <polygon fill="#000000" stroke="none" points="44.5547,37.7598 39.6094,50.2207 41.3057,50.2207 46.2373,37.7598" />
                        <path
                            fill="#000000"
                            stroke="none"
                            d="M42.0078,41.8896v-1.6963c0-1.5024-0.916-2.5518-2.2285-2.5518c-1.3115,0-2.2275,1.0493-2.2275,2.5518 v1.6963c0,1.4932,0.916,2.5356,2.2275,2.5356C41.0918,44.4253,42.0078,43.3828,42.0078,41.8896z M39.1396,41.8394v-1.5957 c0-0.9595,0.4648-0.9595,0.6396-0.9595c0.1582,0,0.6406,0,0.6406,0.9595v1.5957c0,0.9429-0.4658,0.9429-0.6406,0.9429 C39.5879,42.7822,39.1396,42.7822,39.1396,41.8394z"
                        />
                        <path
                            fill="#000000"
                            stroke="none"
                            d="M41.5283,34.3257c1.4463,0,2.6357-1.1763,2.6553-2.6533v-8.3828h1.1523v0.8457 c0,0.2759,0.2246,0.5,0.5,0.5h0.5391c0.2754,0,0.5-0.2241,0.5-0.5v-1.1494c0-0.6812-0.5537-1.2354-1.2344-1.2354h-1.7607 c-0.6816,0-1.2354,0.5542-1.2354,1.2354V29.27c-0.3486-0.165-0.7275-0.251-1.1162-0.251c-1.4629,0-2.6533,1.1904-2.6533,2.6533 S40.0654,34.3257,41.5283,34.3257z M41.5283,30.5562c0.6152,0,1.1162,0.501,1.1162,1.1162c0,0.6157-0.501,1.1162-1.1162,1.1162 s-1.1162-0.5005-1.1162-1.1162C40.4121,31.0571,40.9131,30.5562,41.5283,30.5562z"
                        />
                    </g>
                </svg>
            </a>

            <a class={currentCategoryId == "flags" ? "selected" : ""} on:click={() => switchCategory("flags")} title="Flags">
                <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
                    <g id="line">
                        <path
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="2"
                            d="M23.0844,17.488C25.9694,15.6897,31.5062,13.2554,37.5,16c3.689,1.6892,5.6344,4.6976,15.0405,4.1142 C53.3291,20.0653,54,20.7109,54,21.5248c0,3.3025,0,11.1393,0,15.1253c0,0.6226-0.4235,1.0771-0.9648,1.354 C51.0882,39,45.7637,38.939,37.5,35c-3.3653-1.6041-8.5703-2.5683-14.4582,1.4425"
                        />
                        <line x1="19.3271" x2="19.3271" y1="12.875" y2="59.8348" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" />
                    </g>
                </svg>
            </a>

            <!-- Really need to clean that up, huh. -->
        </div>
    </div>
</div>

<style>
    :root {
        --text-color: white;
        --background-color: transparent;
        --section-height: 35px;
    }

    .category-name {
        display: block;
        font-size: 0.75em;
        line-height: 1.75em;
        transform: translateX(2px);
        text-transform: uppercase;
        color: lightgray;
    }

    .emoji {
        object-fit: contain;
        margin: 1px;
        width: 1.15em;
        height: 1.15em;
    }

    #emojis {
        position: absolute;
        top: 22px;
        bottom: var(--section-height);
        padding-left: 8px;
        padding-right: 8px;
        width: fit-content;
        margin: auto;
        /* background-color: rgb(0, 255, 0, 0.1); */
        overflow-y: auto;
        overflow-x: hidden;
    }

    #categories {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: var(--section-height);
        /* background-color: rgb(0, 0, 255, 0.1); */
    }

    .sticky-category-title {
        position: fixed;
        top: 2px;
        left: 8px;
    }

    .categories-container {
        width: fit-content;
        margin: auto;
        margin-top: 5px;
    }

    #categories svg {
        width: 24px;
        height: 24px;
        filter: invert(0.95);
        transition: 0.1s;
    }

    #categories svg * {
        stroke-width: 2px !important;
    }

    #categories svg:hover {
        filter: invert(0.65);
    }

    #categories .selected svg {
        /* https://codepen.io/sosuke/pen/Pjoqqp */
        filter: invert(82%) sepia(38%) saturate(2764%) hue-rotate(180deg) brightness(101%) contrast(101%);
    }

    .picker-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 270px;
        height: 365px;
        color: var(--text-color);
        border-radius: 10px;
        border: 1px solid rgba(128, 128, 128, 0.3);
        backdrop-filter: blur(15px);
        background-color: rgb(0, 0, 0, 0.3);
    }

    :global(body) {
        background-image: url(https://picsum.photos/400);
        background-repeat: no-repeat;
    }
</style>

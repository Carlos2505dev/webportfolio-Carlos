<template>
    <div class="theme-switcher">
        <button
            type="button"
            aria-label="Toggle Theme"
            :class="[colorMode.value, 'theme-toggle-btn']"
            @click="toggleDarkMode"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                stroke-linecap="round"
                viewBox="0 0 32 32"
                class="toggle-svg"
            >
                <clipPath id="skiper-btn-2">
                    <path
                        class="clip-path-animate"
                        d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
                    />
                </clipPath>
                <g clip-path="url(#skiper-btn-2)">
                    <circle
                        class="circle-animate"
                        cx="16"
                        cy="16"
                        r="8"
                    />
                    <g
                        class="rays-animate"
                        stroke="currentColor"
                        stroke-width="1.5"
                    >
                        <path d="M16 5.5v-4" />
                        <path d="M16 30.5v-4" />
                        <path d="M1.5 16h4" />
                        <path d="M26.5 16h4" />
                        <path d="m23.4 8.6 2.8-2.8" />
                        <path d="m5.7 26.3 2.9-2.9" />
                        <path d="m5.8 5.8 2.8 2.8" />
                        <path d="m23.4 23.4 2.9 2.9" />
                    </g>
                </g>
            </svg>
        </button>
    </div>
</template>

<script setup>
const colorMode = useColorMode()

function toggleDarkMode() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style lang="scss" scoped>
.theme-switcher {
    display: grid;
    place-items: center;
}

.theme-toggle-btn {
    position: relative;
    background-color: var(--primary);
    color: var(--text-color);
    border: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: var(--neutral);
    }

    &:active {
        transform: scale(0.95);
    }

    &.dark {
        background-color: #000;
        color: #fff;
    }

    &.light {
        background-color: #fff;
        color: #000;
    }
}

.toggle-svg {
    width: 20px;
    height: 20px;
    overflow: visible;
}

.clip-path-animate {
    transition: transform 0.35s ease-in-out;
    transform: translate(0, 0);
}

.dark .clip-path-animate {
    transform: translate(-12px, 10px);
}

.circle-animate {
    transition: r 0.35s ease-in-out;
}

.dark .circle-animate {
    r: 10px;
}

.rays-animate {
    transition: transform 0.35s ease-in-out, opacity 0.35s ease-in-out;
    transform-origin: center;
    transform: rotate(0) scale(1);
    opacity: 1;
}

.dark .rays-animate {
    transform: rotate(-100deg) scale(0.5);
    opacity: 0;
}
</style>
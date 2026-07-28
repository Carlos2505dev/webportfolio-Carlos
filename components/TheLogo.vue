<template>
    <span class="logo__wrap">
        <svg class="logo__wrap__symbol" width="40" height="38" viewBox="0 0 500 500" fill="none"
            xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="$t('common.logo_alt')">
            <image href="/logo_cn.webp" width="500" height="500" />
        </svg>
        <strong class="logo__wrap__type">
            <img src="/carlosneto_logo.webp" :alt="$t('common.logo_alt')" class="logo__wrap__type__img" />
            <span class="visually-hidden">Carlos Neto</span>
        </strong>
    </span>
</template>

<style lang="scss" scoped>
  .logo__wrap{
    &__symbol{
      cursor: pointer;
      width:42px;
      height: auto;
      transition: $transition_default;
      display: grid;
      place-items: center;
    }
    &__type {
        margin-left: 52px;
        position: absolute;
        display: grid;
        place-items: center;
        height: 100%;
        bottom: -10px;
        opacity: 0;
        transition: $transition_default;

        @media(max-width:$br_mobile) {
            bottom: 0px;
            opacity: 1;
        }

        &__img {
            height: 18px;
            width: auto;
            transition: $transition_default;
        }
    }

    &:hover {
        strong {
            bottom: 0px;
            opacity: 1;
        }
    }
  }
</style>
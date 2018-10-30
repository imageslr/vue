<template>
  <!-- <footer>copyright © {{ $t('app.cpr') }} <lang-select/></footer> -->
  <footer>
    <div class="links-area">
      <img
        class="logo"
        src="@/assets/logo_full_white.png" >
      <div class="links">
        <div class="links-item">
          <div
            v-t="'HOW IT WORKS'"
            class="links-item__title" />
          <router-link to="#">Method</router-link>
          <router-link to="#">Join the community</router-link>
        </div>
        <div class="links-item">
          <div
            v-t="'RESOURCES'"
            class="links-item__title" />
          <router-link to="#">Designers &amp; Creatives</router-link>
          <router-link to="#">Popular projects</router-link>
        </div>
        <div class="links-item">
          <div
            v-t="'ABOUT'"
            class="links-item__title" />
          <router-link to="#">Trust &amp; Safety</router-link>
          <router-link to="#">Contact us</router-link>
        </div>
      </div>
    </div>
    <div class="copyright-area clearfix">
      <div class="copyright left">Copyright © 2018 Yogoooo Ltd.</div>
      <div class="usa right"><img src="@/assets/usa.png"><span>USA</span></div>
    </div>
  </footer>
</template>

<script>
import LangSelect from '@/components/LangSelect'
export default {
  components: { LangSelect }
}
</script>

<style lang="scss" scoped>
footer {
  padding: 32px 100px;
  background-color: rgb(50, 53, 59);
  .links-area {
    margin-bottom: 48px;
    display: flex;
    align-items: flex-start;
    .logo {
      width: 120px;
      height: auto;
      margin-right: 56px;
    }
    .links {
      padding-top: 8px;
      display: flex;
      align-items: flex-start;
      &-item {
        width: 200px;
        margin-right: 24px;
        &__title {
          margin-bottom: 8px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 400;
          line-height: 22px;
        }
        a {
          display: block;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 200;
          font-size: 13px;
          line-height: 28px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .copyright-area {
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    .copyright {
      font-size: 13px;
      font-weight: 200;
      color: rgba(255, 255, 255, 0.5);
    }
    .usa {
      font-size: 13px;
      font-weight: 400;
      color: #fff;
      img {
        width: 15px;
        height: 15px;
        margin-right: 4px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
  }
}
</style>

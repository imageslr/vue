<i18n>
{
  "zh": {
    "title1": "连接甲方与设计师的<span style='color:#29b2fe'>平台</span>",
    "title2": "可以信赖的<span style='color:#29b2fe'>专家</span>",
    "title3": "最热门的<span style='color:#29b2fe'>项目</span>",
    "title4": "轻松<span style='color:#29b2fe'>合作</span>",
    "title5": "<span style='color:#29b2fe'>资金</span>保护"
  },
  "en": {
    "title1": "<span style='color:#29b2fe'>Platform</span> to connect employers and designers",
    "title2": "Trusted <span style='color:#29b2fe'>Experts</span>",
    "title3": "Most Popular <span style='color:#29b2fe'>Projects</span>",
    "title4": "<span style='color:#29b2fe'>Collaborate</span> With Ease",
    "title5": "<span style='color:#29b2fe'>Money</span> Protection",

    "moneyTitle1": "Painless and Risk-free",
    "moneyTitle2": "Anti-Fraud Protection",
    "moneyTitle3": "Here to help",
    "moneyDesc1": "Our intuitive payment system holds payments in an escrow account until work is considered complete by both parties.",
    "moneyDesc2": "We monitor every transaction and employ smart identification procedures to protect you from phishing, fraud and identity theft.",
    "moneyDesc3": "Whether you're experiencing technical or collaboration issues, our customer support specialists can help you solve them swiftly and promptly.",

    "浏览全部专家": "Browse experts",

    "平台入驻设计师": "Designers in our platform",
    "查看主页": "View Profile",
    "设计师作品": "Designer works",
    "业主发布的项目": "Party projects",
    "设计费": "Design fees",
    "新发布": "New released",
    "进行中": "In progress",
    "已完成": "Completed"
  }
}
</i18n>

<template>
  <div>
    <el-carousel
      :autoplay="true"
      trigger="click"
      height="570px">
      <el-carousel-item class="work-list-item">
        <img
          src="@/assets/index_grand_1.jpg"
          class="work-list-item__img">
      </el-carousel-item>
      <el-carousel-item class="work-list-item">
        <img
          src="@/assets/index_grand_2.jpg"
          class="work-list-item__img">
      </el-carousel-item>
      <el-carousel-item class="work-list-item">
        <img
          src="@/assets/index_grand_3.jpg"
          class="work-list-item__img">
      </el-carousel-item>
      <el-carousel-item
        v-for="(index, work) in works"
        :key="work.id"
        :work="work"
        class="work-list-item">
        <img
          :src="work.photo_urls[0]"
          class="work-list-item__img">
        <p
          class="work-list-item__title"
          v-text="work.title + ' —— ' + work.user.name" />
      </el-carousel-item>
    </el-carousel>
    <div class="section1">
      <div
        class="title"
        v-html="$t('title1')"/>
      <div class="big-icon-container">
        <div class="big-icon-item">
          <img
            class="big-icon-item__icon"
            src="@/assets/index_big_icon_1.png">
          <div class="big-icon-item__number">3,000</div>
          <div
            v-t="'MEMBERS WORLDWIDE'"
            class="big-icon-item__text" />
        </div>
        <div class="big-icon-item">
          <img
            class="big-icon-item__icon"
            src="@/assets/index_big_icon_2.png">
          <div class="big-icon-item__number">2,000</div>
          <div
            v-t="'DESIGNERS & CREATIVES'"
            class="big-icon-item__text" />
        </div>
        <div class="big-icon-item">
          <img
            class="big-icon-item__icon"
            src="@/assets/index_big_icon_3.png">
          <div class="big-icon-item__number">1,000</div>
          <div
            v-t="'PROJECTS COMPLETED'"
            class="big-icon-item__text" />
        </div>
        <div class="big-icon-item">
          <img
            class="big-icon-item__icon"
            src="@/assets/index_big_icon_4.png">
          <div class="big-icon-item__number">$2,800k</div>
          <div
            v-t="'EARNED BY OUR PLATFORM'"
            class="big-icon-item__text" />
        </div>
      </div>
    </div>
    <div class="section2 clearfix">
      <img
        class="bg"
        src="@/assets/index_bg_1.jpg">
      <div class="section-left">
        <div
          class="title"
          v-html="$t('title2')"/>
        <div class="desc mt3">
          We carefully check everybody before allowing them onto our platform to guarantee you'll be working with an expert in their field of work.
        </div>
        <div class="desc mt2">
          Above all, every designer is rated and reviewed by the community.
        </div>
        <router-link to="/search?type=designer">
          <el-button
            style="margin-top: 32px;"
            type="primary">{{ $t('浏览全部专家') }}</el-button>
        </router-link>
      </div>
      <div class="section-right">
        <div
          v-if="designers.length && designers.length >= 4"
          class="designer-card-list">
          <el-row
            :gutter="24">
            <el-col :span="12"><designer-card :designer="designers[0]" /></el-col>
            <el-col :span="12"><designer-card :designer="designers[1]" /></el-col>
          </el-row>
          <el-row
            :gutter="24"
            class="mt3">
            <el-col :span="12"><designer-card :designer="designers[2]" /></el-col>
            <el-col :span="12"><designer-card :designer="designers[3]" /></el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="section3">
      <div
        class="title"
        v-html="$t('title3')"/>
      <el-row :gutter="12">
        <el-col :span="8"><img
          src="@/assets/index_project_image_1.jpg"
          @click="$router.push('/search')">
        </el-col>
        <el-col :span="8"><img
          src="@/assets/index_project_image_2.jpg"
          @click="$router.push('/search')"></el-col>
        <el-col :span="8"><img
          src="@/assets/index_project_image_3.jpg"
          @click="$router.push('/search')"></el-col>
      </el-row>
      <el-row
        :gutter="12"
        class="mt2">
        <el-col :span="8"><img
          src="@/assets/index_project_image_4.jpg"
          @click="$router.push('/search')"></el-col>
        <el-col :span="8"><img
          src="@/assets/index_project_image_5.jpg"
          @click="$router.push('/search')"></el-col>
        <el-col :span="8"><img
          src="@/assets/index_project_image_6.jpg"
          @click="$router.push('/search')"></el-col>
      </el-row>
    </div>
    <div class="section4">
      <img
        class="bg"
        src="@/assets/index_bg_2.png">
      <div class="section-right">
        <div
          class="title"
          v-html="$t('title4')"/>
        <div class="desc mt3">
          Yogooooo gives you a clearly marked inbox of tasks, structured threads for communication and simple, organised invoicing.
        </div>
        <div class="desc mt2">
          Stay in control, keep in touch.
        </div>
      </div>
    </div>
    <div class="section5">
      <div
        class="title"
        v-html="$t('title5')"/>
      <div class="big-icon-container">
        <div class="big-icon-item">
          <img
            class="big-icon-item__icon"
            src="@/assets/index_big_icon_5.png">
          <div
            v-t="'moneyTitle1'"
            class="big-icon-item__title" />
          <div
            v-t="'moneyDesc1'"
            class="big-icon-item__desc" />
        </div>
        <div class="big-icon-item">
          <img
            class="big-icon-item__icon"
            src="@/assets/index_big_icon_6.png">
          <div
            v-t="'moneyTitle2'"
            class="big-icon-item__title" />
          <div
            v-t="'moneyDesc2'"
            class="big-icon-item__desc" />
        </div>
        <div class="big-icon-item">
          <img
            class="big-icon-item__icon"
            src="@/assets/index_big_icon_7.png">
          <div
            v-t="'moneyTitle3'"
            class="big-icon-item__title" />
          <div
            v-t="'moneyDesc3'"
            class="big-icon-item__desc" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Project } from '@/services/constants'
import { mapGetters } from 'vuex'
import DesignerCard from './components/DesignerCard'
export default {
  components: { DesignerCard },
  computed: mapGetters(['works', 'designers', 'projects']),
  created () {
    // this.$store.dispatch('getIndexWorks')
    // this.$store.dispatch('getIndexProjects')
    this.$store.dispatch('getIndexDesigners')
  },
  methods: {
    isNewReleased (project) {
      // eslint-disable-next-line
      return project.status == Project.STATUS_TENDERING
    },
    isInProgress (project) {
      // eslint-disable-next-line
      return project.status == Project.STATUS_WORKING
    }
  }
}
</script>

<style lang="scss" scoped>
.work-list-item {
  &__img {
    width: 100%;
  }
  &__title {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 16px 80px 30px;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5em;
    color: #fff;
    vertical-align: middle;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
  }
}

.title {
  font-size: 36px;
  font-weight: 400;
}

.desc {
  color: rgba(0, 0, 0, 0.65);
  font-size: 18px;
  line-height: 1.7em;
}

.section1,
.section5 {
  padding: 64px 0px 32px;
  background-color: #fff;
  .title {
    margin: 0 0 40px;
    text-align: center;
  }
  .big-icon-container {
    margin: 0 -32px;
    padding: 0 100px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    .big-icon-item {
      margin: 0 32px;
      padding: 40px 0;
      text-align: center;
      &__icon {
        width: 50px;
        height: 50px;
      }
      &__number {
        margin: 24px 0 12px;
        font-size: 42px;
        font-weight: 400;
      }
      &__title {
        margin: 24px 0 16px;
        font-size: 20px;
        line-height: 28px;
        text-align: center;
      }
      &__text {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.45);
      }
      &__desc {
        font-size: 15px;
        line-height: 28px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
.section5 .big-icon-item {
  flex: 1;
}

.section2 {
  position: relative;
  display: block;
  padding: 80px 100px;
  .section-left {
    float: left;
    width: 35%;
  }
  .section-right {
    float: right;
    width: 60%;
    padding-left: 16px;
    .designer-card-list {
      transform: rotate(355deg);
      opacity: 0.9;
    }
  }
  .bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 750px;
    height: 100%;
    opacity: 0.3;
    transform: rotate(180deg);
  }
}

.section3 {
  padding: 64px 100px;
  background-color: #fff;
  .title {
    margin: 0 0 40px;
    text-align: center;
  }
  .el-row {
    margin: 12px auto !important;
    width: 1100px; // 350*3 + 12*2
  }
  img {
    width: 350px;
    height: 230px;
    cursor: pointer;
  }
}

.section4 {
  display: flex;
  align-items: center;
  img {
    width: 50%;
    height: auto;
  }
  .section-right {
    padding-left: 80px;
    padding-right: 40px;
  }
}
</style>

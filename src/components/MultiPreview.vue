<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div
    class="pswp"
    tabindex="-1"
    role="dialog"
    aria-hidden="true">
    <!-- Background of PhotoSwipe.
         It's a separate element, as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"/>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
      <div class="pswp__container">
        <!-- don't modify these 3 pswp__item elements, data is added later on -->
        <div class="pswp__item"/>
        <div class="pswp__item"/>
        <div class="pswp__item"/>
      </div>
      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->
          <div class="pswp__counter"/>
          <button
            class="pswp__button pswp__button--close"
            title="Close (Esc)"/>
          <button
            class="pswp__button pswp__button--share"
            title="Share"/>
          <button
            class="pswp__button pswp__button--fs"
            title="Toggle fullscreen"/>
          <button
            class="pswp__button pswp__button--zoom"
            title="Zoom in/out"/>
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"/>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"/>
        </div>
        <button
          class="pswp__button pswp__button--arrow--left"
          title="Previous (arrow left)"/>
        <button
          class="pswp__button pswp__button--arrow--right"
          title="Next (arrow right)"/>
        <div class="pswp__caption">
          <div class="pswp__caption__center"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
function getSlideDimensions (slide, photoSwipe) {
  if (slide.hasGottenDimensions) { return } // 确保不会重复发出请求
  var img = new Image()
  img.onerror = function (evt) {
    slide.hasGottenDimensions = true
  }
  img.onload = function (evt) {
    slide.hasGottenDimensions = true
    slide.w = img.naturalWidth
    slide.h = img.naturalHeight
    photoSwipe.invalidateCurrItems()
    photoSwipe.updateSize(true)
  }
  img.src = slide.src
}
export default {
  methods: {
    open (urls = [], index = 0) {
      var items = urls.map(url => {
        return {
          src: url,
          w: 100, // 临时设置一个值，防止报错
          h: 100
        }
      })
      var pswpElement = document.querySelectorAll('.pswp')[0]
      var options = {
        mainClass: 'pswp--minimal--dark',
        captionEl: false,
        fullscreenEl: false,
        shareEl: false,
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        index
      }
      var photoSwipe = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, options)
      // 获取并设置图片的真实宽高
      photoSwipe.listen('gettingData', function (index, slide) {
        if (!slide.hasGottenDimensions) {
          setTimeout(
            // use setTimeout so that it runs in the event loop
            function () { getSlideDimensions(slide, photoSwipe) }
            , 300
          )
        }
      })
      photoSwipe.listen('imageLoadComplete', function (index, slide) {
        if (!slide.hasGottenDimensions) { getSlideDimensions(slide, photoSwipe) }
      })
      photoSwipe.init()
    }
  }
}
</script>

<style>
@import "photoswipe/dist/photoswipe.css";
@import "photoswipe/dist/default-skin/default-skin.css";

.pswp__button--arrow--left:before,
.pswp__button--arrow--right:before {
  background-size: 528px 176px;
  height: 60px;
  width: 64px;
  top: 24px;
  left: 4px;
}

.pswp__button--arrow--left::before {
  background-position: -276px -88px;
}

.pswp__button--arrow--right::before {
  background-position: -188px -88px;
}
</style>

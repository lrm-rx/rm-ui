import RmSwiper from './src/swiper'
import RmSwiperItem from './src/item'

RmSwiper.install = function (Vue) {
  Vue.component(RmSwiper.name, RmSwiper)
}
RmSwiperItem.install = function (Vue) {
    Vue.component(SwiperItem.name, RmSwiperItem)
  }

export {RmSwiper, RmSwiperItem}
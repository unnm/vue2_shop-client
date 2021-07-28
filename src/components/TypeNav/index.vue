<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch($event)">
              <div
                class="item"
                :class="{ item_on: currentIndex === index }"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveInItem(index)"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <a
                  href="javascript:;"
                  @click="
                    $router.push({
                      name: 'search',
                      query: {
                        category1Id: c1.categoryId,
                        categoryName: c1.categoryName,
                      },
                    })
                  "
                  >{{ c1.categoryName }}</a
                > -->
                  <!-- 第一种写法：把所有的a标签换成router-link，会卡，原因是组件标签太多了，
                导致内存当中组件对象很多，所以效率不高 -->
                  <!-- 第二种写法：把声明式导航换成编程式导航，click事件，点击之后，是需要调用函数的，
                同样每个a标签都添加了点击事件，那么内存中就会定义很多个函数，内存占用也是比较大的，
                效率虽然比声明式导航强，但是还是不够好 -->
                  <!-- <router-link
                  :to="{
                    name: 'search',
                    query: {
                      category1Id: c1.categoryId,
                      categoryName: c1.categoryName,
                    },
                  }"
                  >{{ c1.categoryName }}</router-link
                > -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <a
                        href="javascript:;"
                        @click="
                          $router.push({
                            name: 'search',
                            query: {
                              category2Id: c2.categoryId,
                              categoryName: c2.categoryName,
                            },
                          })
                        "
                        >{{ c2.categoryName }}</a
                      > -->
                        <!-- <router-link
                        :to="{
                          name: 'search',
                          query: {
                            category2Id: c2.categoryId,
                            categoryName: c2.categoryName,
                          },
                        }"
                        >{{ c2.categoryName }}</router-link
                      > -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <a
                          href="javascript:;"
                          @click="
                            $router.push({
                              name: 'search',
                              query: {
                                category3Id: c3.categoryId,
                                categoryName: c3.categoryName,
                              },
                            })
                          "
                          >{{ c3.categoryName }}</a
                        > -->
                          <!-- <router-link
                          :to="{
                            name: 'search',
                            query: {
                              category3Id: c3.categoryId,
                              categoryName: c3.categoryName,
                            },
                          }"
                          >{{ c3.categoryName }}</router-link
                        > -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  // import _ from 'lodash'  // 这样引入会把整个lodash全部引入，打包后体积较大
  import throttle from 'lodash/throttle'

  export default {
    name: 'TypeNav',
    data() {
      return {
        currentIndex: -1,
        isShow: true,
      }
    },
    computed: {
      // ...mapState({categoryList: state=>state.home.categoryList}),
      ...mapState('home', ['categoryList']),
    },
    methods: {
      // ...mapActions('home', ['getCategoryList']),

      // _.throttle(renewToken, 300000, { 'trailing': false });
      // 未节流
      // moveInItem(index) {
      //   this.currentIndex = index
      //   console.log(index)
      // },
      // 节流后，传递的函数不能用箭头函数，因为箭头函数内部this不指向组件对象了
      moveInItem: throttle(
        function (index) {
          this.currentIndex = index
          // console.log(index)
        },
        20,
        { trailing: false }
      ),

      // 点击事件委派click的回调函数
      toSearch(event) {
        // event是浏览器调用事件处理函数传递过来的事件对象，代表你传递的$event
        let targetNode = event.target // 获取触发事件的目标元素
        let data = targetNode.dataset // 获取当前目标元素身上data-属性组成的对象
        // console.log(data)
        // 问题一：怎么知道点击的是不是a标签？
        // 如果点击的是a标签，那么data一定有我们设置的categoryname属性
        // 如果点击的不是a标签，那么data就没有categoryname属性

        // 问题二：参数怎么携带，要携带哪些个参数
        // 如果点击的是a标签，那么参数已经保存到自定义属性中携带过来了

        // 问题三：假设你点击的就是a标签，如何确定点击的是一级、二级还是三级
        let { category1id, category2id, category3id, categoryname } = data
        if (categoryname) {
          // categoryname存在，证明点击的就是a标签
          let location = {
            name: 'search',
          }
          let query = {
            categoryName: categoryname,
          }
          // 确定一级、二级、三级的id
          if (category1id) {
            query.category1Id = category1id
          } else if (category2id) {
            query.category2Id = category2id
          } else {
            query.category3Id = category3id
          }
          // 找到所有的query参数后，最后把query参数放到location里面
          location.query = query
          // 最终把location对象就构造好了，可以跳转了

          // 注意：跳转以前，要合并原来过来时携带的params参数
          // 看看之前过来有没有params参数，有的话这次就一起带上（合并参数）
          if (this.$route.params) {
            location.params = this.$route.params
          }
          this.$router.push(location)
        }
      },

      moveOutDiv() {
        this.currentIndex = -1
        // 移出外部我们自己添加的div，要判断是在home页面移出，或是在search页面移出
        if (this.$route.path !== '/home') {
          // 证明这个组件是在search里面的，让sort隐藏
          this.isShow = false
        }
      },
    },
    mounted() {
      // 如果在这里发送请求，只要home和search这两个路由组件，每次切换都要重新发请求
      // home和search内部都要重新创建typeNav组件，此时mounted就会重新执行
      // 那么请求就会重复发，而上级分类列表数据时一样的，没必要发那么多次
      // this.getCategoryList()

      if (this.$route.path !== '/home') {
        // 证明这个组件是在search里面的，需要一上来就隐藏sort
        this.isShow = false
      }
    },
  }
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: skyblue;
        z-index: 999;

        &.sort-enter {
          height: 0;
          opacity: 0;
        }
        &.sort-enter-to {
          height: 461px;
          opacity: 1;
        }
        &.sort-enter-active {
          transition: all 0.5s;
        }

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 615px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &.item_on {
              background-color: hotpink;
              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>

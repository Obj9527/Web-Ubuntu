<template>
  <Window :window="this.meta">
    <template slot="content">
      <div
        class="w-full h-full bg-ub-grey relative text-white select-none overflow-hidden flex window-main-screen"
      >
        <div
          class="w-1/4 h-full md:w-1/5 text-sm overflow-y-auto border-r border-black flex flex-col justify-start items-center"
        >
          <div
            :id="item.id"
            tabindex="0"
            v-for="item in items"
            :key="item.id"
            class="w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
            :class="
              focusedItem === item.id
                ? 'bg-ub-orange bg-opacity-100 hover:bg-opacity-90'
                : 'hover:bg-opacity-5 hover:bg-gray-50'
            "
            @focusin="changeFocused(item.id)"
          >
            <img class="w-3 md:w-4" alt="about obj9527" :src="item.image" />
            <span class="ml-1 md:ml-2 text-gray-50">{{ item.title }}</span>
          </div>
        </div>
        <div
          class="w-3/4 md:w-4/5 bg-ub-cool-grey h-full flex flex-col justify-start items-center"
        >
          <div
            v-if="focusedItem === 'about'"
            class="flex flex-col justify-start items-center"
          >
            <div class="w-20 md:w-28 mt-8 mx-auto bg-white rounded-full">
              <img
                class="w-full rounded"
                :src="this.images.headerIcon"
                alt="obj9527's Logo"
              />
            </div>
            <div class="mt-4 text-lg md:text-2xl text-center px-1">
              <div>我叫<span class="font-bold">黄超杰</span> ,</div>
              <div class="font-normal ml-1">
                是一名<span class="text-pink-600 font-bold">前端工程师</span>
              </div>
            </div>
            <div
              class="mx-auto my-4 relative md:my-8 pt-px bg-white w-32 md:w-48"
            >
              <div
                class="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"
              ></div>
              <div
                class="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"
              ></div>
            </div>
            <ul
              class="leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list"
            >
              <li class="mt-3 list-pc">
                我有1年的<span class="font-medium">工作经验</span>
              </li>
              <li class="mt-3 list-building">
                我喜欢编程，希望用程序能给世界带来更多有意思的东西
              </li>
              <li class="mt-3 list-time">
                我之前主要使用的是后端语言，在工作中接触到前端，对前端很感兴趣，见到大佬用React做了个仿Ubuntu的，所以用Vue+TailCSS写了一个，希望大家喜欢
              </li>
              <li class="mt-3 list-star">
                目前正在求职，目标职位：<span class="text-yellow-600 font-bold"
                  >前端工程师</span
                >，希望能找份有时间自我学习与生活的工作
              </li>
            </ul>
          </div>
          <div
            v-if="focusedItem === 'education'"
            class="flex flex-col justify-start items-center"
          >
            <div class="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
              教 育
              <div class="absolute pt-px bg-white mt-px top-full w-full">
                <div
                  class="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"
                ></div>
                <div
                  class="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"
                ></div>
              </div>
            </div>
            <ul class="w-full my-4 ml-4 px-0 md:px-1">
              <li class="list-disc">
                <div
                  class="mb-2 text-lg md:text-xl text-left font-bold leading-tight"
                >
                  桂林电子科技大学<span class="text-sm ml-10">本科</span
                  ><span class="text-sm text-gray-400 mt-0.5 ml-10"
                    >2014 - 2018</span
                  >
                </div>
                <div class="ml-4">
                  <ul>
                    <li class="list-disc text-sm">
                      2018年获得桂林电子科技大学二等奖学金
                    </li>
                    <li class="list-disc text-sm">
                      2017年获得第五届全国大学生工程训练综合能力竞赛区三等奖
                    </li>
                    <li class="list-disc text-sm">
                      2016年获得第七届全国大学生创新设计大赛区二等奖
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div
            v-if="focusedItem === 'skills'"
            class="flex flex-col justify-start items-center"
          >
            <div class="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
              技能树
              <div class="absolute pt-px bg-white mt-px top-full w-full">
                <div
                  class="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"
                ></div>
                <div
                  class="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"
                ></div>
              </div>
            </div>
            <ul class="tracking-tight text-sm md:text-base w-10/12 emoji-list">
              <li
                class="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight"
              >
                我一开始学习的是后端的语言和框架，包括Java、C、Spring全家桶等，后接触前端喜欢上了能独立实现产品的感觉，学习了前端三件套：HTML、CSS、JavaScript以及Vue全家桶、TailCSS、React（刚接触）等
              </li>
              <li
                class="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight"
              >
                <div>
                  我的经验项在于
                  <strong class="text-ubt-gedit-orange"
                    >Vue.js & JavaScript & Java !</strong
                  >
                </div>
              </li>
              <li
                class="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight"
              >
                <div>以下是我学习过的东西</div>
              </li>
            </ul>
            <div class="w-full md:w-10/12 flex mt-4">
              <div class="text-sm text-center md:text-base w-1/2 font-bold">
                语言 & 工具
              </div>
              <div class="text-sm text-center md:text-base w-1/2 font-bold">
                框架 & 库
              </div>
            </div>
            <div
              class="w-full md:w-10/12 flex justify-center items-start font-bold text-center"
            >
              <div class="px-2 w-1/2">
                <div
                  class="flex flex-wrap justify-center items-start w-full mt-2"
                >
                  <img
                    class="m-1"
                    src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A"
                    alt="obj9527 javascript"
                  />
                  <img
                    class="m-1"
                    src="https://img.shields.io/badge/C-00599C?style=flat&logo=c&logoColor=white"
                    alt="obj9527 c++"
                  />
                  <img
                    class="m-1"
                    src="https://img.shields.io/badge/Java-0175C2?style=flat&logo=java&logoColor=white"
                    alt="obj9527 Java"
                  />
                  <img
                    class="m-1"
                    src="https://img.shields.io/badge/Mysql-0175C2?style=flat&logo=mysql&logoColor=white"
                    alt="obj9527 dart"
                  />
                  <a
                    href="https://www.google.com/search?q=is+html+a+language%3F"
                    target="_blank"
                    rel="noreferrer"
                    ><img
                      title="yes it's a language!"
                      class="m-1"
                      src="https://img.shields.io/badge/-HTML5-%23E44D27?style=flat&logo=html5&logoColor=ffffff"
                      alt="obj9527 HTML"
                  /></a>
                  <img
                    src="https://img.shields.io/badge/-Sass-%23CC6699?style=flat&logo=sass&logoColor=ffffff"
                    alt="obj9527 SASS"
                    class="m-1"
                  />
                  <img
                    src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=%23ffffff"
                    alt="obj9527 git"
                    class="m-1"
                  />
                  <img
                    src="https://img.shields.io/badge/-CSS3-FFCA28?style=flat&logo=css3&logoColor=ffffff"
                    alt="obj9527 firebase"
                    class="m-1"
                  />
                </div>
              </div>
              <div class="px-2 flex flex-wrap items-start w-1/2">
                <div
                  class="flex flex-wrap justify-center items-start w-full mt-2"
                >
                  <img
                    class="m-1"
                    src="https://img.shields.io/badge/Vue-02569B?style=flat&logo=vue&logoColor=white"
                    alt="obj9527 vue"
                  />
                  <img
                    class="m-1"
                    src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white"
                    alt="obj9527 tailwind css"
                  />
                  <img
                    src="https://img.shields.io/badge/-Spring-339933?style=flat&logo=spring&logoColor=ffffff"
                    alt="obj9527 node.js"
                    class="m-1"
                  />
                  <img
                    src="https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white"
                    alt="obj9527 jquery"
                    class="m-1"
                  />
                  <img
                    class="m-1"
                    src="https://img.shields.io/badge/Element-593D88?style=flat&logo=element&logoColor=white"
                    alt="obj9527 redux"
                  />
                  <img
                    class="m-1"
                    src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=ffffff"
                    alt="obj9527 react"
                  />
                </div>
              </div>
            </div>
            <ul
              class="tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4"
            >
              <li
                class="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight"
              >
                <span> 当然还有,</span>
                <img
                  class="inline ml-1"
                  src="http://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff"
                  alt="obj9527 linux"
                />
                <span>!</span>
              </li>
            </ul>
          </div>
          <div
            v-if="focusedItem === 'projects'"
            class="flex flex-col justify-start items-center"
          >
            <div class="mt-8">
              <span class="font-bold text-2xl">见简历</span>
            </div>
          </div>
          <div v-if="focusedItem === 'resume'" class="w-full h-full">
            <iframe
              class="h-full w-full border-0"
              src="./files/resume.pdf"
              title="obj9527 resume"
            ></iframe>
          </div>
        </div>
      </div>
    </template>
  </Window>
</template>

<script>
import Window from "../window/Window";

export default {
  name: "AboutObj9527",
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      focusedItem: "about",
      images: {
        headerIcon: "./images/logos/wow_cat.jpg",
      },
      items: [
        {
          id: "about",
          title: "关于我",
          image: "./themes/Yaru/status/about.svg",
        },
        {
          id: "education",
          title: "教育",
          image: "./themes/Yaru/status/education.svg",
        },
        {
          id: "skills",
          title: "技能",
          image: "./themes/Yaru/status/skills.svg",
        },
        {
          id: "projects",
          title: "项目",
          image: "./themes/Yaru/status/projects.svg",
        },
        {
          id: "resume",
          title: "简历",
          image: "./themes/Yaru/status/download.svg",
        },
      ],
      projects: [
        {
          name: "economist.com Unlocked",
          date: "Mar 2021",
          link: "https://github.com/vivek9patel/economist.com-unlocked",
          description: [
            "A chrome extension to read Paid Articles for Free & with no Ads, no subscription, no memberships!",
          ],
          domains: ["javascript", "chrome-extension"],
        },
        {
          name: "economist.com Unlocked",
          date: "Mar 2021",
          link: "https://github.com/vivek9patel/economist.com-unlocked",
          description: [
            "A chrome extension to read Paid Articles for Free & with no Ads, no subscription, no memberships!",
          ],
          domains: ["javascript", "chrome-extension"],
        },
        {
          name: "economist.com Unlocked",
          date: "Mar 2021",
          link: "https://github.com/vivek9patel/economist.com-unlocked",
          description: [
            "A chrome extension to read Paid Articles for Free & with no Ads, no subscription, no memberships!",
          ],
          domains: ["javascript", "chrome-extension"],
        },
      ],
    };
  },
  components: { Window },
  methods: {
    changeFocused(id) {
      this.focusedItem = id;
      console.log(this.focusedItem);
    },
  },
};
</script>

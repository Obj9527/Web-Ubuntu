<template>
  <Window :window="this.meta">
    <template slot="content">
      <div
        class="w-full h-full relative flex flex-col bg-ub-cool-grey text-white select-none"
      >
        <div
          class="flex items-center justify-between w-full bg-ub-gedit-light bg-opacity-60 border-b border-t border-blue-400 text-sm"
        >
          <span class="font-bold ml-2">Send a Message to Me</span>
          <div class="flex">
            <div
              @click="sendEmail"
              class="border border-black bg-black bg-opacity-50 px-3 py-0.5 my-1 mx-1 rounded hover:bg-opacity-80"
            >
              Send
            </div>
          </div>
        </div>
        <div
          class="relative flex-grow flex flex-col bg-ub-gedit-dark font-normal window-main-screen"
        >
          <div
            class="absolute left-0 top-0 h-full px-2 bg-ub-gedit-darker"
          ></div>
          <div class="relative">
            <input
              @input="saveValue('sender-name')"
              @keydown="checkKey('sender-name')"
              id="sender-name"
              class="w-full text-ubt-gedit-orange focus:bg-ub-gedit-light outline-none font-medium text-sm pl-6 py-0.5 bg-transparent"
              placeholder="Your Email:"
              spellCheck="false"
              autoComplete="off"
              type="text"
            />
            <span
              class="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold light text-sm text-ubt-gedit-blue"
              >1</span
            >
          </div>
          <div class="relative">
            <input
              @input="saveValue('sender-subject')"
              @keydown="checkKey('sender-subject')"
              id="sender-subject"
              class="w-full my-1 text-ubt-gedit-blue focus:bg-ub-gedit-light gedit-subject outline-none text-sm font-normal pl-6 py-0.5 bg-transparent"
              placeholder="subject (may be a feedback for this website!)"
              spellCheck="false"
              autoComplete="off"
              type="text"
            />
            <span
              class="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold text-sm text-ubt-gedit-blue"
              >2</span
            >
          </div>
          <div class="relative flex-grow">
            <textarea
              @input="saveValue('sender-message')"
              id="sender-message"
              class="w-full gedit-message font-light text-sm resize-none h-full windowMainScreen outline-none tracking-wider pl-6 py-1 bg-transparent"
              placeholder="Message"
              spellCheck="false"
              autoComplete="none"
              type="text"
            />
            <span
              class="absolute left-1 top-1 font-bold text-sm text-ubt-gedit-blue"
              >3</span
            >
          </div>
        </div>
        <div
          v-if="sending"
          class="flex justify-center items-center animate-pulse h-full w-full bg-gray-400 bg-opacity-30 absolute top-0 left-0"
        >
          <img
            class="w-8 absolute animate-spin"
            :src="this.sendingImg"
            alt="Ubuntu Process Symbol"
          />
        </div>
      </div>
    </template>
  </Window>
</template>

<script>
import Window from "../window/Window";
import { validEmail } from "@/utils/validate.js";
import emailjs from "emailjs-com";

export default {
  name: "Gedit",
  components: { Window },
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sendingImg: "./themes/Yaru/status/process-working-symbolic.svg",
      sending: false,
      email: {
        name: "",
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    checkKey(id) {
      let e = event || window.event;
      if (e.key === "Enter" && id === "sender-name") {
        let next = document.getElementById("sender-subject");
        next.focus();
      } else if (e.key === "Enter" && id === "sender-subject") {
        let next = document.getElementById("sender-message");
        next.focus();
      }
    },
    sendEmail() {
      let pass = true;
      if (!validEmail(this.email.name)) {
        document
          .getElementById("sender-name")
          .setAttribute("placeholder", "email address is invalid!");
        pass = false;
      }
      if (this.email.subject === "" || this.email.subject === null) {
        document
          .getElementById("sender-subject")
          .setAttribute("placeholder", "Subject must not be Empty!");
        pass = false;
      }
      if (this.email.message === "" || this.email.message === null) {
        document
          .getElementById("sender-message")
          .setAttribute("placeholder", "Message must not be Empty!");
        pass = false;
      }
      if (!pass) {
        console.log("no pass");
        return;
      }
      this.sending = true;
      let serviceID = "service_om26zfu";
      let templateID = "template_k3md5zi";
      let userID = "user_YymXGBoqh6RVnTcgO2Md1";
      emailjs
        .send(serviceID, templateID, this.email, userID)
        .then(() => {
          this.sending = false;
          this.$store.commit("closeWindow", this.meta.id);
        })
        .catch(() => {
          this.sending = false;
          this.$store.commit("closeWindow", this.meta.id);
        });
    },
    saveValue(id) {
      if (id === "sender-name") {
        let name = document.getElementById("sender-name");
        this.email.name = name.value.trim();
        //console.log(this.email.name)
      }
      if (id === "sender-subject") {
        let sub = document.getElementById("sender-name");
        this.email.subject = sub.value.trim();
        //console.log(this.email.subject)
      }
      if (id === "sender-message") {
        let mes = document.getElementById("sender-message");
        this.email.message = mes.value.trim();
        //console.log( this.email.message)
      }
    },
  },
};
</script>

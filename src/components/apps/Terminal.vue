<template>
    <Window :window="this.meta">
        <template slot="content">
            <div class="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold overflow-y-auto window-main-screen"
                 id="terminal-body" @click="focusInput">
                <div class="flex flex-col flex-grow w-full h-full">
                    <div :id="directive.id" v-for="directive in directiveStack" :key="directive.id">
                        <div class="flex w-full h-5">
                            <div class="relative text-md font-bold text-ubt-green">obj9527@XiaoMi</div>
                            <div class="text-white mx-px font-medium">:</div>
                            <div :id="'t-path-' + directive.id" class=" text-ubt-blue">{{directive.currentPath}}</div>
                            <div class="text-white mx-px font-medium mr-1">$</div>
                            <div id="cmd" class="bg-transperent relative flex-1 overflow-hidden">
                                <span :id="'t-show-' + directive.id"
                                      class="float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                                <span :id="'t-cursor-' + directive.id"
                                      class="float-left mt-1 w-1.5 h-3.5 bg-white input-cursor"
                                      v-if="directive.id === directiveStack[directiveStack.length - 1].id"></span>
                                <input :id="'t-input-' + directive.id" @keydown="checkKey" @input="inputHandler"
                                       class="absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent"
                                       autofocus="autofocus" spellcheck="false" autocomplete="off" type="text"/>
                            </div>
                        </div>
                        <div class="flex justify-start flex-wrap font-bold mr-2 text-ubt-blue"
                             :id="'t-response-' + directive.id">
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Window>
</template>

<script>
    import Window from "../window/Window";

    export default {
        name: "Terminal",
        props: {
            meta: {
                type: Object,
                required: true,
            }
        },
        computed: {},
        data() {
            return {
                uuid: 0,
                directiveStack: [
                    {
                        id: '0',
                        currentPath: '~',
                    }
                ],
                currentDirName: "root",
                childDirectories: {
                    root: ["books", "projects", "personal-documents", "skills", "languages", "interests"],
                    books: ["Thinking in Java.pdf", "JavaScript高级程序设计.pdf", "你所不知道的JavaScript.pdf", "数据结构.pdf", "计算机网络.pdf"],
                    skills: ["Vue.js", "React.js", "jQuery", "TailCSS","Element-UI", "SQL"],
                    projects: ["power-CMS", "Web-Ubuntu", "ECall/BCall", "zzjbhack.com", "BYD Bug Platform", " Charging Pile Management"],
                    interests: ["Front Side", "Games Dev", "Computer Vision"],
                    languages: ["Javascript", "C", "Java", "Python"],
                },
            }
        },
        components: {Window},
        mounted() {
            this.focusInput()
        },
        watch: {},
        methods: {
            checkKey(e) {
                if (e.key === 'Enter') {
                    let id = this.directiveStack[this.directiveStack.length - 1].id
                    let input = document.getElementById('t-input-' + id)
                    if (input.value === null || input.value === '') {
                        return
                    }
                    this.directiveHandler(input.value, id)
                    this.$nextTick(() => {
                        this.focusInput()
                    })
                }
            },
            directiveHandler(directive, id) {
                let words = directive.split(' ').filter(Boolean);
                let key = words[0];
                words.shift()
                let result = "";
                let append = words.join(" ");
                append = append.trim();
                //console.log('key: ', key, 'words: ', words, 'append: ', append)
                switch (key) {
                    case "cd": {
                        if (words.length === 0 || append === "" || append === '~') {
                            this.generateNextInput()
                            this.directiveStack[this.directiveStack.length - 1].currentPath = "~";
                            this.currentDirName = "root"
                            break;
                        } else if (words.length > 1) {
                            result = "too many arguments, arguments must me <1.";
                            break;
                        } else if (append === "personal-documents") {
                            result = `bash /${this.currentDirName} : Permission denied 😏`;
                            break;
                        } else if (this.childDirectories[this.currentDirName].includes(append)) {
                            this.generateNextInput()
                            this.directiveStack[this.directiveStack.length - 1].currentPath += "/" + append;
                            this.currentDirName = append;
                            return;
                        } else if (append === ".." || append === "../") {
                            result = "Type 'cd~' to go back 😅";
                            break;
                        } else {
                            result = `bash: cd ${words}: No such file or directory`;
                        }
                        break;
                    }
                    case "ls": {
                        let target = words[0];
                        if (target === "" || target === undefined || target === null) {
                            target = this.currentDirName;
                            result = this.childDirectories[target]
                            break
                        } else if (words.length > 1) {
                            result = "too many arguments, arguments must me <1.";
                            break;
                        } else if (target in this.childDirectories) {
                            result = this.childDirectories[target]
                        } else if (target === "personal-documents") {
                            result = "Nope! 🙃";
                            break;
                        } else {
                            result = `ls: cannot access '${words}': No such file or directory`;
                        }
                        break;
                    }
                    case "mkdir": {
                        /* TODO: file system */
                        break;
                    }
                    case "echo": {
                        result = this.xss(words.join(" "));
                        break;
                    }
                    case "clear": {
                        this.directiveStack = [{id: this.generateUUID(), currentPath: '~'}]
                        return;
                    }
                    case "exit": {
                        this.$store.commit('closeWindow', this.meta.id)
                        return;
                    }
                    case "sudo": {
                        result = "<img class=' w-2/5' src='./images/memes/no-sudo.jpg' />";
                        break;
                    }
                    case 'help': {
                        result = 'Available Commands: [ cd, ls, echo, clear, exit ]'
                        break
                    }
                    default:
                        result = "Command '" + directive + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, echo, clear, exit, mkdir ]";
                }
                document.getElementById(`t-response-${id}`).innerHTML = result;
                this.generateNextInput()
            },
            focusInput() {
                let nextInput = document.getElementById('t-input-' + this.directiveStack[this.directiveStack.length - 1].id)
                nextInput.focus()
            },
            generateUUID() {
                this.uuid = this.uuid + 1
                return this.uuid
            },
            generateNextInput() {
                this.directiveStack.push({id: this.generateUUID(), currentPath: this.directiveStack[this.directiveStack.length - 1].currentPath})
                console.log('-', this.directiveStack)
            },
            inputHandler() {
                let id = this.directiveStack[this.directiveStack.length - 1].id
                let input = document.getElementById('t-input-' + id)
                let shower = document.getElementById('t-show-' + id)
                shower.innerText = input.value
            },
            xss(str) {
                if (!str) return;
                return str.split('').map(char => {
                    switch (char) {
                        case '&':
                            return '&amp';
                        case '<':
                            return '&lt';
                        case '>':
                            return '&gt';
                        case '"':
                            return '&quot';
                        case "'":
                            return '&#x27';
                        case '/':
                            return '&#x2F';
                        default:
                            return char;
                    }
                }).join('');
            }
        }
    }
</script>

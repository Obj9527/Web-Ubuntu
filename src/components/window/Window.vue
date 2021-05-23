<template>
    <!--:style="{width: this.meta.width + 'px', height: this.meta.height + 'px'}"-->
    <div ref="window"
         class="absolute window-shadow flex flex-col md:w-4/5"
         :class="[this.closed ? 'closed-window':'', this.minimized ? 'opacity-0 invisible duration-500' : '', this.maximized ? 'duration-300 rounded-none':'rounded-lg rounded-b-none', this.focused ? 'z-20':'z-0']"
         :id="this.window.id" @mousedown.stop="openMenu">
        <WindowHeader :id="this.window.id" :title="this.window.title" @mousedown.native="moveStart" @minimize="minimizeWindow" @maximize="maximizeWindow" @close="closeWindow" @restore="restoreWindow"/>
        <WindowSidebar :id="this.window.id" direction="right" @mouseenter.native="changeCursorToColResize" @mouseleave.native="changeCursorToDefault" @mousedown.native.stop="resizeHorizontal"/>
        <WindowSidebar :id="this.window.id" direction="bottom" @mouseenter.native="changeCursorToRowResize" @mouseleave.native="changeCursorToDefault" @mousedown.native.stop="resizeVertical"/>
        <div class="w-full h-full overflow-hidden">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    import WindowHeader from "./WindowHeader";
    import WindowSidebar from "./WindowSidebar";
    export default {
        name: "Window",
        props: {
            window: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                closed: false,
                defaultWidth: 800,
                defaultHeight: 600,
                defaultX: 100,
                defaultY: 100,
            }
        },
        components: {
            WindowSidebar,
            WindowHeader,
        },
        mounted() {
            let win = document.getElementById(this.window.id)
            if (window.innerWidth <= 800) {
                win.style.width = 85 + '%'
                win.style.height = 80 + '%'
            }
            else {
                this.window.meta.width = this.window.meta.width || this.defaultWidth
                this.window.meta.height = this.window.meta.height || this.defaultHeight
                win.style.width = this.window.meta.width + 'px'
                win.style.height = this.window.meta.height + 'px'
                console.log(win.style.width)
            }
            //make window's default position in center
            let windowRect = win.getBoundingClientRect()
            let x = (this.fullWidth/2 - windowRect.width/2 + 26).toFixed(1)
            let y = (this.fullHeight/2 - windowRect.height/2 + 15).toFixed(1)
            win.style.left = (x || this.defaultX) + 'px'
            win.style.top = (y || this.defaultY) + 'px'
            this.setWindowPosition()
        },
        computed: {
            minimized() {
                return !(this.$store.state.minimizedWindowList.indexOf(this.window.id) === -1)
            },
            maximized() {
                return !(this.$store.state.maximizedWindowList.indexOf(this.window.id) === -1)
            },
            focused() {
                if (this.window.id === this.$store.state.focusedWindow) {
                    return true
                }else {
                    return false
                }
            },
            fullHeight(){
                return this.$store.state.fullHeight
            },
            fullWidth(){
                return this.$store.state.fullWidth
            },
        },
        methods: {
            changeCursorToMove() {
                this.$refs.window.style.cursor = 'move'
            },
            changeCursorToDefault(){
                this.$refs.window.style.cursor = 'default'
            },
            changeCursorToColResize() {
                this.$refs.window.style.cursor = 'ew-resize'
            },
            changeCursorToRowResize() {
                if (this.$store.state.maximizedWindowList.indexOf(this.window.id) !== -1) {
                    return
                }
                this.$refs.window.style.cursor = 'ns-resize'
            },
            refocus() {
                //console.log(`refocus: ${this.window.id}`)
                this.$store.commit('refreshWindowFocused', this.window.id)
            },
            moveStart(e) {
                this.refocus()
                //if the window is maximized, disable move
                //add only left mouse can move
                if (this.$store.state.maximizedWindowList.indexOf(this.window.id) !== -1 || e.button !== 0) {
                    return;
                }
                this.changeCursorToMove()
                let window = document.getElementById(this.window.id)
                let windowRect = window.getBoundingClientRect()
                //console.log(windowRect)
                //if the window is maximized, to restore it
                /*if (this.$store.state.maximizedWindowList.indexOf(this.window) !== -1) {
                    window.style.width = this.$store.state.maximizedWindowList[this.$store.state.maximizedWindowList.indexOf(this.window)].meta.width
                    window.style.height = this.$store.state.maximizedWindowList[this.$store.state.maximizedWindowList.indexOf(this.window)].meta.height
                    console.log(this.$store.state.maximizedWindowList[this.$store.state.maximizedWindowList.indexOf(this.window)].meta.width, this.$store.state.maximizedWindowList[this.$store.state.maximizedWindowList.indexOf(this.window)].meta.height)
                }*/
                let downY = e.clientY
                let downX = e.clientX
                let windowX = windowRect.x
                let windowY = windowRect.y
                let mouseMoveHandler = (e) => {
                    let moveX = e.clientX;
                    let moveY = e.clientY;
                    let offsetX = moveX-downX
                    let offsetY = moveY-downY
                    //bound handle (--) tentative
                    if(offsetX <= -windowX){
                        window.style.left = 0 + 'px'
                    }else if (offsetX >= this.fullWidth - windowX - windowRect.width){
                        window.style.left = (this.fullWidth - windowRect.width) + 'px'
                    }else {
                        window.style.left = offsetX + windowX + 'px';
                    }
                    if (offsetY <= -windowY+30){
                        window.style.top = 30 + 'px'
                    }else if (offsetY >= (this.fullHeight - windowY - windowRect.height)){
                        window.style.top = (this.fullHeight - windowRect.height) + 'px'
                    }else {
                        window.style.top = offsetY + windowY + 'px';
                    }
                    if (window.style.left.substring(0, window.style.left.length - 2) < 52) {
                        this.$store.commit('hideSidebar', true)
                    }
                    if (window.style.left.substring(0, window.style.left.length - 2) >= 52) {
                        this.$store.commit('hideSidebar', false)
                    }
                }
                let mouseUpHandler = () => {
                    this.changeCursorToDefault();
                    document.onmousemove = null;
                    document.onmouseup = null;
                    document.onmousedown = null;
                    this.$emit("resize_end")
                }
                document.onmousemove = mouseMoveHandler;
                document.onmouseup = mouseUpHandler;
            },
            setWindowPosition() {
                let r = document.getElementById(this.window.id);
                let rect = r.getBoundingClientRect();
                this.$store.state.windowList[this.$store.state.windowList.indexOf(this.window)].meta = rect
                //console.log(this.$store.state.windowList[this.$store.state.windowList.indexOf(this.window)].meta)
            },
            minimizeWindow(){
                if (this.$store.state.maximizedWindowList.indexOf(this.window.id) === -1){
                    this.setWindowPosition();
                }
                // get corresponding sidebar app's position
                let sideBarApp = document.getElementById("sidebar-" + this.window.id)
                let sideBarAppRect = sideBarApp.getBoundingClientRect()
                // translate window to that position
                let window = document.getElementById(this.window.id)
                let windowRect = window.getBoundingClientRect()
                console.log(windowRect.y,sideBarAppRect.y)
                let transX = -windowRect.x + 52
                //let transY = sideBarAppRect.y.toFixed(1) + 28 - windowRect.y.toFixed(1)
                window.style.transform = `translate(${transX/0.5}px,0px) scale(0.5)`
                //console.log('transX:',transX,'transY:',transY)
                this.$store.commit('minimizeWindow', this.window.id)
            },
            maximizeWindow(){
                this.refocus()
                this.setWindowPosition()
                let window = document.getElementById(this.window.id)
                //console.log('fullHeight:', this.fullHeight, 'fullWidth', this.fullWidth)
                window.style.width = this.fullWidth + 'px'
                window.style.height = (this.fullHeight - 30) + 'px'
                window.style.top = 30 + 'px'
                window.style.left = 0 + 'px'
                this.$store.commit('maximizeWindow', this.window.id)
            },
            restoreWindow(){
                this.refocus()
                let window = document.getElementById(this.window.id)
                window.style.width = this.window.meta.width + 'px'
                window.style.height = this.window.meta.height + 'px'
                window.style.top = this.window.meta.y + 'px'
                window.style.left = this.window.meta.x + 'px'
                this.$store.commit('restoreWindow', this.window.id)
            },
            closeWindow(){
                this.closed = true
                setTimeout(() => {
                    this.$store.commit('closeWindow', this.window.id)
                }, 300)
            },
            resizeHorizontal(e) {
                let window = document.getElementById(this.window.id)
                let windowRect = window.getBoundingClientRect()
                let rightBorder = document.getElementById('border-right-' + this.window.id)
                let rightBorderRect = rightBorder.getBoundingClientRect()
                let downX = e.clientX
                let mouseMoveHandler = (e) => {
                    rightBorder.style.width = 5 * rightBorderRect.width + 'rem' //fix: when mouse move in iframe, the mousemove event will not be capture
                    let moveX = e.clientX;
                    let offsetX = moveX-downX
                    console.log('offsetX: ',offsetX,'width: ',window.style.width)
                    if (windowRect.width + offsetX <= 400){
                        window.style.width = 400 + 'px'
                    }else {
                        window.style.width = windowRect.width + offsetX + 'px'
                    }
                }
                let mouseUpHandler = () => {
                    this.changeCursorToDefault();
                    rightBorder.style.width = null
                    document.onmousemove = null;
                    document.onmouseup = null;
                    document.onmousedown = null;
                    this.$emit("resize_end")
                }
                document.onmousemove = mouseMoveHandler;
                document.onmouseup = mouseUpHandler;
                document.onmousedown = null;
            },
            resizeVertical(e) {
                if (this.$store.state.maximizedWindowList.indexOf(this.window.id) !== -1) {
                    return
                }
                let window = document.getElementById(this.window.id)
                let windowRect = window.getBoundingClientRect()
                let bottomBorder = document.getElementById('border-bottom-' + this.window.id)
                let bottomBorderRect = bottomBorder.getBoundingClientRect()
                let downY = e.clientY
                let mouseMoveHandler = (e) => {
                    bottomBorder.style.height = 5 * bottomBorderRect.height + 'rem' //fix: when mouse move in iframe, the mousemove event will not be capture
                    let moveY = e.clientY;
                    let offsetY = moveY-downY
                    if (windowRect.height + offsetY <= 400){
                        window.style.height = 400 + 'px'
                    }else {
                        window.style.height = windowRect.height + offsetY + 'px'
                    }
                }
                let mouseUpHandler = () => {
                    this.changeCursorToDefault();
                    bottomBorder.style.height = null
                    document.onmousemove = null;
                    document.onmouseup = null;
                    document.onmousedown = null;
                    this.$emit("resize_end")
                }
                document.onmousemove = mouseMoveHandler;
                document.onmouseup = mouseUpHandler;
                document.onmousedown = null;
            },
            openMenu(e) {
                if (e.button === 2) {
                    let downX = e.clientX
                    let downY = e.clientY
                    let am = document.getElementById('app-menu')
                    am.style.left = downX + 'px'
                    am.style.top = downY + 'px'
                    console.log('left: ', am.style.left, 'top: ', am.style.top)
                    this.$store.commit('changeShowAppMenu', true)
                    window.onclick = () => {
                        this.$store.commit('changeShowAppMenu', false)
                        window.onclick = null
                    }
                }
            }
        }
    }
</script>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showControlPanel: false,
        showDesktopMenu: false,
        showAppMenu: false,
        windowList: [],
        focusedWindow: '',
        minimizedWindowList: [],
        maximizedWindowList: [],
        url: '',
        fullHeight: 0,
        fullWidth: 0,
        hidedSidebar: false,
        wallpaper: '',
    },
    mutations: {
        changeShowControlPanel(state, status) {
            state.showControlPanel = status
        },
        openWindow(state, window) {
            state.windowList.push(window)
            state.windowList[state.windowList.indexOf(window)].meta.maximized = false
        },
        closeWindow(state, id) {
            for (let i = 0; i < state.windowList.length; i++) {
                if (state.windowList[i].id === id) {
                    state.windowList.splice(i, 1)
                    break
                }
            }
            for (let i = 0; i < state.maximizedWindowList.length; i++) {
                if (state.maximizedWindowList[i] === id) {
                    state.maximizedWindowList.splice(i, 1)
                    break
                }
            }
            for (let i = 0; i < state.minimizedWindowList.length; i++) {
                if (state.minimizedWindowList[i] === id) {
                    state.minimizedWindowList.splice(i, 1)
                    break
                }
            }
            this.commit('hideSidebar', false)
            this.commit('refreshFocusInLastWindow')
        },
        minimizeWindow(state, id) {
            if (state.maximizedWindowList.indexOf(id) !== -1) {
                state.maximizedWindowList.splice(state.maximizedWindowList.indexOf(id), 1)
            }
            state.minimizedWindowList.push(id)
            this.commit('hideSidebar', false)
        },
        maximizeWindow(state, id) {
            if (state.minimizedWindowList.indexOf(id) !== -1) {
                state.minimizedWindowList.splice(state.minimizedWindowList.indexOf(id), 1)
            }
            for (let i = 0; i < state.windowList.length; i++) {
                if (state.windowList[i].id === id) {
                    state.windowList[i].meta.maximized = true
                }
            }
            state.maximizedWindowList.push(id)
            this.commit('hideSidebar', true)
        },
        restoreWindow(state, id) {
            let indexOfMax = state.maximizedWindowList.indexOf(id)
            let indexOfMin = state.minimizedWindowList.indexOf(id)
            if (indexOfMax !== -1) {
                state.maximizedWindowList.splice(indexOfMax, 1)
            } else if (indexOfMin !== -1) {
                state.minimizedWindowList.splice(indexOfMin, 1)
            }
            for (let i = 0; i < state.windowList.length; i++) {
                if (state.windowList[i].id === id) {
                    state.windowList[i].meta.maximized = false
                }
            }
            this.commit('hideSidebar', false)
        },
        refreshFullWindowSize(state, payload) {
            state.fullHeight = payload.h
            state.fullWidth = payload.w
        },
        hideSidebar(state, status) {
            state.hidedSidebar = status
        },
        refreshWindowFocused(state, id) {
            if (state.focusedWindow === id) {
                return
            } else {
                state.focusedWindow = id
            }
        },
        refreshFocusInLastWindow(state) {
            if (state.windowList.length === 0) {
                return
            }
            this.commit('refreshWindowFocused', state.windowList[state.windowList.length - 1].id)
        },
        changeBackground(state, wpId) {
            state.wallpaper = wpId
        },
        changeShowDesktopMenu(state, status) {
            state.showDesktopMenu = status
        },
        changeShowAppMenu(state, status) {
            state.showAppMenu = status
        }
    },
    actions: {},
    modules: {}
})

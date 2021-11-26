import {off, on, stop} from './dom.js'

class Display {

    constructor(mode, isShow, activeEle, emitEle, document) {
        this.mode = mode || 'click-click'
        this.activeEle = activeEle || null
        this.emitEle = emitEle || null
        this.document = document || window.document || null
        this.isShow = isShow || {value: false}

        this.activeX = 0
        this.activeY = 0
        this.deactiveX = 0
        this.deactiveY = 0

        this.doOpenBinding = this.doOpen.bind(this)
        this.doCloseBinding = this.doClose.bind(this)
        this.doToggleBinding = this.doToggle.bind(this)
        this.doClickBinding = this.doClick.bind(this)
    }

    doBind() {
        let activeEle = this.activeEle
        let emitEle = this.emitEle
        let document = this.document

        if (this.mode === 'click-click') {
            on(activeEle, 'click', stop)
            on(emitEle, 'click', this.doToggleBinding)
            on(document, 'click', this.doClickBinding)
        } else if (this.mode === 'click-hover') {
            on(activeEle, 'click', stop)
            on(emitEle, 'click', this.doOpenBinding)
            on(emitEle, 'mouseleave', this.doCloseBinding)
        } else if (this.mode === 'hover-click') {
            on(emitEle, 'mouseenter', this.doOpenBinding)
            on(activeEle, 'click', stop)
            on(emitEle, 'click', this.doCloseBinding)
            on(document, 'click', this.doClickBinding)
        } else if (this.mode === 'hover-hover') {
            on(emitEle, 'mouseenter', this.doOpenBinding)
            on(emitEle, 'mouseleave', this.doCloseBinding)
        } else if (this.mode === 'context-click') {
            on(emitEle, 'contextmenu', this.doOpenBinding)
            on(document, 'click', this.doClickBinding)
            on(document, 'contextmenu', this.doClickBinding)
        }
    }

    unBind() {
        let activeEle = this.activeEle
        let emitEle = this.emitEle
        let document = this.document

        if (this.mode === 'click-click') {
            off(activeEle, 'click', stop)
            off(emitEle, 'click', this.doToggleBinding)
            off(document, 'click', this.doClickBinding)
        } else if (this.mode === 'click-hover') {
            off(activeEle, 'click', stop)
            off(emitEle, 'click', this.doOpenBinding)
            off(emitEle, 'mouseleave', this.doCloseBinding)
        } else if (this.mode === 'hover-click') {
            off(emitEle, 'mouseenter', this.doOpenBinding)
            off(activeEle, 'click', stop)
            off(emitEle, 'click', this.doCloseBinding)
            off(document, 'click', this.doClickBinding)
        } else if (this.mode === 'hover-hover') {
            off(emitEle, 'mouseenter', this.doOpenBinding)
            off(emitEle, 'mouseleave', this.doCloseBinding)
        } else if (this.mode === 'context-click') {
            off(emitEle, 'contextmenu', this.doOpenBinding)
            off(document, 'click', this.doClickBinding)
            off(document, 'contextmenu', this.doClickBinding)
        }
    }

    doOpen(e) {
        if (e) {
            this.activeX = e.clientX || 0
            this.activeY = e.clientY || 0
        }
        this.isShow.value = true
    }

    doClose(e) {
        if (e) {
            this.deactiveX = e.clientX || 0
            this.deactiveY = e.clientY || 0
        }
        this.isShow.value = false
    }

    doToggle(e) {
        if (!this.isShow.value && e) {
            this.activeX = e.clientX || 0
            this.activeY = e.clientY || 0
        } else if (this.isShow.value && e) {
            this.deactiveX = e.clientX || 0
            this.deactiveY = e.clientY || 0
        }
        this.isShow.value = !(this.isShow.value)
    }

    doClick(e) {
        try {
            if (!this.activeEle ||
                !this.emitEle ||
                !this.activeEle.contains ||
                !this.emitEle.contains ||
                this.activeEle.contains(e.target) ||
                this.emitEle.contains(e.target)) {
                return
            }

            if (this.isShow.value) {
                if (e) {
                    this.deactiveX = e.clientX || 0
                    this.deactiveY = e.clientY || 0
                }
                this.isShow.value = false
            }
        } catch (error) {
            throw error
        }
    }

    clear() {
        this.mode = ''
        this.activeEle = null
        this.emitEle = null
        this.document = null
        this.isShow = null
        this.doOpenBinding = null
        this.doCloseBinding = null
        this.doToggleBinding = null
        this.doClickBinding = null
    }
}

export default Display

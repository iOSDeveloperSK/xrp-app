import PageView from './PageView'
import {HomeContentView, HomeButtonsView} from './home'

import Surface from 'famous/core/Surface'
import Modifier from 'famous/core/Modifier'
import Transform from 'famous/core/Transform'
import HeaderFooterLayout from 'famous/views/HeaderFooterLayout'
import Timer from 'famous/utilities/Timer'

const lineHeight = innerHeight * 0.12 - 20

export default class HomeView extends PageView {
    constructor(options) {
        super()

        const postitioningModifier = new Modifier({
            transform: () => Transform.translate(0, 0, -10 * this.progress.get()) 
        })

        const rotationModifier = new Modifier({
            transform: () => Transform.rotate(0, Math.PI / 6 * this.progress.get(), 0)
        })

        const layoutPositioningModifier = new Modifier({
            transform: Transform.translate(0, 0, 1)
        })

        const background = new Surface(this.options.background)
        const layout = new HeaderFooterLayout(this.options.layout)

        this.homeContentView = new HomeContentView(options)
        this.homeButtonsView = new HomeButtonsView()

        this.subscribe(layout.header  = new Surface(this.options.header))
        this.subscribe(layout.content = this.homeContentView)
        this.subscribe(layout.footer  = this.homeButtonsView)

        this.pipeThrough([
            'openInfoView',
            'openSendPaymentsView',
            'sharePublicKey',
            'qr:failed'
        ])

        const node = this.add(postitioningModifier).add(rotationModifier)
        node.add(background)
        node.add(layoutPositioningModifier).add(layout)

    }

    updateBalance(balance) {
        this.homeContentView.setBalance(balance)
    }

    hide() {
        super.hide()
    }

    focus() {
        super.focus()
    }
}

HomeView.DEFAULT_OPTIONS = {
    background: {
        classes: ['home-background']
    },
    header: {
        content: '<h1>XRP</h1>',
        classes: ['header', 'home-header'],
        properties: {
            lineHeight: lineHeight + 'px'
        }
    },
    layout: {
        headerSize: innerHeight * 0.12,
        footerSize: innerHeight * 0.09
    }
}


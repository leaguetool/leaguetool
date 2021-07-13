<template>
    <div class="nt__navbar" :class="{'fixed': fixed, 'transparent fixed': transparent}">
        <div class="nt__navbar-wrap flexbox flex-alignc vui__drag" :style="{'background': bgcolor, 'color': color, 'z-index': zIndex}">
            <!-- 标题 -->
            <div class="nt__navbar-title" :class="{'center': center}">
                <template v-if="$slots.title"><slot name="title" /></template>
                <template v-else>{{title}}</template>
            </div>
        </div>
        <WinBar :minimizable="minimizable" :maximizable="maximizable" :closable="closable">
            <slot name="wbtn" />
        </WinBar>
    </div>
</template>

<script>
import WinBar from './WinBar.vue'
export default {
    components: {
        WinBar
    },
    props: {
        // 标题
        title: { type: String, default: '' },
        // 标题颜色
        color: { type: String, default: '#fff' },
        // 背景颜色
        bgcolor: String,
        // 标题是否居中
        center: { type: [Boolean, String], default: false },
        // 是否固定
        fixed: { type: [Boolean, String], default: false },
        // 背景透明
        transparent: { type: [Boolean, String], default: false },
        // 设置层级
        zIndex: { type: [Number, String], default: '2021' },

        /**
         * WinBar组件参数
         */
        // 窗口是否可以最小化
        minimizable: { type: [Boolean, String], default: true },
        // 窗口是否可以最大化
        maximizable: { type: [Boolean, String], default: true },
        // 窗口是否可以关闭
        closable: { type: [Boolean, String], default: true },
    },
    setup() {
        return {
        }
    }
}
</script>
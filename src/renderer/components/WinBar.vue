<template>
    <div class="vui__winbtn flexbox flex-alignc">
        <div class="vui__winbtn-groups" :style="{'color': color}">
            <slot />
            <CloseOutlined />
            <a v-if="JSON.parse(minimizable)" class="wbtn" title="最小化" ><i class="iconfont icon-min"></i></a>
            <!-- <a v-if="JSON.parse(maximizable)&&winCfg.window.resize" class="wbtn" :title="hasMaximized ? '向下还原' : '最大化'" @click="handleWinMax2Min"><i class="iconfont" :class="hasMaximized ? 'icon-restore' : 'icon-max'"></i></a> -->
            <a v-if="JSON.parse(closable)" class="wbtn close" title="关闭" ><i class="iconfont icon-quit"></i></a>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        color: { type: String, default: '#fff' },
        // 窗口是否可以最小化
        minimizable: { type: [Boolean, String], default: true },
        // 窗口是否可以最大化
        maximizable: { type: [Boolean, String], default: true },
        // 窗口是否可以关闭
        closable: { type: [Boolean, String], default: true },
    }
}
</script>
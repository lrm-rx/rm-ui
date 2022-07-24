<template>
    <div :class="`rm-nav nav-${type}`">
        <ul class="clearfix">
            <MenuItem v-for="(item, index) in data" :key="index" :data="item" :type="type" :value="activeKey"
                @click="_click">
            </MenuItem>
        </ul>
    </div>
</template>
<script>
import MenuItem from './item.vue'

export default {
    name: `RmMenu`,
    data() {
        return {
            activeKey: this.value // 添加选中样式
        }
    },
    watch: {
        value(val) {
            this.activeKey = val
        },
        activeKey(val) {
            // 要将之前设置的父级的恢复
            this._resetActive(this.data)
            this._findParent(this.data, val)
        }
    },
    props: {
        data: Array,
        type: {
            type: String,
            default: 'h'
        },
        accordion: {
            type: Boolean,
            default: false
        },
        value: { // 当前激活菜单的key值
            type: String,
            default: ''
        },
        isOpen: { // 是否展开当肖激活菜单，仅在type=v有效
            type: Boolean,
            default: true
        },
        showTitle: {
            type: Boolean,
            default: false
        },
        click: Function
    },
    mounted() {
        this._findParent(this.data, this.value)
    },
    components: { MenuItem },
    methods: {
        _click(item) {
            console.log(item)
            if (!item.children) {
                // 如果有子级时，不能选
                this.activeKey = item.key || item.title // 设置当前选中key值
            }
            if (this.type === 'v' && item.children) {
                // 垂直方向时，点击展开/收起子级
                if (this.accordion) {
                    // 如果只能展开一项时，仅对一级栏目
                    let isFirst = false
                    this.data.forEach(data => {
                        if (JSON.stringify(item) === JSON.stringify(data)) {
                            isFirst = true
                        }
                    })
                    // 如果是一级栏目，关闭其它的
                    if (isFirst) {
                        this.data.forEach(data => {
                            if (JSON.stringify(data) !== JSON.stringify(item)) {
                                data.open = false
                            }
                        })
                    }
                }
                if (typeof item.open === 'undefined') {
                    this.$set(item, 'open', true)
                } else {
                    item.open = !item.open
                }
            }
            this.$emit('click', item)
            this.click && this.click(item)
        },
        _findParent(data, key, parent = []) {
            data.forEach(item => {
                if ((item.key || item.title) === key) {
                    // 将父级设置当前选中样式
                    if (typeof parent.isActive === 'undefined') {
                        this.$set(parent, 'isActive', true)
                    } else {
                        parent.isActive = true
                    }
                    // 将当前设置为展开，这里仅在第一次有用，后面点击时都已经是展开状态了
                    if (this.type === 'v' && this.isOpen) {
                        if (typeof parent.open === 'undefined') {
                            this.$set(parent, 'open', true)
                        } else {
                            parent.open = true
                        }
                    }
                    // 继续往上找
                    this._findParent(this.data, parent.key || parent.title, [])
                }
                if (item.children) {
                    this._findParent(item.children, key, item)
                }
            })
        },
        _resetActive(data) {
            data.forEach(item => {
                item.isActive = false
                if (item.children) {
                    this._resetActive(item.children)
                }
            })
        }
    },
}
</script>
<style lang="scss">
.rm-nav {
    .clearfix {
        &:after {
            content: "";
            clear: both;
            height: 0;
            line-height: 0;
            visibility: hidden;
            display: inline-block
        }
    }

    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        line-height: 40px;
        position: relative;

        >.nav-label {
            display: block;
            overflow: hidden;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            &:hover {
                background: #ecf5ff
            }

            .icon {
                margin-right: 5px;
                font-size: 18px;
            }
        }

        .has-child {
            >.nav-label {
                &::after {
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    width: 5px;
                    height: 5px;
                    border-top: 1px solid #999;
                    border-right: 1px solid #999;
                    margin: 0 2px;
                    -webkit-transform: rotate(135deg);
                    transform: rotate(135deg);
                    -webkit-transition: all .3s;
                    transition: all .3s;
                    position: relative;
                }
            }
        }

        .is-active {
            >.nav-label {
                color: #41a259;
            }
        }
    }

    .nav-v {
        width: 180px;

        li {
            >.nav-label {
                padding-left: 5px;
            }

            &::after {
                float: right;
                top: 15px;
                right: 10px;
            }

            .open {
                >.nav-label {
                    &::after {
                        -webkit-transform: rotate(-45deg);
                        transform: rotate(-45deg);
                    }
                }
            }

            .is-active-key {
                >.nav-label {
                    background: #ecf5ff;
                }
            }

            .child {
                padding-left: 15px;
            }

        }
    }

    .nav-h {
        >ul {
            >li {
                float: left;
                font-size: 16px;

                .nav-label {
                    padding: 0 15px;
                }

                >a {
                    font-size: 16px;
                }

                .is-active {
                    >.nav-label {
                        background: none;
                        color: #41a259;
                    }
                }

                >.child {
                    left: 0;
                    top: 38px;
                }
            }
        }

        .child {
            background: #fff;
            position: absolute;
            left: 103%;
            top: 0;
            width: 100%;
            -webkit-box-shadow: 0 0 5px #ddd;
            box-shadow: 0 0 5px #ddd;
            text-align: left;
            padding: 5px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            font-size: 14px;

            a {
                font-size: 14px;
            }
        }
    }
}
</style>


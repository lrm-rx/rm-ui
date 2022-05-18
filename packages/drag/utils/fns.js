// 判断传入的值是否为函数
export function isFunction(func) {
    return toString.call(func) === '[object Function]'
}

// 位移大小
export function snapToGrid(grid, pendingX, pendingY, scale = 1) {
    const [scaleX, scaleY] = typeof scale === 'number' ? [scale, scale] : scale
    const x = Math.round((pendingX / scaleX) / grid[0]) * grid[0]
    const y = Math.round((pendingY / scaleY) / grid[1]) * grid[1]
    return [x, y]
}

// 限制范围
export function restrictToBounds(value, min, max) {
    if (min !== null && value < min) {
        return min
    }

    if (max !== null && max < value) {
        return max
    }

    return value
}

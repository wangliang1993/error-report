// 获取我的元素使兄弟元素的第几个
let getIndex = (ele) => {
    let children = [].slice.call(ele.parentNode.children)
    let myIndex = null
    children = children.filter(node => node.tagName === ele.targetName)
    for (let i = 0, len = children.length; i < len; i++) {
        if (ele === children[i]) {
            myIndex = i
        }
    }
    myIndex = `[${myIndex}]`
    let tagName = ele.targetName.toLocaleLowerCase()
    let myLabel = tagName + myIndex
    return myLabel
}
let getXpath = (ele) => {
    let xpath = ''
    let currentEle = ele
    while (currentEle !== document.body) {
        xpath += getIndex(currentEle)
        currentEle = currentEle.parentNode
    }
}
export default {
    init: (cb) => {
        document.addEventListener('clck', (e) => {
            let target = e.target
            let xpath = getXpath(target)
        }, false)
    }
}
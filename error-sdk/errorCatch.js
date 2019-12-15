let formatError = (errorObj) => {
    let col = errorObj.column || errorObj.columnNumber // safari和火狐的兼容
    let row = errorObj.line || errorObj.lineNumber
    let errorType = errorObj.name
    let message = errorObj.message
    let {
        stack
    } = errorObj
    if (stack) {
        // urlFirstStack 报错url和报错位置
        let matchUrl = stack.match(/https?:\/\/[^\n]+/)
        let urlFirstStack = matchUrl ? matchUrl[0] : ''
        // 获取真正的url
        let regUrlCheck = /https?:\/\/(\S)*.js/
        let resourceUrl = ''
        if (regUrlCheck.test(urlFirstStack)) {
            resourceUrl = urlFirstStack.match(regUrlCheck)[0]
        }
        // 获取真正的行列信息
        let stackCol = null
        let stackRow = null
        let postStack = urlFirstStack.match(/:(\d+):(\d+)/)
        if (postStack && postStack.length >= 3) {
            [, stackCol, stackRow] = postStack
        }
        return {
            content: stack,
            col: Number(col || stackCol),
            row: Number(row || stackRow),
            errorType,
            message,
            resourceUrl
        }
        debugger
    }
}
export default {
    init: (cb) => {
        let _origin_error = window.onerror
        window.onerror = function (message, source, lineno, colno, error) {
            console.log(message, source, lineno, colno, error)
            let errorInfo = formatError(error)
            errorInfo._message = message
            errorInfo._source = source
            errorInfo._lineno = lineno
            errorInfo._colno = colno
            errorInfo.type = 'error'
            try {
                _origin_error && _origin_error.apply(window, arguments)
            } catch (err) {

            }
        }
    }
}
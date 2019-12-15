import Util from './util'
let resolvePerformanceResource = (resourceData) => {
    let r = resourceData
    let obj = {
        initiatorType: r.initiatorType,
        name: r.name,
        duration: r.duration,
        // 链接过程
        redirect: r.redirectEnd - r.redirectStart, // 重定向时间
        dns: r.domainLookupEnd - r.domainLookupStart, // DNS查找
        connect: r.connectEnd - r.connectStart, // TCP建连
        network: r.connectEnd - r.startTime, // 网络总耗时
        // 接收过程
        send: r.responseStart - r.requestStart, // 发送开始到接受的总时长
        receive: r.responseEnd - r.responseStart, // 接收总时长
        request: r.responseEnd - r.requestStart, // 接收总耗时
        // 核心指标
        ttfb: r.responseStart - r.requestStart, // 首字节时间

        // initiatorType: "script"
        // nextHopProtocol: "http/1.1"
        // workerStart: 0
        // redirectStart: 0
        // redirectEnd: 0
        // fetchStart: 40.6700000166893
        // domainLookupStart: 40.6700000166893
        // domainLookupEnd: 40.6700000166893
        // connectStart: 40.6700000166893
        // connectEnd: 40.6700000166893
        // secureConnectionStart: 0
        // requestStart: 43.08000020682812
        // responseStart: 46.09000007621944
        // responseEnd: 47.4500001873821
        // transferSize: 2537
        // encodedBodySize: 2310
        // decodedBodySize: 2310
        // serverTiming: []
        // name: "http://localhost:3003/js/error-report-sdk/bundle.umd.js"
        // entryType: "resource"
        // startTime: 40.6700000166893
        // duration: 6.7800001706928015
    }
    return obj
}
let resolveEntries = (entries, type) => entries.map(_ => {
    let obj = resolvePerformanceResource(_)
    obj.type = type
    return obj
})
export default {
    init: (cb) => {
        if (window.PerformanceObserver) {
            // 动态获取每一个资源信息
            let observer = new window.PerformanceObserver((list) => {
                try {
                    let entries = list.getEntries()
                    let entriesData = resolveEntries(entries, 'PerformanceObserver')
                    cb(entriesData)
                } catch (e) {
                    console.log(e)
                }
            })
            observer.observe({
                entryTypes: ['resource']
            })
        } else {
            Util.onLoad(() => {
                // 在onload之后获取所有获取资源信息
                let entries = performance.getEntries('resource', 'onLoad')
                let entriesData = resolveEntries(entries)
                cb(entriesData)
            })
        }
    }
}
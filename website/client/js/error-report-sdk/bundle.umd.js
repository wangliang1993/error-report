(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var perf = {
    init: cb => {
      let performance = window.performance;
      let isDomReady = false;
      let isOnLoad = false;
      let cycleTime = 10;
      let Util = {
        getPerfData: (perf) => {
          console.log(perf.domComplete);
          console.log(perf.loadEventEnd);
          let data = {
            // 网络建立链接
            prevPage: perf.fetchStart - perf.navigationStart, // 上一个界面的时间
            redirect: perf.redirectEnd - perf.redirectStart, // 重定向时间
            dns: perf.domainLookupEnd - perf.domainLookupStart, // DNS查找时间
            connect: perf.connectEnd - perf.connectStart, // TCP建链时间
            network: perf.connectStart - perf.navigationStart, // 网络总耗时
            // 网络接收
            send: perf.responseStart - perf.requestStart, // 前端从发送到接收的时间
            receive: perf.responseEnd - perf.responseStart, // 接收数据用时
            request: perf.responseEnd - perf.requestStart, // 请求用的时间总和
            // 前端渲染时间
            dom: perf.domComplete ? (perf.domComplete - perf.domLoading) : perf.domComplete, // dom解析时间
            loadEvent: perf.loadEventEnd - perf.loadEventStart, // loadEvent时间
            frontEnd: perf.loadEventEnd ? (perf.loadEventEnd - perf.domLoading) : perf.loadEventEnd, // 前端总时间
            // 关键阶段
            load: perf.loadEventEnd ? (perf.loadEventEnd - perf.navigationStart) : perf.loadEventEnd, // 页面完全加载时间
            domReady: perf.domContentLoadedEventStart - perf.navigationStart, // DOM准备时间
            interactive: perf.domInteractive - perf.navigationStart, // 可操作时间
            ttfb: perf.responseStart - perf.navigationStart // 首字节时间
          };
          return data
        },
        // DOM解析完成
        domReady: (callback) => {
          if (isDomReady) return void 0;
          let timer = null;
          let runCheck = () => {
            console.log(performance.timing.domInteractive);
            console.log(document.readyState);
            if (performance.timing.domInteractive) {
              // 停止循环检测，运行callback
              if (timer) {
                clearTimeout(timer);
              }
              callback();
              isDomReady = true;
            } else {
              // 再去循环检测
              timer = setTimeout(runCheck, cycleTime);
            }
          };
          if (document.readyState === 'interactive') {
            if (timer) {
              clearTimeout(timer);
            }
            callback();
            isDomReady = true;
            return void 0;
          }
          document.addEventListener('DOMContentLoaded', () => {
            // 开始循环检测 是否 DOMContentLoaded 已经完成
            runCheck();
          });
        },
        // 页面加载完成
        onLoad: (callback) => {
          if (isOnLoad) return void 0;
          let timer = null;
          let runCheck = () => {
            console.log(performance.timing.loadEventEnd);
            console.log(document.readyState);
            if (performance.timing.loadEventEnd) {
              // 停止循环检测，运行callback
              if (timer) {
                clearTimeout(timer);
              }
              callback();
              isOnLoad = true;
            } else {
              // 再去循环检测
              timer = setTimeout(runCheck, cycleTime);
            }
          };

          if (document.readyState === 'complete') {
            if (timer) {
              clearTimeout(timer);
            }
            callback();
            isOnLoad = true;
            return void 0;
          }
          window.addEventListener('load', () => {
            // 开始循环检测 是否 load 已经完成
            runCheck();
          });
        }
      };
      Util.domReady(() => {
        let perfData = Util.getPerfData(performance.timing);
        perfData.type = 'domReady';
        cb(perfData);
      });
      Util.onLoad(() => {
        let perfData = Util.getPerfData(performance.timing);
        perfData.type = 'onLoad';
        cb(perfData);
      });
    }
  };

  perf.init((perfData) => {
      // 获取
      let performance = window.performance;
      console.log(performance.timing);
      console.log("perf init");
      console.log(perfData);
  });

  console.log("h1 123");

  // navigationStart: 1575947985491   前一个网页卸载的时间    默认值：fetchStart
  // unloadEventStart: 1575947985519  前一个网页unload事件开始时间   默认值：0
  // unloadEventEnd: 1575947985519    前一个网页unload事件结束时间   默认值：0
  // redirectStart: 0                 重定向开始时间       默认值：0   需要同域的
  // redirectEnd: 0                   重定向结束时间       默认值：0
  // fetchStart: 1575947985495        开始请求网页时间（一定会有一个值）
  // domainLookupStart: 1575947985496   DNS查询的开始时间   默认值：fetchStart
  // domainLookupEnd: 1575947985496     DNS查询的结束时间   默认值：fetchStart
  // connectStart: 1575947985496        向服务器建立握手开始
  // connectEnd: 1575947985497          向服务器建立握手结束
  // secureConnectionStart: 0           安全握手开始（HTTPS使用）   默认值：0
  // requestStart: 1575947985497        向服务器发送请求开始
  // responseStart: 1575947985514       服务器返回数据开始
  // responseEnd: 1575947985515         服务器返回数据结束
  // domLoading: 1575947985521          解析DOM开始   document.readyState 为loading
  // domInteractive: 1575947985535      解析DOM结束   document.readyState 为interactive
  // domContentLoadedEventStart: 1575947985535    ContentLoaded开始
  // domContentLoadedEventEnd: 1575947985535      ContentLoaded结束
  // domComplete: 1575947985535                   文档解析完成 
  // loadEventStart: 1575947985535                Load事件发送前时间
  // loadEventEnd: 1575947985535                  Load事件发送后时间

})));

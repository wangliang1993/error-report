(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  let formatError = (errorObj) => {
      let col = errorObj.column || errorObj.columnNumber; // safari和火狐的兼容
      let row = errorObj.line || errorObj.lineNumber;
      let errorType = errorObj.name;
      let message = errorObj.message;
      let {
          stack
      } = errorObj;
      if (stack) {
          // urlFirstStack 报错url和报错位置
          let matchUrl = stack.match(/https?:\/\/[^\n]+/);
          let urlFirstStack = matchUrl ? matchUrl[0] : '';
          // 获取真正的url
          let regUrlCheck = /https?:\/\/(\S)*.js/;
          let resourceUrl = '';
          if (regUrlCheck.test(urlFirstStack)) {
              resourceUrl = urlFirstStack.match(regUrlCheck)[0];
          }
          // 获取真正的行列信息
          let stackCol = null;
          let stackRow = null;
          let postStack = urlFirstStack.match(/:(\d+):(\d+)/);
          if (postStack && postStack.length >= 3) {
              [, stackCol, stackRow] = postStack;
          }
          return {
              content: stack,
              col: Number(col || stackCol),
              row: Number(row || stackRow),
              errorType,
              message,
              resourceUrl
          }
      }
  };
  var errorCatch = {
      init: (cb) => {
          let _origin_error = window.onerror;
          window.onerror = function (message, source, lineno, colno, error) {
              console.log(message, source, lineno, colno, error);
              let errorInfo = formatError(error);
              errorInfo._message = message;
              errorInfo._source = source;
              errorInfo._lineno = lineno;
              errorInfo._colno = colno;
              errorInfo.type = 'error';
              try {
                  _origin_error && _origin_error.apply(window, arguments);
              } catch (err) {

              }
          };
      }
  };

  // 获取我的元素使兄弟元素的第几个
  let getIndex = (ele) => {
      let children = [].slice.call(ele.parentNode.children);
      let myIndex = null;
      children = children.filter(node => node.tagName === ele.targetName);
      for (let i = 0, len = children.length; i < len; i++) {
          if (ele === children[i]) {
              myIndex = i;
          }
      }
      myIndex = `[${myIndex}]`;
      let tagName = ele.targetName.toLocaleLowerCase();
      let myLabel = tagName + myIndex;
      return myLabel
  };
  let getXpath = (ele) => {
      let xpath = '';
      let currentEle = ele;
      while (currentEle !== document.body) {
          xpath += getIndex(currentEle);
          currentEle = currentEle.parentNode;
      }
  };
  var beh = {
      init: (cb) => {
          document.addEventListener('clck', (e) => {
              let target = e.target;
              let xpath = getXpath(target);
          }, false);
      }
  };

  // 统计代理
  // var Count = (function () {
  //     var img = new Image();
  //     // 返回统计函数
  //     return function (param) {
  //         // 请求统计字符串
  //         var str = 'http:// www.count.com/a.gif?';
  //         // 拼接请求字符串
  //         for (var i in param) {
  //             str += i + '=' + param[i];
  //         }
  //         // 发送统计请求
  //         img.src = str;
  //     }
  // })()

  // perf.init((perfData) => {
  //     // 获取
  //     let performance = window.performance
  //     console.log(performance.timing)
  //     console.log("perf init");
  //     console.log(perfData);
  // });

  // resource.init((resourceData) => {
  //     console.log('resource init', resourceData)
  // })

  // xhrHook.init((xhrHookData) => {
  //     console.log(xhrHookData.type, xhrHookData)
  // })

  beh.init((behData) => {
      console.log(behData);
  });

  errorCatch.init((errorData) => {
      console.log(errorData);
  });

  aa;

  // console.log("h1 123");

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

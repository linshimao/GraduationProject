// 全局方法

// 全局通知
// let message = (function (param) {
//   let startMes = function (param) {
//     let oDiv = document.createElement('div')
//     oDiv.innerHTML = 'fuck today'
//     oDiv.className = 'g-tips'
//     document.body.appendChild(oDiv)
//   }
//   let init = function () {
//     startMes()
//   }
//   return {
//     init
//   }
// })()

// const message = function (opt) {
//   let oDiv = document.createElement('div')
//   oDiv.innerHTML = opt.msg
//   oDiv.className = 'g-tips'
//   document.body.appendChild(oDiv)
//   setTimeout(function () {
//     let oDiv = document.querySelector('.g-tips')
//     document.body.removeChild(oDiv)
//   }, 1000)
// }
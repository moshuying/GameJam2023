/**
 * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔delay毫秒调用一次该函数
 * @param fn 执行函数
 * @param delay 时间间隔
 * @returns {Function}
 */
export function throttle(fn, delay) {
    var timer = null;
    var timeStamp = new Date().getTime();
    return function () {
        var context = this; //获取函数所在作用域this
        var args = arguments; //取得传入参数
        if (new Date().getTime() - timeStamp > delay) {
            timeStamp = new Date().getTime();
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
}

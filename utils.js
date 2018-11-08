// 接口
function Interface (name, methods) {
    this.methods = [];
    this.name = name;

    for (let i = 0, len = methods.length; i < len; i++) {
        this.methods.push(methods[i]);
    }
};

Interface.ensureImplements = function(object) {
    if (arguments.length < 2) {
        throw new Error('Function Interface.ensureImplements: 期望参数大于2');
    }

    for (let i = 1, len = arguments.length; i < len; i++) {
        let interface = arguments[i];
        let methods = interface.methods;

        for (let j = 0, len = methods.length; j < len; j++) {
            let method = object[methods[j]];
            if (!method || typeof method !== 'function') {
                throw new Error(`Function Interface.ensureImplements: 没有找到${methods[j]}方法！`)
            }
        }
    }
}

// 继承
function extend(subClass, superClass) {
    let Func = function () {};
    Func.prototype = superClass.prototype;
    subClass.prototype = new Func();

    subClass.prototype.constructor = subClass;
    subClass.superclass = superClass.prototype;

    if (superClass.prototype.constructor === Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}
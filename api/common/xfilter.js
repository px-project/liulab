/**
 * 过滤数据
 */
module.exports = (tarData, ...keys) => {
    if (Array.isArray(tarData)) {
        let result = tarData.map((item) => {
            return filter(item, ...keys);
        });
        return result;
    }

    if (tarData instanceof Object) {
        return filter(tarData, ...keys);
    }

    throw new Error('需要过滤的源数据必须是数组或对象');
};

// 过滤单个对象
function filter (obj, ...keys) {
    let result = {};
    for (let index in keys) {
        let key = keys[index];
        let value = obj[keys[index]];
        if (value) result[key] = value;
    }
    return result;
}

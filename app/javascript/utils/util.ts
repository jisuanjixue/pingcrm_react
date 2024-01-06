export const isUrl = (path: string): boolean => reg.test(path);

export const nameof = <T>(key: keyof T) => key;

export const isType = <T>(data: T, type: string) => {
  const typeObj = {
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Function]': 'function',
    '[object Date]': 'date', // Object.prototype.toString.call(new Date())
    '[object RegExp]': 'regExp',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
    '[object WeakMap]': 'weakMap',
    '[object Window]': 'window', // Object.prototype.toString.call(window)
    '[object Error]': 'error', // new Error('1')
    '[object Arguments]': 'arguments',
  };

  const name = Object.prototype.toString.call(data); // 借用Object.prototype.toString()获取数据类型
  const typeName = typeObj[name] || '未知类型'; // 匹配数据类型
  return typeName === type; // 判断该数据类型是否为传入的类型
};

// Dynamic exclusion attribute
export const removeProperty =
  (prop: any) =>
    ({ [prop]: _, ...rest }) =>
      rest;

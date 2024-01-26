import type { Rule } from 'antd/es/form';

export const idcardValidator = (): Rule => ({
  validator: (rule, value) => {
    if (!value) {
      return Promise.resolve();
    }

    const errorMessage = '身份证号不合法';

    if (value.length !== 18) {
      return Promise.reject(errorMessage);
    }

    const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (!reg.test(value)) {
      return Promise.reject(errorMessage);
    }

    // 将前17位加权因子保存在数组里
    // new Array()
    const idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

    // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
    const idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    // 用来保存前17位各自乖以加权因子后的总和
    let idCardWiSum = 0;

    for (let i = 0; i < 17; i += 1) {
      idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
    }
    // 计算出校验码所在数组的位置
    const idCardMod = idCardWiSum % 11;
    // 得到最后一位身份证号码
    const idCardLast = value.substring(17);

    // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
    if (idCardMod === 2) {
      if (idCardLast === 'X' || idCardLast === 'x') {
        return Promise.resolve();
      }
      return Promise.reject(errorMessage);
    }

    // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
    if (idCardLast === idCardY[idCardMod].toString()) {
      return Promise.resolve();
    }

    return Promise.reject(errorMessage);
  },
});

export const requriedRule = (required?: boolean | string, defaultMessage = '不能为空'): Rule => {
  let requriedMessage;
  if (required) {
    requriedMessage = defaultMessage;
    if (typeof required === 'string') requriedMessage = required;
  }
  return {
    required: !!requriedMessage,
    message: requriedMessage,
  };
};

export const genFormItemRules = (
  required?: boolean | string,
  defaultMessage = '不能为空',
  rules: Rule[] = [],
): Rule[] => [requriedRule(required, defaultMessage), ...rules];

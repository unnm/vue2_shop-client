import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文message
Vue.use(VeeValidate)

// 错误提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
  // 将英文提示信息修改成中文
  messages: {
    ...zh_CN.messages,
    is: field => `${field}必须与密码相同` // 修改内置规则的message，让确认密码和密码相同
  },
  // 将校验的field属性名映射成中文名称
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password2: '确认密码',
    isCheck: '协议'
  }
})

// 自定义校验规则
// 定义用户协议必须打勾同意
VeeValidate.Validator.extend('agree', {
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})

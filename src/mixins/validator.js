import Validator from 'async-validator'

const validatorMixin = {
  methods: {
    validate (form, callback, rulesName = 'rules') {
      try {
        const validator = new Validator(this.$data[rulesName])
        validator.validate(form, res => {
          callback(res)
        })
      } catch (e) {
        console.error(e, '初始化validator失败！')
      }
    },
    showErrMessage (res) {
      this.$message.error(res[0].message)
    }
  }
}

export default validatorMixin

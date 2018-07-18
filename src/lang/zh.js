export default {
  app: {
    title: '建筑设计平台',
    description: '一个连接甲方与设计师的平台'
  },
  words: {
    follow: '关注',
    cancelFollow: '取消关注',
    follower: '关注者',
    like: '赞',
    comment: '评论',
    published_at: '发布于'
  },
  forms: {
    signUp: {
      realName: '真实姓名',
      phone: '手机',
      password: '密码（至少 6 个字符）',
      confirmPassword: '确认密码',
      type: '您的身份',
      party: '甲方',
      designer: '设计师',
      signUpBtn: '立即加入',
      term: '您同意遵守本网站的《用户协议》及《隐私政策》',
      thirdParty: '其他注册方式',
      loginBtn: '已有账号登录',
      messages: {
        realName: '请输入真实姓名',
        phone: '请输入合法手机号',
        password: '密码长度在 6 到 25 个字符',
        type: '请选择您的身份',
        phoneIsRegistered: '该手机号已被注册'
      }
    },
    sendCode: {
      title: '安全验证',
      bodyTitle: '请验证电话号码',
      description: '我们将向下方输入的手机号码发送短信验证码。',
      phoneLabel: '电话号码',
      sendBtn: '发送验证码',
      cancelBtn: '返回',
      sendedDescription: '请输入验证码完成登录，接收验证码可能需要几分钟。',
      codeLabel: '验证码',
      confirmBtn: '通过验证',
      notReceived: '没有收到？',
      sendAgain: '再发一次',
      success: '发送成功',
      signUpSuccess: '注册成功',
      requireCode: '请输入验证码'
    },
    signIn: {
      phone: '手机号',
      password: '密码',
      signInBtn: '登录',
      phoneMessage: '请输入合法手机号',
      passwordMessage: '请输入密码，长度 6 到 25 个字符',
      forgetPassword: '忘记密码？',
      thirdParty: '其他登录方式',
      signUpBtn: '立即注册',
      signInSuccess: '登录成功'
    }
  },
  navbar: {
    searchPlaceholder: '搜索需求、设计师',
    home: '主页',
    favorite: '关注',
    order: '订单',
    message: '消息',
    notice: '通知',
    my: '我',
    signIn: '登录',
    signUp: '马上加入'
  },
  guide: {
    party: {
      title: '我是甲方',
      features: ['发布需求', '找设计师', '与专业人士交流', '关注他人动态']
    },
    designer: {
      title: '我是设计师',
      features: ['查找需求', '承接需求', '发布自己的作品动态', '关注他人动态']
    }
  },
  profile: {
    following: '关注',
    follower: '粉丝',
    viewHomePage: '查看个人主页'
  },
  publish: {
    placeholder: '发照片或者动态',
    photoBtn: '发照片',
    publishBtn: '发布'
  },
  actions: {
    publishRequirement: '发布需求',
    publishedRequirements: '已发布的需求',
    followingDesigners: '我的设计师'
  },
  errmsgs: {
    getUserInfoFailed: '获取用户信息失败，请刷新重试'
  }
}

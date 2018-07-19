const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  uid: state => state.user.userInfo.id,
  hasUserInfo: state => !!state.user.userInfo.id,
  isSignIn: state => !!state.user.userInfo.id,
  language: state => state.app.language
}
export default getters

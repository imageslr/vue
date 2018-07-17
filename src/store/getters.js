const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => !!state.user.userInfo.id,
  language: state => state.app.language
}
export default getters

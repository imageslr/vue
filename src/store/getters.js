const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  uid: state => state.user.userInfo.id,
  userType: state => state.user.userInfo.type,
  hasUserInfo: state => !!state.user.userInfo.id,
  isSignIn: state => !!state.user.userInfo.id,
  language: state => state.app.language,
  notifications: state => state.notification.notifications,
  threads: state => state.message.threads,
  messages: state => state.message.messages,
  participant: state => state.message.participant,
  designers: state => state.index.designers,
  works: state => state.index.works,
  projects: state => state.index.projects
}
export default getters

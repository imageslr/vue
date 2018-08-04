import Model from './model'

let User = new Model({
  id: null,
  type: '',
  name: '',
  avatar_url: '',
  title: '',
  introduction: '',
  follower_count: 0,
  following_count: 0,
  following: false
})

export default User

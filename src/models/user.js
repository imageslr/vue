import Model from './model'

let User = new Model({
  id: null,
  type: '',
  name: '',
  avatar_url: '',
  title: '',
  introduction: '',
  follower_num: 0,
  following_num: 0,
  is_following: false
})

export default User

import Model from './model'
import User from './user'

let Requirement = new Model({
  id: null,
  req_no: '',
  status: null,
  title: '',
  type: null,
  price: 0,
  tender_document_url: '',
  tender_description: '',
  supplement_at: '',
  supplement_document_url: '',
  supplement_description: '',
  max_apply_num: 0,
  reward_num: 0,
  reward_settings: [],
  can_open: 0,
  current_apply_num: 0,
  apply_due_date: '',
  sign_due_date: '',
  tender_date: '',
  answer_date: '',
  answer_content: '',
  favorite_num: 0,
  review_status: 0,
  created_at: '',
  user: User.parse(),
  is_favorite: false,
  can_apply: true,
  is_participating: false
})

export default Requirement

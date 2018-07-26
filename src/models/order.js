import Model from './model'

let PartyOrder = new Model({
  id: null,
  req_no: '',
  status: null,
  title: '',
  type: null,
  price: 0,
  actual_payment: 0,
  current_apply_num: 0,
  max_apply_num: 0,
  reward_num: 0,
  apply_due_date: '',
  sign_due_date: '',
  tender_date: '',
  current_tender_num: 0,
  review_status: 0,
  created_at: ''
})

// TODO
let DesignerOrder = new Model({
  id: null,
  req_no: '',
  status: null,
  title: '',
  type: null,
  price: 0,
  actual_payment: 0,
  max_apply_num: 0,
  reward_num: 0,
  current_apply_num: 0,
  apply_due_date: '',
  sign_due_date: '',
  tender_date: '',
  review_status: 0,
  created_at: ''
})

export { PartyOrder, DesignerOrder }

export const Project = {
  STATUS_CANCELED: 500, // 已取消
  STATUS_REVIEW_FAILED: 600, // 审核未通过
  STATUS_REVIEWING: 900, // 审核中
  STATUS_TENDERING: 1000, // 招标中
  STATUS_WORKING: 1100, // 作标中
  STATUS_COMPLETED: 1200 // 已完成
}

export const ProjectInvitation = {
  STATUS_NOT_VIEWED: 0, // 未查看
  STATUS_ACCEPTED: 1, // 已接受
  STATUS_DECLINED: 2 // 已拒绝
}

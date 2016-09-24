import Method from '../api/method'

export default {
  createReport: {
    uri: '/report_groups/:report_group_id/reports',
    method: Method.Post,
    wrap: (p) => ({ report: p })
  },
  updateReport: {
    uri: '/report_groups/:report_group_id/reports/:report_id/report_page',
    method: Method.Put,
    wrap: (p) => ({ report: p })
  }
};
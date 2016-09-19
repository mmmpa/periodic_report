import Method from '../api/method'

export default {
  createReportGroup: {
    uri: '/report_groups',
    method: Method.Post,
    wrap: (p) => ({ report_group: p })
  },
  updateReportGroup: {
    uri: '/report_groups/:id',
    method: Method.Put,
    wrap: (p) => ({ report_group: p })
  }
};
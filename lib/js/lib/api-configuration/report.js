import Method from '../api/method'

export default {
  createReport: {
    uri: '/report_groups/:reportGroupId/reports',
    method: Method.Post,
    wrap: (p) => ({ report: p })
  },
  updateReport: {
    uri: '/report_groups/:reportGroupId/reports/:reportId/report_page',
    method: Method.Put,
    wrap: (p) => {
      p.report_items = p.sections
      return { report_page: p }
    }
  }
}

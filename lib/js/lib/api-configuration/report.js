import Method from '../api/method'

export default {
  createReport: {
    uri: '/report_configurations/:reportConfigurationId/reports',
    method: Method.Post,
    wrap: (p) => ({ report: p })
  },
  updateReport: {
    uri: '/report_configurations/:reportConfigurationId/reports/:reportId/report_page',
    method: Method.Put,
    wrap: (p) => {
      p.report_section_configurations = p.sections
      return { report_page: p }
    }
  }
}

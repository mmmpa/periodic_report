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
      p.sections = p.sections.map(({ sectionId: section_id, raw }) => ({ section_id, raw }))
      return { report_page: p }
    }
  }
}

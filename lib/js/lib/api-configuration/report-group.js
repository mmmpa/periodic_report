import Method from '../api/method'

export default {
  createReportConfiguration: {
    uri: '/report_configurations',
    method: Method.Post,
    wrap: (p) => ({ report_configuration: p })
  },
  updateReportConfiguration: {
    uri: '/report_configurations/:id',
    method: Method.Put,
    wrap: (p) => ({ report_configuration: p })
  }
}
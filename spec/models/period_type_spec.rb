require 'rails_helper'

RSpec.describe PeriodType, type: :model do
  describe 'create typed periodic report' do
    it do
      period_type = create(:period_type)
      report = period_type.create_report!(attributes_for(:report))

      report = create(:report)
      report.update_body(raw: 'test1')
      periodic = report.update_body(raw: 'test2')
      report.reload
      report.put_period
      report.update_body(raw: 'test3')

      report.periodic_report_pages.reload
      expect(report.periodic_report_pages.first).to eq(periodic)

      period_type.reload

      p period_type.reports.to_sql
      p period_type.reports
      period_type.reports.each do |r|
        p r.type_id
      end
    end
  end
end

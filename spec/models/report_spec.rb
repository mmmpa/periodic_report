require 'rails_helper'

RSpec.describe Report, type: :model do
  before :all do
    @report = create(:report)
    @page1 = create(:report_page, report: @report)
    @page2 = create(:report_page, report: @report)
    @page3 = create(:report_page, report: @report)
    @page4 = create(:report_page, report: @report)
    @page5 = create(:report_page, report: @report)

    create(:period, report: @report, report_page: @page2)
    create(:period, report: @report, report_page: @page4)
  end

  after :all do
    Report.destroy_all
  end

  describe 'report body' do
    it { expect(@report.report_pages.first).to eq(@page5) }
    it { expect(@report.periodic_report_pages.first).to eq(@page4) }
  end

  describe 'update report' do
    it do
      report = create(:report)
      expect {
        report.update_body(raw: 'test')
      }.to change(report.report_pages, :count).by(1)
    end

    it 'not update with same attributes' do
      report = create(:report)
      report.update_body(raw: 'test')

      expect {
        report.update_body(raw: 'test')
      }.to change(report.report_pages, :count).by(0)
    end
  end

  describe 'create periodic report' do
    it do
      report = create(:report)
      report.update_body(raw: 'test1')
      periodic = report.update_body(raw: 'test2')
      report.put_period
      report.update_body(raw: 'test3')

      expect(report.periodic_report_pages.first).to eq(periodic)
    end
  end

end

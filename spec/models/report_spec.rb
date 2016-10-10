# == Schema Information
#
# Table name: reports
#
#  id                      :integer          not null, primary key
#  user_id                 :integer
#  report_configuration_id :integer
#  name                    :string           default(""), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#
# Indexes
#
#  index_reports_on_report_configuration_id  (report_configuration_id)
#  index_reports_on_user_id                  (user_id)
#

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
    it 'normal' do
      report = create(:report)
      section_id = report.report_section_configurations.first.id
      expect {
        report.update_body(sections: [{section_id: section_id, raw: 'test'}])
      }.to change(report.report_pages, :count).by(1)
    end

    describe 'not update with same attributes' do
      it do
        report = create(:report)
        section_id = report.report_section_configurations.first.id
        report.update_body(sections: [{section_id: section_id, raw: 'test'}])

        expect {
          report.update_body(sections: [{section_id: section_id, raw: 'test'}])
        }.to change(report.report_pages, :count).by(0)
      end


      it do
        report = create(:report, report_configuration: create(:report_configuration, report_section_configurations: [
          build(:report_section_configuration),
          build(:report_section_configuration),
        ]))

        ids = report.report_section_configurations.ids

        report.update_body(sections: [
          {section_id: ids.first, raw: 'text1'},
          {section_id: ids.second, raw: 'text2'},
        ])

        report.reload
        report.put_period

        expect {
          report.update_body(sections: [
            {section_id: ids.first, raw: 'text1'},
            {section_id: ids.second, raw: 'text2'},
          ])
        }.to change(report.report_pages, :count).by(0)
      end
    end
  end

  describe 'create periodic report' do
    it do
      report = create(:report)
      section_id = report.report_section_configurations.first.id
      report.update_body(sections: [{section_id: section_id, raw: 'test1'}])
      report.update_body(sections: [{section_id: section_id, raw: 'test2'}])
      report.reload
      report.put_period
      periodic = report.periodic_report_pages.first
      report.update_body(sections: [{section_id: section_id, raw: 'test3'}])

      report.periodic_report_pages.reload
      expect(report.periodic_report_pages.first.id).to eq(periodic.id)
    end
  end
end

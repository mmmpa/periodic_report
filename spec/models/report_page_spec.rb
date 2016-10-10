# == Schema Information
#
# Table name: report_pages
#
#  id         :integer          not null, primary key
#  report_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_report_pages_on_report_id  (report_id)
#

require 'rails_helper'

RSpec.describe ReportPage, type: :model do
  it do
    expect {
      create(:report_page, raw: 'test1')
    }.to change(ReportSection, :count).by(1)
  end

  it do
    report = create(:report, report_configuration: create(:report_configuration, report_section_configurations: [
      build(:report_section_configuration, name: 'test1'),
      build(:report_section_configuration, name: 'test2'),
    ]))

    ids = report.report_section_configurations.ids

    expect {
      create(:report_page, raw: [
        {item_id: ids.first, raw: 'text1'},
        {item_id: ids.second, raw: 'text2'},
      ])
    }.to change(ReportSection, :count).by(2)
  end


  it do
    report = create(:report, report_configuration: create(:report_configuration, report_section_configurations: [
      build(:report_section_configuration, name: 'test1'),
      build(:report_section_configuration, name: 'test2'),
    ]))

    ids = report.report_section_configurations.ids

    expect {
      create(:report_page, raw: [
        {item_id: ids.first, raw: 'text1'},
        {item_id: 0, raw: 'text2'},
      ])
    }.to change(ReportSection, :count).by(1)
  end
end

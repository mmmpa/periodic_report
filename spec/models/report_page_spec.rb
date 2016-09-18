require 'rails_helper'

RSpec.describe ReportPage, type: :model do
  it do
    expect {
      create(:report_page, raw: 'test1')
    }.to change(ReportPageChip, :count).by(1)
  end

  it do
    report = create(:report, report_group: create(:report_group, report_items: [
      build(:report_item, name: 'test1'),
      build(:report_item, name: 'test2'),
    ]))

    ids = report.report_items.ids

    expect {
      create(:report_page, raw: [
        {item_id: ids.first, raw: 'text1'},
        {item_id: ids.second, raw: 'text2'},
      ])
    }.to change(ReportPageChip, :count).by(2)
  end


  it do
    report = create(:report, report_group: create(:report_group, report_items: [
      build(:report_item, name: 'test1'),
      build(:report_item, name: 'test2'),
    ]))

    ids = report.report_items.ids

    expect {
      create(:report_page, raw: [
        {item_id: ids.first, raw: 'text1'},
        {item_id: 0, raw: 'text2'},
      ])
    }.to change(ReportPageChip, :count).by(1)
  end
end

require 'rails_helper'

RSpec.describe ReportPage, type: :model do
  it do
    page = ReportPage.new
    page.raw = 'test'
    expect {
      page.save!
      p page.report_page_chips.reload
    }.to change(ReportPageChip, :count).by(1)
  end
end

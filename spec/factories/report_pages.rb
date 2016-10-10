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

FactoryGirl.define do
  factory :report_page do
    report { Report.first || create(:report) }
  end
end

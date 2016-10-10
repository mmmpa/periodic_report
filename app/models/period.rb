# == Schema Information
#
# Table name: periods
#
#  id             :integer          not null, primary key
#  report_id      :integer
#  report_page_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_periods_on_report_id       (report_id)
#  index_periods_on_report_page_id  (report_page_id)
#

class Period < ApplicationRecord
  belongs_to :report
  belongs_to :report_page
end

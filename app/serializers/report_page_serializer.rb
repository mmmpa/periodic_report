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

class ReportPageSerializer < ActiveModel::Serializer
  attributes :id
end

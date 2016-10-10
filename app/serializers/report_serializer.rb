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

class ReportSerializer < ActiveModel::Serializer
  attributes :id, :name, :report_configuration_id
  has_many :periodic_report_pages
end

# == Schema Information
#
# Table name: report_sections
#
#  id                              :integer          not null, primary key
#  report_page_id                  :integer
#  report_section_configuration_id :integer
#  raw                             :text             default(""), not null
#  html                            :text             default(""), not null
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#
# Indexes
#
#  index_report_sections_on_report_page_id                   (report_page_id)
#  index_report_sections_on_report_section_configuration_id  (report_section_configuration_id)
#

class ReportSectionSerializer < ActiveModel::Serializer
  attributes :raw, :section_id

  def section_id
    object.report_section_configuration_id
  end
end

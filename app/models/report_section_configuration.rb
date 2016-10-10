# == Schema Information
#
# Table name: report_section_configurations
#
#  id                      :integer          not null, primary key
#  report_configuration_id :integer
#  name                    :string           default(""), not null
#  root                    :boolean          default(FALSE), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#
# Indexes
#
#  index_report_section_configurations_on_report_configuration_id  (report_configuration_id)
#

class ReportSectionConfiguration < ApplicationRecord
  belongs_to :report_configuration, inverse_of: :report_section_configurations
  has_many :report_sections, inverse_of: :report_section_configuration

  validates :report_configuration, presence: true
end

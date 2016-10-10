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

FactoryGirl.define do
  factory :report_section_configuration do
    name { SecureRandom.hex(4) }
    report_configuration { ReportConfiguration.first || create(:report_configuration) }
  end
end

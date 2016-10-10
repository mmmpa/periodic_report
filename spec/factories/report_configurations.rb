# == Schema Information
#
# Table name: report_configurations
#
#  id         :integer          not null, primary key
#  name       :string           default(""), not null
#  timing     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :report_configuration do
    name { SecureRandom.hex(4) }
    report_section_configurations { [build(:report_section_configuration, report_configuration: nil)] }
    timing 1
  end
end

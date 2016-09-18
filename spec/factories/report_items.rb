FactoryGirl.define do
  factory :report_item do
    name { SecureRandom.hex(4) }
    report_group { ReportGroup.first || create(:report_group) }
  end
end

FactoryGirl.define do
  factory :report do
    report_group { ReportGroup.first || create(:report_group) }
    name { SecureRandom.hex(4) }
    user { User.first || create(:user) }
  end
end

FactoryGirl.define do
  factory :report_page do
    report { Report.first || create(:report) }
  end
end

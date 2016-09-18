FactoryGirl.define do
  factory :report_page_chip do
    raw { SecureRandom.hex(4) }
    report_page { create(:report_page) }
  end
end

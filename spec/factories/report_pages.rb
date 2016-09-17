FactoryGirl.define do
  factory :report_page do
    raw { SecureRandom.hex(4) }
  end
end

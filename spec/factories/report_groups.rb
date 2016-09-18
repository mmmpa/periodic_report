FactoryGirl.define do
  factory :report_group do
    name { SecureRandom.hex(4) }
    timing 1
  end
end

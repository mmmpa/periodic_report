FactoryGirl.define do
  factory :period_type do
    name { SecureRandom.hex(4) }
    timing { 1 }
  end
end

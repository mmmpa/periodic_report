FactoryGirl.define do
  factory :user do
    name { SecureRandom.hex(4) }
    provider { SecureRandom.hex(4) }
    uid { SecureRandom.hex(4) }
    oauth_token { SecureRandom.hex(4) }
  end
end

FactoryGirl.define do
  factory :report do
    name { SecureRandom.hex(4) }
    user { User.first || create(:user) }
  end
end

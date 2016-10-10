# == Schema Information
#
# Table name: users
#
#  id          :integer          not null, primary key
#  name        :string
#  provider    :string
#  uid         :text
#  oauth_token :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :user do
    name { SecureRandom.hex(4) }
    provider { SecureRandom.hex(4) }
    uid { SecureRandom.hex(4) }
    oauth_token { SecureRandom.hex(4) }
  end
end

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

class User < ApplicationRecord

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      user.name = auth['info']['nickname']
      user.oauth_token = auth['credentials']['token']
    end
  end
end

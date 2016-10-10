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

require 'rails_helper'

RSpec.describe User, type: :model do
end

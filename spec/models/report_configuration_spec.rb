# == Schema Information
#
# Table name: report_configurations
#
#  id         :integer          not null, primary key
#  name       :string           default(""), not null
#  timing     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe ReportConfiguration, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

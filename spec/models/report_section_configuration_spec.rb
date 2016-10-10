# == Schema Information
#
# Table name: report_section_configurations
#
#  id                      :integer          not null, primary key
#  report_configuration_id :integer
#  name                    :string           default(""), not null
#  root                    :boolean          default(FALSE), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#
# Indexes
#
#  index_report_section_configurations_on_report_configuration_id  (report_configuration_id)
#

require 'rails_helper'

RSpec.describe ReportSectionConfiguration, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end

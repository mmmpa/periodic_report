# == Schema Information
#
# Table name: report_sections
#
#  id                              :integer          not null, primary key
#  report_page_id                  :integer
#  report_section_configuration_id :integer
#  raw                             :text             default(""), not null
#  html                            :text             default(""), not null
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#
# Indexes
#
#  index_report_sections_on_report_page_id                   (report_page_id)
#  index_report_sections_on_report_section_configuration_id  (report_section_configuration_id)
#

class ReportSection < ApplicationRecord
  include MarkdownRenderer


  belongs_to :report_page, inverse_of: :report_sections
  belongs_to :report_section_configuration, inverse_of: :report_sections

  validates :raw, :html, presence: true

  before_validation -> { render_as_markdown! }

  def save(*)
    raise CannotUpdate if persisted?
    super
  end

  def as_json(options = {})
    super(
      only: [:id, :raw, :html]
    ).merge!(
       name: report_section_configuration.name,
       section_id: report_section_configuration.id
    )
  end

  class CannotUpdate < StandardError
  end
end

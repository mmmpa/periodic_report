# == Schema Information
#
# Table name: report_pages
#
#  id         :integer          not null, primary key
#  report_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_report_pages_on_report_id  (report_id)
#

class ReportPage < ApplicationRecord
  belongs_to :report, inverse_of: :report_pages
  has_many :report_section_configurations, through: :report
  has_many :report_sections, -> { order(report_section_configuration_id: :asc) }, inverse_of: :report_page

  attr_accessor :sections

  class << self
    def compare_and_create!(page, attributes)
      return create!(attributes) if page.nil?

      new_page = new(attributes)
      attributes.delete(:sections).map do |section|
        report_section_configuration_id = section.delete(:section_id)
        new_page.report_section_configurations.find(report_section_configuration_id)
        new_page.report_sections.build(section.merge!(report_section_configuration_id: report_section_configuration_id))
      end

      if new_page == page
        page
      else
        new_page.tap { |n| n.save! }
      end
    end
  end

  def ==(page)
    return false if page.nil?
    self.raw == page.raw
  end

  def raw=(values)
    if String === values
      return report_sections.build(raw: values, report_section_configuration_id: report_section_configurations.first.id)
    end

    ids = report_sections.ids
    Array(values).each do |value|
      next unless ids.include?(value[:item_id])
      report_sections.build(raw: value[:raw], report_section_configuration_id: value[:item_id])
    end
  end

  def raw
    report_sections.map(&:raw).join
  end

  def html
    report_sections.map(&:html).join
  end

  def save
    raise CannotUpdate if persisted?
  end

  class CannotUpdate < StandardError
  end
end

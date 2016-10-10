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

class ReportConfiguration < ApplicationRecord
  DAY_OF_WEEK = [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]

  attr_accessor :items

  has_many :reports, inverse_of: :report_configuration
  has_many :report_section_configurations, inverse_of: :report_configuration

  validates :name, presence: true
  validate :validate_timing

  before_validation :insert_items
  after_initialize :initialize_state

  def initialize_state
    self.name ||= ''
    self.timing ||= DAY_OF_WEEK.first
    report_section_configurations.build(root: true) if report_section_configurations.empty?
  end

  def insert_items
    return true if items.nil?
    root = nil
    now_items = report_section_configurations.to_a
    new_items =items.map do |params|
      item = if params[:id].present?
               now_items.find { |i| i.id == params[:id] }
             else
               report_section_configurations.build
             end
      root = true if params[:root].present?
      item.assign_attributes(params)
      item.save if persisted?
      item
    end

    if root
      self.report_section_configurations = new_items
    else
      errors.add(:report_section_configurations, :root_required)
    end
  end

  def validate_timing
    errors.add(:timing, :invalid) if !day_of_week? && !day?
  end

  def day_of_week?
    DAY_OF_WEEK.include?(timing.to_s.to_sym)
  end

  def day?
    n = timing.to_s.to_i
    1 <= n && n <= 31
  end

  def as_json(options = {})
    {
      id: id,
      name: name,
      timing: timing,
      # for not saved records, not use association methods like select.
      report_section_configurations: report_section_configurations.map { |i| {id: i.id, name: i.name, root: i.root} }
    }
  end
end

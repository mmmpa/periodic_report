class ReportGroup < ApplicationRecord
  DAY_OF_WEEK = [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]

  attr_accessor :items

  has_many :reports, inverse_of: :report_group
  has_many :report_items, inverse_of: :report_group

  validates :name, presence: true
  validate :validate_timing

  after_initialize :initialize_state

  def initialize_state
    self.name ||= ''
    self.timing ||= DAY_OF_WEEK.first
    report_items.build(name: :no_name, root: true) if report_items.empty?
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
      report_items: report_items.map { |i| {id: i.id, name: i.name, root: i.root}}
    }
  end
end

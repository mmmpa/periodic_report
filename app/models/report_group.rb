class ReportGroup < ApplicationRecord
  DAY_OF_WEEK = [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]

  has_many :reports, inverse_of: :report_group
  has_many :report_items, inverse_of: :report_group

  validates :name, presence: true
  validate :validate_timing

  before_validation :check_report_items_or_add

  def check_report_items_or_add
    report_items.build(name: :no_name) if report_items.empty?
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
end

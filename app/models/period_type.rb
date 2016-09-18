class PeriodType < ApplicationRecord
  DAY_OF_WEEK = [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]

  has_many :periods, inverse_of: :period_type
  has_many :periodics, inverse_of: :period_type
  has_many :reports, -> (r) {select("reports.*, #{r.id} as type_id")}, through: :periodics

  validates :name, :timing, presence: true
  validate :validate_timing

  def create_report!(*args)
    reports.create!(*args)
  end

  def validate_timing
    errors.add(:timing, :invalid) if !day_of_week? && !day?
  end

  def day_of_week?
    DAY_OF_WEEK.include?(timing.to_sym)
  end

  def day?
    n = timing.to_s.to_i
    1 <= n && n <= 31
  end
end

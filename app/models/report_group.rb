class ReportGroup < ApplicationRecord
  DAY_OF_WEEK = [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]

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

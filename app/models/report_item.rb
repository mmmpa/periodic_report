class ReportItem < ApplicationRecord
  belongs_to :report_group, inverse_of: :report_items

  validates :report_group, presence: true
end

class ReportItem < ApplicationRecord
  belongs_to :report_group, inverse_of: :report_items
  has_many :report_page_chips, inverse_of: :report_item

  validates :report_group, presence: true
end

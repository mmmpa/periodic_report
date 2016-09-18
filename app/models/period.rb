class Period < ApplicationRecord
  belongs_to :report
  belongs_to :report_page
  belongs_to :period_type
end

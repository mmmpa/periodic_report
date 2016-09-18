class Periodic < ApplicationRecord
  belongs_to :report
  belongs_to :period_type
end

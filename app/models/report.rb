class Report < ApplicationRecord
  belongs_to :user
  has_many :report_pages, -> { order(created_at: :desc) }, inverse_of: :report, dependent: :destroy
  has_many :periods, inverse_of: :report, dependent: :destroy
  has_many :periodic_report_pages, -> { order(created_at: :desc) },
           class_name: ReportPage, through: :periods, source: :report_page

  validates :name, presence: true

  # report では泣く report_page を更新する
  # report_page は update されず、常に create される。
  def update_body(attributes)
    attributes.merge!(report: self)
    ReportPage.compare_and_create!(body, attributes)
  end

  def body
    report_pages.first
  end

  def put_period
    periods.create!(report_page: report_pages.first)
  end
end

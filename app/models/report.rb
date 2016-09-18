class Report < ApplicationRecord
  belongs_to :user
  has_many :report_pages, -> { order(created_at: :desc) }, inverse_of: :report, dependent: :destroy
  has_many :periods, inverse_of: :report, dependent: :destroy
  has_many :periodic_report_pages, -> { order(created_at: :desc) },
           class_name: ReportPage, through: :periods, source: :report_page

  validates :name, presence: true
  validate :validate_timing

  class << self
    def differ
      @differ ||= Markdiff::Differ.new
    end
  end

  def update_body(attributes)
    attributes.merge!(report: self)
    ReportPage.compare_and_create!(body, attributes)
  end

  def body
    report_pages.first || report_pages.build
  end

  def previous_body
    periodic_report_pages.first || report_pages.second || report_pages.build
  end

  def put_period
    periods.create!(report_page: report_pages.first)
  end

  def diff(base = previous_body.html)
    self.class.differ.render(base, body.html).to_html
  end

  def diff_by_id(id = previous_body.id)
    diff(report_pages.find(id).html)
  end
end

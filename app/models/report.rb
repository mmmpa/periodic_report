# == Schema Information
#
# Table name: reports
#
#  id                      :integer          not null, primary key
#  user_id                 :integer
#  report_configuration_id :integer
#  name                    :string           default(""), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#
# Indexes
#
#  index_reports_on_report_configuration_id  (report_configuration_id)
#  index_reports_on_user_id                  (user_id)
#

class Report < ApplicationRecord
  belongs_to :user

  belongs_to :report_configuration, inverse_of: :reports
  has_many :report_section_configurations, through: :report_configuration

  has_many :report_pages, -> { order(created_at: :desc) }, inverse_of: :report, dependent: :destroy
  has_many :periods, inverse_of: :report, dependent: :destroy
  has_many :periodic_report_pages, -> { order(created_at: :desc) },
           class_name: ReportPage, through: :periods, source: :report_page

  validates :name, :report_configuration, presence: true

  class << self
    def differ
      @differ ||= Markdiff::Differ.new
    end
  end

  def update_body(attributes)
    ReportPage.compare_and_create!(body, {report: self}.merge!(attributes).deep_symbolize_keys!)
    self
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
    diff(report_pages.find_by(id: id).try(:html))
  end

  def as_json(options = {})
    super(
      methods: [:report_section_configurations],
      only: [:id, :name, :report_configuration_id]
    ).merge!(
       sections: body.report_sections
    )
  end
end

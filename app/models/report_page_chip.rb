class ReportPageChip < ApplicationRecord
  include MarkdownRenderer


  belongs_to :report_page, inverse_of: :report_page_chips
  belongs_to :report_item, inverse_of: :report_page_chips

  validates :raw, :html, presence: true

  before_validation -> { render_as_markdown! }

  def save(*)
    raise CannotUpdate if persisted?
    super
  end

  class CannotUpdate < StandardError
  end
end
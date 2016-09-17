class ReportPage < ApplicationRecord
  include MarkdownRenderer

  belongs_to :report, inverse_of: :report_pages

  validates :raw, :html, :report, presence: true

  before_validation -> { render_as_markdown! }

  class << self
    def compare_and_create!(page, attributes)
      return create!(attributes) if page.nil?

      new_page = new(attributes)

      if new_page.same?(page)
        page
      else
        new_page.tap { |n| n.save! }
      end
    end
  end

  def same?(page)
    raw == page.raw
  end

  def save
    raise CannotUpdate if persisted?
  end

  class CannotUpdate < StandardError
  end
end

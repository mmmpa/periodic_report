class ReportPage < ApplicationRecord
  belongs_to :report, inverse_of: :report_pages
  has_many :report_page_chips, inverse_of: :report_page

  after_save :save_report_page_chips!

  class << self
    def compare_and_create!(page, attributes)
      return create!(attributes) if page.nil?

      new_page = new(attributes)

      if new_page == page
        page
      else
        new_page.tap { |n| n.save! }
      end
    end
  end

  def ==(page)
    return true if page.nil?
    self.raw == page.raw
  end

  def raw=(value)
    report_page_chips.build(raw: value)
  end

  def save_report_page_chips!
    report_page_chips.each(&:save!)
  end

  def raw
    report_page_chips.pluck(:raw).join
  end

  def save
    raise CannotUpdate if persisted?
  end

  class CannotUpdate < StandardError
  end
end

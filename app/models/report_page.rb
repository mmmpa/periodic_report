class ReportPage < ApplicationRecord
  belongs_to :report, inverse_of: :report_pages
  has_many :report_page_chips, ->{order(report_item_id: :asc)}, inverse_of: :report_page

  after_initialize :initialize_state

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

  def initialize_state
    if report_page_chips.empty?
      report.report_items.each do |report_item|
        report_page_chips.build(report_item: report_item)
      end
    end
  end


  def ==(page)
    return false if page.nil?
    self.raw == page.raw
  end

  def raw=(values)
    if String === values
      return report_page_chips.build(raw: values, report_item_id: report_items.first.id)
    end

    ids = report_items.ids
    Array(values).each do |value|
      next unless ids.include?(value[:item_id])
      report_page_chips.build(raw: value[:raw], report_item_id: value[:item_id])
    end
  end

  def raw
    report_page_chips.map(&:raw).join
  end

  def html
    report_page_chips.map(&:html).join
  end

  def save
    raise CannotUpdate if persisted?
  end

  class CannotUpdate < StandardError
  end
end

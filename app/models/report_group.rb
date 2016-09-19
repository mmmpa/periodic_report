class ReportGroup < ApplicationRecord
  DAY_OF_WEEK = [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]

  attr_accessor :items

  has_many :reports, inverse_of: :report_group
  has_many :report_items, inverse_of: :report_group

  validates :name, presence: true
  validate :validate_timing

  before_validation :insert_items
  after_initialize :initialize_state

  def initialize_state
    self.name ||= ''
    self.timing ||= DAY_OF_WEEK.first
    report_items.build(root: true) if report_items.empty?
  end

  def insert_items
    root = nil
    now_items = report_items.all
    new_items = (items || []).map do |params|
      item = if params[:id].present?
               now_items.find { |i| i.id == params[:id] }
             else
               report_items.build
             end
      root = true if params[:root].present?
      item.assign_attributes(params)
      item.save if persisted?
      item
    end

    if root
      self.report_items = new_items
    else
      errors.add(:report_items, :root_required)
    end
  end

  def validate_timing
    errors.add(:timing, :invalid) if !day_of_week? && !day?
  end

  def day_of_week?
    DAY_OF_WEEK.include?(timing.to_s.to_sym)
  end

  def day?
    n = timing.to_s.to_i
    1 <= n && n <= 31
  end

  def as_json(options = {})
    {
      id: id,
      name: name,
      timing: timing,
      # for not saved records, not use association methods like select.
      report_items: report_items.map { |i| {id: i.id, name: i.name, root: i.root} }
    }
  end
end

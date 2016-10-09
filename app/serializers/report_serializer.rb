class ReportSerializer < ActiveModel::Serializer
  attributes :id, :name, :report_group_id
  has_many :periodic_report_pages
end

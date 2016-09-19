module ApplicationHelper
  def detect_method
    case action_name.to_sym
      when :new, :create
        :post
      when :edit, :update
        :patch
      else
        :post
    end
  end

  def detect_path(record)
    detect_method == :post ? reports_path : report_path(record)
  end

  def report_group_name
    ReportGroup.find(params[:report_group_id]).name
  end
end

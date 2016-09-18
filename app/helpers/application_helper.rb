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
end

class ReportPagesController < ApplicationController
  def update
    report.update_body(report_page_params)
    render json: report, root: false, status: 200
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors}, status: 400
  end

  private

  def report_page_params
    params.require(:report_page).permit(sections: [:section_id, :raw])
  end
end

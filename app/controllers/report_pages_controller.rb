class ReportPagesController < ApplicationController
  def update
    report.update_body(report_page_params)
    redirect_to edit_report_path(report)
  rescue ActiveRecord::RecordInvalid => e
    @report = report
    @report_body = e.record
    render 'report/edit'
  end

  private

  def report_page_params
    params.require(:report_page).permit(:raw)
  end
end

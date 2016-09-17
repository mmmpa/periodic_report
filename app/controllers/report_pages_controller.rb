class ReportPagesController < ApplicationController
  def update
    report.update_body(params)
    redirect_to report_path(report)
  rescue ActiveRecord::RecordInvalid => e
    @report = report
    @report_body = e.record
    render 'report/edit'
  end

  private

  def params
    params.require(:report_page).permit(:raw)
  end
end

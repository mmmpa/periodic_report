class ReportsController < ApplicationController
  def index
    @reports = Report.all
  end

  def show
    @report = report
  end

  def new
    @report = Report.new
  end

  def edit
    @report = report
  end

  def create
    :create
    newer = Report.create!(report_params)
    redirect_to edit_report_path(newer)
  rescue ActiveRecord::RecordInvalid => e
    @report = e.record
    render :new
  end

  def update
    report.update!(report_params)
    redirect_to edit_report_path(report)
  rescue ActiveRecord::RecordInvalid => e
    @report = e.record
    render :edit
  end

  def destroy
    report.destroy
    redirect_to reports_path
  end

  private

  def report_params
    params.require(:report).permit(:name)
  end
end

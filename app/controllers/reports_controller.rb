class ReportsController < ApplicationController
  def index
    @reports = Report.all
  end

  def show
    @report = report
  end

  def new
    @record = Report.new
  end

  def edit
    @record = report
  end

  def create
    newer = Report.create!(params)
    redirect_to report_path(newer)
  rescue ActiveRecord::RecordInvalid => e
    @record = e.record
    render :new
  end

  def update
    report.update!(params)
    redirect_to report_path(report)
  rescue ActiveRecord::RecordInvalid => e
    @record = e.record
    render :edit
  end

  def destroy
    report.destroy
    redirect_to reports_path
  end

  private

  def params
    params.require(:report).permit(:name)
  end
end

class ReportsController < ApplicationController
  def index
    @reports = report_configuration.reports
  end

  def show
    @report = report
  end

  def new
    @report = report_configuration.reports.build
  end

  def edit
    @report = report
  end

  def create
    newer = report_configuration.reports.create!(report_params)
    render json: newer, status: 200
  rescue ActiveRecord::RecordInvalid => e
    @report = e.record
    render json: {errors: e.record.errors}, status: 400
  end

  def update
    report.update!(report_params)
    render json: report, status: 200
  rescue ActiveRecord::RecordInvalid => e
    @report = e.record
    render json: {errors: e.record.errors}, status: 400
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

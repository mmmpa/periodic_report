class ReportConfigurationsController < ApplicationController
  def index
    @report_configurations = ReportConfiguration.all
  end

  def show
    @report_configuration = report_configuration
  end

  def new
    @report_configuration = ReportConfiguration.new
  end

  def edit
    @report_configuration = report_configuration
  end

  def create
    newer = ReportConfiguration.create!(report_configuration_params)
    render json: newer, status: 200
  rescue ActiveRecord::RecordInvalid => e
    @report_configuration = e.record
    render json: {errors: e.record.errors}, status: 400
  end

  def update
    report_configuration.update!(report_configuration_params)
    render json: report_configuration, status: 200
  rescue ActiveRecord::RecordInvalid => e
    @report_configuration = e.record
    render json: {errors: e.record.errors}, status: 400
  end

  def destroy
    report_configuration.destroy
    redirect_to report_configurations_path
  end

  private

  def report_configuration
    ReportConfiguration.find(params[:report_configuration_id])
  end

  def report_configuration_params
    params.require(:report_configuration).permit(:name, :timing, items: [:name, :root, :id])
  end
end

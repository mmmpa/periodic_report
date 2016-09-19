class ReportGroupsController < ApplicationController
  def index
    @report_groups = ReportGroup.all
  end

  def show
    @report_group = report_group
  end

  def new
    @report_group = ReportGroup.new
  end

  def edit
    @report_group = report_group
  end

  def create
    newer = ReportGroup.create!(report_group_params)
    render json: newer, status: 200
  rescue ActiveRecord::RecordInvalid => e
    @report_group = e.record
    render json: {errors: e.record.errors}, status: 400
  end

  def update
    report_group.update!(report_group_params)
    render json: report_group, status: 200
  rescue ActiveRecord::RecordInvalid => e
    @report_group = e.record
    render json: {errors: e.record.errors}, status: 400
  end

  def destroy
    report_group.destroy
    redirect_to report_groups_path
  end

  private

  def report_group
    ReportGroup.find(params[:report_group_id])
  end

  def report_group_params
    params.require(:report_group).permit(:name, :timing, items: [:name, :root, :id])
  end
end

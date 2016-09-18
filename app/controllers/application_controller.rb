class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authorize_or_redirect
  layout 'portal'

  private

  def authorize_or_redirect
    redirect_to root_path unless authorized?
  end

  def current_user
    return unless session[:user_id]
    @_current_user ||= User.find(session[:user_id])
  end

  def authorized?
    !!session[:user_id]
  end

  def report
    report_group.reports.find(params[:report_id])
  end

  def report_group
    ReportGroup.find(params[:report_group_id])
  end
end

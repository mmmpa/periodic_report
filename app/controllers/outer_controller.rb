class OuterController < ApplicationController
  skip_before_filter :authorize_or_redirect, only: :index
  before_action :redirect_authorized_user, only: :index

  def index
    authorized?
  end

  private

  def redirect_authorized_user
    redirect_to portal_path if authorized?
  end
end

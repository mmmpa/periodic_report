Rails.application.routes.draw do
  get 'portal' => 'portal#index'

  resources :report_groups, param: :report_group_id, except: :show do
    member do
      resources :reports, param: :report_id do
        member do
          resource :report_page, only: :update
        end
      end
    end
  end

  get 'auth/:provider/callback', to: 'sessions#callback'
  delete '/out', to: 'sessions#destroy', as: :out

  root 'outer#index'
end

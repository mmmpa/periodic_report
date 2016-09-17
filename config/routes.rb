Rails.application.routes.draw do
  get 'portal' => 'portal#index'
  resources :reports, param: :report_id
  resources :report_pages, param: :report_id, only: :update

  get 'auth/:provider/callback', to: 'sessions#callback'
  delete '/out', to: 'sessions#destroy', as: :out

  root 'outer#index'
end

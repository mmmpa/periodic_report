Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#callback'
  delete '/out', to: 'sessions#destroy', as: :out

  root 'portal#index'
end

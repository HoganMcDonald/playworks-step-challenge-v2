Rails.application.routes.draw do
  devise_for :users

  root to: 'home#index', as: :authenticated_root

  get '/login', to: 'home#index'
  get '/signup', to: 'home#index'
  get '/forgot-password', to: 'home#index'
  get '/reset-password', to: 'home#index'
  get '/team', to: 'home#index'

  resources :contests, only: [:index, :show, :create]
  resources :teams, only: [:index, :update]
end

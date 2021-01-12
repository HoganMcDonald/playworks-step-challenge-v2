Rails.application.routes.draw do
  devise_for :users

  root to: 'home#index', as: :authenticated_root

  get '/login', to: 'home#index'
  get '/signup', to: 'home#index'
  get '/forgot-password', to: 'home#index'
  get '/reset-password', to: 'home#index'
  get '/team/home', to: 'home#index'
  get '/team', to: 'home#index'
  get '/steps', to: 'home#index'
  get '/post', to: 'home#index'
  get '/rules', to: 'home#index'

  put '/upload-avatar', to: 'avatar#upload_avatar'

  resources :contests, only: [:index, :show, :create], defaults: { format: :json }
  resources :teams, only: [:index, :update, :create], defaults: { format: :json }
  resources :steps, only: [:create], defaults: { format: :json }
  resources :posts, only: [:create]
end

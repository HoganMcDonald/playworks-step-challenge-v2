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
  get '/admin', to: 'home#index'
  get '/archive/:contest_id', to: 'home#index'

  put '/upload-user-avatar', to: 'avatar#upload_user_avatar'
  put '/upload-team-avatar', to: 'avatar#upload_team_avatar'

  resources :contests, only: [:index, :show, :create], defaults: { format: :json }
  resources :teams, only: [:show, :index, :update, :create], defaults: { format: :json }
  resources :steps, only: [:create, :destroy], defaults: { format: :json }
  resources :posts, only: [:show, :create, :destroy]
  resources :challenges, only: [:create, :destroy]
  resources :content, only: [:create]
end

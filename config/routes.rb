Rails.application.routes.draw do
  devise_for :users

  get '/login', to: 'home#index'
  get '/signup', to: 'home#index'
  get '/forgot-password', to: 'home#index'

  authenticated :user do
    root to: 'home#index', as: :authenticated_root
    # get '/example', to: 'home#index'
  end

  root to: redirect('/login')
end

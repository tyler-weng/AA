Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :bands, only: [:index, :create, :new, :edit, :show, :update, :destroy]
  resources :albums, only: [:create, :new, :edit, :show, :update, :destroy]
  resources :tracks, only: [:create, :new, :edit, :show, :update, :destroy]
  resources :notes, only: [:create, :destroy]
  root 'application#scrape_reddit'
end

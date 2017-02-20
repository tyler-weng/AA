Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :subs, only: [:new, :create, :destroy, :edit, :update, :index, :show]
  resources :posts, only: [:new, :create, :destroy, :edit, :update, :show] do
    resources :comments, only: [:new, :create, :show]
  end



end

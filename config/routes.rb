Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :budgets, only: [:index, :create, :update, :destroy]
      resources :budget_entries, only: [:create, :update, :destroy]
      resources :users, only: [:show, :update, :destroy]
    end
  end
end

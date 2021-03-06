Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :budgets, only: [:index, :create, :update, :destroy]
      resources :budget_entries, only: [:index, :create, :destroy]
      resources :users, only: [:show, :update, :destroy]
      get '/current_user', to: 'current_user#index'
    end
  end

end

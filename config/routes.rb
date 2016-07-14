Rails.application.routes.draw do
  root 'static_pages#root'
  resources :sounds, only: :index
end

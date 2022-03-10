class Budget < ApplicationRecord
  has_many :budget_entries, dependent: :destroy
  validates :name, presence: true, allow_blank: false
end

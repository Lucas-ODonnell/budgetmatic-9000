class Budget < ApplicationRecord
  has_many :budget_entries, dependent: :destroy
  belongs_to :user
  validates :name, presence: true, allow_blank: false
end

class Budget < ApplicationRecord
  has_many :budget_entries, dependent: :destroy
  belongs_to :user
  validates :name, presence: true, allow_blank: false

  def set_total
    budget_entries = BudgetEntry.where(budget_id: self.id)
    total = 0
    budget_entries.each { |entry| total += entry.price }
    self.total_cost = total
  end
end

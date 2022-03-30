class Budget < ApplicationRecord
  has_many :budget_entries, dependent: :destroy
  belongs_to :user
  validates :name, presence: true, allow_blank: false

  def monthly_budget=(val="0")
    if val.include?(".") 
      write_attribute :monthly_budget, val.gsub(/\D/, "").to_i
    else
      write_attribute :monthly_budget, val.gsub(/\D/, "").to_i * 100
    end
  end

end

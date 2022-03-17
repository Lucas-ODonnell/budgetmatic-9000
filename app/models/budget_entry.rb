class BudgetEntry < ApplicationRecord
  belongs_to :budget
  validates :category, :name, :date, presence: true, allow_blank: false
  validates :price, presence: true, allow_blank: true

  before_create :format_category

  def price=(val)
    if val.include?(".") 
      write_attribute :price, val.gsub(/\D/, "").to_i
    else
      write_attribute :price, val.gsub(/\D/, "").to_i * 100
    end
  end

  def format_category
    self.category = self.category.capitalize
  end

  
end

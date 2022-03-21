class BudgetEntry < ApplicationRecord
  belongs_to :budget
  belongs_to :user
  validates :category, :name, :date, presence: true, allow_blank: false
  validates :price, presence: true, allow_blank: true
  before_create :format_category

  scope :this_month, -> { where('date >= ? AND date <= ?', Time.current.beginning_of_month, Time.current.end_of_month) }
  scope :filter_date_range, lambda {|start_date, end_date| where("date >= ? AND date <= ?", start_date, end_date )}
  scope :filter_category, lambda {|category| where("category = ?", category)}

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


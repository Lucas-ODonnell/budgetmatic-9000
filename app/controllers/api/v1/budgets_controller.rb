module Api
  module V1
    class BudgetsController < ApplicationController
      before_action :authenticate_user!
      def index
        budget = Budget.where(user_id: current_user.id).first
        budget.set_total
        render json: BudgetSerializer.new(budget).serializable_hash.to_json
      end

      def create
        budget = Budget.new(budget_params)
        budget.user_id = current_user.id
        if budget.save
          render json: BudgetSerializer.new(budget).serializable_hash.to_json
          else
          render json: budget.errors.full_messages, status: 422
        end
      end

      def update
        budget = Budget.find(params[:id])
        if budget.update(budget_params)
          render json: BudgetSerializer.new(budget).serializable_hash.to_json
          else
          render json: budget.errors.full_messages, status: 422
        end
      end

      def destroy
        budget = Budget.find(params[:id])
        if budget.destroy
          head :no_content
          else
          render json: budget.errors.full_messages, status: 422
        end
      end

      private

      def budget_params
        params.require(:budget).permit(:name)
      end
    end
  end
end

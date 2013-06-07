class UsersController < ApplicationController
  def new
  	@User = User.new
  end
  def create
  	@User = User.new(user[:params])
  	@User.save

end

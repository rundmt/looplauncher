class ProjectsController < ApplicationController
  def index
  	@projects = Project.all
  end

  def new
  	@project = Project.new(params[:project])
  	if @project.save
      render :show
    else
      render :new
    end
  end

  def show
  	@project = Project.new(params[:id])
  end

  def delete
  end
end

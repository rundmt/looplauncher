class SoundsController < ApplicationController
  def index
    @sounds = Sound.all
  end

  def new
  	@file_name = Sound.store(params['upload'])
    sound = Sound.new(:sound_file => @file_name)
    sound.save
    render :index
  end

  def remove

  end
end

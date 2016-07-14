class SoundsController < ApplicationController
  def index
    @sounds = Sound.all
  end
end

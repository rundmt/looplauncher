class Project < ActiveRecord::Base
  belongs_to :user
  attr_accessible :name, :user_id

	validates :name, :presence => true

  has_many :sounds
end

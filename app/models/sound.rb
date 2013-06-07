class Sound < ActiveRecord::Base
  belongs_to :project
  attr_accessible :bpm, :sound_file

   def self.store(upload)
    name =  upload['datafile'] # this just seems to return a name even though below it's used to write my entire sound file????
    directory = "public/audios"
    # create the file path
    path = File.join(directory, name)
    # write the file
    File.open(path, "wb") { |f| f.write(upload['datafile']) }
    return name
  end

end

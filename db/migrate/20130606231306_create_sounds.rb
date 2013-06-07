class CreateSounds < ActiveRecord::Migration
  def change
    create_table :sounds do |t|
      t.text :sound_file
      t.float :bpm
      t.references :project

      t.timestamps
    end
    add_index :sounds, :project_id
  end
end

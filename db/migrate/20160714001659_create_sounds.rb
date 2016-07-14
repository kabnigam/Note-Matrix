class CreateSounds < ActiveRecord::Migration
  def change
    create_table :sounds do |t|
      t.string :name, null: false
      t.string :url, null: false

      t.timestamps null: false
    end
  end
end

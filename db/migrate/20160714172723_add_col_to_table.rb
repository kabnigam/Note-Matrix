class AddColToTable < ActiveRecord::Migration
  def change
    add_column :sounds, :instrument, :string
  end
end

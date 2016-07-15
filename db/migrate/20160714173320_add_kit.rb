class AddKit < ActiveRecord::Migration
  def change
    add_column :sounds, :kit, :string
  end
end

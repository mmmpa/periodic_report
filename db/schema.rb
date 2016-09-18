# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160918035034) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "period_types", force: :cascade do |t|
    t.string   "name",                     null: false
    t.string   "timing",     default: "0"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "periodics", force: :cascade do |t|
    t.integer  "report_id"
    t.integer  "period_type_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["period_type_id"], name: "index_periodics_on_period_type_id", using: :btree
    t.index ["report_id"], name: "index_periodics_on_report_id", using: :btree
  end

  create_table "periods", force: :cascade do |t|
    t.integer  "report_id"
    t.integer  "report_page_id"
    t.integer  "period_type_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["period_type_id"], name: "index_periods_on_period_type_id", using: :btree
    t.index ["report_id"], name: "index_periods_on_report_id", using: :btree
    t.index ["report_page_id"], name: "index_periods_on_report_page_id", using: :btree
  end

  create_table "report_pages", force: :cascade do |t|
    t.integer  "report_id"
    t.text     "raw",        default: "", null: false
    t.text     "html",       default: "", null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["report_id"], name: "index_report_pages_on_report_id", using: :btree
  end

  create_table "reports", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name",       default: "", null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["user_id"], name: "index_reports_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "provider"
    t.text     "uid"
    t.string   "oauth_token"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

end

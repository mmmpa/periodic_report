FactoryGirl.define do
  factory :memo do
    report nil
    raw "MyText"
    html "MyText"
    freezed false
  end
end

FactoryBot.define do
  factory :group do
    name {Faker::JapaneseMedia::DragonBall.character}
  end
end
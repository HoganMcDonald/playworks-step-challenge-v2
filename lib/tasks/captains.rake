desc "Sets captain on existing teams."
task backfill_captains: :environment do
  Team.all.each do |team|
    captain = team.users.first
    team.update! captain: captain
    p '.'
  end

  puts 'added captains to teams'
end

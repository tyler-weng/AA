fishes = ['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish',
         'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh']

def n_squared_search(fishes)
  longest_fish = nil
  (0...fishes.length - 1).each do |i|
    (i + 1...fishes.length).each do |j|
      max_fish = [fishes[i], fishes[j]].sort { |f1, f2| f1.length - f2.length }.last
      longest_fish = max_fish if longest_fish.nil? || max_fish.length > longest_fish.length
    end
  end

  longest_fish
end

puts "n_squared_search"
puts n_squared_search(fishes)

def log_n_quick_sort(fishes, &prc)
  return fishes if fishes.length < 2

  prc ||= proc { |x, y| x <=> y }

  pivot = fishes.first
  left, right = fishes[1..-1].partition{ |fish| prc.call(fish, pivot)}

  log_n_quick_sort(left) + [pivot] + log_n_quick_sort(right)
end

def log_n_quick_search(fishes)
  prc = proc { |x, y| y.length - x.length }
  log_n_quick_sort(fishes, &prc).first
end

puts "log_n_search"
puts log_n_quick_search(fishes)

def n_search(fishes)
  longest_fish = fishes.first

  (1...fishes.length).each do |i|
    longest_fish = fishes[i] if fishes[i].length > longest_fish.length
  end

  longest_fish
end

tiles_array = ["up", "right-up", "right", "right-down", "down",
              "left-down", "left",  "left-up" ]

def linear_search(dir, tiles_array)
  (0...tiles_array.length).each { |i| return i if dir == tiles_array[i] }
end

puts "n search"
puts linear_search("up", tiles_array) == 0
puts linear_search("right-down", tiles_array) == 3

def constant_search(dir, tiles_hash)
  tiles_hash = {}
  tiles_array = ["up", "right-up", "right", "right-down", "down",
                "left-down", "left",  "left-up" ]

  tiles_array.each.with_index do |dir, i|
    tiles_hash[dir] = i
  end

  tiles_hash[dir]
end

puts "constant search"
puts constant_search("up", tiles_array) == 0
puts constant_search("right-down", tiles_array) == 3

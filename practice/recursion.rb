def pascal(depth)
  return [[1]] if depth == 1

  rows = pascal(depth - 1)
  prior = rows.last
  rows << (prior.map.with_index { |_, i| i == 0 ? 1 : prior[i] + prior[i-1] } << 1 )
end

puts "pascal TC"
puts pascal(1) == [[1]]
puts pascal(2) == [[1], [1, 1]]
puts pascal(4) == [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]

def factorial(n)
  return [1, 1][0, n] if n < 3

  prior = factorial(n - 1)

  prior + [(n - 1) * prior.last]
end

puts "factorial TC"
puts factorial(1) == [1]
puts factorial(4) == [1, 1, 2, 6]
puts factorial(6) == [1, 1, 2, 6, 24, 120]

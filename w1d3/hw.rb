def sum_to(n)
  return nil if n < 0
  n == 0 ? 0 : n + sum_to(n - 1)
end

p "-" * 36
p "sum_to(n) Test cases"
p sum_to(5) == 15  # => returns 15
p sum_to(1) == 1 # => returns 1
p sum_to(9) == 45 # => returns 45
p sum_to(-8) == nil # => returns nil

def add_numbers(nums_array)
  nums_array.empty? ? nil : _add_numbers(nums_array)
end

def _add_numbers(nums_array)
  nums_array.empty? ? 0 : nums_array.shift + _add_numbers(nums_array)
end

# Test Cases
p "-" * 36
p "add_numbers(nums_array) Test cases"
p add_numbers([1,2,3,4]) == 10# => returns 10
p add_numbers([3]) == 3# => returns 3
p add_numbers([-80,34,7]) == -39# => returns -39
p add_numbers([]) == nil# => returns nil

def gamma_fnc(n)
  return nil if n < 1
  factorial(n - 1)
end

def factorial(n)
  n == 0 ? 1 : n * factorial(n - 1)
end

# Test Cases
p "-" * 36
p "gamma_fnc(n) Test cases"
p gamma_fnc(0) == nil  # => returns nil
p gamma_fnc(1) == 1  # => returns 1
p gamma_fnc(4) == 6  # => returns 6
p gamma_fnc(8) == 5040 # => returns 5040

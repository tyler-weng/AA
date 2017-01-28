require "byebug"

class RecursionMachine

  # Implement a method that finds the sum of the first n
  # fibonacci numbers recursively. Assume n > 0
  def fibs_sum(n)
    return n if n <= 2
    1 + fibs_sum(n-2) + fibs_sum(n-1)
  end

  #returns all subsets of an array
  def subsets(array)
    return [[]] if array.empty?
    el = array.pop
    subs = subsets(array)
    subs.concat(subs.map {|sub| sub + [el]})
  end


  # return the sum of the first n even numbers recursively. Assume n > 0
  def first_even_numbers_sum(n)
    return n * 2 if n == 1
    n*2 + first_even_numbers_sum(n-1)
  end

  # return b^n recursively. Your solution should accept negative values
  # for n
  def exponent(b, n)
    return 1 / exponent(b, n.abs).to_f if n < 0
    return 1 if n == 0
    return b if n == 1
    b* exponent(b, n-1)
  end

  # make better change problem from class
  def make_better_change(value, coins)
    return [] if coins.min > value
    combos = []
    coins.each do |coin|
      lessercoins = coins.select{|c| c <= coin && c <= value}
      bestcoin = lessercoins.max
      combos << [bestcoin] + make_better_change(value - bestcoin, lessercoins)
    end
    combos.sort {|c1, c2| c1.length - c2.length}.first
  end

  #deep dup question from class
  def deep_dup(arr)
    arr.map {|el| el.is_a?(Array) ? deep_dup(el) : el}
  end

  # Write a recursive method that takes in a string to search and a key string.
  # Return true if the string contains all of the characters in the key
  # in the same order that they appear in the key.
  #
  # string_include_key?("cadbpc", "abc") => true
  # string_include_key("cba", "abc") => false
  def string_include_key?(string, key)
    return false if string.length == 0
    return true if key.length == 0
    remaining_key = string[0] == key[0] ? key[1..-1] : key
    string_include_key?(string[1..-1], remaining_key)
  end

  # Write a recursive function that returns the prime factorization of
  # a given number. Assume num > 1
  #
  # prime_factorization(12) => [2,2,3]
  def prime_factorization(num)
    return [num] if is_prime?(num)
    pot_divisor = 2
    until num % pot_divisor == 0
      pot_divisor += 1
    end
    [pot_divisor] + prime_factorization(num / pot_divisor)
  end

  def is_prime?(num)
    return false if num < 2
    (2...num).none? {|i| num % i == 0 }
  end

  # Write a method, `digital_root(num)`. It should Sum the digits of a positive
  # integer. If it is greater than 10, sum the digits of the resulting number.
  # Keep repeating until there is only one digit in the result, called the
  # "digital root". **Do not use string conversion within your method.**
  #
  # You may wish to use a helper function, `digital_root_step(num)` which performs
  # one step of the process.

  def digital_root(num)
    return num if num < 10
    result = num
    until result < 10
      result = result % 10
    end
    digital_root(result)

    # result = digital_root(num % 10) + num / 10
    # result = digital_root(result) if result >= 10
    # result
  end

  # Write a recursive method that takes in a base 10 number n and
  # converts it to a base b number. Return the new number as a string
  #
  # E.g. base_converter(5, 2) == "101"
  # base_converter(31, 16) == "1f"

  def base_converter(num, b)
    keys = ('0'..'9').to_a + ('a'..'z').to_a[0,b]
    return '' if num <= 0
    base_converter(num / b, b) + keys[num % b]
  end

  # CHALLENGE: Eight queens puzzle precursor
  #
  # Write a recursive method that generates all 8! possible unique ways to
  # place eight queens on a chess board such that no two queens are in
  # the same board row or column (the same diagonal is OK).
  #
  # Each of the 8! elements in the return array should be an array of positions:
  # E.g. [[0,0], [1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7]]
  #
  # My solution used 3 method parameters: current_row, taken_columns, and
  # positions so far
  def eight_queens_possibilities(current_row, taken_columns, positions)
    positions = [] if positions.nil?
    return [[]] if current_row > 3
    # p current_row
    # p taken_columns
    # p positions

    available_columns = (0..3).to_a - taken_columns
    positions << [] if current_row == 0
    available_columns.each do |col|
      positions.first << [current_row, col]
      positions.concat(eight_queens_possibilities(current_row+1,
          taken_columns+[col], positions))
    end
    positions
    # eight_queens_possibilities(current_row + 1, new_taken_columns, new_positions)
  end

end

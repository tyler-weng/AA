class Array
  def my_each(&prc)
    i = 0
    while i < self.length
      prc.call(self[i])
      i += 1
    end
    self
  end

  def my_select(&prc)
    selected = []
    self.my_each { |el| selected << el if prc.call(el) }
    selected
  end

  def my_reject(&prc)
    self - self.my_select(&prc)
  end

  def my_any(&prc)
    self.my_each do |el|
      return true if prc.call(el)
    end
    false
  end

  def my_all(&prc)
    self.my_each do |el|
      return false unless prc.call(el)
    end
    true
  end

  def my_flatten
    flattened = []
    self.each do |el|
      flattened = el.is_a?(Array) ? flattened + el.my_flatten : flattened << el
    end
    flattened
  end

  def my_zip(*arrs)
    zipped = Array.new(self.length) { Array.new }
    self.each.with_index do |el, i|
      zipped[i] << self[i]
      arrs.each do |arr|
        zipped[i] << arr[i]
      end
    end
    zipped
  end

  def my_rotate(num = 1)
    rotated = self.dup
    times = num % self.length
    (0...times).each do |i|
      rotated = rotated[1..-1] << rotated[0]
    end
    rotated
  end

  def my_join(joiner = "")
    self.each.reduce("") { |acc, nx| acc + nx + joiner }
  end

  def my_reverse
    reversed = []
    self.each_index do |i|
      reversed << self[self.length - 1 - i]
    end
    reversed
  end

  def my_map(&prc)
    mapped = []
    self.each do |el|
      mapped << prc.call(el)
    end
    mapped
  end

  def my_inject(*accum, &prc)
    acc = accum.first || self.first
    start_index = accum.length != 0 ? 0 : 1
    self[start_index..-1].each do |el|
      acc = prc.call(acc, el)
    end
    acc
  end

end

def factors(num)
  factors = []
  1.upto(num) do |i|
    factors << i if num % i == 0
  end
  factors
end

def sub_words(str, dictionary)
  sub_words = []
  (0...str.length) do |i|
    (i...str.length) do |j|
      sub_words << str[i..j] if dictionary.include?(str[i..j])
    end
  end
  sub_words.uniq
end

def doubler(arr)
  arr.map { |el| el * 2 }
end

def bubble_sort!(arr, &prc)
  prc ||= Proc.new { |el1, el2| el1 <=> el2 }
  sort_again = true
  while sort_again
    sort_again = false
    (0...arr.length).each do |i|
      if prc.call(arr[i], arr[i + 1]) == 1
        arr[i], arr[i + 1] = arr[i + 1], arr[i]
        sort_again = true
      end
    end
  end
  arr
end

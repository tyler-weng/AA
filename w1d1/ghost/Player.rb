class Player
  alphabet = ("a".."z")
  def initialize(name)
    @name = name
  end

  def guess
    next_letter = nil
    until next_letter
      guess = gets.chomp
      next_letter = guess if alphabet.include?(guess)
    end
    next_letter
  end


end

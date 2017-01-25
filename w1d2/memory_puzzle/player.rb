class HumanPlayer

  def get_guess
    print "Select row: "
    row = gets.chomp.to_i
    print "Select column: "
    col = gets.chomp.to_i
    [row, col]
  end

end
